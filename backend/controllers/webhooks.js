import Stripe from "stripe"
import Transaction from "./../models/Transaction.js"
import User from "./../models/User.js"

export const stripeWebhooks = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const sig = req.headers["stripe-signature"]

  let event
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOKS_SECRET_KEY
    )
  } catch (error) {
    console.log("Webhook signature verification failed:", error.message)
    return res.status(401).send(`webhook error ${error.message}`)
  }

  // try {
  //   switch (event.type) {
  //     case "payment_intent.succeeded":
  //       {
  //         const paymentIntent = event.data.object
  //         const sessionList = await stripe.checkout.sessions.list({
  //           payment_intent: paymentIntent.id,
  //         })
  //         const session = sessionList.data[0]
  //         const { transactionId, appId } = session.metadata
  //         if (appId === "mygpt") {
  //           const transaction = await Transaction.findOne({
  //             _id: transactionId,
  //             isPaid: false,
  //           })

  //           //update credites in user account
  //           //inc - increment
  //           await User.updateOne(
  //             { _id: transaction.userId },
  //             { $inc: { credits: transaction.credits } }
  //           )

  //           //update credit payment status
  //           transaction.isPaid = true
  //           await transaction.save()
  //         } else {
  //           return res.json({
  //             received: true,
  //             message: "Ignored event : Invalid app",
  //           })
  //         }
  //       }
  //       break

  //     default:
  //       console.log("unhandled eveent", event.type)

  //       break
  //   }
  //   res.json({ received: true })
  // } catch (error) {
  //   console.log("web hook processsing eror", error)
  //   res.status(500).send("Internal serverr error")
  // }

  try {
    //  This is the correct event fired by Stripe Checkout
    if (event.type === "checkout.session.completed") {
      const session = event.data.object
      const { transactionId, appId } = session.metadata

      console.log("Checkout Completed Webhook Triggered:", transactionId)

      // Ignore if not from our app
      if (appId !== "mygpt") return res.json({ received: true })

      // Find the transaction
      const transaction = await Transaction.findOne({
        _id: transactionId,
        isPaid: false,
      })

      if (!transaction) {
        console.log("Transaction not found or already processed")
        return res.json({ received: true })
      }

      // Update user credits
      await User.updateOne(
        { _id: transaction.userId },
        { $inc: { credits: transaction.credits } }
      )

      //  Mark transaction as paid
      transaction.isPaid = true
      await transaction.save()

      console.log("Credits updated & Transaction marked as paid")
    }

    res.json({ received: true })
  } catch (error) {
    console.log("Webhook Processing Error:", error)
    res.status(500).send("Internal Server Error")
  }
}

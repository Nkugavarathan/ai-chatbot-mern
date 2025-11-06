import Stripe from "stripe"
import Transaction from "./../models/Transaction"
import User from "./../models/User"

export const stripeWebhooks = async (request, response) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const sig = req.header["stripe-signature"]

  let event
  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOKS_SECRET_KEY
    )
  } catch (error) {
    return response.status(401).send(`webhook error ${error.message}`)
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        {
          const paymentIntent = event.data.object
          const sessionList = await stripe.checkout.sessions.list({
            payment_intent: paymentIntent.id,
          })
          const session = sessionList.data[0]
          const { transactionId, appId } = session.metadata
          if (appId === "mygpt") {
            const transaction = await Transaction.findOne({
              _id: transactionId,
              isPaid: false,
            })

            //update credites in user account
            //inc - increment
            await User.updateOne(
              { _id: transaction.userId },
              { $inc: { credits: transaction.credits } }
            )

            //update credit payment status
            transaction.isPaid = true
            await transaction.save()
          } else {
            return res.json({
              received: true,
              message: "Ignored event : Invalid app",
            })
          }
        }
        break

      default:
        console.log("unhandled eveent", event.type)

        break
    }
    response.json({ received: true })
  } catch (error) {
    console.log("web hook processsing eror", error)
    response.status(500).send("Internal serverr error")
  }
}

//text based ai chat message controller

import Chat from "../models/Chat.js"
import User from "../models/User.js"

export const textMessageController = async (req, res) => {
  try {
    const userId = req.user._id
    const { chatId, prompt } = req.body

    const chat = await Chat.findOne({ userId, _id: chatId })
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp,
      isImage: false,
    })

    //call openai api for getting response
    const { choices } = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    })
    const reply = {
      ...choices[0].message,
      timestamp,
      isImage: false,
    }

    res.status(200).json({ success: true, reply })

    console.log(choices[0].message)
    //
    chat.messages.push(reply)
    await chat.save()

    //deduct user credites
    await User.updateOne({ _id: userId }, { $inc: { credits: -1 } })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

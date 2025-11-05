//text based ai chat message controller

import Chat from "../models/Chat.js"
import User from "../models/User.js"
import openai from "../configs/openai.js"
import axios from "axios"
import imagekit from "../configs/imagekit.js"
export const textMessageController = async (req, res) => {
  const timestamp = Date.now()
  try {
    const userId = req.user._id

    // check credits
    if (req.user.credits < 1) {
      return res.json({
        success: false,
        message: "You don't have enough credites to use this feature",
      })
    }
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

// Image generation message controller

export const imageMessageController = async (req, res) => {
  const timestamp = Date.now()

  try {
    const userId = req.user._id

    if (req.user.credits < 2) {
      return res.json({
        success: false,
        message:
          "You don't have enough credits to use this feature. Please buy more.",
      })
    }

    const { prompt, chatId, isPublished } = req.body

    const chat = await Chat.findOne({ userId, _id: chatId })

    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp,
      isImage: false,
    })

    const encodedPrompt = encodeURIComponent(prompt)

    const generatedImageUrl = `${
      process.env.IMAGEKIT_URL_ENDPOINT
    }/ik-genimg-prompt-${encodedPrompt}/mygpt/${Date.now()}.png?tr=w-800,h-800`

    console.log(generatedImageUrl)
    const aiImageResponse = await axios.get(generatedImageUrl, {
      responseType: "arraybuffer",
    })

    const base64Image = `data:image/png;base64,${Buffer.from(
      aiImageResponse.data,
      "binary"
    ).toString("base64")}`

    const uploadResponse = await imagekit.upload({
      file: base64Image,
      fileName: `${Date.now()}.png`,
      folder: "/mygpt",
    })

    const reply = {
      role: "assistant",
      content: uploadResponse.url,
      timestamp,
      isImage: true,
      isPublished,
    }

    chat.messages.push(reply)
    await chat.save() // ✅ save chat messages

    await User.updateOne({ _id: userId }, { $inc: { credits: -2 } })

    res.status(200).json({ success: true, reply })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

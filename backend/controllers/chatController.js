// api for create new chat
import Chat from "./../models/Chat.js"

export const createChat = async (req, res) => {
  try {
    const userId = req.user._id
    const chatData = {
      userId,
      messages: [],
      name: "New Chat",
      userName: req.user.name,
    }
    await Chat.create(chatData)
    res
      .status(201)
      .json({ success: true, message: "chat created successfully" })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// getting all chats

export const getChats = async (req, res) => {
  try {
    const userId = req.user._id
    console.log("Userid " + userId)
    // const chats = (await Chat.find({ userId })).sort({ updatedAt: -1 })
    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 })
    res.status(200).json({ success: true, chats })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

//delete selected chat
export const deleteChat = async (req, res) => {
  try {
    const userId = req.user._id
    const { chatId } = req.body
    await Chat.deleteOne({ _id: chatId, userId })
    res
      .status(200)
      .json({ success: true, message: "Chat deleted successfully" })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

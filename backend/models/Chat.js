import mongoose from "mongoose"

const chatSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "User", required: true },
    userName: { type: String, required: true },
    name: { type: String, required: true },
    messages: [
      {
        isImage: { type: Boolean, required: true },
        isPublished: { type: Boolean, default: false },
        content: { type: String, required: true },
        role: { type: String, required: true },
        timestamp: { type: Date, default: Date.now(), required: true },
      },
    ],
  },
  { timestamp: true }
)

const chatModel = mongoose.model("Chat", chatSchema)

export default chatModel

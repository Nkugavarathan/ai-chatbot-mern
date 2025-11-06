import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import Chat from "../models/Chat.js"
//generate JWT token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

//register user

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const existUser = await User.findOne({ email })
    if (existUser) {
      return res.status(400).json({ message: "User already exists" })
    }
    //
    const user = await User.create({ name, email, password })

    const token = generateToken(user._id)
    res.status(201).json({ success: true, token })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// login user

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    console.log(user)

    if (user) {
      // check password

      const isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) {
        // generate token
        const token = generateToken(user._id)

        return res.status(200).json({ success: true, token })
      }
    }
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// api to get user data
export const getUser = async (req, res) => {
  try {
    const user = req.user
    // console.log("user", user)
    return res.json({ success: true, user })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

//get published images

export const getPublishedImages = async (req, res) => {
  try {
    const publishedImageMessage = await Chat.aggregate([
      { $unwind: "$messgaes" },
      {
        $match: {
          "messages.isImage": true,
          "messages.isPublished": true,
        },
      },
      {
        $project: {
          _id: 0,
          imageUrl: "$messages.content",
          userName: "$userName",
        },
      },
    ])
    res
      .status(201)
      .json({ success: true, images: publishedImageMessage.reverse() })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

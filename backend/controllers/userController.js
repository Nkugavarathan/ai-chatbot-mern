import User from "../models/User"
import jwt from "jsonwebtoken"
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
    if (user) {
      // check password
      const isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) {
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
    return res.json({ success: true, user })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

import express from "express"
import {
  getPublishedImages,
  getUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js"
import { protect } from "../middlewares/auth.js"

const userRouter = express.Router()

//
userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)

// protected route to get user data
userRouter.get("/data", protect, getUser)

userRouter.get("/published-images", protect, getPublishedImages)

export default userRouter

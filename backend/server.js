import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./configs/db.js"
import userRouter from "./routes/userRoutes.js"
import chatRouter from "./routes/chatRoutes.js"

//app initialization
const app = express()

//connect to database
await connectDB()

//portv
const PORT = process.env.PORT || 3000

//accept frontend requests
app.use(cors())

//body parser middleware for accepting json data
app.use(express.json())

//routes
app.get("/", (req, res) => {
  res.send("Hello, World!")
})
//user route
app.use("/api/user", userRouter)

//chat route
app.use("/api/chat", chatRouter)

//start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

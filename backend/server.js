import express from "express"
import cors from "cors"
import "dotenv/config"

//app initialization
const app = express()

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
//start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

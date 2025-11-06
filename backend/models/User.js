import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    credits: { type: Number, default: 20 },
  },
  { timestamps: true }
)

//Hash password before saving

userSchema.pre("save", async function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return next()
  }
  //bcrypt password
  const salt = await bcrypt.genSalt(10)
  // hash password
  this.password = await bcrypt.hash(this.password, salt)

  // proceed to save
  next()
})

const User = mongoose.model("User", userSchema)
export default User

import React, { useState } from "react"

export default function Login() {
  const [state, setState] = useState("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-8 w-80 sm:w-[352px] 
               text-gray-600 dark:text-gray-200 
               rounded-xl shadow-lg border border-gray-300 dark:border-gray-700
               bg-white dark:bg-gray-800 transition-colors"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-blue-500">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-blue-500"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-blue-500"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-blue-500"
            type="password"
            required
          />
        </div>
        {state === "register" ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-blue-500 cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-blue-500 cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
        <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800  transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  )
}

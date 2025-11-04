import React, { useState, useEffect, useRef } from "react"
import { useAppContext } from "../context/AppContext"
import Message from "./Message"
import { assets } from "../assets/assets"

function ChatBox() {
  const { selectedChat, theme } = useAppContext()

  const containerRef = useRef(null)

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [mode, setMode] = useState("text")

  const [isPublished, setIsPublished] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
  }
  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])

  // display latest msg in chat
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages])

  return (
    <div className=" relative flex-1 flex flex-col  m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40 h-screen  ">
      {/* chat messaages */}
      <div ref={containerRef} className="flex-1 mb-5 ">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-screen">
            <h1
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } text-3xl font-bold text-center`}
            >
              MyGPT
            </h1>
            <p className="mt-4 text-4xl sm:text-5xl text-center text-gray-400">
              Ask me anything
            </p>
          </div>
        )}
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        {/* loading */}
        {loading && (
          <div className="loader flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full dark:bg-white bg-gray-400 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full dark:bg-white bg-gray-400 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full dark:bg-white  bg-gray-400 dark:bg-white animate-bounce"></div>
          </div>
        )}
      </div>

      {/* checkbox publish image  */}
      {mode === "image" && (
        <label className="inline-flex items-center mb-3 gap-2 text-sm mx-auto">
          <p className="text-xs ">Publish Generated Image to Community </p>
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </label>
      )}
      {/* prompt input  bg-primary/20*/}

      <form
        className="  sticky bottom-0  bg-amber-400 dark:bg-[#583c79]/30 border border-primary dark:border-[#80609f]/30 rounded-full  w-full max-w-2xxlp-3 pl-4 mx-auto flex items-center gap-4 "
        onSubmit={onSubmit}
      >
        <select
          className="text-sm pl-3 pr-2 outline-none"
          onChange={(e) => setMode(e.target.value)}
          value={mode}
        >
          <option value="text" className="dark:bg-purple-900">
            Text
          </option>
          <option className="dark:bg-purple-900" value="image">
            Image
          </option>
        </select>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 w-full text-sm outline-none "
          placeholder="Type your prompt here"
          required
        />
        <button disabled={loading}>
          <img
            src={loading ? assets.stop_icon : assets.send_icon}
            alt=""
            className="w-8 cursor-pointer"
          />
        </button>
      </form>
    </div>
  )
}

export default ChatBox

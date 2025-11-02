import React, { useState, useEffect } from "react"
import { useAppContext } from "../context/AppContext"
import Message from "./Message"

function ChatBox() {
  const { selectedChat, theme } = useAppContext()

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])
  return (
    <div className="flex-1 flex flex-col  m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40 h-screen ">
      {/* chat messaages */}
      <div className="flex-1 mb-5 overflow-y-scroll">
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
      </div>
    </div>
  )
}

export default ChatBox

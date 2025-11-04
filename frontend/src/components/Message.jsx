import React, { useEffect } from "react"
import { assets } from "../assets/assets"
import Markdown from "react-markdown"
import moment from "moment"
import Prism from "prismjs"
function Message({ message }) {
  useEffect(() => {
    Prism.highlightAll()
  }, [message.content])
  return (
    <div>
      {" "}
      {message.role === "user" ? (
        <div className="flex items-start justify-end my-4 gap-2">
          <div className="flex flex-col gap-2 p-2 px-4 bg-slate-50  dark:bg-gray-600 rounded-md max-w-2xl">
            <p className="text-sm dark:text-white  ">{message.content}</p>
            <span className="text-xs text-gray-400 dark:text-white">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
          <img src={assets.user_icon} alt="" className="w-8 rounded-full" />
        </div>
      ) : (
        <div className="inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-primay/20  dark:text-white">
          {message.isImage ? (
            <img
              src={message.content}
              className="w-full max-w-md mt-2 rounded-md"
            />
          ) : (
            <div className="text-sm dark:text-primary  reset-tw">
              <Markdown>{message.content}</Markdown>
            </div>
          )}
        </div>
      )}
      <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">
        {" "}
        {moment(message.timestamp).fromNow()}
      </span>
      <hr className="border-black dark:border-gray-600" />
    </div>
  )
}

export default Message

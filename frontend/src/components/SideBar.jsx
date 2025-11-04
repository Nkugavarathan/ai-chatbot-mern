import React, { useState } from "react"
import { useAppContext } from "../context/AppContext"
import { assets } from "../assets/assets"
import moment from "moment"

function SideBar({ isMenuOpen, setIsMenuOpen }) {
  const { chats, navigate, theme, setSelectedChat, setTheme, user } =
    useAppContext()
  const [search, setSearch] = useState("")

  return (
    <div
      className={`flex flex-col justify-between h-screen w-80 p-5  ${
        theme === "dark" ? "bg-blue-400" : "bg-amber-400"
      }
    
    absolute md:relative md:translate-x-0 z-30
    ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Top section */}
      <div className="flex flex-col items-center">
        {/* Logo / title */}
        <h1
          className={`${
            theme === "dark" ? "text-white" : "text-black"
          } text-3xl font-bold text-center`}
        >
          MyGPT
        </h1>

        {/* New Chat button */}
        <button className="mt-6 w-full flex justify-center  py-3 text-lg rounded-md cursor-pointer bg-blue-200 hover:bg-blue-300 transition">
          <span className="mr-2 text-xl">+</span> New Chat
        </button>

        {/* Search bar */}
        <div className="mt-6 flex items-center p-3 bg-blue-200 rounded-md w-full">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search conversations"
            className="w-full text-sm bg-transparent placeholder:text-gray-500 outline-none"
          />
        </div>

        {/* Chat list */}
        {chats.length > 0 && (
          <p className="mt-6 mb-3 text-sm text-white uppercase tracking-wide self-start">
            Recent Chats
          </p>
        )}

        <div className="w-full space-y-2">
          {chats
            .filter((chat) =>
              (chat.messages[0]?.content || chat.name)
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .slice(0, 5) //  limit number of chats shown to keep page fixed
            .map((chat) => (
              <div
                onClick={() => {
                  navigate("/")
                  setSelectedChat(chat)
                  setIsMenuOpen(false)
                }}
                key={chat._id}
                className="bg-blue-200 flex justify-between items-center p-3 rounded-md cursor-pointer hover:bg-blue-300 dark:hover:bg-white/10 transition w-full"
              >
                <div className="flex flex-col overflow-hidden">
                  <p className="truncate text-sm text-gray-800 dark:text-gray-200">
                    {chat.messages[0]?.content
                      ? chat.messages[0].content.slice(0, 32)
                      : chat.name}
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                    {chat.updatedAt ? moment(chat.updatedAt).fromNow() : ""}
                  </p>
                </div>

                <img
                  src={assets.bin_icon}
                  alt="delete"
                  className="w-4 h-4 hover:opacity-100 transition "
                />
              </div>
            ))}
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-3 flex flex-col gap-4 text-sm">
        {/* Community */}
        <div
          onClick={() => {
            navigate("/community")
            setIsMenuOpen(false)
          }}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80"
        >
          <img
            src={assets.gallery_icon}
            className="w-5 dark:invert"
            alt="community"
          />
          <p>Community Images</p>
        </div>

        {/* Credits */}
        <div
          onClick={() => {
            navigate("/credits")
            setIsMenuOpen(false)
          }}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80"
        >
          <img
            src={assets.diamond_icon}
            className="w-5 dark:invert"
            alt="credits"
          />
          <div>
            <p>Credits: {user?.credits || 0}</p>
            <p className="text-xs text-gray-700 dark:text-gray-400">
              Purchase credits to use MyGPT
            </p>
          </div>
        </div>

        {/* Theme toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={assets.theme_icon}
              className="w-5 dark:invert"
              alt="theme"
            />
            <p>Dark Mode</p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-blue-400 transition-all"></div>
            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
          </label>
        </div>

        {/* User */}
        <div className="flex items-center gap-2">
          <img src={assets.user_icon} className="w-7 rounded-full" alt="user" />
          <p className="flex-1 truncate">
            {user ? user.name : "Login your account"}
          </p>
          {user && (
            <img
              src={assets.logout_icon}
              className="h-5 cursor-pointer dark:invert"
              alt="logout"
            />
          )}
        </div>

        {/* close icon */}
        <img
          src={assets.close_icon}
          alt="close"
          onClick={() => {
            setIsMenuOpen(false)
          }}
          className="absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert"
        />
      </div>
    </div>
  )
}

export default SideBar

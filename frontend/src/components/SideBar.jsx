import React, { useState } from "react"
import { useAppContext } from "../context/AppContext"
import { assets } from "../assets/assets"
import moment from "moment"
import toast from "react-hot-toast"
function SideBar({ isMenuOpen, setIsMenuOpen }) {
  const {
    chats,
    navigate,
    theme,
    setSelectedChat,
    setTheme,
    user,
    createNewChat,
    axios,
    setChats,
    fetchUserChats,
    token,
    setToken,
  } = useAppContext()
  console.log(user)

  //select active chat
  const [activeChat, setActiveChat] = useState(null)
  //search
  const [search, setSearch] = useState("")

  //logout
  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    toast.success("Logged out successfully")
  }

  //delete chat

  const deleteChat = async (e, chatId) => {
    console.log("Deleting chat:", chatId, token)

    try {
      e.stopPropagation()

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this chat?"
      )
      if (!confirmDelete) return

      const { data } = await axios.post(
        "/api/chat/delete",
        { chatId },
        {
          headers: { Authorization: token },
        }
      )

      if (data.success) {
        // Remove chat from state
        setChats((prev) => prev.filter((chat) => chat._id !== chatId))
        await fetchUserChats()
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  //filter chats
  const filteredChats = chats.filter((chat) =>
    (chat.messages[0]?.content || chat.name)
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  console.log("chat.updatedAt:", chats.updatedAt)

  // ${theme === "dark" ? "bg-blue-400" : "bg-amber-400" bg-[#0f0f17]}
  return (
    // <div
    //   className={`flex flex-col justify-between h-screen w-80 p-5
    //    bg-blue-300 dark:bg-black

    // absolute md:relative md:translate-x-0 z-30
    // ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
    // >
    <>
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-40"
        />
      )}
      <div
        className={`flex flex-col justify-between h-screen 
  w-72 md:w-80 p-5  
  bg-blue-300 dark:bg-[#0f0f17]
  fixed md:relative top-0 left-0 z-50
  transition-transform duration-300
  ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
  md:translate-x-0`}
      >
        {/* Top section */}
        <div className="flex flex-col items-center">
          {/* Logo / title */}
          {/* <h1
          className={`${
            theme === "dark" ? "text-white" : "text-black"
          } text-3xl font-bold text-center`}
        >
          MyGPT
        </h1> */}
          <h1 className="text-3xl font-bold text-center text-black dark:text-white">
            MyGPT
          </h1>
          {/* New Chat button */}
          <button
            className="mt-6 w-full flex justify-center  py-3 text-lg rounded-md cursor-pointer bg-blue-200 hover:bg-blue-300 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-white
 transition"
            onClick={createNewChat}
          >
            <span className="mr-2 text-xl">+</span> New Chat
          </button>
          {/* Search bar */}
          <div className="mt-6 flex items-center p-3 bg-blue-200 rounded-md w-full dark:bg-blue-900 dark:text-white">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search conversations"
              className="w-full text-sm bg-transparent placeholder:text-gray-500 dark:placeholder:text-gray-100   outline-none"
            />
          </div>
          {/* Chat list */}
          {chats.length > 0 && (
            <p className="mt-6 mb-3 text-sm text-white uppercase tracking-wide self-start">
              Recent Chats
            </p>
          )}
          {chats.length === 0 && (
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-4">
              No chats yet
            </p>
          )}
          {search && filteredChats.length === 0 && (
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-4">
              No search results found
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
                    setActiveChat(chat._id)
                  }}
                  key={chat._id}
                  className={`flex justify-between items-center p-3 rounded-md cursor-pointer transition w-full
    ${
      activeChat === chat._id
        ? "bg-blue-400 dark:bg-blue-700" // SELECTED STATE
        : "bg-blue-200 hover:bg-blue-400 dark:bg-blue-900 dark:hover:bg-white/30"
    }
  `}
                >
                  <div className="flex flex-col overflow-hidden">
                    <p className="truncate text-sm text-gray-800 dark:text-gray-200">
                      {chat.messages[0]?.content
                        ? chat.messages[0].content.slice(0, 32)
                        : chat.name}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                      {chat.updatedAt ? moment(chat.updatedAt).fromNow() : ""}
                      {/* {moment(chat.updatedAt).fromNow()}{" "} */}
                    </p>
                  </div>

                  <img
                    onClick={(e) =>
                      toast.promise(deleteChat(e, chat._id), {
                        loading: "Deleting chat...",
                        success: "Chat deleted successfully!",
                        error: "Failed to delete chat",
                      })
                    }
                    src={assets.bin_icon}
                    alt="delete"
                    className="w-4 h-4 hover:opacity-100 transition"
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
            <img src={assets.gallery_icon} className="w-5 " alt="community" />
            <p className="dark:text-white">Community Images</p>
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
              className=" w-5 dark:invert" // dark:invert
              alt="credits"
            />
            <div>
              <p className="dark:text-white">Credits: {user?.credits || 0}</p>
              <p className="text-xs text-gray-700 dark:text-gray-400">
                Purchase credits to use MyGPT
              </p>
            </div>
          </div>

          {/* Theme toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={assets.theme_icon} className="w-5 " alt="theme" />
              <p className="dark:text-white">Dark Mode</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-blue-400 transition-all"></div>
              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
            </label>
          </div>

          {/* User */}
          <div className="flex items-center gap-2">
            <img
              src={assets.user_icon}
              className="w-7 rounded-full"
              alt="user"
            />
            <p className="flex-1 truncate dark:text-white">
              {user ? user.name : "Login your account"}
            </p>
            {user && (
              <img
                onClick={logout}
                src={assets.logout_icon}
                className="h-5 cursor-pointer "
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
    </>
  )
}

export default SideBar

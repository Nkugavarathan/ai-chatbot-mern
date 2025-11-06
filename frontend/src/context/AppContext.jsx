import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { dummyChats, dummyUserData } from "../assets/assets"

import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
  const [token, setToken] = useState(localStorage.getItem("token") || null)
  const [loadingUser, setLoadingUser] = useState(true)
  const fetchUser = async () => {
    // setUser(dummyUserData)

    try {
      /*
      {
  data: { success: true, user: {...} },
  status: 200,
  statusText: "OK",
  headers: {...},
  config: {...}
} axoios returens like this so we destruct 
      */
      const { data } = await axios.get("/api/user/data", {
        headers: { Authorization: token },
      })
      console.log(data)
      /*
      {
    "success": true,
    "user": {
        "_id": "690ae066daa109ec186f2053",
        "name": "kanta",
        "email": "kanta@gmail.com",
        "password": "$2b$10$fro4fSgWOBgozLCiG7QEB.EFzm0JGbzKMqpbOa0SNa3BZExrjS1Eq",
        "credits": 17,
        "__v": 0
    }
}
      */
      if (data.success) {
        setUser(data.user)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoadingUser(false)
    }
  }
  /*
async

Marks a function that will return a Promise.

await

Tells JavaScript:

"Stop here and wait until this task is finished.
Then continue the next line."

*/
  const createNewChat = async () => {
    try {
      if (!user) {
        return toast("Login to create a new chat")
      }
      navigate("/")
      await axios.get("/api/chat/create", { headers: { Authorization: token } })
      await fetchUserChats()
    } catch (error) {
      toast.error(error.message)
    }
  }
  const fetchUserChats = async () => {
    // setChats(dummyChats)
    // setSelectedChat(dummyChats[0])
    // setSelectedChat()

    try {
      const { data } = await axios.get("/api/chat/getchats", {
        headers: { Authorization: token },
      })
      if (data.success) {
        setChats(data.chats)

        //if the user has no chats,create
        if (data.chats.lenght === 0) {
          await createNewChat()
          return fetchUserChats()
        } else {
          setSelectedChat[data.chats[0]]
        }
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      fetchUser()
    } else {
      setUser(null)
      setLoadingUser(false)
    }
  }, [token])

  useEffect(() => {
    if (user) {
      fetchUserChats()
    } else {
      setChats([])
      setSelectedChat(null)
    }
  }, [user])

  //thme

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    )

    if (theme === "light") {
      localStorage.theme = "light"
    } else if (theme === "dark") {
      localStorage.theme = "dark"
    } else {
      localStorage.removeItem("theme")
    }
  }, [theme])

  const value = {
    navigate,
    user,
    setUser,
    fetchUser,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    theme,
    setTheme,
    createNewChat,
    loadingUser,
    fetchUserChats,
    token,
    setToken,
    axios,
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)

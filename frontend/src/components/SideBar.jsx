import React from "react"
import { useAppContext } from "../context/AppContext"

function SideBar() {
  const { chats, selectedChat, theme, setTheme, user } = useAppContext()
  return <div>SideBar</div>
}

export default SideBar

import React, { useState } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import SideBar from "./components/SideBar"
import ChatBox from "./components/ChatBox"
import Credits from "./pages/Credits"
import Community from "./pages/Community"
import { assets } from "./assets/assets"
import "./assets/prism.css"
import Loading from "./pages/Loading"
import Login from "./pages/Login"
import { useAppContext } from "./context/AppContext"
import { Toaster } from "react-hot-toast"
// import { ReactComponent as MenuIcon } from "../src/assets/menu_icon.svg"
import MenuIcon from "./assets/menu_icon.svg?react"

function App() {
  const { user, loadingUser } = useAppContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { pathname } = useLocation()
  if (pathname === "/loading" || loadingUser) return <Loading />

  return (
    <>
      {/* use toaster anywhere */}
      <Toaster />

      {!isMenuOpen && (
        <MenuIcon
          onClick={() => setIsMenuOpen(true)}
          className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden  dark:text-white transition-colors z-20"
        />
      )}
      {user ? (
        <div className="flex h-screen relative overflow-hidden">
          <div className="">
            <SideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          </div>
          <div className="flex-3 bg-gray dark:bg-[#0f0f17] overflow-y-auto">
            <Routes>
              <Route path="/" element={<ChatBox />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/community" element={<Community />} />
              {/* <Route path="/login" element={<Login />} /> */}
            </Routes>
          </div>
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </>
  )
}

export default App

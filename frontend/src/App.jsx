import React, { useState } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import SideBar from "./components/SideBar"
import ChatBox from "./components/ChatBox"
import Credits from "./pages/Credits"
import Community from "./pages/Community"
import { assets } from "./assets/assets"
import "./assets/prism.css"
import Loading from "./pages/Loading"
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { pathname } = useLocation()
  if (pathname === "/loading") return <Loading />
  return (
    <>
      {!isMenuOpen && (
        <img
          src={assets.menu_icon}
          alt="menu"
          onClick={() => setIsMenuOpen(true)}
          className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden invert dark:invert-0 z-20"
        />
      )}

      <div className="flex h-screen">
        <div className="flex-1 ">
          <SideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
        <div className="flex-3 bg-gray overflow-y-auto">
          <Routes>
            <Route path="/" element={<ChatBox />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App

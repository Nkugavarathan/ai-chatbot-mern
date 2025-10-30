import React from "react"
import { Routes, Route } from "react-router-dom"
import SideBar from "./components/SideBar"
import ChatBox from "./components/ChatBox"
import Credits from "./pages/Credits"
import Community from "./pages/Community"
function App() {
  return (
    <>
      <div className="flex h-screen">
        <div className="flex-1 bg-blue-400">
          <SideBar />
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

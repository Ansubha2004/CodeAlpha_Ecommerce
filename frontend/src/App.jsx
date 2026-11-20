import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
function App() {
 

  return (
    <div className="relative w-screen h-screen min-h-screen overflow-x-hidden font-sans text-slate-800 antialiased">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>      
    </div>
  )
}

export default App

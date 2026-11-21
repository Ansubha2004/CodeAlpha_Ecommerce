import React,{useState,useEffect} from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
function App() {

  const [category,setCategory]=useState("All");
  const [search,setSearch]=useState("");
  
 

  return (
    <div className="relative w-screen h-screen min-h-screen overflow-x-hidden font-sans text-slate-800 antialiased">
      <Navbar onCategoryChange={setCategory} onSearchChange={setSearch}/>
      <Routes>
        <Route path="/" element={<Home selectedCategory={category} searchProduct={search} />} />
      </Routes>      
    </div>
  )
}

export default App

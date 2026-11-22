import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import Productdetails from "./pages/ProductDetails.jsx"
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const url = import.meta.env.VITE_API_URL;
  const logout = async () => {
    try {
      const result = await axios.get(`${url}/authapi/logout`, {
        withCredentials: true,
      });

      if (result.data.success) {
        alert("Account logged out");
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.log("Error logging out", error);
      alert("Logout failed");
    }
  };

  const refreshUser = async () => {
    try {
      const result = await axios.get(`${url}/authapi/profile`, {
        withCredentials: true,
      });

      if (result.data.success) {
        setUser(result.data.data);
        return true;
      }

      setUser(null);
      return false;
    } catch (error) {
      console.log(
        "User data track error:",
        error.response?.data || error.message,
      );
      setUser(null);
      return false;
    }
  };
  
  const getwishlist = async () => {
    try {
      const result = await axios.get(`${url}/wishlistapi/getwishlist`, {
        withCredentials: true,
      });

      if (result.data.success) {
        setWishlist(result.data.data);
      }
    } catch (error) {
      console.log("Wishlist fetch error:", error);
      return;
    }
  };

 


  useEffect(() => {
    const checkUser = async () => {
      
      await refreshUser();
      setLoading(false);
    };

    checkUser();
    getwishlist();
  }, [url,wishlist]);

  return (
    <div className="relative w-screen h-screen min-h-screen overflow-x-hidden font-sans text-slate-800 antialiased">
      <Navbar
        onCategoryChange={setCategory}
        user={user}
        onSearchChange={setSearch}
        logout={logout}
      />
      <Routes>
        <Route path="/login" element={<PublicRoute user={user} loading={loading}><Login refreshUser={refreshUser} /></PublicRoute>} />
        <Route
          path="/register"
          element={<PublicRoute user={user} loading={loading}><Register refreshUser={refreshUser} /></PublicRoute>}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Home
                selectedCategory={category}
                user={user}
                searchProduct={search}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Wishlist"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Wishlist user={user} wishlist={wishlist} setWishlist={setWishlist}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Productdetails user={user} wishlist={wishlist} setWishlist={setWishlist}/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

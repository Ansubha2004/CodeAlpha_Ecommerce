import React, { useEffect, useState } from "react";
import { Heart, User, ShoppingCart, Search, LogOut } from "lucide-react";
import axios from "axios";
import {Link} from "react-router-dom";

function Navbar({ onCategoryChange, user, onSearchChange, logout ,favlength}) {
  const [showProfile, setShowProfile] = useState(false);

  const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Books",
  ];

  const handlesearch = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div
      id="navbar"
      className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200"
    >
      <div className="max-w-6xl mx-auto px-2">
        <div className="h-14 flex items-center justify-between gap-6">
          <div className="text-xl font-bold text-slate-900 cursor-pointer">
            SHOP<span className="text-blue-600">xEASE</span>
          </div>

          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 w-full max-w-md focus-within:border-blue-500">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              onChange={handlesearch}
              placeholder="Search products..."
              className="w-full outline-none border-none px-3 text-sm text-gray-700 placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-6 text-slate-900">
            <Link
              to={user ? "/Wishlist" : "#"}
              onClick={(e) => !user && e.preventDefault()}
              className="hover:text-blue-600 transition"
            >
              <Heart
                size={21}
                className={!user ? "opacity-40 cursor-not-allowed" : ""}
              />
              
            </Link>
    
           
            <div className="relative">
              <button
                disabled={!user}
                onClick={() => setShowProfile(!showProfile)}
                className="hover:text-blue-600 transition flex items-center gap-2 disabled:cursor-not-allowed disabled:hover:text-slate-900"
              >
                <User size={21} />
                {user?.name && (
                  <span className="text-sm font-medium">{user.name}</span>
                )}
              </button>

              {showProfile && (
                <div className="absolute right-0 top-10 w-64 bg-white shadow-xl border border-gray-100 rounded-xl p-4 z-50">
                  <div className="mb-4">
                    <p className="font-semibold text-slate-800">{user?.name}</p>
                    <p className="text-sm text-gray-500 break-all">
                      {user?.email}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-3">
                    <button
                      onClick={() => {
                        logout();
                        setShowProfile(false);
                      }}
                      className="flex items-center gap-2 w-full text-red-500 hover:bg-red-50 p-2 rounded-lg transition text-sm font-medium"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              disabled={!user}
              className="hover:text-blue-600 disabled:cursor-not-allowed disabled:hover:text-slate-900 transition"
            >
              <ShoppingCart size={21} />
            </button>
          </div>
        </div>

        <div className="h-11 flex items-center gap-10 border-t border-gray-100 text-sm font-medium text-gray-800">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                onCategoryChange(category);
              }}
              className="hover:text-blue-600 transition whitespace-nowrap"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

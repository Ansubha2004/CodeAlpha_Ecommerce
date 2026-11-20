
import React from "react";
import { Heart, User, ShoppingCart, Search } from "lucide-react";

function Navbar() {
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
              placeholder="Search products..."
              className="w-full outline-none border-none px-3 text-sm text-gray-700 placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-6 text-slate-900">
            <button className="hover:text-blue-600 transition">
              <Heart size={21} />
            </button>
            <button className="hover:text-blue-600 transition">
              <User size={21} />
            </button>
            <button className="hover:text-blue-600 transition">
              <ShoppingCart size={21} />
            </button>
          </div>
        </div>
        <div className="h-11 flex items-center gap-10 border-t border-gray-100 text-sm font-medium text-gray-800">
          {["Electronics", "Clothing", "Home & Garden", "Sports", "Books"].map(
            (category) => (
              <button
                key={category}
                className="hover:text-blue-600 transition whitespace-nowrap"
              >
                {category}
              </button>
            )
          )}
        </div>

      </div>
    </div>
  );
}

export default Navbar;

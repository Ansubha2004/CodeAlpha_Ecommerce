import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowLeft,
  PackageOpen,
  Sparkles,
  Axis3DIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Wishlist({ user }) {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  const [wishlist, setWishlist] = useState([]);

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
    getwishlist();
    
  }, []);

  const removeWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <section className="min-h-screen bg-slate-50 pt-32 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-blue-100 p-2 rounded-xl">
                <Heart size={23} className="text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">My Wishlist</h1>
            </div>

            <p className="text-gray-500">
              Keep track of the products you love.
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:text-blue-600 hover:border-blue-300 transition shadow-sm"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </button>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 py-20 px-5 text-center shadow-sm">
            <div className="bg-blue-50 p-6 rounded-full inline-flex mb-5">
              <PackageOpen size={45} className="text-blue-500" />
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Your wishlist is empty
            </h2>

            <p className="text-gray-500 text-sm mb-6">
              You haven't saved any products yet. Discover something you love!
            </p>

            <button
              onClick={() => navigate("/Home")}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Saved Products
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Your personal collection
                </p>
              </div>

              <span className="text-sm text-gray-500">
                {wishlist.length} items
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((product) => (
                <div
                  key={product._id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300 group"
                >
                  {/* Image */}
                  <div className="relative h-60 bg-gray-50 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-6 group-hover:scale-110 transition duration-500"
                    />

                    <span className="absolute top-4 left-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {product.category}
                    </span>

                    <button
                      onClick={() => removeWishlist(product._id)}
                      className="absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-md text-red-500 hover:bg-red-500 hover:text-white transition"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <div className="flex items-center gap-1 text-xs text-blue-600 font-medium mb-2">
                      <Sparkles size={14} />
                      Saved to Wishlist
                    </div>

                    <h3 className="font-bold text-slate-800 text-base mb-3 line-clamp-1">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between mb-5">
                      <p className="text-xl font-bold text-slate-900">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 active:scale-95 transition">
                      <ShoppingCart size={17} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Wishlist;

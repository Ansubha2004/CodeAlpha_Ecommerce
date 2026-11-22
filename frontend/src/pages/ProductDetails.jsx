import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Minus, Plus, ArrowLeft } from "lucide-react";
import axios from "axios";
function ProductDetails({ user, wishlist, setWishlist }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Get selected product from navigation state
  const product = location.state?.product;
  const url = import.meta.env.VITE_API_URL;
  const isfavourite = wishlist.some(
    (item) => item._id?.toString() === product?._id?.toString(),
  );
  const onToggleFavorite = async () => {
    try {
      if (isfavourite) {
        const result = await axios.delete(
          `${url}/wishlistapi/removewishlist/${product._id}`,
          {
            withCredentials: true,
          },
        );
        if (result.data.success) {
          setWishlist((prev) =>
            prev.filter((item) => item._id !== product._id),
          );
        }
      } else {
        const result = await axios.post(
          `${url}/wishlistapi/addtowishlist/${product._id}`,
          {},
          {
            withCredentials: true,
          },
        );
        if (result.data.success) {
          setWishlist((prev) => [...prev, product]);
        }
      }
    } catch (error) {
      console.log(
        "Wishlist error add remove:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <section
      id="productdetails"
      className="px-10  mt-30 relative flex flex-col justify-center items-center z-[1] box-border"
    >
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-8"
        >
          <ArrowLeft size={19} />
          Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-6">
          <div className="w-[80%] ">
            <div className="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                {product?.name}
              </h1>

              <button
                onClick={onToggleFavorite}
                className="p-2 rounded-full hover:bg-red-50 transition"
              >
                <Heart
                  size={24}
                  className={
                    isfavourite ? "fill-red-500 text-red-500" : "text-slate-800"
                  }
                />
              </button>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mt-5">
              ${Number(product?.price || 0).toFixed(2)}
            </h2>

            <p className="text-gray-600 text-base leading-7 mt-4">
              {product?.description}
            </p>

            <p className="text-sm text-gray-500 mt-4">
              Category: {product?.category}
            </p>

            <div className="flex items-center gap-5 mt-8">
              <span className="font-semibold text-gray-800">Quantity:</span>

              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button className="p-3 hover:bg-gray-100">
                  <Minus size={17} />
                </button>

                <span className="px-5 font-semibold text-gray-800">1</span>

                <button className="p-3 hover:bg-gray-100">
                  <Plus size={17} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <button className="flex items-center col-span-2 justify-center gap-2 bg-[#102c57] text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
                <ShoppingCart size={18} />
                Add to Cart
              </button>

             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;

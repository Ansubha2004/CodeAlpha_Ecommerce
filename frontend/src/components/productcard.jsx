import React, { useState, useEffect } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import axios from "axios";

function ProductCard({
  _id,
  name,
  description,
  price,
  category,
  image,
  isFavourite,
  onAddToCart,
  wishlist,
  setWishlist,
}) {
    const url=import.meta.env.VITE_API_URL;
  const isfavourite = wishlist.some((item) => item._id == _id);

  const onToggleFavorite=async ()=>{
    try{
        if(isfavourite)
        {
            const result=await axios.delete(`${url}/wishlistapi/removewishlist/${_id}`,{
                withCredentials:true
            });
            if(result.data.success)
            {
                setWishlist((prev)=>prev.filter((item)=>item._id!==_id));
            }
        }
        else{
            const result = await axios.post(
                `${url}/wishlistapi/addtowishlist/${_id}`,
                {},
                {
                    withCredentials: true
                }
            );
            if(result.data.success)
            {
                setWishlist((prev) => [
                    ...prev,
                    {
                        _id,
                        name,
                        description,
                        price,
                        category,
                        image
                    }
                ]);
            }
        }

    }
    catch (error) {
        console.log(
            "Wishlist error add remove:",
            error.response?.data || error.message
        );
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden w-full max-w-[280px]">
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />

        <button
          type="button"
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition-colors"
        >
          <Heart
            size={21}
            className={
              isfavourite ? "fill-red-500 text-red-500" : " text-gray-700"
            }
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-14">
          {name}
        </h3>
        <div className="flex items-center justify-between mt-4">
          <p className="text-xl font-bold text-gray-900">
            ${Number(price).toFixed(2)}
          </p>

          <button
            type="button"
            onClick={onAddToCart}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            <ShoppingCart size={17} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

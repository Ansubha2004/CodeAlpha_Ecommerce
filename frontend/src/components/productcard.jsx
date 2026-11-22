import React from "react";
import { Heart, ShoppingCart } from "lucide-react";

function ProductCard({
    name,
    description,
    price,
    category,
    image,
    onAddToCart,
    onToggleFavorite
}) {
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
                        className="text-gray-700 hover:text-red-500"
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

import React, { useState, useEffect } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import Checkout from "./Checkout.jsx";
import axios from "axios";

function Cart({ user }) {
  const url = import.meta.env.VITE_API_URL;
  const [showCheckout, setShowCheckout] = useState(false);
  const [products, setProducts] = useState([]);

  const removecart = async (id) => {
    try {
      const result = await axios.delete(
        `
        
        ${url}/cartapi/removespecificcart/${id}`,
        { withCredentials: true },
      );
      if (result.data.success) {
        setProducts((prev) => prev.filter((item) => item.product._id !== id));
      }
    } catch (error) {
      console.log("Error in removing this cart:", error);
    }
  };

  const getcart = async () => {
    try {
      const result = await axios.get(`${url}/cartapi/getcart`, {
        withCredentials: true,
      });

      if (result.data.success) {
        setProducts(result.data.cart);
      }
    } catch (error) {
      console.log(
        "Error fetching carts:",
        error.response?.data || error.message,
      );
    }
  };

  const updatedquantity = async (id, newquantity) => {
    if (newquantity < 1) return;
    try {
      const result = await axios.post(
        `${url}/cartapi/addtocart/${id}`,
        { quantity: newquantity },
        { withCredentials: true },
      );
      if (result.data.success) {
        setProducts((prev) =>
          prev.map((item) =>
            item.product._id === id ? { ...item, quantity: newquantity } : item,
          ),
        );
      }
    } catch (error) {
      console.log("Error in quantity update:", error);
    }
  };

  useEffect(() => {
    getcart();
  }, []);

  const total = products.reduce(
    (subtotal, item) => subtotal + item.product.price * item.quantity,
    0,
  );

  if (showCheckout) {
    return <Checkout onBack={() => setShowCheckout(false)} />;
  }

  return (
    <section
      id="cart"
      className="relative mt-35 px-5 flex flex-col justify-center items-center z-[1] box-border"
    >
      <div className="w-full max-w-7xl">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Shopping Cart
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-4 md:px-6">
            {products.length === 0 ? (
              <p className="py-8 text-center text-gray-500">
                Your cart is empty.
              </p>
            ) : (
              products
                .map((item) => (
                  <div
                    key={item.product._id}
                    className="flex flex-wrap md:flex-nowrap items-center gap-4 py-5 border-b border-gray-200 last:border-0"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />

                    <div className="flex-1 min-w-[130px]">
                      <h3 className="text-sm font-semibold text-slate-800">
                        {item.product.name}
                      </h3>
                    </div>

                    <p className="text-sm font-semibold text-slate-700 w-20">
                      ${item.product.price.toFixed(2)}
                    </p>

                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => {
                          updatedquantity(item.product._id, item.quantity - 1);
                        }}
                        disabled={item.quantity <= 1}
                        className="px-2 py-1 text-slate-600 hover:bg-gray-100"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="px-3 py-1 text-sm font-medium border-x border-gray-200">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => {
                          updatedquantity(item.product._id, item.quantity + 1);
                        }}
                        className="px-2 py-1 text-slate-600 hover:bg-gray-100"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <p className="text-sm font-semibold text-slate-800 w-20 text-right">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      onClick={() => removecart(item.product._id)}
                      className="text-slate-500 hover:text-red-500"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))
                .reverse()
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-bold text-slate-900 mb-5">
              Order Summary
            </h3>

            <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-slate-900">
                Total Bill
              </span>
              <span className="text-xl font-bold text-blue-600">
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              disabled={products.length < 1}
              onClick={() => setShowCheckout(true)}
              className={`w-full mt-6 bg-[#102c59] hover:bg-blue-900 text-white font-semibold text-sm py-3 rounded-lg transition-all duration-300 ${
                products.length < 1
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;

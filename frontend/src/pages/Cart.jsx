import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

function Cart() {
  const products = [
    {
      _id: "1",
      name: "Wireless Bluetooth Headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200",
      price: 299.99,
      quantity: 1,
    },
    {
      _id: "2",
      name: "Smart Watch Series 7",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200",
      price: 399.99,
      quantity: 1,
    },
  ];

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
            {products.map((product) => (
              <div
                key={product._id}
                className="flex flex-wrap md:flex-nowrap items-center gap-4 py-5 border-b border-gray-200 last:border-0"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                <div className="flex-1 min-w-[130px]">
                  <h3 className="text-sm font-semibold text-slate-800">
                    {product.name}
                  </h3>
                </div>

                <p className="text-sm font-semibold text-slate-700 w-20">
                  ${product.price.toFixed(2)}
                </p>

                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button className="px-2 py-1 text-slate-600 hover:bg-gray-100">
                    <Minus size={14} />
                  </button>

                  <span className="px-3 py-1 text-sm font-medium border-x border-gray-200">
                    {product.quantity}
                  </span>

                  <button className="px-2 py-1 text-slate-600 hover:bg-gray-100">
                    <Plus size={14} />
                  </button>
                </div>

                <p className="text-sm font-semibold text-slate-800 w-20 text-right">
                  ${(product.price * product.quantity).toFixed(2)}
                </p>

                <button className="text-slate-500 hover:text-red-500">
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-bold text-slate-900 mb-5">
              Order Summary
            </h3>

            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-slate-600">
                Subtotal
              </span>
              <span className="text-sm font-semibold text-slate-800">
                $699.98
              </span>
            </div>

            <div className="flex justify-between items-center mb-5">
              <span className="text-sm font-medium text-slate-600">
                Delivery
              </span>
              <span className="text-sm font-semibold text-slate-800">
                $50.00
              </span>
            </div>

            <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-slate-900">
                Total
              </span>
              <span className="text-xl font-bold text-blue-600">
                $749.98
              </span>
            </div>

            <button className="w-full mt-6 bg-[#102c59] hover:bg-blue-900 text-white font-semibold text-sm py-3 rounded-lg transition-all duration-300">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;

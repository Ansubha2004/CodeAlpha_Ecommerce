import React, { useState } from "react";
import {
  User,
  MapPin,
  Phone,
  ArrowLeft,
  Wallet,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

function Checkout({ onBack }) {
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const products = [
    {
      _id: "1",
      name: "Wireless Bluetooth Headphones",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150",
      price: 299.99,
      quantity: 1,
    },
    {
      _id: "2",
      name: "Smart Watch Series 7",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150",
      price: 399.99,
      quantity: 1,
    },
  ];

  const subtotal = products.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const delivery = 50;
  const total = subtotal + delivery;

  return (
    <section
      id="checkout"
      className="relative mt-32 px-5 pb-16 flex flex-col justify-center items-center z-[1] box-border"
    >
      <div className="w-full max-w-7xl">
       

        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-slate-600 hover:bg-gray-100 transition-all"
          >
            <ArrowLeft size={18} />
          </button>

          <h2 className="text-2xl font-bold text-[#102c59]">Checkout</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-6">
          

          <div>
            <h3 className="text-base font-bold text-slate-800 mb-4">
              Delivery Information
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Selected Payment Method: ${paymentMethod}`);
              }}
              className="space-y-4"
            >
              <div className="relative">
                <User
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full border border-gray-200 rounded-lg py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div className="relative">
                <MapPin
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="text"
                  placeholder="Delivery Address"
                  required
                  className="w-full border border-gray-200 rounded-lg py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div className="relative">
                <Phone
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="w-full border border-gray-200 rounded-lg py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500"
                />
              </div>
              
             
              <div className="pt-2">
                <h3 className="text-sm font-bold text-slate-800 mb-3">
                  Payment Method
                </h3>

                <div className="flex flex-col sm:flex-row gap-3">
                  <label
                    className={`flex flex-1 items-center gap-2 border rounded-lg p-3 cursor-pointer transition-all ${
                      paymentMethod === "COD"
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={() => setPaymentMethod("COD")}
                      className="accent-blue-700"
                    />

                    <Wallet size={18} className="text-[#102c59]" />

                    <span className="text-sm font-medium text-slate-800">
                      Cash on Delivery
                    </span>
                  </label>

                  <label
                    className={`flex flex-1 items-center gap-2 border rounded-lg p-3 cursor-pointer transition-all ${
                      paymentMethod === "ONLINE"
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="ONLINE"
                      checked={paymentMethod === "ONLINE"}
                      onChange={() => setPaymentMethod("ONLINE")}
                      className="accent-blue-700"
                    />

                    <CreditCard size={18} className="text-[#102c59]" />

                    <span className="text-sm font-medium text-slate-800">
                      Online Payment
                    </span>
                  </label>
                </div>
              </div>
              
             
              <button
                type="submit"
                className="w-full bg-[#102c59] hover:bg-blue-900 text-white font-semibold text-sm py-3 rounded-lg transition-all duration-300"
              >
                {paymentMethod === "COD"
                  ? "Place Order"
                  : "Continue to Payment"}
              </button>
            </form>
          </div>

          <div className="border border-gray-200 rounded-xl p-4 shadow-sm h-fit">
            <h3 className="text-base font-bold text-slate-800 mb-4">
              Order Summary
            </h3>

            <div className="space-y-3">
              {products.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-11 h-11 rounded-lg object-cover bg-gray-100"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-700 line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="text-xs font-semibold text-slate-800 whitespace-nowrap">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-semibold text-slate-800">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Delivery</span>
                <span className="font-semibold text-slate-800">
                  ${delivery.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                <span className="text-base font-bold text-slate-900">
                  Total
                </span>
                <span className="text-lg font-bold text-blue-700">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mt-3">
                <p className="text-xs text-slate-500">Payment Method</p>
                <p className="text-sm font-semibold text-[#102c59] mt-1">
                  {paymentMethod === "COD"
                    ? "Cash on Delivery"
                    : "Online Payment"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;

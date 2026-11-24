import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ShoppingBag} from "lucide-react";


function Order({ user }) {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const url = import.meta.env.VITE_API_URL;

  const fetchorderhistory = async () => {
    try {
      const result = await axios.get(`${url}/orderapi/orderhistory`, {
        withCredentials: true,
      });

      if (result.data.success) {
        setOrders(result.data.orderdetails);
      }
    } catch (error) {
      console.log("Error in fetching orderhistory, ", error);
    }
  };

  const navigate=useNavigate();

  useEffect(() => {
    fetchorderhistory();
  }, []);

  const toggleDetails = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  return (
    <section
      id="orderhistory"
      className="relative mt-25 mb-20 w-full max-w-6xl mx-auto px-5 md:px-8 flex flex-col z-[1]"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[#102c59] my-10">
        Your Order History
      </h2>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="w-full bg-white border border-gray-200 rounded-xl p-4 md:px-6 md:py-5 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="min-w-[170px]">
                <h3 className="text-base md:text-lg font-bold text-gray-900">
                  #{order._id}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Placed on:{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {order.products.map((product, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 md:w-[70px] md:h-[70px] rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div>
                <span
                  className={`inline-flex items-center justify-center min-w-[105px] px-4 py-2 rounded-full text-sm font-semibold
                    ${
                      order.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus === "Processing"
                          ? "bg-blue-100 text-blue-700"
                          : order.orderStatus === "Shipped"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between gap-2">
                <h3 className="text-lg md:text-xl font-bold text-gray-900">
                  ₹{order.total.toFixed(2)}
                </h3>

                <button
                  onClick={() => toggleDetails(order._id)}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {expandedOrder === order._id
                    ? "Hide Details ↑"
                    : "View Details →"}
                </button>
              </div>
            </div>

            {expandedOrder === order._id && (
              <div className="mt-6 pt-5 border-t border-gray-200">
                <h3 className="text-lg font-bold text-[#102c59] mb-4">
                  Order Details
                </h3>

                <div className="bg-gray-50 rounded-lg p-4 mb-5">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Delivery Information
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <p>
                      <span className="text-gray-500">Name: </span>
                      <span className="font-medium">
                        {order.customer?.name}
                      </span>
                    </p>

                    <p>
                      <span className="text-gray-500">Phone: </span>
                      <span className="font-medium">
                        {order.customer?.mobile}
                      </span>
                    </p>

                    <p className="md:col-span-2">
                      <span className="text-gray-500">Address: </span>
                      <span className="font-medium">
                        {order.customer?.address}
                      </span>
                    </p>
                  </div>
                </div>

                <h4 className="font-semibold text-gray-800 mb-3">
                  Ordered Products
                </h4>

                <div className="flex flex-col gap-3">
                  {order.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 border border-gray-100 rounded-lg p-3"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                      />

                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-800">
                          {product.name}
                        </h5>

                        <p className="text-sm text-gray-500">
                          Quantity: {product.quantity}
                        </p>

                        <p className="text-sm text-gray-500">
                          Price: ₹{product.price.toFixed(2)} each
                        </p>
                      </div>

                      <p className="font-semibold text-gray-800">
                        ₹{(product.price * product.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-col sm:flex-row justify-between gap-3">
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-semibold text-gray-800">
                      {order.payment}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-xl font-bold text-[#102c59]">
                      ₹{order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {orders.length === 0 && (
          <div className="flex flex-col items-center justify-center h-100 bg-gray-50 rounded-xl border border-gray-200">
            <ShoppingBag size={32} className="text-gray-400 mb-3" />

            <h3 className="text-lg font-semibold text-slate-800">
              No Orders Found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              You haven't placed any orders yet.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 mt-6 transition"
            >
              Explore Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Order;

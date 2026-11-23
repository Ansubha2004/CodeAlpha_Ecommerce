import React from 'react'

function Order() {
  return (
     

      <div>
      <h2 className="text-2xl font-bold text-[#102c59] mb-6">My Orders</h2>

      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Order ID and Date */}

              <div className="min-w-[130px]">
                <h3 className="text-sm font-bold text-slate-800 underline">
                  #{order._id}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Placed on: {order.date}
                </p>
              </div>

              {/* Product Images */}

              <div className="flex gap-2">
                {order.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Ordered product"
                    className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                  />
                ))}
              </div>

              {/* Order Status */}

              <span
                className={`text-xs font-bold px-4 py-2 rounded-full ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {order.status}
              </span>

              {/* Order Amount */}

              <div className="text-right">
                <p className="text-base font-bold text-slate-900">
                  ${order.total.toFixed(2)}
                </p>

                <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 mt-2 ml-auto">
                  View Details
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
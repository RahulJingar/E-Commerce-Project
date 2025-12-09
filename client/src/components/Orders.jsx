// src/pages/Orders.jsx
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectOrders } from "../features/ordersSlice";

const Orders = () => {
  const navigate = useNavigate();
  const orders = useSelector(selectOrders);

  if (!orders.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-md rounded-xl p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-3">No orders yet</h2>
          <p className="text-gray-500 mb-4">
            Place your first order to see it here.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all"
          >
            Start Shopping →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Your Orders
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-orange-500 font-semibold hover:text-orange-600 text-sm"
          >
            ← Back to Home
          </button>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID:{" "}
                    <span className="font-mono text-gray-700">
                      {order.id}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Placed on {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    order.status === "DELIVERED"
                      ? "bg-green-100 text-green-700"
                      : order.status === "CANCELLED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="border-t pt-3 flex justify-between items-start text-sm">
                <div className="space-y-1">
                  {order.items.slice(0, 3).map((item) => (
                    <p key={item.itemId} className="text-gray-700">
                      {item.title} × {item.quantity}
                    </p>
                  ))}
                  {order.items.length > 3 && (
                    <p className="text-xs text-gray-500">
                      + {order.items.length - 3} more items
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    ₹{order.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Payment: {order.paymentMethod.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;

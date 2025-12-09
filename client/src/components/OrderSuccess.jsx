// src/pages/OrderSuccess.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, itemsCount } = location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-3xl">✅</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Order placed successfully!</h1>
        <p className="text-gray-600 mb-4">
          Thank you for shopping. Your order of {itemsCount || 0} item(s) will
          be processed soon.
        </p>
        {amount !== undefined && (
          <p className="text-lg font-semibold mb-4">
            Total paid: ₹{amount.toLocaleString()}
          </p>
        )}
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all"
        >
          Go to Home →
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;

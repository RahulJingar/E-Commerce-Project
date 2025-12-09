// src/components/Navbar.jsx
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartItemCount } from "../features/cartSlice";
import { selectOrders } from "../features/ordersSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartItemCount);
  const orders = useSelector(selectOrders);

  // total orders & last order status (optional display)
  const totalOrders = orders.length;
  const lastOrderStatus = totalOrders ? orders[totalOrders - 1].status : null;

  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-orange-500 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          MyStore
        </div>

        <div className="flex items-center gap-4">
          {/* Orders button */}
          <button
            onClick={() => navigate("/orders")}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all text-sm"
          >
            <span className="font-semibold text-gray-800">Orders</span>
            {totalOrders > 0 && (
              <span className="text-xs text-gray-500">
                ({totalOrders})
              </span>
            )}
          </button>

          {/* Cart button */}
          <button
            onClick={() => navigate("/cart")}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all"
          >
            <span className="text-sm font-semibold text-gray-800">Cart</span>
            <span className="text-xl">🛒</span>

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

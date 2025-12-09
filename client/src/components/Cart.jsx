// src/pages/Cart.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  updateCartQuantity,
  selectCartItems,
} from "../features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);

  const getTotalAmount = () =>
    cartItems.reduce(
      (total, item) => total + item.discountPrice * item.quantity,
      0
    );

  const handleQuantityChange = (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartQuantity({ cartItemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (cartItemId) => {
    dispatch(removeFromCart(cartItemId));
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all"
          >
            Continue Shopping →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
              <p className="text-gray-500 mt-1">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-orange-500 font-semibold hover:text-orange-600"
            >
              ← Continue Shopping
            </button>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-6 mb-8">
            {cartItems.map((item) => (
              <div
                key={item.itemId}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <img
                      src={item.images}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {item.productName} • {item.brand}
                    </p>

                    <div className="flex items-baseline space-x-2 mb-4">
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{item.discountPrice.toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ₹{item.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 mb-4">
                      <label className="text-sm font-medium text-gray-700">
                        Qty:
                      </label>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.itemId, item.quantity - 1)
                          }
                          className="w-10 h-10 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center text-lg font-bold hover:bg-gray-200 transition-all disabled:opacity-50"
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <span className="w-12 text-center text-lg font-semibold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.itemId, item.quantity + 1)
                          }
                          className="w-10 h-10 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center text-lg font-bold hover:bg-gray-200 transition-all"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        ₹{(item.discountPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.itemId)}
                      className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span>Total Items:</span>
                  <span>
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Amount:</span>
                  <span className="font-bold text-gray-900">
                    ₹{getTotalAmount().toLocaleString()}
                  </span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total Amount</span>
                    <span>₹{getTotalAmount().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* ✅ Checkout navigation */}
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-orange-500 border border-orange-500 text-white py-4 px-6 rounded-xl text-lg font-bold hover:bg-orange-600 hover:border-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all shadow-lg hover:shadow-xl mb-4"
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

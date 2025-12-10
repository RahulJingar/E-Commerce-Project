import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "../features/cartSlice";
import { addOrder } from "../features/ordersSlice";
import Navbar from "./Navbar";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    line1: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!(address.fullName && address.phone && address.pincode && address.line1)) {
      alert("Please fill address details.");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty.");
      navigate("/cart");
      return;
    }

    setPlacing(true);

    setTimeout(() => {
      dispatch(
        addOrder({
          items: cartItems,
          amount: cartTotal,
          address,
          paymentMethod,
        })
      );

      dispatch(clearCart());

      setPlacing(false);

      navigate("/orders");
    }, 800);
  };


  return (
 <div>
  <Navbar/>
     <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
            <div className="space-y-3">
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Full Name"
                value={address.fullName}
                onChange={(e) =>
                  setAddress({ ...address, fullName: e.target.value })
                }
              />
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Mobile Number"
                value={address.phone}
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
              />
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) =>
                  setAddress({ ...address, pincode: e.target.value })
                }
              />
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="House no, Street"
                value={address.line1}
                onChange={(e) =>
                  setAddress({ ...address, line1: e.target.value })
                }
              />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                />
                UPI
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                Card
              </label>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-all disabled:opacity-60"
            >
              {placing ? "Placing order..." : "Place your order"}
            </button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span>Items ({cartItems.length})</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="pt-3 border-t flex justify-between font-bold">
                <span>Order Total</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-1 max-h-60 overflow-y-auto text-xs">
              {cartItems.map((item) => (
                <div key={item.itemId} className="flex justify-between">
                  <span className="w-40 line-clamp-1">
                    {item.title} × {item.quantity}
                  </span>
                  <span>
                    ₹{(item.discountPrice * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
 </div>
  );
};

export default Checkout;

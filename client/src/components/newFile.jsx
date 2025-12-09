import React from "react";
import { handleBuyNow } from "./ItemDetail";

return (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-white border-b">
      <nav className="flex items-center space-x-2 text-sm text-gray-500">
        <a href="/dashboard" className="hover:text-orange-500 font-medium">
          Home
        </a>
        <span className="mx-2">/</span>
        <a
          href={`/dashboard/${productId}`}
          className="hover:text-orange-500 font-medium"
        >
          {product.name}
        </a>
        <span className="mx-2">/</span>
        <span className="font-semibold text-gray-900">
          {item.title.replace(/\n/g, "").trim()}
        </span>
      </nav>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        {/* LEFT - Images (Flipkart Style) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Image */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            <img
              src={item.images[currentImage] || item.images[0]}
              alt={item.title}
              className="w-full h-[500px] object-contain p-6"
            />
          </div>

          {/* Thumbnail Images */}
          {item.images && item.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3 p-2 bg-white border border-gray-200 rounded-xl">
              {item.images.slice(0, 4).map((img, idx) => (
                <div
                  key={idx}
                  className={`border-2 rounded-lg overflow-hidden cursor-pointer p-2 hover:border-orange-500 transition-all hover:shadow-md ${
                    currentImage === idx
                      ? "border-orange-500 ring-4 ring-orange-100 shadow-orange-200"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  onClick={() => setCurrentImage(idx)}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-20 object-cover rounded"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT - Details (Flipkart Style) */}
        <div className="lg:col-span-5 space-y-6 mt-8 lg:mt-0">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight line-clamp-2">
            {item.title.replace(/\n/g, "").trim()}
          </h1>

          {/* Brand & Rating */}
          <div className="flex items-start space-x-4 py-2">
            <span className="text-xl text-gray-900 font-bold bg-gray-100 px-3 py-1 rounded-full">
              {item.brand}
            </span>
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(item.rating)
                        ? "fill-current"
                        : "text-gray-300 fill-current"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-1.512a1 1 0 00-1.175 0l-2.8 1.512c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {item.rating} ★ ({item.reviews.toLocaleString()} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm">
            <div className="space-y-3">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-extrabold text-gray-900">
                  ₹{item.discountPrice.toLocaleString()}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ₹{item.price.toLocaleString()}
                </span>
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {discountPercentage}% OFF
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-green-600 font-semibold">
                  In Stock:{" "}
                  <span className="font-bold text-lg">{item.stock}</span> left
                </span>
                <span className="text-gray-500">• Free Delivery</span>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Quantity
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-14 h-14 bg-gray-100 border-2 border-gray-300 rounded-xl flex items-center justify-center text-2xl font-bold hover:bg-gray-200 transition-all disabled:opacity-50"
                disabled={quantity === 1}
              >
                -
              </button>
              <span className="w-20 text-center text-2xl font-bold text-gray-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(item.stock, quantity + 1))}
                className="w-14 h-14 bg-gray-100 border-2 border-gray-300 rounded-xl flex items-center justify-center text-2xl font-bold hover:bg-gray-200 transition-all disabled:opacity-50"
                disabled={quantity === item.stock}
              >
                +
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <span className="text-xl font-bold text-gray-900">
                Total: ₹{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleBuyNow}
              className="w-full bg-orange-500 border border-orange-500 text-white py-4 px-8 rounded-xl text-xl font-bold hover:bg-orange-600 hover:border-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all shadow-lg hover:shadow-xl"
            >
              🛒 Buy Now
            </button>
          </div>

          {/* Seller Info */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-2xl border border-orange-100">
            <h3 className="font-bold text-xl mb-3 flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
              Sold by
            </h3>
            <p className="text-lg text-gray-900 font-semibold">
              {product.owner.name}
            </p>
            <p className="text-sm text-gray-600 mt-1 flex items-center">
              ✅ Fulfilled by Seller • 7 Day Replacement
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

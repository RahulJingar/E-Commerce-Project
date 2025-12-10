import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { selectAllProducts } from "../features/productsSlice";
import Navbar from "./Navbar";

const ViewData = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const products = useSelector(selectAllProducts);

  const index = Number(productId);
  const product = products[index];

  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("none"); 

  let itemsToShow = product.items;

  if (searchText) {
    const text = searchText.toLowerCase();
    itemsToShow = itemsToShow.filter((item) => item.title.toLowerCase().includes(text));
  }

  if (sortType === "priceLow") {
    itemsToShow = [...itemsToShow].sort((a, b) => a.price - b.price);
  }
  if (sortType === "priceHigh") {
    itemsToShow = [...itemsToShow].sort((a, b) => b.price - a.price);
  }
  if (sortType === "titleAZ") {
    itemsToShow = [...itemsToShow].sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
   <div>
    <Navbar/>
     <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-indigo-600 hover:text-indigo-800 font-semibold mr-6 text-lg flex items-center gap-2"
        >
          ← Back to Dashboard
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-600 mt-1">Owner: {product.owner.name}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Items Available</h2>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <input
              type="text"
              placeholder="Search items..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full sm:w-56 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />

            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="w-full sm:w-44 px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="none">Sort: Default</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="titleAZ">Title: A to Z</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {itemsToShow.map((item) => (
            <div
              key={item.itemId}
              onClick={() => navigate(`/dashboard/${productId}/${item.itemId}`)}
              className="cursor-pointer group border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:-translate-y-2 hover:border-indigo-400 transition-all duration-300 overflow-hidden bg-white hover:bg-indigo-50"
            >
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={item.images}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

              <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                {item.title}
              </h3>

              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-indigo-600">
                  ₹{item.price}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-green-600 font-semibold">
                  Stock: {item.stock}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
   </div>
  );
};

export default ViewData;

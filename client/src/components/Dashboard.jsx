// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts, selectAllProducts } from "../features/productsSlice";
import {
  selectProduct,
  addToCart,
  selectSelectedProduct,
} from "../features/cartSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectAllProducts);
  const selectedProduct = useSelector(selectSelectedProduct);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const filtered = items.filter((prod) =>
      prod.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [items, searchTerm]);

  const handleProductClick = (prod, index) => {
    dispatch(selectProduct(prod));
    navigate(`/dashboard/${index}`);
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Products
        </h1>
        <button
          onClick={logoutHandler}
          className="px-6 py-3 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition-all duration-200 font-medium"
        >
          Logout
        </button>
      </div>

      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-lg"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((prod, index) => (
          <div
            key={index}
            onClick={() => handleProductClick(prod, index)}
            className="border rounded-sm p-5"
          >
            <img
              src={prod.image}
              alt="product"
              className="w-full h-48 object-cover rounded-xl mb-4 shadow-md"
            />
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              {prod.name}
            </h3>
            <p className="text-lg font-semibold text-gray-700">
              {`Items: ${prod.items.length}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

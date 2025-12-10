import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts, selectAllProducts } from "../features/productsSlice";
import {
  selectProduct,
  addToCart,
  selectSelectedProduct,
} from "../features/cartSlice";
import Navbar from "./Navbar";

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
    const filtered = items.filter((prod) => {
      return prod.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredItems(filtered);
  }, [items, searchTerm]);

  const handleProductClick = (prod, index) => {
    dispatch(selectProduct(prod));
    navigate(`/dashboard/${index}`);
  };

  return (

 <div>
  <Navbar/>
     <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Products
        </h1>
      </div>

      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
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
 </div>
  );
};

export default Dashboard;

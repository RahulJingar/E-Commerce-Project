// 1. App.jsx - Updated routing
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ViewData from "./components/ViewData";
import ItemDetail from "./components/ItemDetail";
import Cart from "./components/Cart";
import OrderSuccess from "./components/OrderSuccess";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";
import ProtectedRoute from "./components/ProtectedRoute";
import Forget from "./components/Forget";
import Reset from "./components/Reset";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/reset" element={<Reset />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/:productId"
            element={
              <ProtectedRoute>
                <ViewData />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/:productId/:itemId"
            element={
              <ProtectedRoute>
                <ItemDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

// 1. App.jsx - Updated routing
import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ViewData from './components/ViewData';
import ItemDetail from './components/ItemDetail';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import OrderSuccess from './components/OrderSuccess';
import Checkout from './components/Checkout';
import Orders from './components/Orders';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/dashboard/:productId" element={<ViewData/>}/>
          <Route path="/dashboard/:productId/:itemId" element={<ItemDetail/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/order-success" element={<OrderSuccess/>} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

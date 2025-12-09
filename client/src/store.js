// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/productsSlice";
import cartReducer from "./features/cartSlice";
import ordersReducer from "./features/ordersSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
        orders: ordersReducer,
  },
});

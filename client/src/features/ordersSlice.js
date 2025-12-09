// src/features/ordersSlice.js
import { createSlice, nanoid } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    list: [], // saare orders
  },
  reducers: {
    addOrder: {
      reducer: (state, action) => {
        state.list.push(action.payload);
      },
      prepare: ({ items, amount, address, paymentMethod }) => ({
        payload: {
          id: nanoid(),                // order id
          items,                       // cart items ka snapshot
          amount,                      // total amount
          address,                     // delivery address
          paymentMethod,               // cod / upi / card
          status: "PLACED",           // PLACED | SHIPPED | DELIVERED | CANCELLED
          createdAt: new Date().toISOString(),
        },
      }),
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.list.find((o) => o.id === orderId);
      if (order) {
        order.status = status;
      }
    },
  },
});

export const { addOrder, updateOrderStatus } = ordersSlice.actions;

export const selectOrders = (state) => state.orders.list;

export default ordersSlice.reducer;

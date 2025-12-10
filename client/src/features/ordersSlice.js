import { createSlice, nanoid } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    list: [], 
  },
  reducers: {
    addOrder: {
      reducer: (state, action) => {
        state.list.push(action.payload);
      },
      prepare: ({ items, amount, address, paymentMethod }) => ({
        payload: {
          id: nanoid(),                
          items,                      
          amount,                      
          address,                     
          paymentMethod,               
          status: "PLACED",          
          createdAt: new Date().toLocaleDateString(),
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

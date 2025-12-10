import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    selectedProduct: null,
    cartItems: [],
  },
  reducers: {
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },

    addToCart: (state, action) => {
      const { itemId, quantity = 1 } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.itemId === itemId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ ...action.payload, quantity });
      }
    },

    removeFromCart: (state, action) => {
      const cartItemId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.itemId !== cartItemId
      );
    },

    updateCartQuantity: (state, action) => {
      const { cartItemId, quantity } = action.payload;
      const item = state.cartItems.find(
        (it) => it.itemId === cartItemId
      );
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.selectedProduct = null;
    },
  },
});

export const {
  selectProduct,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectSelectedProduct = (state) => state.cart.selectedProduct;

export const selectCartTotal = (state) =>
  state.cart.cartItems.reduce(
    (total, item) => total + item.discountPrice * item.quantity,
    0
  );

export const selectCartItemCount = (state) =>
  state.cart.cartItems.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;

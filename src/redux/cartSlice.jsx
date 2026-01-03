import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) ?? [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ Add to cart (if exists -> +1, else add with quantity 1)
    addToCart(state, action) {
      const found = state.find((i) => i.id === action.payload.id);

      if (found) {
        found.quantity += 1;
      } else {
        state.push({
          ...action.payload,
          quantity: 1, // ✅ always 1 when adding first time
        });
      }
    },

    deleteFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },

    incrementQuantity(state, action) {
      const item = state.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },

    decrememntQuantity(state, action) {
      const item = state.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    clearCart() {
      return [];
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  incrementQuantity,
  decrememntQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

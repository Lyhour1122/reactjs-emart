import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // adjust path

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

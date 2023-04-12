import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
  },
});

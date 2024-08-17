import { configureStore } from "@reduxjs/toolkit";

import categoriesSlice from "./categories/categoriesSlice.js";
import productsSlice from "./products/productsSlice.js";

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    products: productsSlice,
  },
  devTools: true,
});

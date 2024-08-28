import { configureStore } from "@reduxjs/toolkit";

import categoriesSlice from "./categories/categoriesSlice.js";
import productsSlice from "./products/productsSlice.js";

import { apiSlice } from "../../api/apiSlice.js"; //для використання редьюсера apiSlice

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    products: productsSlice,
    [apiSlice.reducerPath]: apiSlice.reducer, //динамічний шлях
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

import { configureStore } from "@reduxjs/toolkit";

import categoriesSlice from "./categories/categoriesSlice.js";

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
  },
  devTools: true,
});

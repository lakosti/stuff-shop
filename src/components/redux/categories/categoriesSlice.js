import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { BASE_URL } from "../../../utils/constants.js";

import axios from "axios";

// STATE -- СХОВИЩЕ
const initialState = {
  list: [],
  isLoading: false,
};

//slice -- УПРАВЛІННЯ СХОВИЩЕМ
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.list = action.payload; //записуємо в categoriesList дані з акшену (асинхрон функції) // результат роботи функції
      state.isLoading = false;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

//async fn -- ЗАПИТ ДО БАЗИ
export const getCategories = createAsyncThunk("categories/getCategories", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${BASE_URL}/categories`);
    return res.data.slice(0, 5); //повертаємо перші 5 категорій
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export default categoriesSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { BASE_URL } from "../../../utils/constants.js";

import axios from "axios";

// STATE -- СХОВИЩЕ
const initialState = {
  list: [],
  isLoading: false,
  currentCategory: [],
};

//slice -- УПРАВЛІННЯ СХОВИЩЕМ
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.list = payload; //записуємо в categoriesList дані з акшену (асинхрон функції) // результат роботи функції
      // state.currentCategory = state.currentCategory.filter(
      //   ({ id }) => id === payload
      // );
      // state.currentCategory.push(payload);
      state.isLoading = false;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

//async fn -- ЗАПИТ ДО БАЗИ
export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/categories`);
      return res.data.slice(0, 5); //повертаємо перші 5 категорій
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getCategoriesById = createAsyncThunk(
  "category/getCategory",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/categories/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export default categoriesSlice.reducer;

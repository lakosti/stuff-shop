import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { BASE_URL } from "../../../utils/constants.js";
import { shuffle } from "../../../utils/common.js";

import axios from "axios";

// state -- СХОВИЩЕ
const initialState = {
  list: [],
  filtered: [],
  related: [], //рекомендовані
  isLoading: false,
};

//slice -- УПРАВЛІННЯ СХОВИЩЕМ
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filteredByPrice: (state, { payload }) => {
      //фільтруємо уже наявні в нас продукти і отримуємо ціну менше 100
      state.filtered = state.list.filter(({ price }) => price < payload); // у payload будемо класти ціну
    },
    getRelatedProducts: (state, { payload }) => {
      const list = state.list.filter(({ category: { id } }) => id === payload); //витягуємо id з category
      //в payload ми сам кладемо дані -  і це буде id
      state.related = shuffle(list);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.list = action.payload; //записуємо в list дані з акшену
      state.isLoading = false;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

//async fn -- ЗАПИТ ДО БАЗИ
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/products`);

      //фільтруємо щоб отримувати вірний шлях до картинок бо кривий бек
      const filteredData = res.data.filter((item) => item.images.length === 3);
      return filteredData;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/products/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const { filteredByPrice, getRelatedProducts } = productsSlice.actions;

export default productsSlice.reducer;

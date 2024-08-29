import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { BASE_URL } from "../../../utils/constants.js";

import axios from "axios";

// STATE -- СХОВИЩЕ
const initialState = {
  currentUser: [],
  cart: [],
  isLoading: false,
};

//slice -- УПРАВЛІННЯ СХОВИЩЕМ
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      //розпилюємо щоб не переписати корзину якщо додамо ще елемент
      let newCart = [...state.cart];

      //шукаємо елемент по айді
      const found = state.cart.find(({ id }) => id === payload.id);

      //якщо такий елемент є то додаємо його з актуальним quantity
      if (found) {
        newCart = newCart.map((item) => {
          return item.id === payload.id
            ? {
                ...item,
                quantity: payload.quantity || item.quantity + 1,
              }
            : item;
        }); //якщо такого елементу немає то додаємо його в корзину і додаємо quantity яке = 1
      } else newCart.push({ ...payload, quantity: 1 });

      //і перезиписуємо корзину
      state.cart = newCart;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(getCategories.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(getCategories.fulfilled, (state, action) => {
    //   state.list = action.payload; //записуємо в categoriesList дані з акшену (асинхрон функції) // результат роботи функції
    //   state.isLoading = false;
    // });
    // builder.addCase(getCategories.rejected, (state) => {
    //   state.isLoading = false;
    // });
  },
});

//async fn -- ЗАПИТ ДО БАЗИ

// export const getCategories = createAsyncThunk(
//   "categories/getCategories",
//   async (_, thunkAPI) => {
//     try {
//       const res = await axios.get(`${BASE_URL}/categories`);
//       return res.data.slice(0, 5); //повертаємо перші 5 категорій
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export default userSlice.reducer;

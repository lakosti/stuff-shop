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
      // Розпилюємо існуючий масив 'cart', щоб створити новий масив 'newCart'
      // Це робиться для того, щоб уникнути мутації оригінального масиву та створити новий, з яким будемо працювати
      let newCart = [...state.cart];

      // Шукаємо в 'cart' елемент, у якого 'id' збігається з 'id', що передається у 'payload'
      const found = state.cart.find(({ id }) => id === payload.id);

      // Якщо елемент знайдений (тобто 'found' не є undefined):
      if (found) {
        // Створюємо новий масив 'newCart', де перевіряємо кожен елемент масиву:
        // Якщо 'id' збігається з 'id' із 'payload', то оновлюємо цей елемент:
        // Розпилюємо існуючий елемент і оновлюємо його 'quantity':
        // - Якщо 'quantity' є в 'payload', то беремо його
        // - Інакше додаємо одиницю до існуючого 'quantity'
        newCart = newCart.map((item) => {
          return item.id === payload.id
            ? {
                ...item,
                quantity: payload.quantity || item.quantity + 1,
              }
            : item;
        });
      } else {
        // Якщо елемент не знайдено:
        // Додаємо новий елемент до 'newCart', розпилюючи 'payload'
        // та додаючи 'quantity' зі значенням 1
        newCart.push({ ...payload, quantity: 1 });
      }

      // Оновлюємо стан 'cart' з новим значенням 'newCart'
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

export const { addToCart } = userSlice.actions; //власний редюсер

export default userSlice.reducer;

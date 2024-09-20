import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { BASE_URL } from "../../../utils/constants.js";

import axios from "axios";

// STATE -- СХОВИЩЕ
const initialState = {
  currentUser: {},
  cart: [],
  favourites: [],
  isLoading: false,
  formType: "register",
  showForm: false,
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
                size: payload.size || item.size, // Оновлюємо розмір
              }
            : item;
        });
      } else {
        // Якщо елемент не знайдено:
        // Додаємо новий елемент до 'newCart', розпилюючи 'payload'
        // та додаючи 'quantity' зі значенням 1 як початкове значення
        // newCart.push({ payload, quantity: 1 }); // буде додаватись кожен раз коли змінюється кількість
        newCart.push({ ...payload, quantity: 1 });
      }

      // Оновлюємо стан 'cart' з новим значенням 'newCart'
      state.cart = newCart;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.currentUser = action.payload; //дані юзера при реєстрації будуть в payload
      state.isLoading = false;
    });
  },
});

//async fn -- ЗАПИТ ДО БАЗИ

export const register = createAsyncThunk(
  "users/createUser",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/users`, body); //body -- тіло запиту
      return res.data; //повертаємо перші 5 категорій
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const { addToCart } = userSlice.actions; //власний редюсер

export default userSlice.reducer;

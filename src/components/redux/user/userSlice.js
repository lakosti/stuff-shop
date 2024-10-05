import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { BASE_URL } from "../../../utils/constants.js";

import axios from "axios";

// STATE -- СХОВИЩЕ
const initialState = {
  currentUser: null,
  cart: [],
  favourites: [],
  isLoading: false,
  formType: "register",
  showModal: false,
};

//*common fn
const currentUser = (state, { payload }) => {
  state.currentUser = payload; //payload -  дані конкретного юзера
  state.isLoading = false;
};

//slice -- УПРАВЛІННЯ СХОВИЩЕМ
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleForm: (state, { payload }) => {
      state.showModal = payload; //payload - ті дані які ми самі передаємо
    },
    toggleFormType: (state, { payload }) => {
      state.formType = payload;
    },
    addToFavourites: (state, { payload }) => {
      //*створюємо копію щоб не мутувати ориг стейт (і не перезаписувати кожного разу значення)

      let favList = [...state.favourites];

      const item = favList.find(({ id }) => id === payload.id);

      if (!item) {
        favList.push(payload);
      }

      state.favourites = favList;
    },
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
    builder.addCase(register.fulfilled, currentUser);
    builder.addCase(login.fulfilled, currentUser);
  },
});

//async fn -- ЗАПИТ ДО БАЗИ

export const register = createAsyncThunk(
  "users/createUser",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/users`, body); //body -- тіло запиту
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "users/loginUser",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, body); //auth/login -- адреса бекенду на яку потрібно посилатися при логіні

      // якщо немає токена, викидати помилку
      if (!res.access_token) {
        throw new Error("Invalid credentials");
      }

      //*нам певертається access/refresh token, які нам потрібно в гет запросі передати в хедерах на адресу реєстрації

      const token = await axios.get(`${BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer${res.access_token}` },
      });

      return token.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const { addToCart, addToFavourites, toggleForm, toggleFormType } =
  userSlice.actions; //власний редюсер

export default userSlice.reducer;

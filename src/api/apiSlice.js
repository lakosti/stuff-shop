import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

import { BASE_URL } from "../utils/constants.js";
import { buildUrl } from "../utils/common.js";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ id }) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    getProducts: builder.query({
      query: (params) => buildUrl("/products", params),
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProduct, useGetProductsQuery } = apiSlice;

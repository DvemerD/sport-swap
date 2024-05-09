import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "product",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
  }),
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (payload) => ({
        url: "products/",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateProductMutation } = productApi;

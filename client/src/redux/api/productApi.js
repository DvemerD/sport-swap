import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "product",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
  }),
  tagTypes: ["Products", "Category", "Location"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (search) => ({
        url: "products/",
        params: { search },
      }),
    }),
    createProduct: builder.mutation({
      query: (payload) => ({
        url: "products/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Products"],
    }),
    getCategory: builder.query({
      query: () => "get_category/",
      providesTags: ["Category"],
    }),
    getLocation: builder.query({
      query: () => "get_city/",
      providesTags: ["Location"],
    }),
    getUser: builder.query({
      query: () => "current_user/",
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  // useGetSearchProductsMutation,
  useGetCategoryQuery,
  useGetLocationQuery,
  useGetUserQuery,
} = productApi;

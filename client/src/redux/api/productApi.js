import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "product",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
  }),
  tagTypes: ["Products", "Category", "Location"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ search, filter }) => ({
        url: "products/",
        params: { search, category__category_name: filter },
      }),
    }),
    getCategory: builder.query({
      query: () => "get_category/",
      providesTags: ["Category"],
    }),
    getLocation: builder.query({
      query: () => "get_city/",
      providesTags: ["Location"],
    }),
  }),
});

export const { useGetProductsQuery, useGetCategoryQuery, useGetLocationQuery } =
  productApi;

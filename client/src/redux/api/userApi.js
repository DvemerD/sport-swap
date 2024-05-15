import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./query/baseQuery";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: baseQueryWithReauth(import.meta.env.VITE_SERVER_URL),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "current_user/",
    }),
    createProduct: builder.mutation({
      query: (payload) => ({
        url: "products/",
        method: "POST",
        body: payload,
      }),
      // invalidatesTags: ["Products"],
    }),
  }),
});

export const { useGetUserQuery, useCreateProductMutation } = userApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./query/baseQuery";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: baseQueryWithReauth(process.env.VITE_SERVER_URL),
  tagTypes: ["Products"],
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
      invalidatesTags: ["Products"],
    }),
    getUserProducts: builder.query({
      query: () => "get_user_products/",
      providesTags: ["Products"],
    }),
    getUserChat: builder.query({
      query: () => "get_user_chat/",
    }),
    getChat: builder.mutation({
      query: (payload) => ({
        url: "get_room/",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useCreateProductMutation,
  useGetUserProductsQuery,
  useGetUserChatQuery,
  useGetChatMutation,
} = userApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./query/baseQuery";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: baseQueryWithReauth(process.env.VITE_SERVER_URL),
  tagTypes: ["Products", "User", "Chat"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "current_user/",
      providesTags: ["User"],
    }),
    changeUserInfo: builder.mutation({
      query: (payload) => ({
        url: "current_user/",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    createProduct: builder.mutation({
      query: (payload) => ({
        url: "products/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products", "Chat"],
    }),
    putProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `products/${id}/`,
        method: "PUT",
        body: data,
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
      providesTags: ["Chat"],
    }),
    createOrder: builder.mutation({
      query: (payload) => ({
        url: "order/",
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
  useChangeUserInfoMutation,
  useCreateOrderMutation,
  useDeleteProductMutation,
  usePutProductMutation,
} = userApi;

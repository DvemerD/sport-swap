import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";
import header from "./slices/headerSlice";
import products from "./slices/productsSlice";
import { authApi } from "./api/authApi";
import { productApi } from "./api/productApi";

export const store = configureStore({
  reducer: {
    auth,
    header,
    products,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ...[authApi.middleware, productApi.middleware]
    ),
  devTools: import.meta.env.VITE_DEV_MODE !== "production",
});

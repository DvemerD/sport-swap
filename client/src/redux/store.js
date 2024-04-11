import { configureStore } from "@reduxjs/toolkit";
import auth from "./slice/authSlice";
import { authApi } from "./api/authApi";

export const store = configureStore({
  reducer: {
    auth,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...[authApi.middleware]),
  devTools: import.meta.env.VITE_DEV_MODE !== "production",
});

import { createSlice } from "@reduxjs/toolkit";

const session = JSON.parse(localStorage.getItem("session"));

const initialState = session || {
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("session", JSON.stringify(action.payload));
    },
    removeSession: (state) => {
      state.token = null;
      localStorage.removeItem("session");
    },
  },
});

export const { setSession, removeSession } = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const headerSlice = createSlice({
  name: "header",
  initialState: {
    hideHeader: false,
  },
  reducers: {
    setHideHeader(state, action) {
      state.hideHeader = action.payload;
    },
  },
});

export const { setHideHeader } = headerSlice.actions;
export default headerSlice.reducer;

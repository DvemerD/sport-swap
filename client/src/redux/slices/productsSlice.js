import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "searchResults",
  initialState: {
    products: {
      results: [],
    },
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;

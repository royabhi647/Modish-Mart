import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      // console.log("state", action);
      state.productList = action.payload;
      // console.log("state.productList", state.productList);
    },
  },
});

export const { setDataProduct } = productSlice.actions;
export default productSlice.reducer;

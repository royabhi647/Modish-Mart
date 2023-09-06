import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  cartItems: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      // console.log("state", action);
      state.productList = action.payload;
    },
    addCartItem: (state, action) => {
      // console.log("state", action.payload);
      const total = action.payload.price;
      state.cartItems = [
        ...state.cartItems,
        { ...action.payload, qty: 1, total: total },
      ];
    },
    deleteCartItem: (state, action) => {},
  },
});

export const { setDataProduct, addCartItem, deleteCartItem } =
  productSlice.actions;
export default productSlice.reducer;

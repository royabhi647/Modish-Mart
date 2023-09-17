import { toast } from "react-hot-toast";

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
      const ifItemExist = state.cartItems.some(
        (el) => el._id === action.payload._id
      );
      if (ifItemExist) {
        toast("Already this Item have added in Cart");
      } else {
        const total = action.payload.price;
        state.cartItems = [
          ...state.cartItems,
          { ...action.payload, qty: 1, total: total },
        ];
        toast("Item added successfully in Cart");
      }
    },
    deleteCartItem: (state, action) => {
      const { id, name } = action.payload;
      // console.log("state", id, name);
      toast(name + " item is deleted from cart");
      const filteredDeletedItems = state.cartItems.filter(
        (el) => el._id !== id
      );
      state.cartItems = filteredDeletedItems;

      // const index = state.cartItems.findIndex((el) => el._id === id);
      // state.cartItems.splice(index, 1);
    },
    increaseQty: (state, action) => {
      const index = state.cartItems.findIndex(
        (el) => el._id === action.payload
      );
      let qty = state.cartItems[index].qty;
      const qtyIncrease = ++qty;
      state.cartItems[index].qty = qtyIncrease;

      const price = state.cartItems[index].price;
      const total = price * qtyIncrease;
      state.cartItems[index].total = total;
    },
    decreaseQty: (state, action) => {
      const index = state.cartItems.findIndex(
        (el) => el._id === action.payload
      );
      let qty = state.cartItems[index].qty;
      if (qty > 1) {
        const qtyDecrease = --qty;
        state.cartItems[index].qty = qtyDecrease;

        const price = state.cartItems[index].price;
        const total = price * qtyDecrease;
        state.cartItems[index].total = total;
      }
    },
  },
});

export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
} = productSlice.actions;
export default productSlice.reducer;

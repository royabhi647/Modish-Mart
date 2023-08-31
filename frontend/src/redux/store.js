import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Features/UserSlice";
import ProductSlice from "./Features/ProductSlice";

const store = configureStore({
  reducer: {
    userSlice: UserSlice,
    productSlice: ProductSlice,
  },
});

export default store;

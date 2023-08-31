import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      // console.log(action.payload);
      state.currentUser = action.payload;
    },
    logoutRedux: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;
export default userSlice.reducer;

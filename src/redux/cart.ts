import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  number: 0,
};

export const authSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleCart: (state, action) => {
      if (action.payload) {
        state.number = action.payload;
      }
    },
  },
});

export const { handleCart } = authSlice.actions;

export default authSlice.reducer;

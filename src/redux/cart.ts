import { createSlice } from "@reduxjs/toolkit";

interface ICartState {
  productLength: string[];
}

const initialState: ICartState = {
  productLength: [],
};

export const authSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.productLength = action.payload;
    },
    addCart: (state, action: { payload: string }) => {
      if (action.payload) {
        state.productLength = [...state.productLength, action.payload];
      }
    },
    removeCart: (state, action: { payload: string }) => {
      if (action.payload) {
        state.productLength = state.productLength.filter(
          (product) => product !== action.payload
        );
      }
    },
    deleteAllCart: (state) => {
      state.productLength = [];
    },
  },
});

export const { addCart, removeCart, setCart, deleteAllCart } = authSlice.actions;

export default authSlice.reducer;

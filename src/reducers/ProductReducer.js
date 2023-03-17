import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  productList: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    saveProduct: (state = initialState, param) => {
      const { payload } = param;
      payload.id = state.productList.length + 1;
      state.productList = [...state.productList, payload];
      return state;
    },
    updateProduct: (state = initialState, param) => {
      const { payload } = param;
      const idx = state.productList.findIndex((x) => +x.id === +payload.id);
      state.productList[idx] = payload;
      state.productList = [...state.productList];
      return state;
    },
    removeProduct: (state = initialState, param) => {
      const { payload } = param;
      const ul = state.productList.filter((itm) => itm.id !== payload);
      state.productList = [...ul];
      return state;
    },
  },
});

export const { updateProduct, saveProduct, removeProduct } = productSlice.actions;
export default productSlice;

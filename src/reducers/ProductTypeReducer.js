import { createSlice } from "@reduxjs/toolkit";
const initialState = { productTypeList: [] };
const productTypeSlice = createSlice({
  name: "productTypes",
  initialState,
  reducers: {
    saveProductType: (state = initialState, param) => {
      const { payload } = param;
      payload.id = state.productTypeList.length + 1;
      state.productTypeList = [...state.productTypeList, payload];
      return state;
    },
    updateProductType: (state = initialState, param) => {
      const { payload } = param;

      const idx = state.productTypeList.findIndex((x) => {
        console.log(+payload.id, +x.id);
        return +x.id === +payload.id;
      });

      state.productTypeList[idx] = payload;
      state.productTypeList = [...state.productTypeList];
      return state;
    },
    removeProductType: (state = initialState, param) => {
      const { payload } = param;
      const ul = state.productTypeList.filter((itm) => itm.id !== payload);
      state.productTypeList = [...ul];
      return state;
    },
  },
});

export const { saveProductType, updateProductType, removeProductType } = productTypeSlice.actions;
export default productTypeSlice;

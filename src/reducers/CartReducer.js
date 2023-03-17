import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: 0,
  cartItems: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state = initialState, param) => {
      const payload = JSON.parse(JSON.stringify(param.payload));
      const idx = state.cartItems.findIndex((x) => +x.id === +payload.id);
      var _cartItems = state.cartItems;
      if (idx > -1) {
        const qty = _cartItems[idx].quantity;
        payload.quantity += qty;
        _cartItems[idx] = { ...payload };
      } else {
        _cartItems.push({ ...payload });
      }

      state.cartItems = [..._cartItems];
      return state;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice;

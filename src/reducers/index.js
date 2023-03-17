import { combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./CartReducer";
import loginSlice from "./LoginReducer";
import productSlice from "./ProductReducer";
import productTypeSlice from "./ProductTypeReducer";
import userSlice from "./UserReducer";
const appReducer = combineReducers({
  users: userSlice.reducer,
  session: loginSlice.reducer,
  products: productSlice.reducer,
  productTypes: productTypeSlice.reducer,
  cart: cartSlice.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === "SIGNOUT_REQUEST") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
export default rootReducer;

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
  token: "",
  expires: "",
  userName: null,
  features: [],
};
const loginSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    signIn: (state = initialState, param) => {
      const { payload } = param;
      state.isAuthenticated = payload.isAuthenticated;
      state.token = payload.token;
      state.expires = payload.expires;
      state.loggedInUser = payload.loggedInUser;
      state.userName = payload.userName;
      state.features = payload.features;
      return state;
    },
  },
});

export const { signIn } = loginSlice.actions;
export default loginSlice;

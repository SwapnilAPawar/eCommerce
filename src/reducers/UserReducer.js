import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userList: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    saveUser: (state = initialState, param) => {
      const { payload } = param;
      payload.id = state.userList.length + 1;
      state.userList = [...state.userList, payload];
      return state;
    },
    updateUser: (state = initialState, param) => {
      const { payload } = param;
      const idx = state.userList.findIndex((x) => +x.id === +payload.id);
      state.userList[idx] = payload;
      state.userList = [...state.userList];
      return state;
    },
    removeUser: (state = initialState, param) => {
      const { payload } = param;
      const ul = state.userList.filter((itm) => itm.id !== payload);
      state.userList = [...ul];
      return state;
    },
  },
});

export const { updateUser, saveUser, removeUser } = userSlice.actions;
export default userSlice;

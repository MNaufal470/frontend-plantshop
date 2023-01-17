import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logout } from "../actions/userActions";

const userInfoInLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : {};

const userInfo = createSlice({
  name: "user",
  initialState: { user: userInfoInLocalStorage },
  reducers: {
    login(state, action) {
      loginUser(state, action);
    },
    logoutUser(state, action) {
      logout(state, action);
    },
  },
});

export const userAction = userInfo.actions;
export default userInfo.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "Auth",
  initialState: {
    isLogin: !!localStorage.getItem("user") || false,
    userData: JSON.parse(localStorage.getItem("user")) || {},
  },
  reducers: {
    login: (state, actions) => {
      return {
        isLogin: true,
        userData: {
          ...actions.payload,
        },
      };
    },
    logout: (state, actions) => {
      return {
        isLogin: false,
        userData: null,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

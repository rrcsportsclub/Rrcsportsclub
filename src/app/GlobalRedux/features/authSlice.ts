"use client";

import { createSlice } from "@reduxjs/toolkit";

interface loginState {
  isLoggedIn: boolean;
  //   accessToken: null;
  //   refreshToken: null;
}

const initialState: loginState = {
  isLoggedIn: false,
  //   isLoggedIn: sessionStorage.getItem("isLoggedIn") === "true" ? true : false,
  //   accessToken: null,
  //   refreshToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      //   state.accessToken = action.payload.accessToken;
      //   state.refreshToken = action.payload.refreshToken;
    },

    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      //   state.accessToken = null;
      //   state.refreshToken = null;
      // sessionStorage.setItem("isLoggedIn", "false");
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;

// export const getAccessToken = (state) => state.authentication.accessToken;
// export const getRefreshToken = (state) =>
//   state.authentication.refreshTokenToken;

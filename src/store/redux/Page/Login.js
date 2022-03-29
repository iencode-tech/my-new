import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginForm: {
    email: "",
    password: "",
  },
  loading: false,
  isError: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    handleDataChange: (state, action) => {
      state.loginForm[action.payload.key] = action.payload.value;
      return state;
    },
    attempt: (state, action) => {
      state.loading = true;
      state.isError = false;
      return state;
    },
    success: (state, action) => {
      state = initialState;
      return state;
    },
    failed: (state, action) => {
      state.loading = false;
      state.isError = true;
      state.loginForm.password = "";
      return state;
    },
  },
});

export const { handleDataChange, attempt, success, failed } =
  loginSlice.actions;

export const selectLogin = (state) => state.login;

export default loginSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  auth: false,
  userData: {},
};

export const identitySlice = createSlice({
  name: "identity",
  initialState,
  reducers: {
    populate: (state, action) => {
      state = {
        loading: false,
        auth: true,
        userData: action.payload.data,
      };
      return state;
    },
    sync: (state, action) => {
      state.loading = true;
      return state;
    },
    flush: (state, action) => {
      localStorage.removeItem(process.env.REACT_APP_AUTH_KEY_NAME);

      return { ...initialState, loading: false };
    },
  },
});

export const { populate, sync, flush } = identitySlice.actions;

export const selectIdentity = (state) => state.identity;

export default identitySlice.reducer;

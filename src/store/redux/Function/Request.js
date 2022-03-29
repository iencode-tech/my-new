import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: "",
  type: "GET",
  body: {},
  header: {},
};

export const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    getRequest: (state, action) => {
      return state;
    },
    postRequest: (state, action) => {
      return state;
    },
    putRequest: (state, action) => {
      return state;
    },
    deleteRequest: (state, action) => {
      return state;
    },
  },
});

export const { getRequest, postRequest, putRequest, deleteRequest } =
  requestSlice.actions;

export const selectRequest = (state) => state.request;

export default requestSlice.reducer;

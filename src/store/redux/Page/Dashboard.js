import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  head: 0,
  admin: 0,
  collaborator: 0,
  loading: false,
  isError: false,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    attempt: (state, action) => {
      state.loading = true;
      state.isError = false;
      return state;
    },
    success: (state, action) => {
      state = {
        ...initialState,
        ...{
          head: action.payload.data["H"],
          admin: action.payload.data["A"],
          collaborator: action.payload.data["C"],
        },
      };
      return state;
    },
    failed: (state, action) => {
      state.head = 0;
      state.admin = 0;
      state.collaborator = 0;
      state.loading = false;
      state.isError = true;
      return state;
    },
  },
});

export const { attempt, success, failed } = dashboardSlice.actions;

export const selectDashboard = (state) => state.dashboard;

export default dashboardSlice.reducer;

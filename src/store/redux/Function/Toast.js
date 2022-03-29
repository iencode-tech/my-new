import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toastSettings: {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  },
  type: "default",
  message: "",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToastData: (state, action) => {
      state.type = action.payload.type || initialState.type;
      state.message = action.payload.message || initialState.message;
      state.toastSetting = action.payload.toastSettings || initialState.toastSettings;
      return state;
    },
    resetToastData: (state, action) => {
      return initialState;
    },
  },
});

export const { setToastData, resetToastData } =
  toastSlice.actions;

export const selectToast = (state) => state.toast;

export default toastSlice.reducer;

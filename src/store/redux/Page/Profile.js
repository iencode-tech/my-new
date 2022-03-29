import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isError: false,
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    currentPassword: "",
  },
  formValidation: {},
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    initFormData: (state, action) => {
      state.loading = false;
      state.isError = false;
      state.formData = initialState.formData;
      return state;
    },
    handleFormDataChange: (state, action) => {
      state.formData[action.payload.key] = action.payload.value;
      return state;
    },
    handleFormValidation: (state, action) => {
      if (!action.payload.value) {
        let fVal = { ...state.formValidation };
        delete fVal[action.payload.key];
        state.formValidation = fVal;
      } else {
        state.formValidation[action.payload.key] = action.payload.value;
      }
      return state;
    },
    readData: (state, action) => {
      state.loading = true;
      state.isError = false;
      state.formData = initialState.formData;
      return state;
    },
    updateData: (state, action) => {
      state.loading = true;
      state.isError = false;
      return state;
    },
    changePassword: (state, action) => {
      state.loading = true;
      state.isError = false;
      return state;
    },
    success: (state, action) => {
      state.loading = false;
      state.isError = false;
      state.formData = { ...initialState.formData, ...action.payload.data };
      return state;
    },
    failed: (state, action) => {
      state.loading = false;
      state.isError = true;
      return state;
    },
  },
});

export const {
  initFormData,
  handleFormDataChange,
  handleFormValidation,
  readData,
  updateData,
  changePassword,
  success,
  failed,
} = profileSlice.actions;

export const selectProfile = (state) => state.profile;

export default profileSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  loading: false,
  isError: false,
  list: [],
  listCount: 0,
  listFormData: {
    keyword: "",
    page: 1,
  },
  formData: {
    name: "",
    latitude: "",
    longitude: "",
    soils: [],
    status: 1,
  },
  formValidation: {},
  formType: "Create",
};

const soilInitialState = {
  soilType: "",
  date: new Date(),
  ph: "",
  clay: "",
  sand: "",
  calcium: "",
  magnesium: "",
  potassium: "",
  sodium: "",
  aluminum: "",
  silt: "",
  observation: "",
};

export const zoneSlice = createSlice({
  name: "zone",
  initialState,
  reducers: {
    handleListFormDataChange: (state, action) => {
      state.listFormData[action.payload.key] = action.payload.value;
      return state;
    },
    fetchList: (state, action) => {
      state.loading = true;
      state.isError = false;
      state.listFormData.page = action.payload.page || state.listFormData.page;
      return state;
    },
    successList: (state, action) => {
      state.loading = false;
      state.isError = false;
      state.list = action.payload.data.dbData;
      state.listCount = action.payload.data.dbCount;
      return state;
    },
    failedList: (state, action) => {
      state.loading = false;
      state.isError = true;
      state.list = [];
      state.listCount = 0;
      return state;
    },
    initFormData: (state, action) => {
      state.loading = false;
      state.isError = false;
      state.formData = initialState.formData;
      return state;
    },
    addNewSoil: (state, action) => {
      state.formData.soils.push(soilInitialState);
      return state;
    },
    removeSoil: (state, action) => {
      state.formData.soils.splice(action.payload.index, 1);
      return state;
    },
    handleFormDataChange: (state, action) => {
      if (Array.isArray(action.payload.key)) {
        _.set(
          state.formData,
          action.payload.key.join("."),
          action.payload.value
        );
      } else {
        state.formData[action.payload.key] = action.payload.value;
      }
      return state;
    },
    handleFormValidation: (state, action) => {
      if (!action.payload.value) {
        let fVal = {...state.formValidation};
        delete fVal[action.payload.key];
        state.formValidation = fVal;
      } else {
        state.formValidation[action.payload.key] = action.payload.value;
      }
      return state;
    },
    storeData: (state, action) => {
      state.loading = true;
      state.isError = false;
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
    deleteData: (state, action) => {
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
  handleListFormDataChange,
  fetchList,
  successList,
  failedList,
  initFormData,
  handleFormDataChange,
  handleFormValidation,
  addNewSoil,
  removeSoil,
  storeData,
  readData,
  updateData,
  deleteData,
  success,
  failed,
} = zoneSlice.actions;

export const selectZone = (state) => state.zone;

export default zoneSlice.reducer;

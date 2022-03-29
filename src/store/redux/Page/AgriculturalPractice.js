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
  defaultFolialDrenche: {},
  formData: {
    formulationName: "",
    scheduledDate: new Date(),
    daysToDo: "",
    method: 0,
    observations: "",
    rawMaterials: [],
    status: 1,
  },
  formValidation: {},
  formType: "Create",
  rawMaterialsFormData: {
    keyword: "",
    unit: "cc",
    page: 1,
  },
  rawMaterials: [],
};

const rawMaterialInitialState = {
  rawMaterialId: "",
  quantity: "",
  unit: "",
};

export const agriculturalPracticeSlice = createSlice({
  name: "agriculturalPractice",
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
    successDefaultFolialDrenche: (state, action) => {
      state.loading = false;
      state.isError = false;
      state.defaultFolialDrenche = {
        ...initialState.defaultFolialDrenche,
        ...action.payload.data,
      };
      return state;
    },
    failedDefaultFolialDrenche: (state, action) => {
      state.loading = false;
      state.isError = true;
      state.defaultFolialDrenche = initialState.defaultFolialDrenche;
      return state;
    },
    initFormData: (state, action) => {
      state.loading = true;
      state.isError = false;
      state.formData = initialState.formData;
      state.rawMaterialsFormData = initialState.rawMaterialsFormData;
      state.rawMaterials = initialState.rawMaterials;
      return state;
    },
    fetchAllRawMaterials: (state, action) => {
      state.rawMaterialsFormData.keyword = action.payload.keyword;
      return state;
    },
    setAllRawMaterials: (state, action) => {
      state.rawMaterials = action.payload.data.dbData;
      return state;
    },
    addNewRawMaterial: (state, action) => {
      let initMaterial = { ...rawMaterialInitialState };
      initMaterial.rawMaterialId = action.payload.material.id;
      initMaterial.quantity =
        action.payload.quantity || rawMaterialInitialState.quantity;
      initMaterial.unit = action.payload.material.unitMetric;
      initMaterial.rawMaterial = action.payload.material;
      state.formData.rawMaterials.push(initMaterial);
      return state;
    },
    removeRawMaterial: (state, action) => {
      state.formData.rawMaterials.splice(action.payload.index, 1);
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
  successDefaultFolialDrenche,
  failedDefaultFolialDrenche,
  initFormData,
  handleFormDataChange,
  handleFormValidation,
  fetchAllRawMaterials,
  setAllRawMaterials,
  addNewRawMaterial,
  removeRawMaterial,
  storeData,
  readData,
  updateData,
  deleteData,
  success,
  failed,
} = agriculturalPracticeSlice.actions;

export const selectAgriculturalPractice = (state) => state.agriculturalPractice;

export default agriculturalPracticeSlice.reducer;

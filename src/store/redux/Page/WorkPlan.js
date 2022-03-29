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
    collaboratorId: "",
    selectRegion: "Z",
    zoneId: "",
    sectorId: "",
    agriculturalPracticeId: "",
    methodId: 0,
    amountPerTree: 0,
    collaborator: {},
    zone: {},
    sector: {},
    agriculturalPractice: {},
    rawMaterials: [],
    trees: [],
    status: 1,
  },
  formValidation: {},
  formType: "Create",
  collaboratorsFormData: {
    keyword: "",
    page: 1,
  },
  collaborators: [],
  zonesFormData: {
    keyword: "",
    page: 1,
  },
  zones: [],
  sectorsFormData: {
    keyword: "",
    page: 1,
  },
  sectors: [],
  agriculturalPracticesFormData: {
    keyword: "",
    page: 1,
  },
  agriculturalPractices: [],
};

export const workPlanSlice = createSlice({
  name: "workPlan",
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
    fetchAllCollaborators: (state, action) => {
      state.collaboratorsFormData.keyword = action.payload.keyword;
      return state;
    },
    setAllCollaborators: (state, action) => {
      state.collaborators = action.payload.data.dbData;
      return state;
    },
    fetchAllZones: (state, action) => {
      state.zonesFormData.keyword = action.payload.keyword;
      return state;
    },
    setAllZones: (state, action) => {
      state.zones = action.payload.data.dbData;
      return state;
    },
    fetchAllSectors: (state, action) => {
      state.sectorsFormData.keyword = action.payload.keyword;
      return state;
    },
    setAllSectors: (state, action) => {
      state.sectors = action.payload.data.dbData;
      return state;
    },
    fetchAllAgriculturalPractices: (state, action) => {
      state.agriculturalPracticesFormData.keyword = action.payload.keyword;
      return state;
    },
    setAllAgriculturalPractices: (state, action) => {
      state.agriculturalPractices = action.payload.data.dbData;
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
  fetchAllCollaborators,
  setAllCollaborators,
  fetchAllZones,
  setAllZones,
  fetchAllSectors,
  setAllSectors,
  fetchAllAgriculturalPractices,
  setAllAgriculturalPractices,
  handleFormDataChange,
  handleFormValidation,
  storeData,
  readData,
  updateData,
  deleteData,
  success,
  failed,
} = workPlanSlice.actions;

export const selectWorkPlan = (state) => state.workPlan;

export default workPlanSlice.reducer;

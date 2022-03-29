import { createSlice } from "@reduxjs/toolkit";

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
    scanId: "",
    entry_date: new Date(),
    latitude: "",
    longitude: "",
    selectRegion: "Z",
    zoneId: "",
    sectorId: [],
    files: [],
    existingFiles: [],
    status: 1,
  },
  formValidation: {},
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
  formType: "Create",
};

export const treeSlice = createSlice({
  name: "tree",
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
      state.zonesFormData = initialState.zonesFormData;
      state.zones = initialState.zones;
      state.sectorsFormData = initialState.sectorsFormData;
      state.sectors = initialState.sectors;
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
      state.formData[action.payload.key] = action.payload.value;
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
  fetchAllZones,
  setAllZones,
  fetchAllSectors,
  setAllSectors,
  handleFormValidation,
  handleFormDataChange,
  storeData,
  readData,
  updateData,
  deleteData,
  success,
  failed,
} = treeSlice.actions;

export const selectTree = (state) => state.tree;

export default treeSlice.reducer;

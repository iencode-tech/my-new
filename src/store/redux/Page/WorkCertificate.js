import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isError: false,
  list: [],
  listCount: 0,
  listFormData: {
    zoneId: "",
    sectorId: "",
    keyword: "",
    page: 1,
  },
  formData: {
    collaboratorId: "",
    zoneId: "",
    sectorId: "",
    agriculturalPracticeId: "",
    rawMaterials: [],
    methodId: 0,
    assignedOn: "",
    terminateOn: "",
    trees: [],
    status: 1,
    collaborator: {},
    zone: {},
    agriculturalPractice: {},
    id: "",
    scannedTrees: 0,
    totalTrees: 0,
    selectRegion: "Z",
  },
  zonesFormData: {
    keyword: "",
    page: 1,
  },
  zone: {},
  zones: [],
  sectorsFormData: {
    keyword: "",
    page: 1,
  },
  sector: {},
  sectors: [],
};

export const workCertificateSlice = createSlice({
  name: "workCertificate",
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
    setSelectedData: (state, action) => {
      state[action.payload.key] = action.payload.value;
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
    readData: (state, action) => {
      state.loading = true;
      state.isError = false;
      state.formData = initialState.formData;
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
  setSelectedData,
  fetchAllZones,
  setAllZones,
  fetchAllSectors,
  setAllSectors,
  readData,
  success,
  failed,
} = workCertificateSlice.actions;

export const selectWorkCertificate = (state) => state.workCertificate;

export default workCertificateSlice.reducer;

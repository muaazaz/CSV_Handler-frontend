import { createSlice } from "@reduxjs/toolkit";

export const fileSlice = createSlice({
  name: "file",
  initialState: {
    progress: 0,
    file: {},
    fileData: {},
    fileHeaders: [],
  },
  reducers: {
    setUploadProgress: (state, action) => {
      state.progress = action.payload;
    },
    setUploadedFile: (state, action) => {
      state.file = action.payload;
    },
    setFileData: (state, action) => {
      state.fileData = action.payload;
    },
    setFileHeaders: (state, action) => {
      state.fileHeaders = action.payload;
    },
  },
});

export const {
  setUploadProgress,
  setUploadedFile,
  setFileData,
  setFileHeaders,
} = fileSlice.actions;
export default fileSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalData: { navTab: window.location.pathname.substring(1).split("/")[0] },
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setGlobalData: (state, action) => {
      state.globalData = action.payload;
    },
  },
});

export const { setGlobalData } = globalSlice.actions;

export default globalSlice.reducer;

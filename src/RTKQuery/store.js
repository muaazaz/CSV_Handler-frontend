import { configureStore } from "@reduxjs/toolkit";
import { fileApi } from "./FileService/fileApi";
import fileSlice from "./FileService/fileSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tagsApi } from "./TagsService/tagsApi";
import { csvDataApi } from "./CsvDataService/csvDataApi";
import { comparisonApi } from "./ComparisonService/ComparisonApi";
import globalSlice from "./globalSlice";

export const store = configureStore({
  reducer: {
    [fileApi.reducerPath]: fileApi.reducer,
    [csvDataApi.reducerPath]: csvDataApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [comparisonApi.reducerPath]: comparisonApi.reducer,
    file: fileSlice,
    global: globalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      fileApi.middleware,
      csvDataApi.middleware,
      tagsApi.middleware,
      comparisonApi.middleware
    ),
});

setupListeners(store.dispatch);

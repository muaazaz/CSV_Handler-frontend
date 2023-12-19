import { configureStore } from "@reduxjs/toolkit";
import { csvApi } from "./CsvService/csvApi";
import { fileApi } from "./FileService/fileApi";
import fileSlice from "./FileService/fileSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tagsApi } from "./TagsService/tagsApi";

export const store = configureStore({
  reducer: {
    [fileApi.reducerPath]: fileApi.reducer,
    [csvApi.reducerPath]: csvApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    file: fileSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      fileApi.middleware,
      csvApi.middleware,
      tagsApi.middleware
    ),
});

setupListeners(store.dispatch);

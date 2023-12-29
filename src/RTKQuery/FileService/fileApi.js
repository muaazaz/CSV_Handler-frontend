import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { setUploadProgress } from "./fileSlice";

export const fileApi = createApi({
  reducerPath: "fileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
  }),
  tagTypes: ["file", "tags"],
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      queryFn: (payload, api) => {
        return axios.post("http://localhost:5000/upload", payload, {
          onUploadProgress: (upload) => {
            const uploadloadProgress = Math.round(
              (100 * upload.loaded) / upload.total
            );
            api.dispatch(setUploadProgress(uploadloadProgress));
          },
        });
      },
      invalidatesTags: ["file", "tags"],
    }),
    updateFile: builder.mutation({
      query: ({ id, formData }) => ({
        url: `uploaded-file/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["file", "tags"],
    }),
    getFiles: builder.query({
      query: () => ({
        url: "uploaded-file",
      }),
      providesTags: ["file", "tags"],
    }),
    getFilesBySearch: builder.query({
      query: (search) => ({
        url: `uploaded-file?search=${search}`,
      }),
      providesTags: ["file", "tags"],
    }),
    getFileById: builder.query({
      query: (id) => ({
        url: `uploaded-file/${id}`,
      }),
      providesTags: ["file", "tags"],
    }),
  }),
});

export const {
  useUploadFileMutation,
  useUpdateFileMutation,
  useGetFilesQuery,
  useGetFilesBySearchQuery,
  useGetFileByIdQuery,
} = fileApi;

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
    getFiles: builder.query({
      query: () => ({
        url: "file",
      }),
      providesTags: ["file", "tags"],
    }),
    getFileById: builder.query({
      query: (id) => ({
        url: `file/${id}`,
      }),
      providesTags: ["file", "tags"],
    }),
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
        url: `file/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["file", "tags"],
    }),
  }),
});

export const {
  useUploadFileMutation,
  useUpdateFileMutation,
  useGetFilesQuery,
  useGetFileByIdQuery,
} = fileApi;

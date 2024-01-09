import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const csvDataApi = createApi({
  reducerPath: "csvApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
  }),
  endpoints: (builder) => ({
    createCsvData: builder.mutation({
      query: (body) => ({
        url: "csv-data",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "csv" }],
    }),
  }),
});

export const { useCreateCsvDataMutation } = csvDataApi;

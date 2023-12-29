import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const csvDataApi = createApi({
  reducerPath: "csvApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
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

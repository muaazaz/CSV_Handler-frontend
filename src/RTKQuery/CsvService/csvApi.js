import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const csvApi = createApi({
  reducerPath: "csvApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
  }),
  endpoints: (builder) => ({
    createCsv: builder.mutation({
      query: (body) => ({
        url: "csv",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "csv" }],
    }),
  }),
});

export const { useCreateCsvMutation } = csvApi;

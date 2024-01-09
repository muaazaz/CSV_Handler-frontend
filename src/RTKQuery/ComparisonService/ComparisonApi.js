import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const comparisonApi = createApi({
  reducerPath: "comparisonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
  }),
  tagTypes: ["comparison"],
  endpoints: (builder) => ({
    getComparisons: builder.query({
      query: () => ({
        url: "comparison",
      }),
      providesTags: ["comparison"],
    }),
    getComparisonById: builder.query({
      query: (id) => ({
        url: `comparison/${id}`,
      }),
      providesTags: ["comparison"],
    }),
    createComparison: builder.mutation({
      query: (body) => ({
        url: "comparison",
        method: "POST",
        body,
      }),
      invalidatesTags: ["comparison"],
    }),
    updateComparison: builder.mutation({
      query: ({ id, formData }) => ({
        url: `comparison/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["comparison"],
    }),
  }),
});

export const {
  useCreateComparisonMutation,
  useUpdateComparisonMutation,
  useGetComparisonsQuery,
  useGetComparisonByIdQuery,
} = comparisonApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tagsApi = createApi({
  reducerPath: "tagsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
  }),
  tagTypes: ["file", "tags"],
  endpoints: (builder) => ({
    getTags: builder.query({
      query: (payload) => `tags?type=${payload}`,
      providesTags: ["file", "tags"],
    }),
    getTagbyId: builder.query({
      query: (id) => `tags/${id}`,
      providesTags: ["file", "tags"],
    }),
    createTag: builder.mutation({
      query: (body) => ({
        url: "tags",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tags"],
    }),
    updateTag: builder.mutation({
      query: ({ id, formData }) => ({
        url: `tags/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["tags"],
    }),
    deleteTag: builder.mutation({
      query: (id) => ({
        url: `tags/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tags"],
    }),
  }),
});

export const {
  useCreateTagMutation,
  useUpdateTagMutation,
  useGetTagsQuery,
  useGetTagbyIdQuery,
  useDeleteTagMutation,
} = tagsApi;

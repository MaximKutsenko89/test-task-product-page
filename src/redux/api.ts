import { LoginParams, Response, SuccessUerResponse } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummy-api.d0.acom.cloud/api",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<SuccessUerResponse, LoginParams>({
      query: (loginParams) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: loginParams,
        };
      },
    }),
    products: builder.query<Response, { params: string; token: string }>({
      query: ({ params, token }) => ({
        url: `/products?${params}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useProductsQuery } = api;

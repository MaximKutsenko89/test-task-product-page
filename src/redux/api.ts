import {
  LoginParams,
  Response,
  SearchParams,
  SuccessUerResponse,
} from "@/types";
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
    products: builder.query<Response, SearchParams>({
      query: ({ page, token, from, to, price_from, price_to, title }) => ({
        url: `/products?page=${page}&from=${from}&to=${to}&price_from=${price_from}&price_to=${price_to}&title=${title}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useProductsQuery } = api;

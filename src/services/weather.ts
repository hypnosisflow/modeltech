// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { WeatherCard } from "../store/features/weather-cards";

// Define a service using a base URL and expected endpoints
export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5173" }),
  endpoints: (builder) => ({
    loadAll: builder.query<WeatherCard[], void>({
      query: () => {
        return {
          url: "/",
          method: "GET",
        };
      },
      providesTags: ["fd"],
    }),
    getWeatherCard: builder.query<WeatherCard, string>({
      query: (id) => ({
        url: `/weather/${id}`,
        method: "GET",
      }),
      providesTags: ["fd"],
    }),
    addWeatherCard: builder.mutation<WeatherCard, WeatherCard>({
      query: (card) => ({
        url: `/weather/add`,
        method: "POST",
        body: card,
      }),
      invalidatesTags: ["fd"],
    }),
    deleteWeatherCard: builder.mutation<WeatherCard, string>({
      query: (id) => ({
        url: `/weather/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["fd"],
    }),
    updateWeatherCard: builder.mutation<WeatherCard, WeatherCard>({
      query: (card) => ({
        url: `weather/update/${card.id}`,
        method: "PATCH",
        body: card,
      }),
      invalidatesTags: ["fd"],
    }),
  }),
});

export const {
  useLoadAllQuery,
  useGetWeatherCardQuery,
  useAddWeatherCardMutation,
  useDeleteWeatherCardMutation,
  useUpdateWeatherCardMutation,
} = weatherApi;

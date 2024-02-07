import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Nullable } from "primereact/ts-helpers";

interface Select {
  value: string;
  label: string;
}

export interface WeatherCard {
  id: string;
  date: Nullable<Date> | string;
  temp: string;
  weather: string;
  author: string;
  comment: string;
}
export interface WeatherState {
  cards: Array<WeatherCard>;
}

const initialState: WeatherState = {
  cards: [],
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<WeatherCard>) => {
      state.cards = [action.payload];
    },
    remove: (state, action: PayloadAction<WeatherCard>) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload.id);
    },
    add: (state, action: PayloadAction<WeatherCard>) => {
      if (!state.cards.find((card) => card.id === action.payload.id)) {
        state.cards = [...state.cards, action.payload];
      }
    },
  },
});

export const { init, remove } = weatherSlice.actions;

export default weatherSlice.reducer;

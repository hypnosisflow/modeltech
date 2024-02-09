import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WeatherCard, WeatherState } from "../../models";

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

export const { init, remove, add } = weatherSlice.actions;

export default weatherSlice.reducer;

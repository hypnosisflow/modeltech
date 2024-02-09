import { Nullable } from "primereact/ts-helpers";

export interface CustomLinkProps {
  path: string;
  value: string;
  theme: string;
  state: unknown;
  props?: unknown;
}

export interface SelectProps<T> {
  data: T;
}

export interface WeatherCard {
  id: string;
  date: Nullable<Date> | string;
  temp: Nullable<number | null>;
  weather: string;
  author: string;
  comment: string;
  dateObj?: Nullable<Date>;
}
export interface WeatherState {
  cards: Array<WeatherCard>;
}

export interface CustomTableProps {
  data?: WeatherCard[];
}

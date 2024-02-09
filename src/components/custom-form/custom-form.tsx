import React, { useState, useEffect, SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Nullable } from "primereact/ts-helpers";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import {
  useAddWeatherCardMutation,
  useUpdateWeatherCardMutation,
  useGetWeatherCardQuery,
} from "../../services/weather";

import { authors, weatherOptions } from "../../constants";
import { WeatherCard } from "../../models";

export const CustomForm = ({ editMode = false }) => {
  const { id } = useParams();

  const [date, setDate] = useState<Nullable<Date>>(null);
  const [temp, setTemp] = useState<Nullable<null | number>>(null); // > -50 and < + 60
  const [weather, setWeather] = useState({ name: "", code: "" });
  const [author, setAuthor] = useState({ name: "", code: "" });
  const [comment, setComment] = useState("");

  const [addWeatherCard] = useAddWeatherCardMutation();
  const [updateWeatherCard] = useUpdateWeatherCardMutation();
  const { data: user } = useGetWeatherCardQuery(id as string);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && editMode) {
      setDate(user.dateObj);
      setTemp(user.temp);
      setWeather({ name: user.weather, code: user.weather });
      setAuthor({ name: user.author, code: user.author });
      setComment(user.comment);
    }
  }, [editMode, user]);

  const data: WeatherCard = {
    id: editMode && user ? user.id : Math.random().toString(36).slice(2),
    date: date?.toLocaleString(),
    dateObj: date,
    temp: temp,
    weather: weather.name,
    author: author.name,
    comment: comment,
  };

  const validateTemp = (e: SyntheticEvent<HTMLButtonElement>) => {
    if (temp >= 60 || temp <= -50) {
      alert(
        "Число должно быть больше -50 и меньше 60. Допускается два символа после запятой."
      );
      e.preventDefault();
      return;
    }
  };

  const handlePost = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      addWeatherCard(data);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      updateWeatherCard(data);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="w-26rem mx-auto"
      style={{ backgroundColor: "white", opacity: 1, zIndex: 50 }}
    >
      <h3>Form</h3>
      <form
        action="POST"
        onSubmit={editMode ? handleEdit : handlePost}
        className="flex flex-column gap-2"
      >
        <Calendar
          value={date}
          onChange={(e) => setDate(e.value)}
          placeholder="Выберите дату"
          required
        />
        <InputNumber
          value={temp}
          onValueChange={(e) => setTemp(e.value)}
          placeholder="Введите температуру"
          required
          maxFractionDigits={2}
        />
        <Dropdown
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          options={authors}
          optionLabel="name"
          placeholder="Выберите автора"
          className=" text-left "
        />
        <Dropdown
          value={weather}
          onChange={(e) => setWeather(e.target.value)}
          options={weatherOptions}
          optionLabel="name"
          placeholder="Выберите погоду"
          className=" text-left "
        />
        <InputText
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Ваш коментарий"
        />
        <Button
          type="submit"
          label="Отправить"
          onClick={(e) => validateTemp(e)}
          rounded
          className="w-10rem mx-auto"
        />
      </form>
    </div>
  );
};

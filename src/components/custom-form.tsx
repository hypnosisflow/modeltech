import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Nullable } from "primereact/ts-helpers";
import { Button } from "primereact/button";
import { authors, weatherOptions } from "../constants";
import { useAddWeatherCardMutation } from "../services/weather";
import { WeatherCard } from "../store/features/weather-cards";
import { useNavigate } from "react-router-dom";

export const CustomForm = () => {
  const [date, setDate] = useState<Nullable<Date>>(null);
  const [temp, setTemp] = useState("1"); // > -50 and < + 60
  const [weather, setWeather] = useState({ name: "", code: "" });
  const [author, setAuthor] = useState({ name: "", code: "" });
  const [comment, setComment] = useState("");

  const [addWeatherCard] = useAddWeatherCardMutation();

  const data = {
    id: Math.random().toString(36).slice(2),
    date: date?.toLocaleDateString(),
    temp: temp,
    weather: weather.name,
    author: author.name,
    comment: comment,
  };
  console.log("form", data);
  const navigate = useNavigate();

  const handleSumbit = (e) => {
    e.preventDefault();
    try {
      addWeatherCard(data);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }

    // alert("Comming");
    console.log(data);
  };

  return (
    <div
      className="w-26rem mx-auto"
      style={{ backgroundColor: "white", opacity: 1, zIndex: 50 }}
    >
      <h3>Form</h3>
      <form
        action="POST"
        onSubmit={handleSumbit}
        className="flex flex-column gap-2"
      >
        <Calendar
          value={date}
          onChange={(e) => setDate(e.value)}
          placeholder="Select date"
        />
        <InputText
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          placeholder="Enter temp"
          required
          // pattern=""
        />
        <Dropdown
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          options={authors}
          optionLabel="name"
          placeholder="Select author "
          className=" text-left "
        />
        <Dropdown
          value={weather}
          onChange={(e) => setWeather(e.target.value)}
          options={weatherOptions}
          optionLabel="name"
          placeholder="Select wether"
          className=" text-left "
        />
        <InputText
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write comment"
        />
        <Button
          type="submit"
          label="Submit"
          rounded
          className="w-10rem mx-auto"
        />
      </form>
    </div>
  );
};

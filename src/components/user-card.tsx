import React, { useEffect } from "react";
import {
  useGetWeatherCardQuery,
  useDeleteWeatherCardMutation,
} from "../services/weather";
import "./user-card.scss";
import { useParams } from "react-router-dom";

import { Button } from "primereact/button";
export const UserCard = () => {
  const { id } = useParams();
  console.log(id);

  const { data: user, isLoading, error } = useGetWeatherCardQuery(id as string);
  const [deleteWeatherCard] = useDeleteWeatherCardMutation();
  console.log(user);

  const handleDelete = (id: string) => {
    try {
      deleteWeatherCard(id);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }

  if (error) {
    console.log(error);
    return (
      <div>
        <h3>Error! Restart the app!</h3>
      </div>
    );
  }

  return (
    <div>
      <h3>UserCard</h3>

      <div className="weather-card">
        <div>
          <p>ID заявки </p>
          <p>Автор </p>
          <p>Коментарий </p>
          <p>Дата </p>
          <p>Температура </p>
          <p>Погода </p>
        </div>
        <div>
          <p> {user.id}</p>
          <p> {user.author}</p>
          <p> {user.comment}</p>
          <p> {user.date}</p>
          <p> {user.temp}</p>
          <p> {user.weather}</p>
        </div>
      </div>
      <div className="buttons-wrapper">
        <Button
          type="submit"
          label="Редактировать"
          rounded
          className="w-10rem mx-auto"
        />
        <Button
          type="button"
          onClick={() => handleDelete(id as string)}
          label="Удалить"
          rounded
          className="w-10rem mx-auto"
        />
      </div>
    </div>
  );
};

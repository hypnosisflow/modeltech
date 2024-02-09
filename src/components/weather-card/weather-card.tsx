import { useParams, useNavigate } from "react-router-dom";

import {
  useGetWeatherCardQuery,
  useDeleteWeatherCardMutation,
} from "../../services/weather";

import { Button } from "primereact/button";
import { CustomLink } from "../custom-link/custom-link";
import "./weather-card.scss";


export const UserCard = () => {
  const { id } = useParams();
  const { data: user, isLoading, error } = useGetWeatherCardQuery(id as string);
  const [deleteWeatherCard] = useDeleteWeatherCardMutation();

  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    try {
      deleteWeatherCard(id);
      navigate(-1);
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
    return (
      <div>
        <h3>Error! Restart the app!</h3>
      </div>
    );
  }

  if (user) {
    return (
      <div className="weather-card">
        <h3>Карточка погоды</h3>

        <div className="weather-card-col">
          <div className="weather-card-row">
            <span>ID заявки</span>
            <span>{user.id}</span>
          </div>
          <div className="weather-card-row">
            <span>Автор </span>
            <span> {user.author}</span>
          </div>
          <div className="weather-card-row">
            <span>Коментарий </span>
            <span> {user.comment}</span>
          </div>
          <div className="weather-card-row">
            <span>Дата </span>
            <span> {user.date?.toLocaleString()}</span>
          </div>
          <div className="weather-card-row">
            <span>Температура </span>
            <span> {user.temp}</span>
          </div>
          <div className="weather-card-row">
            <span>Погода </span>
            <span> {user.weather}</span>
          </div>
        </div>

        <div className="buttons-wrapper">
          <CustomLink
            value="Редактировать"
            path={`/weather/update/${user.id}`}
            state={{ backgroundLocation: "/" }}
            theme="def"
          />
          <Button
            type="button"
            onClick={() => handleDelete(id as string)}
            label="Удалить"
            rounded
            className="w-10rem "
          />
        </div>
      </div>
    );
  }
};

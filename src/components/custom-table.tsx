import React, { useState } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { WeatherCard } from "../store/features/weather-cards";
import { useLoadAllQuery } from "../services/weather";
import { Button } from "primereact/button";
import { useNavigate, Link, useLocation } from "react-router-dom";

interface CustomTableProps {
  data?: WeatherCard[];
}
export const CustomTable: React.FC<CustomTableProps> = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { data, error, isLoading } = useLoadAllQuery();


  const onRowSelect = (event: any) => {
    console.log(event.data.id);
    navigate(`/weather/${event.data.id}`, { state: { backgroundLocation: location } });

    // todo: dispatch event.data там вся инфа по ряду
  };

  const onRowUnselect = (event) => {};

  return (
    <section className="">
      <h3>Table</h3>
      <DataTable

        value={data}
        tableStyle={{ minWidth: "50rem", zIndex: -10 }}
        selectionMode="single"
        selection={selectedProduct}
        onSelectionChange={(e) => setSelectedProduct(e.currentTarget?.value)}
        dataKey="id"
        onRowSelect={onRowSelect}
        onRowUnselect={onRowUnselect}
      >
        <Column field="date" header="Дата и Время"></Column>
        <Column field="temp" header="Температура"></Column>
        <Column field="weather" header="Погода"></Column>
        <Column field="author" header="Кто Заполнил"></Column>
        <Column field="comment" header="Коментарий"></Column>
      </DataTable>

      <Link
        // type="submit"
        to={`/weather/add`}
        state={{ backgroundLocation: location }}
        // label="Add new"
        // rounded
        // className="w-10rem mx-auto mt-2"
      >
        Add new
      </Link>
    </section>
  );
};

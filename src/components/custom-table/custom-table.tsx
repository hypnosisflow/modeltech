import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useLoadAllQuery } from "../../services/weather";
import { CustomLink } from "../custom-link/custom-link";
import "./custom-table.scss";
import { CustomTableProps, SelectProps, WeatherCard } from "../../models";

export const CustomTable: React.FC<CustomTableProps> = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useLoadAllQuery();

  const onRowSelect = (event: SelectProps<WeatherCard>) => {
    console.log(event);
    navigate(`/weather/${event.data.id}`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <section className="custom-table">
      <h3>Таблица температур</h3>
      <DataTable
        value={data}
        tableStyle={{ minWidth: "50rem" }}
        selectionMode="single"
        selection={selectedProduct}
        onSelectionChange={(e) => setSelectedProduct(e.currentTarget?.value)}
        dataKey="id"
        onRowSelect={onRowSelect}
      >
        <Column field="date" header="Дата и Время"></Column>
        <Column field="temp" header="Температура"></Column>
        <Column field="weather" header="Погода"></Column>
        <Column field="author" header="Кто Заполнил"></Column>
        <Column field="comment" header="Коментарий"></Column>
      </DataTable>

      <CustomLink
        path={`weather/add`}
        value="Добавить запись"
        state={{ backgroundLocation: location }}
        theme="def"
      />
    </section>
  );
};

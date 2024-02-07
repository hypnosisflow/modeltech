import React from "react";
import ReactEcharts from "echarts-for-react";
import { useLoadAllQuery } from "../services/weather";

export const Graph = () => {
  const { data, error, isLoading } = useLoadAllQuery();

  const options = {
    title: {
      text: "Stacked Area Chart",
    },
    xAxis: {
      type: "category",
      data: data?.map((item) => item.date),
    },
    yAxis: {
      type: "value",
      data: data?.map((item) => item.temp),
    },
    series: [
      {
        data: data?.map((item) => item.temp),
        type: "bar",
      },
    ],
  };

  if (isLoading)
    return (
      <div>
        <h3>Loading Graph</h3>
      </div>
    );

  return (
    <div className="mt-8">
      <ReactEcharts
        option={options}
        style={{
          width: "600px",
          //   height: "300px",
        }}
      ></ReactEcharts>
    </div>
  );
};

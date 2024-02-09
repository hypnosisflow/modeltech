import React from "react";
import ReactEcharts from "echarts-for-react";
import { useLoadAllQuery } from "../services/weather";

export const Graph = () => {
  const { data, isLoading } = useLoadAllQuery();

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

  const newOPT = {
    title: {
      text: "График погоды",
    },
    toolTip: {
      trigger: "axis",
    },
    legend: {},
    toolBox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
          dataView: { readOnly: false },
          magicType: { type: ["line", "bar"] },
          resotre: {},
          saveAsImage: {},
        },
      },
    },
    xAxis: {
      type: "category",
      // boundaryGap: false,
      data: data?.map((item) => item.date),
    },
    yAxis: {
      type: "value",
      data: data?.map((item) => item.temp),
      // axisLabel: {
      //   formatter: "{value} C",
      // },
    },
    series: [
      {
        name: "Изменения температуры",
        type: "line",
        data: data?.map((item) => item.temp),
        markPoint: {
          data: [
            { type: "max", name: "Max" },
            { type: "min", name: "Min" },
          ],
        },
        markLine: {
          data: [{ type: "average", name: "Avg" }],
        },
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
        option={newOPT}
        style={{
          width: "1200px",
          height: "400px",
        }}
      ></ReactEcharts>
    </div>
  );
};

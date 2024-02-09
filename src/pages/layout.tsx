import React from "react";
import { CustomTable } from "../components/custom-table/custom-table";
import { Graph } from "../components/graph";
import "./layout.scss";

export const Layout = () => {
  return (
    <section className="layout">
      <CustomTable />
      <Graph />
    </section>
  );
};

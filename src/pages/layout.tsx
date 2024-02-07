import React from "react";
import { CustomTable } from "../components/custom-table";
import { Graph } from "../components/graph";

export const Layout = () => {
  return (
    <section style={{ zIndex: -100}}>
      <CustomTable />
      <Graph />
    </section>
  );
};

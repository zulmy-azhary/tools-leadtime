import React from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { ChartContainer, SummaryProcessUnit, UnitProcessCard } from "../organisms";

const Home: React.FC = () => {
  useDocumentTitle("Dashboard");

  return (
    <>
      <UnitProcessCard />
      <ChartContainer />
      <SummaryProcessUnit />
    </>
  );
};

export default Home;

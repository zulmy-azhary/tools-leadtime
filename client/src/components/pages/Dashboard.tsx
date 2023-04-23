import React from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { ChartContainer, SummaryProgresUnit, UnitProcessCard } from "../organisms";

const Home: React.FC = () => {
  useDocumentTitle("Dashboard");

  return (
    <>
      <UnitProcessCard />
      <ChartContainer />
      <SummaryProgresUnit />
    </>
  );
};

export default Home;

import React from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { Chart, SummaryProgresUnit, UnitProcessCard } from "../organisms";

const Home: React.FC = () => {
  useDocumentTitle("Dashboard");

  return (
    <>
      <UnitProcessCard />
      <Chart />
      <SummaryProgresUnit />
    </>
  );
};

export default Home;

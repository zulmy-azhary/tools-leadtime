import React from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { Chart, SummaryProgresUnit, UnitProcessCard } from "../organisms";

const Home: React.FC = () => {
  useDocumentTitle("Dashboard");

  return (
    <section className="grid gap-y-16">
      <UnitProcessCard />
      <Chart />
      <SummaryProgresUnit />
    </section>
  );
};

export default Home;

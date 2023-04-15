import React from "react";
import { ContentWrapper, Headers, ProcesUnit, QuantityUnit } from "../molecules";

const Chart: React.FC = () => {
  return (
    <ContentWrapper className="xl:grid-cols-2">
      <Headers headerTitle="Chart" description="Leadtime & Paint" className="col-span-full" />
      <ProcesUnit />
      <QuantityUnit />
    </ContentWrapper>
  );
};

export default Chart;

import React from "react";
import { ContentWrapper, Headers, ProcesUnit, QuantityUnit } from "../molecules";

const Chart: React.FC = () => {
  return (
    <ContentWrapper className="grid gap-x-6 gap-y-8 lg:grid-cols-2">
      <Headers headerTitle="Chart" description="Leadtime & Paint" className="col-span-full" />
      <ProcesUnit />
      <QuantityUnit />
    </ContentWrapper>
  );
};

export default Chart;

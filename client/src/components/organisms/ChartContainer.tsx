import React from "react";
import { ContentWrapper, Header, ChartProcessUnit, QuantityUnit } from "../molecules";

const Chart: React.FC = () => {
  return (
    <ContentWrapper className="xl:grid-cols-2">
      <Header headerTitle="Chart" description="Leadtime & Paint" className="col-span-full" />
      <ChartProcessUnit />
      <QuantityUnit />
    </ContentWrapper>
  );
};

export default Chart;

import React from "react";
import { ContentWrapper, Header } from "../molecules";
import { Card, Heading } from "../atoms";

const DataEmployeeContainer: React.FC = () => {
  return (
    <ContentWrapper>
      <Header headerTitle="Karyawan" description="Leadtime & Paint" className="col-span-full" />
      <Card className="col-span-full min-h-[24rem] px-8 py-6">
        <div className="flex h-fit items-center justify-between">
          <Heading className="text-lg font-semibold">Data Karyawan Table</Heading>
        </div>
      </Card>
    </ContentWrapper>
  );
};

export default DataEmployeeContainer;

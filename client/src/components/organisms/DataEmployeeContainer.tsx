import React from "react";
import { ContentWrapper, Headers } from "../molecules";
import clsx from "clsx";
import { Heading } from "../atoms";

const DataEmployeeContainer: React.FC = () => {
  return (
    <>
      <ContentWrapper>
        <Headers headerTitle="Karyawan" description="Leadtime & Paint" className="col-span-full" />
        <div className={clsx("col-span-full h-96 rounded-lg bg-white px-8 py-6 shadow-lg")}>
          <div className="flex h-fit items-center justify-between">
            <Heading className="text-lg font-semibold">Data Karyawan Table</Heading>
          </div>
        </div>
      </ContentWrapper>
    </>
  );
};

export default DataEmployeeContainer;

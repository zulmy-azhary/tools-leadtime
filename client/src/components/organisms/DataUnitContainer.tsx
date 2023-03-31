import React from "react";
import { ContentWrapper, Headers } from "../molecules";
import clsx from "clsx";
import { Heading, Input } from "../atoms";
import { IoSearch } from "react-icons/io5";

const DataUnitContainer: React.FC = () => {
  return (
    <>
      <ContentWrapper>
        <Headers headerTitle="Unit" description="Leadtime & Paint" className="col-span-full" />
        <div className={clsx("col-span-full h-96 rounded-lg bg-white px-8 py-6 shadow-lg")}>
          <div className="flex h-fit items-center justify-between">
            <Heading className="text-lg font-semibold">Data Unit Table</Heading>
            <Input placeholder="Search Work Order" renderElement={<IoSearch className="absolute right-5" />} />
          </div>
        </div>
      </ContentWrapper>
    </>
  );
};

export default DataUnitContainer;

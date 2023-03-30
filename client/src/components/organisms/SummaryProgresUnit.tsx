import React from "react";
import { ContentWrapper, Headers } from "../molecules";
import clsx from "clsx";
import { Heading, Input } from "../atoms";
import { IoSearch } from "react-icons/io5";

const SummaryProgresUnit: React.FC = () => {
  return (
    <>
      <ContentWrapper>
        <Headers headerTitle="Summary Progres Unit" description="Leadtime & Paint" className="col-span-full" />
        <div className={clsx("grid h-96 rounded-lg bg-white px-8 py-6 shadow-lg")}>
          <div className="flex h-fit items-center justify-between">
            <Heading className="text-lg font-semibold">Summary Table</Heading>
            <Input placeholder="Search Work Order" renderElement={<IoSearch className="absolute right-5" />} />
          </div>
        </div>
      </ContentWrapper>
    </>
  );
};

export default SummaryProgresUnit;

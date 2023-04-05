import React from "react";
import { ContentWrapper, Headers, Table } from "../molecules";
import clsx from "clsx";
import { Heading, Input } from "../atoms";
import { IoSearch } from "react-icons/io5";
import type { TSummary } from "../../types";
import { summaryColumns } from "../../helpers/tableColumns/summaryColumns";

const SummaryProgresUnit: React.FC = () => {
  return (
    <ContentWrapper>
      <Headers headerTitle="Summary Progres Unit" description="Leadtime & Paint" className="col-span-full" />
      <div className={clsx("flex min-h-[24rem] flex-col gap-y-12 rounded-lg bg-white px-8 py-6 shadow-lg")}>
        <div className="flex h-fit items-center justify-between">
          <Heading className="text-lg font-semibold">Summary Table</Heading>
          <Input placeholder="Search Work Order" renderElement={<IoSearch className="absolute right-5" />} />
        </div>
        <Table data={summaryData} columns={summaryColumns} />
      </div>
    </ContentWrapper>
  );
};

const summaryData: TSummary[] = [
  {
    workOrder: "20204/SWO/23/04/00001",
    serviceAdvisor: "Ahmad Supardi",
    vendor: "WIS",
    entryDate: "04 April 2023",
    endDate: "06 April 2023"
  },
  {
    workOrder: "20204/SWO/23/04/00002",
    serviceAdvisor: "Reza",
    vendor: "SPA",
    entryDate: "01 April 2023",
    endDate: "03 April 2023"
  },
  {
    workOrder: "20204/SWO/23/04/00003",
    serviceAdvisor: "Samsuryanan Amir",
    vendor: "WIS",
    entryDate: "03 April 2023",
    endDate: "04 April 2023"
  }
];

export default SummaryProgresUnit;

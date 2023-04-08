import React from "react";
import { ContentWrapper, Headers, Table } from "../molecules";
import { Card, Heading, Input } from "../atoms";
import { IoSearch } from "react-icons/io5";
import type { TSummary } from "../../types";
import { summaryColumns } from "../../helpers/tableColumns";

const SummaryProgresUnit: React.FC = () => {
  return (
    <ContentWrapper>
      <Headers headerTitle="Summary Progres Unit" description="Leadtime & Paint" className="col-span-full" />
      <Card className="flex min-h-[24rem] flex-col gap-y-12 px-8 py-6">
        <div className="flex h-fit items-center justify-between">
          <Heading className="text-lg font-semibold">Summary Table</Heading>
          <Input placeholder="Search Work Order" icon={<IoSearch className="absolute right-5" />} />
        </div>
        <Table data={summaryData} columns={summaryColumns} />
      </Card>
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
    serviceAdvisor: "Syamsuryanan Amir",
    vendor: "WIS",
    entryDate: "03 April 2023",
    endDate: "04 April 2023"
  }
];

export default SummaryProgresUnit;

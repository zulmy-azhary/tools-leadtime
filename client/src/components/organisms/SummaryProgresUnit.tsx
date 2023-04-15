import React from "react";
import { ContentWrapper, Headers, Table } from "../molecules";
import { Button, Card, Heading, Input } from "../atoms";
import { IoSearch } from "react-icons/io5";
import type { TSummary } from "../../types";
import { summaryColumns } from "../../helpers/tableColumns";
import clsx from "clsx";

const SummaryProgresUnit: React.FC = () => {
  return (
    <ContentWrapper className="overflow-hidden">
      <Headers headerTitle="Summary Progres Unit" description="Leadtime & Paint" className="col-span-full" />
      <Card className="flex  flex-col gap-y-8 overflow-y-auto px-8 py-6">
        <div className="flex flex-wrap items-center gap-4">
          <Heading className="grow text-center text-xl font-semibold md:text-left">Summary Table</Heading>
          <Input
            placeholder="Search Work Order"
            icon={<IoSearch className="absolute right-5" />}
            wrapperClassName="w-full md:w-fit"
          />
          <Button
            className={clsx(
              "w-full border-[1.6px] border-gray-300 bg-slate-50 p-3 text-sm dark:border-slate-600 dark:bg-slate-800 md:w-fit"
            )}
          >
            Export CSV
          </Button>
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

import React from "react";
import { ContentWrapper, Header, Table } from "../molecules";
import { Button, Card, Heading, Input } from "../atoms";
import { IoSearch } from "react-icons/io5";
import type { TSummaryData } from "../../types";
import { summaryColumns } from "../../helpers/tableColumns";
import clsx from "clsx";
import type { ColumnDef } from "@tanstack/react-table";
import { IoMdInformationCircle } from "react-icons/io";

const SummaryProcessUnit: React.FC = () => {
  return (
    <ContentWrapper className="overflow-hidden">
      <Header headerTitle="Summary Process Unit" description="Leadtime & Paint" className="col-span-full" />
      <Card className="flex flex-col gap-y-8 overflow-y-auto px-8 py-6">
        <div className="flex flex-wrap items-center gap-4">
          <Heading className="grow text-center text-xl font-semibold md:text-left">Summary Table</Heading>
          <Input
            placeholder="Search Work Order"
            icon={<IoSearch className="absolute right-5" />}
            wrapperClassName="w-full md:w-fit"
          />
          <Button
            className={clsx(
              "border-button-bd-light dark:border-button-bd-dark bg-button-bg-light dark:bg-button-bg-dark w-full cursor-pointer border-[1.6px] p-3 text-sm font-semibold md:w-fit"
            )}
          >
            Export CSV
          </Button>
        </div>
        <Table data={summaryData} columns={summaryColumns} action={action} />
      </Card>
    </ContentWrapper>
  );
};

const action: ColumnDef<TSummaryData> = {
  header: "Action",
  cell: ({ row }) => (
    <IoMdInformationCircle
      onClick={() => alert(JSON.stringify(row.original, null, 2))}
      className="cursor-pointer text-blue-500"
      size="1.7em"
    />
  )
};

const summaryData: TSummaryData[] = [
  {
    workOrder: "20204/SWO/23/04/00001",
    serviceAdvisor: "Ahmad Supardi",
    vendor: "WIS",
    entryDate: "04 April 2023",
    endDate: "06 April 2023",
    totalDuration: "18 Jam"
  },
  {
    workOrder: "20204/SWO/23/04/00002",
    serviceAdvisor: "Reza",
    vendor: "SPA",
    entryDate: "01 April 2023",
    endDate: "03 April 2023",
    totalDuration: "2 Hari 6 Jam"
  },
  {
    workOrder: "20204/SWO/23/04/00003",
    serviceAdvisor: "Syamsuryanan Amir",
    vendor: "WIS",
    entryDate: "03 April 2023",
    endDate: "04 April 2023",
    totalDuration: "1 Hari 4 Jam"
  }
];

export default SummaryProcessUnit;

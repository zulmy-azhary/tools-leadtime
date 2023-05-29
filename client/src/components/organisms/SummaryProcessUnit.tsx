import React from "react";
import { ContentWrapper, Filter, Header, Pagination, Table } from "../molecules";
import { Button, Card, Heading } from "../atoms";
import type { TSummaryData } from "../../types";
import { summaryColumns } from "../../helpers/tableColumns";
import clsx from "clsx";
import type { ColumnDef } from "@tanstack/react-table";
import { IoMdInformationCircle } from "react-icons/io";
import { useTableInstance } from "../../hooks";
import { useQuery } from "react-query";
import { getAllSummary } from "../../api/summary";
import { formatTime, getDateFormattedData } from "../../helpers/functions";

const SummaryProcessUnit: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["summary", "getAll"],
    queryFn: async () => {
      let data = await getAllSummary();

      data = getDateFormattedData<TSummaryData>(data);

      return data.map(item => {
        return {
          ...item,
          totalDuration: formatTime(+item.totalDuration)
        };
      });
    }
  });

  const instanceTable = useTableInstance({
    data: data ?? [],
    columns: summaryColumns,
    action
  });

  return (
    <ContentWrapper className="overflow-hidden">
      <Header headerTitle="Summary Process Unit" description="Leadtime & Paint" className="col-span-full" />
      <Card className="flex flex-col gap-y-8 overflow-y-auto px-8 py-6">
        <div className="flex flex-wrap items-center gap-4">
          <Heading className="grow text-center text-xl font-semibold md:text-left">Summary Table</Heading>
          <Filter
            instance={instanceTable}
            placeholder="Search Work Order"
            wrapperClassName="w-full md:w-fit"
            clearable
          />
          <Button
            className={clsx(
              "border-button-bd-light dark:border-button-bd-dark bg-button-bg-light dark:bg-button-bg-dark w-full cursor-pointer border-[1.6px] p-3 text-sm font-semibold md:w-fit"
            )}
          >
            Export CSV
          </Button>
        </div>
        <Table instance={instanceTable} isLoading={isLoading} />
        <Pagination instance={instanceTable} />
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

export default SummaryProcessUnit;

import type { ColumnDef } from "@tanstack/react-table";
import type { TSummary } from "../../types";
import { IoMdInformationCircle } from "react-icons/io";
import { entryDateColumn, serviceAdvisorColumn, vendorColumn, workOrderColumn } from "./globalColumns";

const endDateColumn = {
  header: "Tanggal Selesai",
  accessorKey: "endDate"
};

export const summaryColumns: Array<ColumnDef<TSummary>> = [
  workOrderColumn,
  serviceAdvisorColumn,
  vendorColumn,
  entryDateColumn,
  endDateColumn,
  {
    header: "Action",
    cell: ({ row }) => (
      <IoMdInformationCircle
        // eslint-disable-next-line no-console
        onClick={() => alert(JSON.stringify(row.original))}
        className="cursor-pointer text-blue-500"
        size="1.7em"
      />
    )
  }
];

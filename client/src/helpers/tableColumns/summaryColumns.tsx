import type { ColumnDef } from "@tanstack/react-table";
import type { TSummary } from "../../types";
import { IoMdInformationCircle } from "react-icons/io";
export const summaryColumns: Array<ColumnDef<TSummary, any>> = [
  {
    header: "Work Order",
    accessorKey: "workOrder"
  },
  {
    header: "Service Advisor",
    accessorKey: "serviceAdvisor"
  },
  {
    header: "Team Vendor",
    accessorKey: "vendor"
  },
  {
    header: "Tanggal Masuk",
    accessorKey: "entryDate"
  },
  {
    header: "Tanggal Selesai",
    accessorKey: "endDate"
  },
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

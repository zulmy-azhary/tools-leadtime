import type { ColumnDef } from "@tanstack/react-table";
import type { TSummaryData } from "../../types";
import { entryDateColumn, handOverColumn, serviceAdvisorColumn, vendorColumn, workOrderColumn } from "./globalColumns";

const durationColumn = {
  header: "Total Durasi",
  accessorKey: "totalDuration",
  enableGlobalFilter: false,
  enableSorting: false
};

export const summaryColumns: Array<ColumnDef<TSummaryData>> = [
  workOrderColumn,
  serviceAdvisorColumn,
  vendorColumn,
  entryDateColumn,
  handOverColumn,
  durationColumn
];

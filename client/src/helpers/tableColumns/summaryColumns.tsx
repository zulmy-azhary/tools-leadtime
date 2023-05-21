import type { ColumnDef } from "@tanstack/react-table";
import type { TSummaryData } from "../../types";
import { entryDateColumn, serviceAdvisorColumn, vendorColumn, workOrderColumn } from "./globalColumns";

const endDateColumn = {
  header: "Tanggal Selesai",
  accessorKey: "endDate",
  enableGlobalFilter: false,
  enableSorting: true
};

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
  endDateColumn,
  durationColumn
];

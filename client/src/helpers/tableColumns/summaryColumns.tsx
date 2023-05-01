import type { ColumnDef } from "@tanstack/react-table";
import type { TSummaryData } from "../../types";
import { entryDateColumn, serviceAdvisorColumn, vendorColumn, workOrderColumn } from "./globalColumns";

const endDateColumn = {
  header: "Tanggal Selesai",
  accessorKey: "endDate"
};

const durationColumn = {
  header: "Durasi",
  accessorKey: "duration"
};

export const summaryColumns: Array<ColumnDef<TSummaryData>> = [
  workOrderColumn,
  serviceAdvisorColumn,
  vendorColumn,
  entryDateColumn,
  endDateColumn,
  durationColumn
];

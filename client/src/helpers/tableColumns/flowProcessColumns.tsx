import type { ColumnDef } from "@tanstack/react-table";
import type { TFlowProcessDataUnit } from "../../types";
import { entryDateColumn, handOverColumn, plateNumberColumn, processColumn, workOrderColumn } from "./globalColumns";

const statusColumn = {
  header: "Status",
  accessorKey: "currentStatus",
  enableGlobaFilter: false,
  enableSorting: false
};

export const flowProcessColumns: Array<ColumnDef<TFlowProcessDataUnit>> = [
  workOrderColumn,
  plateNumberColumn,
  entryDateColumn,
  handOverColumn,
  processColumn,
  statusColumn
];

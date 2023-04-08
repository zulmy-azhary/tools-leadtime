import type { ColumnDef } from "@tanstack/react-table";
import type { TFlowProcess } from "../../types";
import {
  carTypeColumn,
  damageTypeColumn,
  entryDateColumn,
  handOverColumn,
  plateNumberColumn,
  processColumn,
  serviceAdvisorColumn,
  workOrderColumn
} from "./globalColumns";

export const flowProcessColumns: Array<ColumnDef<TFlowProcess>> = [
  workOrderColumn,
  plateNumberColumn,
  serviceAdvisorColumn,
  carTypeColumn,
  damageTypeColumn,
  entryDateColumn,
  handOverColumn,
  processColumn,
  {
    header: "Durasi",
    accessorKey: "duration"
  },
  {
    header: "Status",
    accessorKey: "status"
  }
];

import type { ColumnDef } from "@tanstack/react-table";
import type { TUnit } from "../../types";
import {
  carTypeColumn,
  damageTypeColumn,
  entryDateColumn,
  handOverColumn,
  plateNumberColumn,
  processColumn,
  serviceAdvisorColumn,
  vendorColumn,
  workOrderColumn
} from "./globalColumns";

export const unitColumns: Array<ColumnDef<TUnit>> = [
  workOrderColumn,
  plateNumberColumn,
  carTypeColumn,
  entryDateColumn,
  damageTypeColumn,
  vendorColumn,
  processColumn,
  serviceAdvisorColumn,
  handOverColumn
];

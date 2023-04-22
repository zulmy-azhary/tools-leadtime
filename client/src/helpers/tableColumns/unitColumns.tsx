import type { ColumnDef } from "@tanstack/react-table";
import type { TUnitData } from "../../types";
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

export const unitColumns: Array<ColumnDef<TUnitData>> = [
  workOrderColumn,
  plateNumberColumn,
  carTypeColumn,
  damageTypeColumn,
  vendorColumn,
  serviceAdvisorColumn,
  entryDateColumn,
  handOverColumn,
  processColumn
];

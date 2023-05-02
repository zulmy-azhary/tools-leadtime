import type { ColumnDef } from "@tanstack/react-table";
import type { TUnitData } from "../../types";
import {
  carTypeColumn,
  damageTypeColumn,
  entryDateColumn,
  handOverColumn,
  plateNumberColumn,
  processColumn,
  workOrderColumn
} from "./globalColumns";

export const unitColumns: Array<ColumnDef<TUnitData>> = [
  workOrderColumn,
  plateNumberColumn,
  carTypeColumn,
  damageTypeColumn,
  entryDateColumn,
  handOverColumn,
  processColumn
];

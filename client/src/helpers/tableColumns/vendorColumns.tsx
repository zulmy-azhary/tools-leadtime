import type { ColumnDef } from "@tanstack/react-table";
import type { TVendorData } from "../../types/vendor";
import { plateNumberColumn, serviceAdvisorColumn, vendorColumn, workOrderColumn } from "./globalColumns";

export const vendorColumns: Array<ColumnDef<TVendorData>> = [
  workOrderColumn,
  plateNumberColumn,
  serviceAdvisorColumn,
  vendorColumn
];

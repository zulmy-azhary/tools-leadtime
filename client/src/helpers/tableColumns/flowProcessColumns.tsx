import type { ColumnDef } from "@tanstack/react-table";
import type { TFlowProcess } from "../../types";
export const flowProcessColumns: Array<ColumnDef<TFlowProcess, any>> = [
  {
    header: "Work Order",
    accessorKey: "workOrder"
  },
  {
    header: "Nomor Polisi",
    accessorKey: "plateNumber"
  },
  {
    header: "Service Advisor",
    accessorKey: "serviceAdvisor"
  },
  {
    header: "Tipe Kendaraan",
    accessorKey: "carType"
  },
  {
    header: "Tipe Damage",
    accessorKey: "damageType"
  },
  {
    header: "Tanggal Masuk",
    accessorKey: "entryDate"
  },
  {
    header: "Janji Penyerahan",
    accessorKey: "handover"
  },
  {
    header: "Proses",
    accessorKey: "process"
  },
  {
    header: "Durasi",
    accessorKey: "duration"
  },
  {
    header: "Status",
    accessorKey: "status"
  }
];

import { date, object, string } from "yup";
import { ADVISOR, DAMAGE, PROCESS, VENDOR } from "../helpers/constants";

export const unitSchemas = object({
  workOrder: string().required("Work Order is required."),
  plateNumber: string().required("Nomor polisi is required."),
  carType: string().required("Tipe kendaraan or warna is required."),
  entryDate: date().required("Tanggal masuk is required.").typeError("Please choose date."),
  handover: date().required("Janji penyerahan is required.").typeError("Please choose date."),
  damageType: string().required("Jenis kerusakan is required.").oneOf(DAMAGE, "Select options first."),
  vendor: string().required("Team vendor is required.").oneOf(VENDOR, "Select options first."),
  process: string().required("Proses is required.").oneOf(PROCESS, "Select options first."),
  serviceAdvisor: string().required("Service advisor is required.").oneOf(ADVISOR, "Select options first.")
});

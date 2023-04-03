import { date, object, string } from "yup";

const DAMAGE: string[] = ["Ringan", "Sedang", "Berat"];
const VENDOR: string[] = ["WIS", "SPA"];
const PROCESS: string[] = [
  "Tunggu Teknisi",
  "Tunggu Part",
  "Ketokan",
  "Removal",
  "Putty",
  "Epoxy",
  "Masking",
  "Spraying",
  "Assembling",
  "Polishing"
];
const ADVISOR: string[] = [
  "Ahmad Supardi",
  "Fadli",
  "Hariyadi",
  "Imam",
  "Muhammad Fachri",
  "Musrin Noor",
  "Reza",
  "Syamsuryanan Amir"
];

export const unitSchemas = object({
  workOrder: string().required("Work Order is required."),
  policeNumber: string().required("Nomor polisi is required."),
  vechileType: string().required("Tipe kendraan or warna is required."),
  dateIn: date().required("Tanggal masuk is required.").typeError("Please choose date."),
  deliveryPromise: date().required("Janji penyerahan is required.").typeError("Please choose date."),
  damageType: string().required("Jenis kerusakan is required.").oneOf(DAMAGE, "Select options first."),
  teamVendor: string().required("Team vendor is required.").oneOf(VENDOR, "Select options first."),
  processType: string().required("Proses is required.").oneOf(PROCESS, "Select options first."),
  serviceAdvisor: string().required("Service advisor is required.").oneOf(ADVISOR, "Select options first.")
});

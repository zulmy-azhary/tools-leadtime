import type { TDamage, TMainProcess, TProcess, TServiceAdvisor, TVendor } from "../types/common";

export const SERVER_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const DAMAGE_TYPE: TDamage[] = ["Ringan", "Sedang", "Berat"];

export const VENDOR: TVendor[] = ["WIS", "SPA"];

export const MAIN_PROCESS: TMainProcess[] = [
  "Ketokan",
  "Removal",
  "Putty",
  "Epoxy",
  "Masking",
  "Spraying",
  "Assembling",
  "Polishing"
];

export const ALL_PROCESS: TProcess[] = ["Tunggu Teknisi", "Tunggu Part", ...MAIN_PROCESS];

export const SERVICE_ADVISOR: TServiceAdvisor[] = [
  "Ahmad Supardi",
  "Fadli",
  "Hariyadi",
  "Imam",
  "Muhammad Fachri",
  "Musrin Noor",
  "Reza",
  "Syamsuryanan Amir"
];

// QC
export const firstQualityCheck = [
  "Hasil ketok",
  "Anti karat",
  "Hasil fenereging",
  "Hasil pengelasan",
  "Dimensi ruang mesin",
  "Hasil pembongkaran"
];

export const secondQualityCheck = ["Hasil pelandaian", "Putty mark", "Pori-pori", "Hasil epoxy", "Stretch amplas"];

export const thirdQualityCheck = [
  "Hasil masking",
  "Glowsy",
  "Tidak terdapat pinhole",
  "Tidak terdapat putty mark",
  "Tidak terdapat creking",
  "Tidak terdapat runs",
  "Tidak terdapat fish eye",
  "Tidak terdapat overspray",
  "Tidak terdapat beda warna (Belang)",
  "Tidak terdapat mottling",
  "Tidak terdapat orange peal"
];

export const fourthQualityCheck = [
  "Hasil ketokan",
  "Hasil preparation",
  "Hasil spraying",
  "Hasil perakitan",
  "Ketinggian cahaya lampu",
  "Celah antara panel",
  "Hasil pencucian"
];

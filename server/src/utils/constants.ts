import type {
  TDamage,
  TVendor,
  TProcess,
  TServiceAdvisor,
  TUserRole,
  TStatus,
  TOtherProcess,
  TMainProcess
} from "../types";

export const USER_ROLE: TUserRole[] = ["Ketok", "Preparation", "Pengecatan", "Inspection"];

export const DAMAGE_TYPE: TDamage[] = ["Ringan", "Sedang", "Berat"];

export const VENDOR: TVendor[] = ["WIS", "SPA"];

export const OTHER_PROCESS: TOtherProcess[] = ["Tunggu Teknisi", "Tunggu Part"];
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

export const PROCESS: TProcess[] = [...OTHER_PROCESS, ...MAIN_PROCESS];

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

export const STATUS: TStatus[] = ["Menunggu", "Dikerjakan", "Selesai"];

import type { TDamage, TVendor, TProcess, TServiceAdvisor, TUserRole } from "../types";

export const USER_ROLE: TUserRole[] = ["Ketok", "Preparation", "Pengecatan", "Inspection"];

export const DAMAGE_TYPE: TDamage[] = ["Ringan", "Sedang", "Berat"];

export const VENDOR: TVendor[] = ["WIS", "SPA"];

export const PROCESS: TProcess[] = [
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

import type { TDamage, TProcess, TServiceAdvisor, TVendor } from "../types/common";

export const SERVER_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const DAMAGE_TYPE: TDamage[] = ["Ringan", "Sedang", "Berat"];

export const VENDOR: TVendor[] = ["WIS", "SPA"];

export const PROCESS: TProcess[] = [
  "Ketokan",
  "Removal",
  "Putty",
  "Epoxy",
  "Masking",
  "Spraying",
  "Assembling",
  "Polishing"
];

export const ALL_PROCESS: TProcess[] = ["Tunggu Teknisi", "Tunggu Part", ...PROCESS];

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

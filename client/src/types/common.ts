export type TUserRole = "Admin" | "Ketok" | "Preparation" | "Pengecatan" | "Inspection";

export type TDamage = "Ringan" | "Sedang" | "Berat";

export type TVendor = "WIS" | "SPA";

export type TProcess =
  | "Tunggu Teknisi"
  | "Tunggu Part"
  | "Ketokan"
  | "Removal"
  | "Putty"
  | "Epoxy"
  | "Masking"
  | "Spraying"
  | "Assembling"
  | "Polishing";

export type TServiceAdvisor =
  | "Ahmad Supardi"
  | "Fadli"
  | "Hariyadi"
  | "Imam"
  | "Muhammad Fachri"
  | "Musrin Noor"
  | "Reza"
  | "Syamsuryanan Amir";

export type TStatus = "Dikerjakan" | "Selesai";

export type TBaseData =
  | "workOrder"
  | "plateNumber"
  | "carType"
  | "entryDate"
  | "endDate"
  | "damageType"
  | "vendor"
  | "process"
  | "serviceAdvisor"
  | "handover"
  | "duration"
  | "status";

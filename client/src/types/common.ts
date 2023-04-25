export type TUserRole = "Admin" | "Ketok" | "Preparation" | "Pengecatan" | "Inspection";

export type TDamage = "Ringan" | "Sedang" | "Berat";

export type TVendor = "WIS" | "SPA";

export type TOtherProcess = "Tunggu Teknisi" | "Tunggu Part";

export type TMainProcess =
  | "Ketokan"
  | "Removal"
  | "Putty"
  | "Epoxy"
  | "Masking"
  | "Spraying"
  | "Assembling"
  | "Polishing";

export type TProcess = TOtherProcess | TMainProcess;

export type TServiceAdvisor =
  | "Ahmad Supardi"
  | "Fadli"
  | "Hariyadi"
  | "Imam"
  | "Muhammad Fachri"
  | "Musrin Noor"
  | "Reza"
  | "Syamsuryanan Amir";

export type TStatus = "Menunggu" | "Dikerjakan" | "Selesai";

export type TBaseData =
  | "workOrder"
  | "plateNumber"
  | "carType"
  | "entryDate"
  | "endDate"
  | "damageType"
  | "vendor"
  | "currentProcess"
  | "serviceAdvisor"
  | "handOver"
  | "duration"
  | "currentStatus";

export interface MongoId {
  _id: string;
}

export type TUserRole = "Admin" | "Ketok" | "Preparation" | "Pengecatan" | "Inspection";

export interface TUser {
  fullName: string;
  nik: string;
  password: string;
  role: TUserRole;
}

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

export interface TUnit {
  workOrder: string;
  plateNumber: string;
  carType: string;
  entryDate: string;
  handOver: string;
  damageType: TDamage;
  vendor: TVendor;
  process: TProcess;
  serviceAdvisor: TServiceAdvisor;
}

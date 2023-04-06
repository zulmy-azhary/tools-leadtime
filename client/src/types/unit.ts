import type { TDamage, TProcess, TServiceAdvisor, TVendor } from "./common";

export type TUnitProps =
  | "workOrder"
  | "plateNumber"
  | "carType"
  | "entryDate"
  | "damageType"
  | "vendor"
  | "process"
  | "serviceAdvisor"
  | "handover";

export type TUnit = Omit<Record<TUnitProps, string>, "damageType" | "vendor" | "process" | "serviceAdvisor"> & {
  damageType: TDamage;
  vendor: TVendor;
  process: TProcess;
  serviceAdvisor: TServiceAdvisor;
};

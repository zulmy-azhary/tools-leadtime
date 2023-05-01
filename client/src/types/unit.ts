import type { MongoId, TDamage, TProcess, TProcessItem, TServiceAdvisor, TStatus, TVendor } from ".";

export type TUnitProps =
  | "workOrder"
  | "plateNumber"
  | "carType"
  | "entryDate"
  | "damageType"
  | "vendor"
  | "currentProcess"
  | "serviceAdvisor"
  | "handOver";

export type TUnitData = Omit<
  Record<TUnitProps, string>,
  "damageType" | "vendor" | "currentProcess" | "serviceAdvisor"
> &
  MongoId & {
    damageType: TDamage;
    vendor: TVendor;
    processList: TProcessItem[];
    currentProcess: TProcess;
    serviceAdvisor: TServiceAdvisor;
    currentStatus: TStatus;
  };

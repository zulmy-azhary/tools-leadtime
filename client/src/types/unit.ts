import type { MongoId, TDamage, TProcess, TServiceAdvisor, TStatus, TVendor } from ".";

export type TUnitProps =
  | "workOrder"
  | "plateNumber"
  | "carType"
  | "entryDate"
  | "damageType"
  | "vendor"
  | "process"
  | "serviceAdvisor"
  | "handOver";

export type TUnitData = Omit<Record<TUnitProps, string>, "damageType" | "vendor" | "process" | "serviceAdvisor"> &
  MongoId & {
    damageType: TDamage;
    vendor: TVendor;
    process: TProcess;
    serviceAdvisor: TServiceAdvisor;
    status: TStatus;
  };

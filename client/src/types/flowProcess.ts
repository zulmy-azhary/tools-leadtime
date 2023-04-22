import type { MongoId, TBaseData, TMainProcess, TStatus, TUnitData } from ".";

export type TFlowProcessDataUnit = Omit<TUnitData, "carType" | "damageType" | "serviceAdvisor" | "vendor"> & {
  process: TMainProcess;
};

export type TProcessItem = {
  processName: TMainProcess;
  processStart?: string | Date;
  processFinish?: string | Date;
  duration?: number;
  status: TStatus;
} & Partial<MongoId>;

export type TFlowProcessData = Pick<Record<TBaseData, string>, "workOrder"> & {
  process: TProcessItem[];
} & Partial<MongoId>;

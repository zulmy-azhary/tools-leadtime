import type { TBaseData, TMainProcess, TStatus } from ".";

export interface TFlowProcess
  extends Omit<
    Record<TBaseData, string>,
    "vendor" | "endDate" | "carType" | "damageType" | "process" | "serviceAdvisor" | "duration"
  > {
  process: TMainProcess;
  status: TStatus;
}

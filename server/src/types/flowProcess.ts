import type { TMainProcess, TStatus } from ".";

export interface TFlowProcess {
  workOrder: string;
  process: Array<{ processName: TMainProcess; duration: number }>;
  status: TStatus;
}

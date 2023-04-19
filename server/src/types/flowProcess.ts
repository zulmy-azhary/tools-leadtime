import type { TMainProcess, TStatus } from ".";

export interface TProcessItem {
  processName: TMainProcess;
  processStart?: string;
  processFinish?: string;
  duration?: number;
  status: TStatus;
}
export interface TFlowProcessData {
  workOrder: string;
  process: TProcessItem[];
}

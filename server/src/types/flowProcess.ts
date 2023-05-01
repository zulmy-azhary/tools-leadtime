import type { TMainProcess, TStatus } from ".";

export interface TProcessItem {
  processName: TMainProcess;
  processStart?: string;
  processFinish?: string;
  duration?: number;
  status: TStatus;
}

import type { TDamage, TProcess, TProcessItem, TServiceAdvisor, TStatus, TVendor } from ".";

export interface TUnitData {
  workOrder: string;
  plateNumber: string;
  carType: string;
  entryDate: string;
  handOver: string;
  damageType: TDamage;
  vendor: TVendor;
  processList: TProcessItem[] | false;
  currentProcess: TProcess;
  serviceAdvisor: TServiceAdvisor;
  currentStatus: TStatus;
}

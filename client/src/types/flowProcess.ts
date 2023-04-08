import type { TBaseData, TDamage, TProcess, TServiceAdvisor, TStatus } from "./common";

export interface TFlowProcess
  extends Omit<Record<TBaseData, string>, "vendor" | "endDate" | "damageType" | "process" | "serviceAdvisor"> {
  damageType: TDamage;
  process: TProcess;
  serviceAdvisor: TServiceAdvisor;
  duration: string;
  status: TStatus;
}

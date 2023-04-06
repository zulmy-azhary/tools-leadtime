import type { TBaseData, TStatus } from "./common";

export interface TFlowProcess extends Omit<Record<TBaseData, string>, "vendor" | "endDate"> {
  duration: string;
  status: TStatus;
}

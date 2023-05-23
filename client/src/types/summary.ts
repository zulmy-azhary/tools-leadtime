import type { TBaseData, TServiceAdvisor, TVendor } from ".";

export interface TSummaryData extends Pick<Record<TBaseData, string>, "workOrder" | "entryDate" | "handOver"> {
  serviceAdvisor: TServiceAdvisor;
  vendor: TVendor;
  totalDuration: string | number;
}

import type { TBaseData, TServiceAdvisor, TVendor } from ".";

export interface TSummaryData extends Pick<Record<TBaseData, string>, "workOrder" | "entryDate"> {
  serviceAdvisor: TServiceAdvisor;
  vendor: TVendor;
  endDate: string;
  totalDuration: string;
}

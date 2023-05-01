import type { TBaseData, TServiceAdvisor, TVendor } from ".";

export interface TSummaryData
  extends Pick<Record<TBaseData, string>, "workOrder" | "serviceAdvisor" | "entryDate" | "vendor" | "duration"> {
  serviceAdvisor: TServiceAdvisor;
  vendor: TVendor;
  endDate: string;
  duration: string;
}

import type { TBaseData, TServiceAdvisor, TVendor } from ".";

export interface TSummary
  extends Pick<Record<TBaseData, string>, "workOrder" | "serviceAdvisor" | "entryDate" | "vendor" | "duration"> {
  serviceAdvisor: TServiceAdvisor;
  vendor: TVendor;
  endDate: string;
  duration: string;
}

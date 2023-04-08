import type { TBaseData, TServiceAdvisor, TVendor } from "./common";

export interface TSummary
  extends Pick<Record<TBaseData, string>, "workOrder" | "serviceAdvisor" | "entryDate" | "vendor"> {
  serviceAdvisor: TServiceAdvisor;
  vendor: TVendor;
  endDate: string;
}

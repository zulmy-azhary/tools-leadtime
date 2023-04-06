import type { TBaseData } from "./common";

export interface TSummary
  extends Pick<Record<TBaseData, string>, "workOrder" | "serviceAdvisor" | "entryDate" | "vendor"> {
  endDate: string;
}

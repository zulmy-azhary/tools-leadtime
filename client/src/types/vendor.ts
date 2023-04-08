import type { TBaseData, TServiceAdvisor, TVendor } from "./common";

export type TVendorData = Pick<Record<TBaseData, string>, "workOrder" | "plateNumber"> & {
  serviceAdvisor: TServiceAdvisor;
  vendor: TVendor;
};

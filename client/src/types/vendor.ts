import type { TBaseData, TServiceAdvisor, TVendor } from ".";

export type TVendorData = Pick<Record<TBaseData, string>, "workOrder" | "plateNumber"> & {
  serviceAdvisor: TServiceAdvisor;
  vendor: TVendor;
};

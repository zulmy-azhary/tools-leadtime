import type { TFlowProcess } from "../types";
import { axiosProtected } from "./axios";

export const getAllFlowProcess = async (): Promise<TFlowProcess[]> => {
  return await axiosProtected()
    .get("flowprocess/all")
    .then(res => res.data.data);
};

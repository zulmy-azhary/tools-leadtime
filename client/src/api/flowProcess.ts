import type { TFlowProcessDataUnit, TFlowProcessData, TProcessItem } from "../types";
import { axiosProtected } from "./axios";

export const getAllFlowProcess = async (): Promise<TFlowProcessDataUnit[]> => {
  return await axiosProtected()
    .get("/flowprocess/all")
    .then(res => res.data.data);
};

export const getFlowProcessById = async (_id: string): Promise<TFlowProcessData> => {
  return await axiosProtected()
    .get(`/flowprocess/${_id}`)
    .then(res => res.data.data);
};

export const createFlowProcess = async (data: TFlowProcessData) => {
  return await axiosProtected().post("/flowprocess/create", data);
};

export const updateFlowProcess = async (data: TProcessItem & { workOrder: string }) => {
  const { _id, ...rest } = data;
  return await axiosProtected().put(`/flowprocess/${_id}`, rest);
};

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

export const submitFlowProcess = async (process: {
  _id: string;
  dataProcess: TProcessItem & { workOrder: string };
  nextProcess?: TProcessItem;
}) => {
  return await axiosProtected().put(`/flowprocess/submit/${process._id}`, {
    dataProcess: process.dataProcess,
    nextProcess: process.nextProcess
  });
};

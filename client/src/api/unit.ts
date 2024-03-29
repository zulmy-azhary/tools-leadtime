import type { TUnitData } from "../types";
import { axiosProtected } from "./axios";

export const createUnit = async (data: Omit<TUnitData, "currentStatus" | "processList">) => {
  return await axiosProtected().post("/unit/create", data);
};

export const getAllUnit = async (): Promise<TUnitData[]> => {
  return await axiosProtected()
    .get("/unit/all")
    .then(res => res.data.data);
};

export const updateUnitById = async (data: Partial<Omit<TUnitData, "currentStatus">>) => {
  return await axiosProtected().put(`/unit/${data._id}`, data);
};

export const deleteUnitById = async (_id: string) => {
  return await axiosProtected().delete(`/unit/${_id}`);
};

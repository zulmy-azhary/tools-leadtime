import type { TUnit } from "../types";
import { axiosProtected } from "./axios";

export const createUnit = async (data: TUnit) => {
  return await axiosProtected().post("/unit/create", data);
};

export const getAllUnit = async (): Promise<TUnit[]> => {
  return await axiosProtected()
    .get("/unit/all")
    .then(res => res.data.data);
};

export const updateUnitById = async (data: Partial<TUnit>) => {
  return await axiosProtected().put(`/unit/${data._id}`, data);
};

export const getallCount = async () => {};

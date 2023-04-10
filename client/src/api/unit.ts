import type { TUnit } from "../types";
import { axiosProtected } from "./axios";

export const createUnit = async (data: TUnit) => {
  return await axiosProtected().post("/unit/create", data);
};

export const getAllUnit = async (): Promise<TUnit[]> => {
  return await axiosProtected()
    .get("/unit/getAll")
    .then(res => res.data.data);
};

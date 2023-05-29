import type { TSummaryData } from "../types";
import { axiosProtected } from "./axios";

export const getAllSummary = async (): Promise<TSummaryData[]> => {
  return await axiosProtected()
    .get("/summary/all")
    .then(res => res.data.data);
};

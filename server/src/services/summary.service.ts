import type { TSummaryData } from "../types";
import SummaryModel from "../models/summary.model";

export const createSummary = async (payload: TSummaryData) => {
  return await SummaryModel.create(payload);
};

export const getAllSummary = async () => {
  return await SummaryModel.find().sort({ createdAt: "descending" });
};

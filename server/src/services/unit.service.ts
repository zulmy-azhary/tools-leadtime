import UnitModel from "../models/unit.model";
import type { DocumentResult, TUnitData } from "../types";

export const createUnit = async (payload: TUnitData) => {
  return await UnitModel.create(payload);
};

export const getAllUnit = async () => {
  return await UnitModel.find().sort({ createdAt: "descending" });
};

export const getUnitByWorkOrder = async (workOrder: string): Promise<DocumentResult<TUnitData> | null> => {
  return await UnitModel.findOne({ workOrder });
};

export const updateUnitById = async (_id: string, data: Partial<TUnitData>) => {
  return await UnitModel.findByIdAndUpdate(_id, data);
};

export const deleteUnitById = async (_id: string) => {
  return await UnitModel.deleteOne({ _id });
};

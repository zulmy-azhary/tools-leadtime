import UnitModel from "../models/unit.model";
import type { TUnit } from "../types";

export const createUnit = async (payload: TUnit) => {
  return await UnitModel.create(payload);
};

export const getAllUnit = async () => {
  return await UnitModel.find();
};

export const getUnitByWorkOrder = async (workOrder: string) => {
  return await UnitModel.findOne({ workOrder });
};

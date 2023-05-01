import UnitModel from "../models/unit.model";
import type { TProcessItem, TUnitData } from "../types";

export const getProcessById = async (_id: string) => {
  return await UnitModel.findOne({ _id });
};

export const pushProcess = async (_id: string, processList: TProcessItem) => {
  return await UnitModel.updateOne({ _id }, { $push: { processList } });
};

export const updateProcess = async (
  _id: string,
  { currentProcess, currentStatus }: Partial<Pick<TUnitData, "currentProcess" | "currentStatus">>,
  processList: TProcessItem
) => {
  return await UnitModel.findByIdAndUpdate(_id, { currentProcess, currentStatus }).updateOne(
    { _id, "processList.processName": processList.processName },
    {
      $set: {
        "processList.$.processStart": processList.processStart,
        "processList.$.processFinish": processList.processFinish,
        "processList.$.duration": processList.duration,
        "processList.$.status": processList.status
      }
    }
  );
};

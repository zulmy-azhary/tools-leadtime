import type { Types } from "mongoose";
import FlowProcessModel from "../models/flowProcess.model";
import type { TFlowProcessData, TProcessItem } from "../types";

export const getProcessById = async (_id: string) => {
  return await FlowProcessModel.findOne({ _id });
};

export const createProcess = async (payload: TFlowProcessData & { _id?: Types.ObjectId }) => {
  return await FlowProcessModel.create(payload);
};

export const pushProcess = async (payload: TFlowProcessData & { _id: string }) => {
  return await FlowProcessModel.updateOne({ _id: payload._id }, { $push: { process: payload.process } });
};

export const updateProcess = async (workOrder: string, payload: TProcessItem) => {
  return await FlowProcessModel.updateOne(
    { workOrder, "process.processName": payload.processName },
    {
      $set: {
        "process.$.processStart": payload.processStart,
        "process.$.processFinish": payload.processFinish,
        "process.$.duration": payload.duration,
        "process.$.status": payload.status
      }
    }
  );
};

import mongoose from "mongoose";
import type { TFlowProcessData } from "../types";
import { MAIN_PROCESS, STATUS } from "../utils/constants";

const { Schema } = mongoose;

const flowProcessSchema = new Schema(
  {
    workOrder: {
      type: String,
      unique: true,
      required: true,
      length: 21
    },
    process: [
      {
        processName: {
          type: String,
          enum: MAIN_PROCESS
        },
        processStart: {
          type: Date
        },
        processFinish: {
          type: Date
        },
        duration: {
          type: Number
        },
        status: {
          type: String,
          enum: STATUS
        }
      }
    ]
  },
  { timestamps: true }
);

const FlowProcessModel = mongoose.model<TFlowProcessData>("FlowProcess", flowProcessSchema);

export default FlowProcessModel;

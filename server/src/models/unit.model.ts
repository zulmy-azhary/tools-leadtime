import mongoose from "mongoose";
import type { TUnitData } from "../types";
import { DAMAGE_TYPE, MAIN_PROCESS, PROCESS, SERVICE_ADVISOR, STATUS, VENDOR } from "../utils/constants";

const { Schema } = mongoose;

const unitSchema = new Schema(
  {
    workOrder: {
      type: String,
      unique: true,
      required: true,
      length: 21
    },
    plateNumber: {
      type: String,
      required: true
    },
    carType: {
      type: String,
      required: true
    },
    entryDate: {
      type: Date,
      required: true
    },
    handOver: {
      type: Date,
      required: true
    },
    damageType: {
      type: String,
      enum: DAMAGE_TYPE
    },
    vendor: {
      type: String,
      enum: VENDOR
    },
    processList: [
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
    ],
    currentProcess: {
      type: String,
      enum: PROCESS
    },
    serviceAdvisor: {
      type: String,
      enum: SERVICE_ADVISOR
    },
    currentStatus: {
      type: String,
      enum: STATUS
    }
  },
  { timestamps: true }
);

const UnitModel = mongoose.model<TUnitData>("Unit", unitSchema);

export default UnitModel;

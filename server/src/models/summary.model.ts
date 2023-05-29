import mongoose from "mongoose";
import type { TSummaryData } from "../types";
import { DAMAGE_TYPE, MAIN_PROCESS, SERVICE_ADVISOR, STATUS, VENDOR } from "../utils/constants";

const { Schema } = mongoose;

const summarySchema = new Schema(
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
    serviceAdvisor: {
      type: String,
      enum: SERVICE_ADVISOR
    },
    totalDuration: {
      type: Number
    }
  },
  { timestamps: true }
);

const SummaryModel = mongoose.model<TSummaryData>("Summary", summarySchema);

export default SummaryModel;

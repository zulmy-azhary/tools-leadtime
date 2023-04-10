import mongoose from "mongoose";
import type { TUnit } from "../types";
import { DAMAGE_TYPE, PROCESS, SERVICE_ADVISOR, VENDOR } from "../utils/constants";

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
    process: {
      type: String,
      enum: PROCESS
    },
    serviceAdvisor: {
      type: String,
      enum: SERVICE_ADVISOR
    }
  },
  { timestamps: true }
);

const UnitModel = mongoose.model<TUnit>("Unit", unitSchema);

export default UnitModel;

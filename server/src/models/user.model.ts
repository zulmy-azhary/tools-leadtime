import mongoose from "mongoose";
import type { TUser } from "../types";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      min: 4,
      max: 32
    },
    nik: {
      type: String,
      unique: true,
      required: true,
      length: 9
    },
    password: {
      type: String,
      required: true,
      min: 6
    },
    role: {
      type: String,
      enum: ["Admin", "Ketok", "Preparation", "Pengecatan", "Inspection"]
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model<TUser>("User", userSchema);

export default UserModel;

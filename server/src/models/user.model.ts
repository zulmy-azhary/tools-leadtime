import mongoose from "mongoose";
import type { TUserData } from "../types";
import { USER_ROLE } from "../utils/constants";

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
      enum: ["Admin", ...USER_ROLE]
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model<TUserData>("User", userSchema);

export default UserModel;

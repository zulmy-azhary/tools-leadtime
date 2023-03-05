import mongoose from "mongoose";
import type { TUser } from "../types";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 4,
      max: 16
    },
    lastName: {
      type: String,
      required: true,
      min: 4,
      max: 16
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
    picturePath: {
      type: String,
      default: ""
    },
    role: {
      type: String,
      enum: ["Admin", "Foreman", "Teknisi"],
      default: "Teknisi"
    },
    isOnline: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model<TUser>("User", userSchema);

export default UserModel;

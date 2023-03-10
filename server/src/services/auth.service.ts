import UserModel from "../models/user.model";
import type { TUser } from "../types";
import type { HydratedDocument } from "mongoose";

export const createUser = async (payload: TUser) => {
  return await UserModel.create(payload);
};

export const findUser = async (nik: string): Promise<HydratedDocument<Partial<TUser>> | null> => {
  return await UserModel.findOne({ nik });
};

export const findAndUpdateUser = async (nik: string, payload: Partial<Omit<TUser, "nik">>) => {
  return await UserModel.findOneAndUpdate({ nik }, payload, { new: true });
};

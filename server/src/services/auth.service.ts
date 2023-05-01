import UserModel from "../models/user.model";
import type { TUserData } from "../types";
import type { HydratedDocument } from "mongoose";

export const createUser = async (payload: TUserData) => {
  return await UserModel.create(payload);
};

export const findUser = async (nik: string): Promise<HydratedDocument<Partial<TUserData>> | null> => {
  return await UserModel.findOne({ nik });
};

export const findAndUpdateUser = async (nik: string, payload: Partial<Omit<TUserData, "nik">>) => {
  return await UserModel.findOneAndUpdate({ nik }, payload, { new: true });
};

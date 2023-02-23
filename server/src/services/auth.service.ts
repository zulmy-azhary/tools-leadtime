import UserModel from "../models/user.model";
import type { TUser } from "../types";
import type { Types } from "mongoose";

export const createUser = async (payload: TUser) => {
  return await UserModel.create(payload);
};

export const findUser = async (nik: string): Promise<(Partial<TUser> & { _id: Types.ObjectId }) | null> => {
  return await UserModel.findOne({ nik });
};

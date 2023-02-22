import { logger } from "../utils/logger";
import UserModel from "../models/user.model";
import type { TUser } from "../types";

export const fetchUser = async () => {
  return await UserModel.find()
    .then(data => {
      return data;
    })
    .catch(error => {
      logger.info("Cannot fetch users from database");
      logger.error(error);
    });
};

export const createUser = async (payload: TUser) => {
  return await UserModel.create(payload);
};

export const retrieveExistingUser = async (nik: string) => {
  const retrieved = await UserModel.find({ nik });

  return !!retrieved.length;
};

import { logger } from '../utils/logger';
import UserModel from '../models/user.model';
import type { User } from '../types';

export const fetchUser = async () => {
  return await UserModel.find()
    .then(data => {
      return data;
    })
    .catch(error => {
      logger.info('Cannot fetch users from database');
      logger.error(error);
    });
};

export const createUser = async (payload: User) => {
  return await UserModel.create(payload);
};

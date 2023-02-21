import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import { createUser, fetchUser } from '../services/auth.service';
import type { User } from '../types';
// import jwt from 'jsonwebtoken'

import { logger } from '../utils/logger';

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, picturePath }: User = req.body;

    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(password, salt);
    const newUser = await createUser({
      firstName,
      lastName,
      password: passHash,
      email,
      picturePath
    });

    return res.status(201).send({ status: true, statusCode: 201, data: newUser });
  } catch (err) {
    logger.error(err);
    return res.status(500).send({ status: false, statusCode: 500, message: err });
  }
};

export const login = async (req: Request, res: Response) => {};

// We'll delete later
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await fetchUser();

  return res.status(200).send({ status: true, statusCode: 200, data: users });
};

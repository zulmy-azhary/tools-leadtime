import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { createUser, findUser } from "../services/auth.service";
import { createUserValidation } from "../validations/user.validation";
import { logger } from "../utils/logger";
import type { TUser } from "../types";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { error, value } = createUserValidation(req.body);
    if (error) {
      logger.error("USER -> REGISTER =", error.details[0].message);
      return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
    }
    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(value.password, salt);
    const retrievedUser = await findUser(value.nik);
    // If NIK doesn't exist in the database, then create user
    if (!retrievedUser) {
      return await createUser({ ...value, role: "default", password: passHash }).then(() => {
        logger.info("USER - REGISTER => User registration successfully!!");
        res.status(201).send({ status: true, statusCode: 201, message: "User registration successfully!!" });
      });
    }
    // If NIK exists in the DB, then send error to the client
    logger.error(`USER -> REGISTER = NIK "${value.nik}" already exists. Please try with another one.`);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: `NIK "${value.nik}" already exists. Please try with another one.`
    });
  } catch (err) {
    logger.error(`USER -> REGISTER = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { nik, password }: Pick<TUser, "nik" | "password"> = req.body;
    const fetchedUser = await findUser(nik);
    if (!fetchedUser) {
      logger.error("USER -> LOGIN = User does not exist.");
      return res.status(400).send({ status: false, statusCode: 400, message: "User does not exist." });
    }

    const isMatch = await bcrypt.compare(password, fetchedUser.password as string);
    if (!isMatch) {
      logger.error("USER -> LOGIN = Invalid NIK and password.");
      return res.status(400).send({ status: false, statusCode: 400, message: "Invalid NIK and password." });
    }

    const token = jwt.sign({ id: fetchedUser._id }, process.env.JWT_SECRET as string);
    delete fetchedUser.password;

    logger.error(`USER -> LOGIN = Login successfully with NIK ${fetchedUser.nik}.`);
    return res.status(200).send({ status: true, statusCode: 200, message: "", data: { token, user: fetchedUser } });
  } catch (err) {
    logger.error(`USER -> LOGIN = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};

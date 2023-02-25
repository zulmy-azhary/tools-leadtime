import type { Request, Response } from "express";
import { createUser, findUser } from "../services/auth.service";
import { createUserValidation, loginValidation, refreshTokenValidation } from "../validations/user.validation";
import { logger } from "../utils/logger";
import { checkPassword, hashPassword } from "../utils/hashing";
import { reIssueAccessToken, signJWT } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { error, value } = createUserValidation(req.body);
  if (error) {
    logger.error("USER -> REGISTER = ", error.details[0].message);
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
  }

  try {
    // Hash password
    value.password = hashPassword(value.password);

    const retrievedUser = await findUser(value.nik);
    // If NIK doesn't exist in the database, then create user
    if (!retrievedUser) {
      return await createUser({ ...value, role: "default" }).then(() => {
        logger.info("USER - REGISTER => User registration successfully!!");
        res.status(201).send({ status: true, statusCode: 201, message: "User registration successfully!!" });
      });
    }
    // If NIK exists in the DB, then send error to the client
    logger.error(`USER -> REGISTER = NIK "${value.nik}" already exists. Please try another one.`);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: `NIK "${value.nik}" already exists. Please try another one.`
    });
  } catch (err) {
    logger.error(`USER -> REGISTER = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { error, value } = loginValidation(req.body);
  if (error) {
    logger.error("USER -> LOGIN = ", error.details[0].message);
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
  }

  try {
    const fetchedUser = await findUser(value.nik);
    if (!fetchedUser) {
      logger.error("USER -> LOGIN = User does not exist.");
      return res.status(401).send({ status: false, statusCode: 401, message: "User does not exist." });
    }

    const isMatch = checkPassword(value.password, fetchedUser.password as string);
    if (!isMatch) {
      logger.error("USER -> LOGIN = Invalid credentials.");
      return res.status(401).send({ status: false, statusCode: 401, message: "Invalid credentials." });
    }

    const accessToken = signJWT({ ...fetchedUser }, { expiresIn: "1d" });
    const refreshToken = signJWT({ ...fetchedUser }, { expiresIn: "1y" });

    logger.info(`USER -> LOGIN = Login successfully with NIK ${fetchedUser.nik}.`);
    return res
      .status(200)
      .send({ status: true, statusCode: 200, message: "Login succesfully!", data: { accessToken, refreshToken } });
  } catch (err) {
    logger.error(`USER -> LOGIN = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { error, value } = refreshTokenValidation(req.body);
  if (error) {
    logger.error("USER -> REFRESH TOKEN = ", error.details[0].message);
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
  }
  try {
    reIssueAccessToken(value.refreshToken);
    logger.info("USER -> LOGIN = Refresh token successfully!.");
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: "Refresh token successfully!",
      data: { refreshToken }
    });
  } catch (err) {
    logger.error(`USER -> REFRESH TOKEN = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};

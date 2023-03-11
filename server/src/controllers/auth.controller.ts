import type { CookieOptions, Request, Response } from "express";
import { createUser, findUser } from "../services/auth.service";
import {
  createUserValidation,
  loginValidation,
  logoutValidation,
  refreshTokenValidation
} from "../validations/auth.validation";
import { logger } from "../utils/logger";
import { checkPassword, hashPassword } from "../utils/hashing";
import { reIssueAccessToken, signJWT } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { error, value } = createUserValidation(req.body);
  if (error) {
    logger.error("AUTH -> REGISTER = ", error.details[0].message);
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
  }

  try {
    // Hash password
    value.password = hashPassword(value.password);

    const retrievedUser = await findUser(value.nik);
    // If NIK doesn't exist in the database, then create user
    if (!retrievedUser) {
      return await createUser({ ...value }).then(() => {
        logger.info("AUTH - REGISTER => User registration successfully!!");
        res.status(201).send({ status: true, statusCode: 201, message: "User registration successfully!!" });
      });
    }
    // If NIK exists in the DB, then send error to the client
    logger.error(`AUTH -> REGISTER = NIK "${value.nik}" already exists. Please try another one.`);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: `NIK "${value.nik}" already exists. Please try another one.`
    });
  } catch (err) {
    logger.error(`AUTH -> REGISTER = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { error, value } = loginValidation(req.body);
  if (error) {
    logger.error("AUTH -> LOGIN = ", error.details[0].message);
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
  }

  try {
    // Find and update online status of an user
    const fetchedUser = await findUser(value.nik);

    // Check if user doesn't exist
    if (!fetchedUser) {
      logger.error("AUTH -> LOGIN = User does not exist.");
      return res.status(401).send({ status: false, statusCode: 401, message: "User does not exist." });
    }

    // Check if password are match
    const isMatch = checkPassword(value.password, fetchedUser.password as string);
    if (!isMatch) {
      logger.error("AUTH -> LOGIN = Invalid credentials.");
      return res.status(401).send({ status: false, statusCode: 401, message: "Invalid credentials." });
    }

    // Delete password before create token
    delete (fetchedUser as any)?._doc.password;

    // Create accessToken & refreshToken
    const accessToken = signJWT({ ...fetchedUser }, { expiresIn: 1000 * 60 * 60 * 24 }); // 1 Day
    const refreshToken = signJWT({ ...fetchedUser }, { expiresIn: 1000 * 60 * 60 * 24 * 30 }); // 30 Days

    // Set cookie for accessToken & refreshToken
    const config: CookieOptions = {
      httpOnly: true,
      sameSite: "none",
      secure: true
    };

    // Set httpOnly cookie to header response
    res.cookie("refreshToken", refreshToken, {
      ...config,
      maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
    });

    logger.info(`AUTH -> LOGIN = Login successfully with NIK ${fetchedUser.nik}.`);
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: "Login succesfully!",
      data: { nik: fetchedUser.nik, accessToken }
    });
  } catch (err) {
    logger.error(`AUTH -> LOGIN = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { error, value } = refreshTokenValidation(req.cookies.refreshToken);
  if (error) {
    logger.error("AUTH -> REFRESH TOKEN = ", error.details[0].message);
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
  }

  try {
    const newAccessToken = await reIssueAccessToken(value.refreshToken);
    if (!newAccessToken) {
      logger.error("AUTH -> REFRESH TOKEN = Invalid refresh token.");
      return res.status(401).send({
        status: false,
        statusCode: 401,
        message: "Invalid refresh token!"
      });
    }
    logger.info("AUTH -> REFRESH TOKEN = Refresh token successfully!.");
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: "Refresh token successfully!",
      data: { accessToken: newAccessToken }
    });
  } catch (err) {
    logger.error(`AUTH -> REFRESH TOKEN = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};

export const logout = async (req: Request, res: Response) => {
  const { error, value } = logoutValidation(req.body);
  if (error) {
    logger.error("AUTH -> LOGOUT = ", error.details[0].message);
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
  }

  try {
    res.clearCookie("refreshToken");
    logger.info(`AUTH -> LOGOUT = User ${value.nik} are logout.`);
    return res.status(201).send({ status: true, statusCode: 201, message: "You are logout." });
  } catch (err) {
    logger.error(`AUTH -> LOGOUT = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};

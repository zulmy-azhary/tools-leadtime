import type { Request, Response } from "express";
import { logger } from "../utils/logger";

export const getMe = async (req: Request, res: Response) => {
  try {
    logger.info("USER -> GET ME = User identified.");
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: "User is authenticated."
    });
  } catch (err) {
    logger.error(`USER -> GET ME = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};

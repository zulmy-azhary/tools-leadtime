import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { getAllSummary } from "../services/summary.service";

export const getSummary = async (req: Request, res: Response) => {
  try {
    const retrievedSummary = await getAllSummary();

    logger.info("SUMMARY -> GET_ALL = Summary retrieved!!");
    return res.status(200).send({ status: true, statusCode: 200, data: retrievedSummary });
  } catch (err) {
    logger.error(`SUMMARY -> GET_ALL = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};

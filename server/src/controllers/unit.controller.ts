import type { Request, Response } from "express";
import { createUnitValidation } from "../validations";
import { logger } from "../utils/logger";
import { createUnit, getAllUnit, getUnitByWorkOrder } from "../services/unit.service";

export const create = async (req: Request, res: Response) => {
  const { error, value } = createUnitValidation(req.body);
  if (error) {
    logger.error(`UNIT -> CREATE = ${error.details[0].message}`);
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
  }

  try {
    const isUnitExist = await getUnitByWorkOrder(value.workOrder);

    if (isUnitExist) {
      logger.error(`UNIT -> CREATE = Unit ${value.workOrder} already exists.`);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: `Unit ${value.workOrder} already exists.` });
    }

    return await createUnit(value).then(() => {
      logger.info(`UNIT -> CREATE = Data Unit ${value.workOrder} created!!`);
      res.status(201).send({ status: true, statusCode: 201, message: `Unit ${value.workOrder} created!!` });
    });
  } catch (err) {
    logger.error(`UNIT -> CREATE = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const retrievedUnit = await getAllUnit();

    logger.info("UNIT -> GET_ALL = Data Unit retrieved!!");
    return res.status(200).send({ status: true, statusCode: 200, data: retrievedUnit });
  } catch (err) {
    logger.error(`UNIT -> GET_ALL = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};

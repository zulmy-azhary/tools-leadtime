import type { Request, Response } from "express";
import { createUnitValidation, updateUnitValidation } from "../validations";
import { logger } from "../utils/logger";
import { handleWaitingProcess } from "../utils/functions";
import { createUnit, deleteUnitById, getAllUnit, getUnitByWorkOrder, updateUnitById } from "../services/unit.service";
import type { TMainProcess, TProcessItem, TUnitData } from "../types";

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

    const isWaitingProcess = handleWaitingProcess(value.currentProcess);

    // Create Unit
    await createUnit({
      ...value,
      currentStatus: "Menunggu",
      processList: !isWaitingProcess
        ? ([{ processName: value.currentProcess, status: "Menunggu" }] as TProcessItem[])
        : []
    });

    logger.info(`UNIT -> CREATE = Unit ${value.workOrder} created!!`);
    return res.status(201).send({ status: true, statusCode: 201, message: `Unit ${value.workOrder} created!!` });
  } catch (err) {
    logger.error(`UNIT -> CREATE = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const retrievedUnit = await getAllUnit();

    logger.info("UNIT -> GET_ALL = Unit retrieved!!");
    return res.status(200).send({ status: true, statusCode: 200, data: retrievedUnit });
  } catch (err) {
    logger.error(`UNIT -> GET_ALL = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};

export const updateUnit = async (req: Request, res: Response) => {
  const { _id, ...rest } = req.body;
  const { error, value } = updateUnitValidation(rest);
  if (error) {
    logger.error(`UNIT -> UPDATE = ${error.details[0].message}`);
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
  }

  try {
    const { currentProcess } = value;
    const isWaitingProcess = handleWaitingProcess(currentProcess);

    const payload: Partial<TUnitData> =
      currentProcess && !isWaitingProcess
        ? { ...value, processList: [{ processName: currentProcess as TMainProcess, status: "Menunggu" }] }
        : value;

    await updateUnitById(_id, payload);

    logger.info("UNIT -> UPDATE = Unit updated successfully!!");
    return res.status(200).send({ status: true, statusCode: 200, message: "Unit updated successfully!!" });
  } catch (err) {
    logger.error(`UNIT -> UPDATE = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};

export const deleteUnit = async (req: Request, res: Response) => {
  try {
    await deleteUnitById(req.params.id);

    logger.info("UNIT -> DELETE = Unit deleted successfully!!");
    return res.status(200).send({ status: true, statusCode: 200, message: "Unit deleted successfully!!" });
  } catch (err) {
    logger.error(`UNIT -> DELETE = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};

import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { getAllUnit } from "../services/unit.service";
import { updateFlowProcessValidation } from "../validations";
import { pushProcess, updateProcess } from "../services/flowProcess.service";
import type { TProcessItem } from "../types";

export const getAllFlowProcess = async (req: Request, res: Response) => {
  try {
    const retrievedUnit = await getAllUnit();

    logger.info("FLOW_PROCESS -> GET_ALL = Flow Process retrieved!!");
    return res.status(200).send({ status: true, statusCode: 200, data: retrievedUnit });
  } catch (err) {
    logger.error(`FLOW_PROCESS -> GET_ALL = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};

export const updateFlowProcess = async (req: Request, res: Response) => {
  const { workOrder, ...processList } = req.body;
  const { error, value } = updateFlowProcessValidation(processList);

  if (error) {
    logger.error(`FLOW_PROCESS -> UPDATE = ${error.details[0].message}`);
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
  }

  try {
    // Update unit status
    return await updateProcess(
      req.params.id,
      { currentProcess: value.processName, currentStatus: value.status },
      value
    ).then(() => {
      logger.info(`FLOW_PROCESS -> UPDATE = Update flow process for ${workOrder} successfully!!`);
      res
        .status(200)
        .send({ status: true, statusCode: 200, message: `Update flow process for ${workOrder} successfully!!` });
    });
  } catch (err) {
    logger.error(`FLOW_PROCESS -> UPDATE = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};

export const submitFlowProcess = async (req: Request, res: Response) => {
  const { id: _id } = req.params;
  const { nextProcess, dataProcess } = req.body as {
    nextProcess: TProcessItem;
    dataProcess: TProcessItem & { workOrder: string };
  };
  const { workOrder, ...processList } = dataProcess;
  const { error, value } = updateFlowProcessValidation(processList);

  if (error) {
    logger.error(`FLOW_PROCESS -> SUBMIT = ${error.details[0].message}`);
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
  }

  try {
    await updateProcess(
      _id,
      {
        currentProcess: nextProcess ? nextProcess.processName : dataProcess.processName,
        currentStatus: nextProcess ? nextProcess.status : dataProcess.status
      },
      value
    );
    if (nextProcess) await pushProcess(_id, nextProcess);

    logger.info(`FLOW_PROCESS -> SUBMIT = Process ${workOrder} are finished.`);
    return res.status(200).send({ status: true, statusCode: 200, message: `Process ${workOrder} are finished.` });
  } catch (err) {
    logger.error(`FLOW_PROCESS -> SUBMIT = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};

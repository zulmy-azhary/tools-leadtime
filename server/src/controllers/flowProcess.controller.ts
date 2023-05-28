import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { deleteUnitById, getAllUnit, getUnitByWorkOrder } from "../services/unit.service";
import { updateFlowProcessValidation } from "../validations";
import { pushProcess, updateProcess } from "../services/flowProcess.service";
import type { TProcessItem, TSummaryData, TUnitData } from "../types";
import { createSummary } from "../services/summary.service";

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
      logger.info(`FLOW_PROCESS -> UPDATE = Clock on for ${workOrder} started.`);
      res.status(200).send({ status: true, statusCode: 200, message: `Clock on for ${workOrder} started.` });
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

    // If this is the last process, then duplicate unit into summary
    if (!nextProcess) {
      const getSelectedUnit = await getUnitByWorkOrder(workOrder);
      const { currentProcess, currentStatus, ...rest } = getSelectedUnit?._doc as TUnitData;

      const totalDuration = (rest.processList as TProcessItem[]).reduce(
        (total, process) => total + (process.duration as number),
        0
      );

      const payload: TSummaryData = {
        ...rest,
        totalDuration
      };

      await createSummary(payload);
      await deleteUnitById(_id);

      const message =
        "All flow processes have been completed. Please see the entire process of WorkOrder in the summary table.";

      logger.info(`FLOW_PROCESS -> SUBMIT = ${message}`);
      return res.status(200).send({ status: true, statusCode: 200, message });
    }

    const message = `Process ${workOrder} are finished.`;
    await pushProcess(_id, nextProcess);
    logger.info(`FLOW_PROCESS -> SUBMIT = ${message}`);
    return res.status(200).send({ status: true, statusCode: 200, message });
  } catch (err) {
    logger.error(`FLOW_PROCESS -> SUBMIT = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};

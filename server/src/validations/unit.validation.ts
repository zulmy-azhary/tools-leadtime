import Joi from "joi";
import type { TProcessItem, TUnitData } from "../types";
import { DAMAGE_TYPE, PROCESS, SERVICE_ADVISOR, STATUS, VENDOR } from "../utils/constants";
import { processItem } from "./flowProcess.validation";

const unit = {
  plateNumber: Joi.string().required(),
  carType: Joi.string().required(),
  entryDate: Joi.date().required(),
  handOver: Joi.date().required(),
  damageType: Joi.string().valid(...DAMAGE_TYPE),
  vendor: Joi.string().valid(...VENDOR),
  currentProcess: Joi.string().valid(...PROCESS),
  serviceAdvisor: Joi.string().valid(...SERVICE_ADVISOR),
  currentStatus: Joi.string().valid(...STATUS)
};

export const createUnitValidation = (payload: TUnitData): Joi.ValidationResult<TUnitData> => {
  const schema = Joi.object({
    workOrder: Joi.string().required().length(21),
    processList: Joi.array<TProcessItem>().items(processItem),
    ...unit
  });

  return schema.validate(payload);
};

export const updateUnitValidation = (payload: TUnitData): Joi.ValidationResult<TUnitData> => {
  const schema = Joi.object({
    ...unit
  });

  return schema.validate(payload);
};

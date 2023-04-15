import Joi from "joi";
import type { TUnit } from "../types";
import { DAMAGE_TYPE, PROCESS, SERVICE_ADVISOR, VENDOR } from "../utils/constants";

export const createUnitValidation = (payload: TUnit): Joi.ValidationResult<TUnit> => {
  const schema = Joi.object({
    workOrder: Joi.string().required().length(21),
    plateNumber: Joi.string().required(),
    carType: Joi.string().required(),
    entryDate: Joi.date().required(),
    handOver: Joi.date().required(),
    damageType: Joi.string().valid(...DAMAGE_TYPE),
    vendor: Joi.string().valid(...VENDOR),
    process: Joi.string().valid(...PROCESS),
    serviceAdvisor: Joi.string().valid(...SERVICE_ADVISOR)
  });

  return schema.validate(payload);
};

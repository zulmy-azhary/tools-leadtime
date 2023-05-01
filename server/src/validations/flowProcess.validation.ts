import Joi from "joi";
import type { TProcessItem } from "../types";
import { PROCESS, STATUS } from "../utils/constants";

export const updateFlowProcessValidation = (payload: TProcessItem): Joi.ValidationResult<TProcessItem> => {
  const schema = Joi.object({
    processName: Joi.string().valid(...PROCESS),
    processStart: Joi.date(),
    processFinish: Joi.date(),
    duration: Joi.number(),
    status: Joi.string().valid(...STATUS)
  });

  return schema.validate(payload);
};

import Joi from "joi";
import type { TProcessItem } from "../types";
import { PROCESS, STATUS } from "../utils/constants";

export const processItem = {
  processName: Joi.string().valid(...PROCESS),
  processStart: Joi.date(),
  processFinish: Joi.date(),
  duration: Joi.number(),
  status: Joi.string().valid(...STATUS)
};

export const updateFlowProcessValidation = (payload: TProcessItem): Joi.ValidationResult<TProcessItem> => {
  const schema = Joi.object({
    ...processItem
  });

  return schema.validate(payload);
};

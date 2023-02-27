import Joi from "joi";
import type { TUser } from "../types";

export const getUserValidation = (payload: Omit<TUser, "password">): Joi.ValidationResult<Omit<TUser, "password">> => {
  const schema = Joi.object({
    firstName: Joi.string().required().min(4).max(16),
    lastName: Joi.string().required().min(4).max(16),
    nik: Joi.string()
      .required()
      .regex(/^[0-9]+$/)
      .length(9),
    picturePath: Joi.string(),
    role: Joi.string().valid("default", "admin")
  });

  return schema.validate(payload);
};

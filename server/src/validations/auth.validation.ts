import Joi from "joi";
import type { TUser } from "../types";

export const createUserValidation = (payload: TUser): Joi.ValidationResult<TUser> => {
  const schema = Joi.object({
    fullName: Joi.string().required().min(4).max(32),
    nik: Joi.string()
      .required()
      .regex(/^[0-9]+$/)
      .length(9),
    password: Joi.string().required().min(6),
    role: Joi.string().valid("Ketok", "Preparation", "Pengecatan", "Inspection")
  });

  return schema.validate(payload);
};

export const loginValidation = (
  payload: Pick<TUser, "nik" | "password">
): Joi.ValidationResult<Pick<TUser, "nik" | "password">> => {
  const schema = Joi.object({
    nik: Joi.string()
      .required()
      .regex(/^[0-9]+$/)
      .length(9),
    password: Joi.string().required().min(6)
  });

  return schema.validate(payload);
};

export const logoutValidation = (payload: Pick<TUser, "nik">): Joi.ValidationResult<Pick<TUser, "nik">> => {
  const schema = Joi.object({
    nik: Joi.string()
      .required()
      .regex(/^[0-9]+$/)
      .length(9)
  });

  return schema.validate(payload);
};

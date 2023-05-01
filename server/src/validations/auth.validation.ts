import Joi from "joi";
import type { TUserData } from "../types";
import { USER_ROLE } from "../utils/constants";

export const createUserValidation = (payload: TUserData): Joi.ValidationResult<TUserData> => {
  const schema = Joi.object({
    fullName: Joi.string().required().min(4).max(32),
    nik: Joi.string()
      .required()
      .regex(/^[0-9]+$/)
      .length(9),
    password: Joi.string().required().min(6),
    role: Joi.string().valid(...USER_ROLE)
  });

  return schema.validate(payload);
};

export const loginValidation = (
  payload: Pick<TUserData, "nik" | "password">
): Joi.ValidationResult<Pick<TUserData, "nik" | "password">> => {
  const schema = Joi.object({
    nik: Joi.string()
      .required()
      .regex(/^[0-9]+$/)
      .length(9),
    password: Joi.string().required().min(6)
  });

  return schema.validate(payload);
};

export const logoutValidation = (payload: Pick<TUserData, "nik">): Joi.ValidationResult<Pick<TUserData, "nik">> => {
  const schema = Joi.object({
    nik: Joi.string()
      .required()
      .regex(/^[0-9]+$/)
      .length(9)
  });

  return schema.validate(payload);
};

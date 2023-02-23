import axios from "axios";
import { BASE_URL } from "../helpers/constant";
import type { TLogin, TUser } from "../types";

export const registerUser = async (data: Omit<TUser, "confirmPassword" | "role">) => {
  return await axios.post(`${BASE_URL}/auth/register`, data);
};

export const login = async (data: TLogin) => {
  return await axios.post(`${BASE_URL}/auth/login`, data);
};

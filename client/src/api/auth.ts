import axios from "axios";
import { BASE_URL } from "../helpers/constant";
import type { TLogin, TUser, TToken } from "../types";
import Cookies from "js-cookie";

export const registerUser = async (data: Omit<TUser, "confirmPassword" | "role">) => {
  return await axios.post(`${BASE_URL}/auth/register`, data);
};

export const login = async (data: TLogin) => {
  return await axios.post(`${BASE_URL}/auth/login`, { ...data }, { withCredentials: true });
};

export const refreshToken = async (data: Pick<TToken, "refreshToken">) => {
  return await axios.post(`${BASE_URL}/auth/refresh`, data);
};

export const getMe = async () => {
  const accessToken = Cookies.get("accessToken");
  return await axios.get(`${BASE_URL}/user/getMe`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

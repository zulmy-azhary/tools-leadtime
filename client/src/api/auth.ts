import type { TLogin, TUser } from "../types";
import Cookies from "js-cookie";
import axios from "./axios";

export const registerUser = async (data: Omit<TUser, "confirmPassword">) => {
  return await axios.post("/auth/register", data);
};

export const login = async (data: TLogin) => {
  return await axios.post("/auth/login", { ...data }, { withCredentials: true });
};

export const refreshToken = async () => {
  const accessToken = Cookies.get("accessToken");
  return await axios.post("/auth/refresh", {
    withCredentials: true,
    headers: { Authorization: `Bearer ${accessToken}` }
  });
};

export const getMe = async () => {
  const accessToken = Cookies.get("accessToken");
  return await axios.get("/user/getMe", { headers: { Authorization: `Bearer ${accessToken}` } });
};

export const logout = async (nik: string) => {
  const accessToken = Cookies.get("accessToken");
  return await axios.post("/auth/logout", { nik }, { headers: { Authorization: `Bearer ${accessToken}` } });
};

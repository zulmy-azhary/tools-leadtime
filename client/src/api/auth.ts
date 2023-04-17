import type { TLogin, TUser } from "../types";
import axios, { axiosProtected } from "./axios";

export const registerUser = async (data: Omit<TUser, "confirmPassword">) => {
  return await axios.post("/auth/register", data);
};

export const login = async (data: TLogin) => {
  return await axios.post("/auth/login", data, { withCredentials: true });
};

export const getMe = async () => {
  return await axiosProtected().get("/user/me");
};

export const logout = async (nik: string) => {
  return await axiosProtected().post("/auth/logout", { nik });
};

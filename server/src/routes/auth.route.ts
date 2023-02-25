import { Router } from "express";
import { register, login, refreshToken } from "../controllers/auth.controller";

export const AuthRouter: Router = Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.post("/refresh", refreshToken);

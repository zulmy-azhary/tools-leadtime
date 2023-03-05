import { Router } from "express";
import { register, login, refreshToken, logout } from "../controllers/auth.controller";
import { requireUser } from "../middleware/auth.middleware";

export const AuthRouter: Router = Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.post("/refresh", requireUser, refreshToken);
AuthRouter.post("/logout", requireUser, logout);

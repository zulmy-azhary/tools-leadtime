import { Router } from "express";
import { register, login } from "../controllers/auth.controller";

export const AuthRouter: Router = Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);

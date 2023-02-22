import { Router } from "express";
import { register, login, getAllUsers } from "../controllers/auth.controller";

export const AuthRouter: Router = Router();

AuthRouter.get("/", getAllUsers);
AuthRouter.post("/register", register);
AuthRouter.post("/login", login);

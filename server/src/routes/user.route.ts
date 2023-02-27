import { Router } from "express";
import { getMe } from "../controllers/user.controller";
import { requireUser } from "../middleware/auth.middleware";

export const UserRouter: Router = Router();

UserRouter.get("/getMe", requireUser, getMe);

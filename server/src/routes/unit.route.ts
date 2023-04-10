import { Router } from "express";
import { requireUser } from "../middleware/auth.middleware";
import { create, getAll } from "../controllers/unit.controller";

export const UnitRouter: Router = Router();

UnitRouter.post("/create", requireUser, create);
UnitRouter.get("/getAll", requireUser, getAll);

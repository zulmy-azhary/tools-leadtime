import { Router } from "express";
import { requireUser } from "../middleware/auth.middleware";
import { create, deleteUnit, getAll, updateUnit } from "../controllers/unit.controller";

export const UnitRouter: Router = Router();

UnitRouter.post("/create", requireUser, create);
UnitRouter.get("/all", requireUser, getAll);
UnitRouter.put("/:id", requireUser, updateUnit);
UnitRouter.delete("/:id", requireUser, deleteUnit);

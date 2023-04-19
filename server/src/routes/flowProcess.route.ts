import { Router } from "express";
import { requireUser } from "../middleware/auth.middleware";
import {
  createFlowProcess,
  getAllFlowProcess,
  getSingleFlowProcess,
  updateFlowProcess
} from "../controllers/flowProcess.controller";

export const FlowProcessRouter: Router = Router();

FlowProcessRouter.get("/all", requireUser, getAllFlowProcess);
FlowProcessRouter.get("/:id", requireUser, getSingleFlowProcess);
FlowProcessRouter.post("/create", requireUser, createFlowProcess);
FlowProcessRouter.put("/:id", requireUser, updateFlowProcess);

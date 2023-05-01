import { Router } from "express";
import { requireUser } from "../middleware/auth.middleware";
import { getAllFlowProcess, submitFlowProcess, updateFlowProcess } from "../controllers/flowProcess.controller";

export const FlowProcessRouter: Router = Router();

FlowProcessRouter.get("/all", requireUser, getAllFlowProcess);
FlowProcessRouter.put("/:id", requireUser, updateFlowProcess);
FlowProcessRouter.put("/submit/:id", requireUser, submitFlowProcess);

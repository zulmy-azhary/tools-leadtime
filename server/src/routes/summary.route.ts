import { Router } from "express";
import { getSummary } from "../controllers/summary.controller";
import { requireUser } from "../middleware/auth.middleware";

export const SummaryRouter: Router = Router();

SummaryRouter.get("/all", requireUser, getSummary);

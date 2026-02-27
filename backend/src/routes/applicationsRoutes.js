import { Router } from "express";
import { createApplication } from "../controllers/applicationsController.js";
import { validateApplicationPayload } from "../middlewares/validation.js";

const router = Router();

router.post("/", validateApplicationPayload, createApplication);

export default router;
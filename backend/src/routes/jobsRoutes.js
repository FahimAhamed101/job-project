import { Router } from "express";
import {
  createJob,
  deleteJob,
  getJobById,
  getJobs,
} from "../controllers/jobsController.js";
import { validateJobPayload } from "../middlewares/validation.js";

const router = Router();

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/", validateJobPayload, createJob);
router.delete("/:id", deleteJob);

export default router;
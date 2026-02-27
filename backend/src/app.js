import cors from "cors";
import express from "express";
import applicationsRoutes from "./routes/applicationsRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandlers.js";

const app = express();
const allowedOrigins = (process.env.CLIENT_ORIGIN || "*")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.includes("*") ? "*" : allowedOrigins,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Job board API is running" });
});

app.use("/api/jobs", jobsRoutes);
app.use("/api/applications", applicationsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

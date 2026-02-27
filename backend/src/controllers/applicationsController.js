import mongoose from "mongoose";
import { Application } from "../models/Application.js";
import { Job } from "../models/Job.js";

export const createApplication = async (req, res, next) => {
  try {
    const { job_id, name, email, resume_link, cover_note } = req.body;

    if (!mongoose.Types.ObjectId.isValid(job_id)) {
      return res.status(400).json({ message: "job_id must be a valid id" });
    }

    const job = await Job.findById(job_id);

    if (!job) {
      return res.status(404).json({ message: "Associated job not found" });
    }

    const application = await Application.create({
      job_id,
      name: name.trim(),
      email: email.trim(),
      resume_link: resume_link.trim(),
      cover_note: cover_note.trim(),
    });

    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
};
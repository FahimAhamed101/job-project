import mongoose from "mongoose";
import { Application } from "../models/Application.js";
import { Job } from "../models/Job.js";

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const getJobs = async (req, res, next) => {
  try {
    const { search, category, location } = req.query;

    const filters = {};

    if (category) {
      filters.category = { $regex: escapeRegex(category), $options: "i" };
    }

    if (location) {
      filters.location = { $regex: escapeRegex(location), $options: "i" };
    }

    if (search) {
      const safeSearch = escapeRegex(search);
      filters.$or = [
        { title: { $regex: safeSearch, $options: "i" } },
        { company: { $regex: safeSearch, $options: "i" } },
        { description: { $regex: safeSearch, $options: "i" } },
      ];
    }

    const jobs = await Job.find(filters).sort({ created_at: -1 });

    res.json(jobs);
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid job id" });
    }

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    next(error);
  }
};

export const createJob = async (req, res, next) => {
  try {
    const { title, company, location, category, description } = req.body;

    const job = await Job.create({
      title: title.trim(),
      company: company.trim(),
      location: location.trim(),
      category: category.trim(),
      description: description.trim(),
    });

    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid job id" });
    }

    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    await Application.deleteMany({ job_id: id });

    res.json({ message: "Job deleted" });
  } catch (error) {
    next(error);
  }
};
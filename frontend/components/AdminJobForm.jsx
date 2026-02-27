"use client";

import { useState } from "react";
import { createJob } from "@/lib/api";

const initialForm = {
  title: "",
  company: "",
  location: "",
  category: "",
  description: "",
};

export default function AdminJobForm({ onCreated }) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFeedback("");

    try {
      await createJob(form);
      setForm(initialForm);
      setFeedback("Job created.");
      onCreated();
    } catch (error) {
      setFeedback(error.message || "Unable to create job.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="panel p-5 sm:p-6">
      <h1 className="text-2xl font-bold text-slate-900">Admin: Manage Jobs</h1>
      <p className="mt-1 text-sm text-slate-600">Add new listings and remove old ones.</p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <input className="input" name="title" placeholder="Job title" value={form.title} onChange={handleChange} required />
          <input className="input" name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
          <input className="input" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
          <input className="input" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        </div>

        <textarea
          className="input min-h-28"
          name="description"
          placeholder="Full job description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <button type="submit" className="button-primary" disabled={submitting}>
          {submitting ? "Saving..." : "Add Job"}
        </button>
      </form>

      {feedback && <p className="mt-3 text-sm font-medium text-slate-700">{feedback}</p>}
    </section>
  );
}
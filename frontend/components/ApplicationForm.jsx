"use client";

import { useState } from "react";
import { createApplication } from "@/lib/api";

const initialForm = {
  name: "",
  email: "",
  resume_link: "",
  cover_note: "",
};

export default function ApplicationForm({ jobId }) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFeedback({ type: "", text: "" });

    try {
      await createApplication({
        job_id: jobId,
        ...form,
      });

      setFeedback({ type: "success", text: "Application submitted successfully." });
      setForm(initialForm);
    } catch (error) {
      setFeedback({ type: "error", text: error.message || "Submission failed." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="panel mt-6 p-5 sm:p-6">
      <h2 className="text-xl font-bold text-slate-900">Apply Now</h2>
      <p className="mt-1 text-sm text-slate-600">Submit your details and resume link for this role.</p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className="input"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <input
          className="input"
          name="resume_link"
          type="url"
          placeholder="Resume URL (https://...)"
          value={form.resume_link}
          onChange={handleChange}
          required
        />

        <textarea
          className="input min-h-32"
          name="cover_note"
          placeholder="Cover note"
          value={form.cover_note}
          onChange={handleChange}
          required
        />

        <button type="submit" className="button-primary" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>

      {feedback.text && (
        <p
          className={`mt-3 text-sm font-medium ${
            feedback.type === "success" ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {feedback.text}
        </p>
      )}
    </section>
  );
}
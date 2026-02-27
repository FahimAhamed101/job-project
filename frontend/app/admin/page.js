"use client";

import { useEffect, useState } from "react";
import AdminJobForm from "@/components/AdminJobForm";
import { deleteJob, fetchJobs } from "@/lib/api";

export default function AdminPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadJobs = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (requestError) {
      setError(requestError.message || "Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleDeleteJob = async (id) => {
    const shouldDelete = window.confirm("Delete this job listing?");
    if (!shouldDelete) {
      return;
    }

    try {
      await deleteJob(id);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (requestError) {
      setError(requestError.message || "Failed to delete job.");
    }
  };

  return (
    <section className="space-y-6">
      <AdminJobForm onCreated={loadJobs} />

      <section className="panel p-5 sm:p-6">
        <h2 className="text-xl font-bold text-slate-900">Existing Listings</h2>

        {loading && <p className="mt-4 text-sm font-medium text-slate-600">Loading listings...</p>}
        {error && <p className="mt-4 text-sm font-medium text-rose-600">{error}</p>}

        {!loading && !error && jobs.length === 0 && (
          <p className="mt-4 text-sm text-slate-600">No jobs available.</p>
        )}

        <div className="mt-4 space-y-3">
          {jobs.map((job) => (
            <article
              key={job._id}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="text-base font-semibold text-slate-900">{job.title}</h3>
                <p className="text-sm text-slate-600">
                  {job.company} | {job.location} | {job.category}
                </p>
              </div>

              <button
                type="button"
                className="rounded-lg border border-rose-300 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
                onClick={() => handleDeleteJob(job._id)}
              >
                Delete
              </button>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
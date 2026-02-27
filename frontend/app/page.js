"use client";

import { useEffect, useMemo, useState } from "react";
import JobCard from "@/components/JobCard";
import JobFilters from "@/components/JobFilters";
import { fetchJobs } from "@/lib/api";

const emptyFilters = {
  search: "",
  category: "",
  location: "",
};

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [filters, setFilters] = useState(emptyFilters);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [error, setError] = useState("");

  const loadInitialJobs = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchJobs();
      setJobs(data);
      setAllJobs(data);
    } catch (requestError) {
      setError(requestError.message || "Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialJobs();
  }, []);

  const categories = useMemo(
    () => [...new Set(allJobs.map((job) => job.category))].sort((a, b) => a.localeCompare(b)),
    [allJobs]
  );

  const locations = useMemo(
    () => [...new Set(allJobs.map((job) => job.location))].sort((a, b) => a.localeCompare(b)),
    [allJobs]
  );

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = async (event) => {
    event.preventDefault();
    setFiltering(true);
    setError("");

    try {
      const data = await fetchJobs(filters);
      setJobs(data);
    } catch (requestError) {
      setError(requestError.message || "Failed to apply filters.");
    } finally {
      setFiltering(false);
    }
  };

  const handleResetFilters = async () => {
    setFilters(emptyFilters);
    setFiltering(true);
    setError("");

    try {
      const data = await fetchJobs();
      setJobs(data);
      setAllJobs(data);
    } catch (requestError) {
      setError(requestError.message || "Failed to reset filters.");
    } finally {
      setFiltering(false);
    }
  };

  return (
    <section>
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Open Positions</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Search and filter opportunities by category and location. All roles are synced from the REST API.
        </p>
      </header>

      <JobFilters
        filters={filters}
        categories={categories}
        locations={locations}
        onChange={handleFilterChange}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {(loading || filtering) && <p className="text-sm font-medium text-slate-600">Loading jobs...</p>}
      {error && <p className="mb-4 text-sm font-medium text-rose-600">{error}</p>}

      {!loading && !filtering && !error && jobs.length === 0 && (
        <div className="panel p-6 text-center text-slate-600">No jobs found for the selected filters.</div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </section>
  );
}
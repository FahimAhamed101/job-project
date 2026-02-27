"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ApplicationForm from "@/components/ApplicationForm";
import { fetchJobById } from "@/lib/api";

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params?.id;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!jobId) {
      return;
    }

    let isMounted = true;

    const loadJob = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchJobById(jobId);
        if (isMounted) {
          setJob(data);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message || "Failed to load job details.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadJob();

    return () => {
      isMounted = false;
    };
  }, [jobId]);

  if (loading) {
    return <p className="text-sm font-medium text-slate-600">Loading job details...</p>;
  }

  if (error) {
    return (
      <div className="panel space-y-3 p-5">
        <p className="text-sm font-medium text-rose-600">{error}</p>
        <Link href="/" className="button-secondary inline-flex">
          Back to jobs
        </Link>
      </div>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <section>
      <Link href="/" className="mb-4 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-600">
        Back to listings
      </Link>

      <article className="panel p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-brand-700">{job.category}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">{job.location}</span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900">{job.title}</h1>
        <p className="mt-1 text-base text-slate-600">{job.company}</p>

        <div className="mt-6 whitespace-pre-line text-sm leading-7 text-slate-800">{job.description}</div>
      </article>

      <ApplicationForm jobId={job._id} />
    </section>
  );
}

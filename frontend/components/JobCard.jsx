import Link from "next/link";

export default function JobCard({ job }) {
  return (
    <article className="panel flex h-full flex-col gap-4 p-5">
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <span className="rounded-full bg-brand-50 px-3 py-1 text-brand-700">{job.category}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1">{job.location}</span>
      </div>

      <div className="space-y-1">
        <h2 className="text-xl font-bold text-slate-900">{job.title}</h2>
        <p className="text-sm text-slate-600">{job.company}</p>
      </div>

      <p className="line-clamp-4 text-sm leading-6 text-slate-700">{job.description}</p>

      <div className="mt-auto">
        <Link
          href={`/jobs/${job._id}`}
          className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let message = "Request failed";

    try {
      const payload = await response.json();
      message = payload.message || payload.errors?.join(", ") || message;
    } catch {
      message = response.statusText || message;
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const fetchJobs = async ({ search = "", category = "", location = "" } = {}) => {
  const query = new URLSearchParams();

  if (search.trim()) query.set("search", search.trim());
  if (category.trim()) query.set("category", category.trim());
  if (location.trim()) query.set("location", location.trim());

  const suffix = query.toString() ? `?${query.toString()}` : "";
  return request(`/api/jobs${suffix}`);
};

export const fetchJobById = async (id) => request(`/api/jobs/${id}`);

export const createJob = async (payload) =>
  request("/api/jobs", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const deleteJob = async (id) =>
  request(`/api/jobs/${id}`, {
    method: "DELETE",
  });

export const createApplication = async (payload) =>
  request("/api/applications", {
    method: "POST",
    body: JSON.stringify(payload),
  });
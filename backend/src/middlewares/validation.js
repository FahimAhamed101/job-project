const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;

const isEmail = (value) => {
  if (!isNonEmptyString(value)) {
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(value.trim());
};

const isValidUrl = (value) => {
  if (!isNonEmptyString(value)) {
    return false;
  }

  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

export const validateJobPayload = (req, res, next) => {
  const { title, company, location, category, description } = req.body;

  const errors = [];

  if (!isNonEmptyString(title)) errors.push("title is required");
  if (!isNonEmptyString(company)) errors.push("company is required");
  if (!isNonEmptyString(location)) errors.push("location is required");
  if (!isNonEmptyString(category)) errors.push("category is required");
  if (!isNonEmptyString(description)) errors.push("description is required");

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

export const validateApplicationPayload = (req, res, next) => {
  const { job_id, name, email, resume_link, cover_note } = req.body;

  const errors = [];

  if (!isNonEmptyString(job_id)) errors.push("job_id is required");
  if (!isNonEmptyString(name)) errors.push("name is required");
  if (!isEmail(email)) errors.push("email must be valid");
  if (!isValidUrl(resume_link)) errors.push("resume_link must be a valid URL");
  if (!isNonEmptyString(cover_note)) errors.push("cover_note is required");

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
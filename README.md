# Qtech Job Board

Full-stack job board application with:
- Next.js frontend (Tailwind CSS, responsive UI)
- Node.js + Express REST API
- MongoDB persistence for jobs and applications

## Project Structure

```text
Qtech/
  backend/
    src/
      config/
      controllers/
      middlewares/
      models/
      routes/
      app.js
      server.js
  frontend/
    app/
    components/
    lib/
```

## Prerequisites

- Node.js 18+
- MongoDB running locally or remotely

## 1) Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/job_board
CLIENT_ORIGIN=http://localhost:3000
```

Run backend:

```bash
npm run dev
```

## 2) Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env` if needed:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

Open `http://localhost:3000`.

## REST API Endpoints

### Jobs
- `GET /api/jobs` - list all jobs
- `GET /api/jobs/:id` - get one job
- `POST /api/jobs` - create job
- `DELETE /api/jobs/:id` - delete job

`POST /api/jobs` body:

```json
{
  "title": "Frontend Developer",
  "company": "Qtech",
  "location": "New York",
  "category": "Engineering",
  "description": "Role details..."
}
```

### Applications
- `POST /api/applications` - submit job application

`POST /api/applications` body:

```json
{
  "job_id": "65f1d5f2c6f2f7a08d123456",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "resume_link": "https://example.com/resume.pdf",
  "cover_note": "I am excited to apply..."
}
```

## Validation Rules

- Required fields are enforced for job creation and applications.
- `email` must be valid format.
- `resume_link` must be a valid `http` or `https` URL.
- `job_id` must be a valid MongoDB ObjectId and refer to an existing job.

## Frontend Features

- Job listings page with search and filter by category/location
- Job detail page with full description
- Apply form (name, email, resume URL, cover note)
- Basic admin view to add/delete jobs
- Responsive layout using Tailwind CSS
- Reusable component structure (`components/`)

## Notes

- Admin endpoints are exposed without auth for this basic version.
- Deleting a job also deletes its linked applications.
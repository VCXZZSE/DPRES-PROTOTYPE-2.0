
  # Disaster Preparedness Platform Design

  This is the Disaster Preparedness Platform Design frontend project.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Safe GitHub Push (Secrets)

  Before pushing, keep secrets in local env files only:

  - Do not commit `.env` files.
  - Do not commit private keys, certs, or local database files.
  - Commit only `.env.example` with placeholder values.

  Quick check:

  ```bash
  git ls-files | grep -E "(.env|.pem|.key|.p12|.sqlite|.db)$"
  ```

  ## Vercel Deployment (Frontend)

  This repo is Vite-based and ready for Vercel frontend deployment.

  Required Vercel Environment Variables:

  - `VITE_AUTH_API_URL` = `https://<your-backend-domain>/api/auth`
  - `VITE_API_URL` = `https://<your-backend-domain>/api` (or keep default if not used)

  Build settings are already configured via `vercel.json`:

  - Build Command: `npm run build`
  - Output Directory: `dist`

  ## Backend Hosting Requirement

  The current backend is a standalone FastAPI service (`dpres-backend`) and should be deployed as a separate service (for example Render/Railway/Fly.io) unless you explicitly refactor it to Vercel serverless functions.

  After backend deployment, set:

  - `FRONTEND_ORIGINS` in backend env to include your Vercel domain(s)
  - `VITE_AUTH_API_URL` in Vercel frontend env to your backend URL
  
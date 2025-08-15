# AI Retail Scheduler

A full-stack AI-powered platform for smart scheduling and performance tracking in retail operations. Built with Next.js (frontend) and Flask (backend), deployed on Vercel and Render.

## Features
- AI-driven scheduling for sweets makers, packagers, and retailers
- Dynamic order volume input and exclusion filters
- Individual and group performance analytics
- Interactive charts and feedback visualization
- Secure API communication between frontend and backend

## Tech Stack
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Flask, pandas, numpy, scikit-learn, joblib, flask_cors
- **Deployment:** Vercel (frontend), Render (backend)

## Getting Started

### Backend (Flask)
1. Clone the repo and navigate to the project folder.
2. Create and activate a Python virtual environment:
   ```powershell
   python -m venv env
   .\env\Scripts\Activate.ps1
   ```
3. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```
4. Run locally:
   ```powershell
   python python_files/app.py
   ```
5. For deployment, use Gunicorn:
   ```powershell
   gunicorn python_files.app:app
   ```

### Frontend (Next.js)
1. Install dependencies:
   ```powershell
   npm install
   ```
2. Set environment variable in `.env.local` (for local dev):
   ```env
   NEXT_PUBLIC_API_URL=https://ai-retail-scheduler.onrender.com
   ```
3. Run locally:
   ```powershell
   npm run dev
   ```
4. For deployment, set `NEXT_PUBLIC_API_URL` in Vercel project settings.

## Deployment
- **Backend:** Deploy to Render using Gunicorn. Set up environment and start command as above.
- **Frontend:** Deploy to Vercel. Set `NEXT_PUBLIC_API_URL` to your Render backend URL in Vercel settings.

## Usage
- Input daily order volume and apply filters to exclude employees or groups.
- Click "Recalculate Targets" to fetch AI-driven assignments and view analytics.
- Explore tabs for sweets makers, packagers, retailers, feedback, and individual performance.
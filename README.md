# Brainmint

Agile planning and sprint dashboard combining a Vite + React frontend with a Django REST-style backend and a MySQL datastore. Brainmint helps you manage tasks across Kanban stages, plan sprints, and view team progress with reports.

## Features

- Kanban workflow: todo → progress → review → done
- Sprints: create sprint calendars and assign tasks
- Authentication: signup and login
- Reporting: historical velocity, burndown, and task-type distribution
- Summary stats: open/overdue tasks, active sprints, completion rate, recent activity

## Monorepo Layout

Primary app (active):
- `Brainmint/Brainmint/backend` — Django API server
- `Brainmint/Brainmint/brainmint-dashboard` — Vite + React dashboard UI

Other folders (prototypes/archives):
- `backend/`, `brainmint_backend/`, `auth-system/`, `mock_auth_*`, `Brainmint_old/` — earlier experiments and sample apps. Use the “Primary app” paths above for development.

## Quick Start

### Prerequisites

- Python 3.12+
- Node.js 18+ and npm
- MySQL 8.x
- Git

### 1) Clone

```bash
git clone https://github.com/N-Jishnu/Brainmint.git
cd Brainmint
```

### 2) Backend (Django) — start API at http://localhost:8000/api/

```powershell
cd Brainmint\Brainmint\backend
python -m venv .venv
.\.venv\Scripts\activate
pip install Django==5.1.1 pymysql django-cors-headers
```

Configure the database connection in `engine/db.py` (defaults shown):

```python
# Brainmint/Brainmint/backend/engine/db.py
import pymysql

def get_db():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="12345",
        database="brainmint",
        cursorclass=pymysql.cursors.DictCursor
    )
```

Create the MySQL database and tables:

```sql
CREATE DATABASE IF NOT EXISTS brainmint CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE brainmint;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password CHAR(64) NOT NULL,                     -- SHA-256 hex
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sprints (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  project_title VARCHAR(255) DEFAULT 'My Project',
  title VARCHAR(100) NOT NULL,
  start_date DATE NULL,
  end_date DATE NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (user_id)
);

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  priority ENUM('High','Medium','Low') DEFAULT 'Medium',
  status ENUM('todo','progress','review','done') DEFAULT 'todo',
  due_date DATE NULL,
  subtasks_total INT DEFAULT 0,
  subtasks_completed INT DEFAULT 0,
  sprint_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (user_id),
  INDEX (status),
  INDEX (sprint_id)
);
```

Run the server:

```powershell
# from Brainmint\Brainmint\backend
python manage.py runserver
```

Django settings default to `DEBUG=True`, `CORS_ALLOW_ALL_ORIGINS=True` for development. For production, set `DEBUG=False`, configure `ALLOWED_HOSTS`, and lock down CORS.

### 3) Frontend (Vite + React) — start UI at http://localhost:5173

```powershell
cd ..\brainmint-dashboard
npm install
npm run dev
```

The frontend expects the API at `http://localhost:8000/api`. Update the base URL in the React pages if you deploy the backend elsewhere.

## API Overview

Base URL: `http://localhost:8000/api/`

Auth:
- `POST /signup` — body: `{ name, email, password }`
- `POST /login` — body: `{ email, password }`

Tasks:
- `GET /tasks?user_id=...`
- `POST /tasks/create`
- `POST /tasks/update-status`
- `POST /tasks/increment-subtask`
- `POST /tasks/delete`
- `POST /tasks/update-due-date`
- `POST /tasks/update-priority`

Sprints:
- `GET /sprints?user_id=...`
- `POST /sprints/create`
- `POST /sprints/delete`
- `POST /tasks/assign-sprint`

Reports:
- `GET /sprint-report?user_id=...`
- `GET /summary?user_id=...`

Endpoints are defined under `engine/urls.py` and implemented in `engine/views.py`.

## Configuration Notes

- Database credentials are hard-coded in `engine/db.py`. Change to match your environment.
- Django’s project DB setting uses SQLite for internal models, but the app uses MySQL directly via PyMySQL for business data.
- For production, do not commit secrets (e.g., `SECRET_KEY`), set environment variables, and serve via a WSGI server (gunicorn/uwsgi behind Nginx).

## Troubleshooting

- MySQL connection refused:
  - Verify MySQL is running, credentials match `engine/db.py`, and the `brainmint` database exists.
- 404s from the UI:
  - Ensure backend is running on port 8000 and CORS is enabled for your frontend origin.
- Empty dashboards:
  - Create a user via `/signup` and add tasks/sprints via the UI so reports have data.

## Project Structure (Primary)

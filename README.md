# Fluxi

Fluxi is a process knowledge platform. It captures organizational knowledge as structured, versioned blueprints — and makes them executable.

---

## What It Does

**Capture.** Visual drag-and-drop editor. Build process blueprints step by step — who does what, with which tool, why, and in what order. No consultants, no training manuals.

**Store.** Every blueprint is saved in a graph database, versioned, and auditable. The knowledge stays even when the people who hold it don't.

**Execute.** Blueprints connect to your systems. Run with humans, AI, or both. Every action traces back to the blueprint.

**Analyze.** See where processes break, where they're slow, where they cost too much.

**Improve.** Refine, version, redeploy. Continuous improvement without re-engineering projects.

---

## How It Works

Fluxi organizes knowledge into **blueprints** — visual maps of how work actually gets done.

Each blueprint has:

- **Steps** — individual actions or tasks
- **Gates** — decision points (XOR, AND, OR)
- **Actors** — who performs each step
- **Tools** — which systems are involved
- **Goals** — what each step is meant to achieve
- **Links** — connections showing flow and dependencies

The editor enforces structural rules: Start nodes have no incoming links, Finish nodes connect only to Next Process steps, gates have multiple outputs.

---

## Tech Stack

- **Frontend:** React + TypeScript + React Flow
- **Backend:** FastAPI + Python
- **Database:** ArangoDB (graph-native)
- **Infrastructure:** Docker Compose (ArangoDB, PostgreSQL, Valkey, MinIO, Casdoor)

---

## Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker Desktop (for ArangoDB)

### Start infrastructure
```bash
docker compose up -d arangodb
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

---

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/blueprints/` | List all blueprints |
| POST | `/api/v1/blueprints/` | Create a blueprint |
| GET | `/api/v1/blueprints/{id}` | Get a blueprint |
| PUT | `/api/v1/blueprints/{id}` | Update a blueprint |
| DELETE | `/api/v1/blueprints/{id}` | Delete a blueprint |
| GET | `/health` | Health check |

---

## Status

v0.1.1 — Blueprint persistence with ArangoDB.

**Working:**
- Visual drag-and-drop editor
- Node types: Start, Step, Gate, Finish, Next Process
- Editable attributes: actor, tool, goal
- Configurable in/out links per node
- Direction rules enforced
- CRUD API with ArangoDB persistence
- Save/Load UI with toolbar
- Docker Compose infrastructure

---

## License

MIT

> Corporate knowledge, grounded. Not in people. In the organization.

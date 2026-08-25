# Fluxi

Fluxi is a platform for turning implicit organizational knowledge into an auditable, executable, and improvable process map.

It's for the companies that are replacing people with machines — and don't actually know what those people were doing.

---

## The Problem Nobody Wants to Talk About

Organizations are rushing to automate. AI is the mandate. Cut costs, move faster, reduce headcount.

But here's the uncomfortable truth: most companies don't fully understand what their people do, why they do it that way, or what knowledge disappears when they leave.

They're swapping humans for machines without a clear picture of the process they're automating. The veteran who knows which supplier to call when the system says one thing but reality says another. The analyst who checks three things before approving that no manual describes. The operator who's been doing it "the right way" for 20 years and never wrote it down.

You can't automate what you don't understand. And you definitely can't automate it well.

Fluxi captures that knowledge — while the people who hold it are still here — before you hand the keys to a machine.

---

## What Fluxi Does

Fluxi captures what your people know — before you need to know it yourself.

**Build the "as-is" visually.** Your team drags and drops the process as they understand it. Steps, decisions, dependencies, the unwritten rules. No abstract frameworks. No IT project. Just: "show us how it actually works." Minutes to build. The result is a structured blueprint that encodes decades of experience — owned by the organization, not trapped in individual heads.

**Make it corporate knowledge.** The blueprint isn't a document in a shared drive. It's a versioned, auditable, structured artifact. Reviewable. Approvable. Traceable. The knowledge stays even when the person doesn't. And it becomes the basis for every decision about what to automate, what to keep human, and what to change.

**Run it.** The blueprint connects to your existing systems and tools. It executes — with humans, with AI, or with the right mix for each step. Every action traces back to the blueprint. You know who designed it, who approved it, and why each step exists.

**Analyze and improve.** Execution data feeds back. You see where the process breaks, where intuition diverges from reality, where the unwritten rules create bottlenecks. The knowledge doesn't just get captured. It gets better.

---

## Why Middle Market

Enterprise platforms come with enterprise prices, enterprise timelines, and enterprise complexity. Middle-market companies don't need a $500K implementation. They need to sit down with their people, capture what they know, and make it theirs — before those people are gone or before automation replaces something critical they didn't know was critical.

Fluxi is built for that.

- **Fast to start.** Visual editor. Drag and drop. Your first blueprint in an afternoon.
- **Low barrier.** No consultants. No six-month deployment. No training program.
- **Affordable.** Pricing that makes sense for a 50-person operations team, not a 5,000-person enterprise.
- **Grown-in value.** The more blueprints you build, the more knowledge you capture, the more the platform becomes essential.

---

## Why It's Not Just Another Tool

Automation tools connect systems. Fluxi captures reasoning.

Process mining tells you what happened in your systems. It can't capture the judgment call that never touched a screen.

Documentation sits in a drive and rots. Blueprints live, evolve, and produce data.

The difference isn't technical. It's philosophical. Fluxi treats organizational knowledge as an asset — one that needs to be extracted, owned, governed, and improved. Not a byproduct of systems. A product of people.

And when you have that asset, every decision about automation becomes smarter. Every AI initiative starts with understanding instead of assumption.

---

## How It Works

**Capture.** Visual editor. Drag-drop steps, gates, tools, actors, dependencies. Your "as-is" with full fidelity.

**Govern.** Every blueprint is versioned, reviewable, attributable, and auditable. Who built it, who approved it, when it changed, and why.

**Execute.** Push to an orchestrator. Run with humans, AI, or hybrid. Every action traces to the blueprint.

**Analyze.** Reasoning performance intelligence. Where it breaks, where it's slow, where it costs too much.

**Improve.** Refine step by step. Version it. Redeploy. Continuous improvement without re-engineering projects.

---

## One Platform. Not Monolithic.

Fluxi is built in composable layers:

- **Blueprint engine** — editor, validation, versioning, collaboration
- **Execution layer** — orchestrator integration, model and tool routing
- **Knowledge graph** — structured capture of every execution and outcome
- **Analysis layer** — reasoning performance intelligence
- **Governance module** — approvals, audit trails, compliance, full traceability

Start where you need. Expand when you're ready.

---

## Agnostic

Fluxi doesn't pick your model, your tools, or your vendor.

Your blueprints work with any system that can read structured reasoning. Connect to what you already use. Take your blueprints anywhere.

No lock-in. No ecosystem tax. The knowledge is yours.

---

## The Principle

You can't automate what you don't understand. And right now, most organizations don't understand their own processes — not the real ones, the ones that live in people's heads.

Fluxi extracts that knowledge. Structures it. Makes it corporate property. Not trapped in individuals. Not lost when someone leaves. Grounded in the organization itself.

Once the knowledge is grounded, everything changes. Training becomes surgical — you know exactly what each person needs to learn. Automation becomes obvious — you know exactly what to automate and what to keep human. The organization becomes resilient — the process runs regardless of who's in the chair.

The future isn't replacing people with machines. It's understanding what people do — and then building an organization that owns that understanding forever.

---

## License

MIT

---

## Vision

> Corporate knowledge, grounded. Not in people. In the organization.

---

## Status

v0.1 — Blueprint editor. Visual drag-drop canvas for creating process blueprints.

**What works:**
- Node types: Start, Step, Gate, Finish, Next Process
- Editable attributes: actor, tool, goal per step
- Configurable incoming/outgoing links per node
- Direction rules enforced (Start has no in, Finish links only to Next Process)
- Delete nodes and edges
- FastAPI backend with blueprint CRUD
- Docker Compose for infrastructure

---

## Quick Start

```bash
# Backend
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

---

## Contact

Open to contributions, collaboration, and early design partners.

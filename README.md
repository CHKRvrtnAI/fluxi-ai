# Fluxi — Visual Editor Prototype

This is the first working prototype of Fluxi's visual editor.

A browser-based drag-and-drop interface for creating process blueprints — steps, gates, tools, actors, and goals — exported as structured JSON.

---

## What This Is

This prototype demonstrates the core interaction model of Fluxi: **capture what you know as a visual blueprint.**

- Drag and drop nodes: Step, Gate, Tool, Goal
- Connect nodes to define flow logic
- Inline editing for titles and metadata
- Export and import structured JSON plans
- Zero backend. Runs entirely in the browser.

It's the seed of what Fluxi becomes: a full platform for process knowledge capture, execution, analysis, and governance.

---

## How It Works

1. Open `index.html` in any modern browser
2. Add nodes from the toolbar
3. Connect nodes by selecting source and target
4. Double-click to edit node properties
5. Export your blueprint as JSON
6. Import previously saved blueprints

---

## The Blueprint Format

The exported JSON is a structured process blueprint:

```json
{
  "nodes": [
    { "id": "step_1", "type": "step", "title": "Fetch data" },
    { "id": "gate_1", "type": "gate", "title": "Data valid?" },
    { "id": "tool_1", "type": "tool", "title": "API call" },
    { "id": "goal_1", "type": "goal", "title": "Process complete" }
  ],
  "connections": [
    { "from": "step_1", "to": "gate_1" },
    { "from": "gate_1", "to": "tool_1" },
    { "from": "tool_1", "to": "goal_1" }
  ]
}
```

This JSON can be read by any LLM that can reason on structured data.

---

## Try It Live

The demo is hosted on GitHub Pages:

**https://chkrvrtnai.github.io/fluxi-ai/**

---

## What Comes Next

This prototype validated the visual editor concept. The full Fluxi platform extends this with:

- **Knowledge graph** — blueprints become interconnected, queryable knowledge
- **Execution engine** — blueprints run, not just sit as diagrams
- **Version control** — track changes, compare versions, approve workflows
- **Process intelligence** — analyze where reasoning breaks, optimize, evolve
- **Governance** — audit trails, compliance, role-based access

See the [main branch](https://github.com/CHKRvrtnAI/fluxi-ai) for the full product vision.

---

## License

MIT

# Fluxi Flow Designer – Demo Pages 🌐🧠

**Fluxi Flow Designer** is a lightweight, zero-backend GUI for visually composing declarative AI plans — directly in your browser.

🎯 Designed for quick prototyping, demonstration, and exploration.  
🧱 Built with plain HTML + JS.  
📦 Deployable instantly via GitHub Pages.

---

## ✨ What It Does

- Visual editor for semantic flows
- Supports **steps**, **tools**, **gates**, and **goals**
- **Snap-to-grid** interface with draggable nodes
- **Live connections** rendered via SVG
- **Inline editing** for logic and metadata
- **Export/import JSON** plans
- Ready to be interpreted by any LLM that can reason on structure

---

## 🚀 How to Use

1. Open [`index.html`](index.html) locally or via GitHub Pages.
2. Add semantic nodes (step, gate, tool, goal).
3. Use **Connect Nodes** to define flow logic.
4. Double-click to edit titles or values.
5. Use **Export JSON** to save your plan.
6. Load saved plans with **Import JSON**.

---

## 🧠 LLM Integration

This tool is designed to output clean, structured JSON.

You can feed that JSON into any LLM (Mistral, GPT, Claude…) using a simple prompt like:

```txt
This is a plan in JSON. Get the meaning and follow it logging what you do.
```

If you're running a local Mistral instance, the "Analyze" button can POST the JSON to:

```http
POST http://localhost:7860/api/predict
{
  "data": ["prompt + json"]
}
```

Expected response:
```json
{ "data": ["Model output"] }
```

---

## 📦 Tech Stack

- 🧱 No frameworks
- 💻 HTML + vanilla JavaScript
- 🎯 SVG for live flow rendering
- 🚀 GitHub Pages-ready

---

## 🧪 Try It Live

Open the live demo here:  
👉 `https://chkrvrtnai.github.io/fluxi-ai/`

Or clone and launch `index.html` in any modern browser.

---

## ⚠️ Note

This is a **demo version** focused on rapid prototyping and education.  
For production usage, see the full [Fluxi project](https://github.com/your-org/fluxi).

---

## 👀 License

MIT License — free to use, remix, or fork.

> **From flowchart to semantic plan. From plan to AI behavior.**
> Fluxi makes it visible.
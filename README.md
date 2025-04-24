# Fluxi Flow Designer (Demo)

This is a minimal AI-assisted **flowchart editor**, designed to help teams model and discuss business processes quickly and visually.

👉 Built entirely with **HTML + JS**, no frameworks, no build tools.
👉 Deployed instantly via **GitHub Pages**.

---

## ✨ Features

- **Drag & drop** process blocks (OTC, FI, SCM, MM, HR)
- **Snap-to-grid** positioning
- **Connect nodes** with live SVG lines
- Inline editing of step labels
- Toggle **step type**: `[manual]` or `[auto]`
- Export/Import flow as JSON
- Analyze your flow with **Mistral** (if connected)

---

## 🚀 How to Use

1. Open [`index.html`](index.html) locally or on GitHub Pages.
2. Drag process blocks from the top bar into the canvas.
3. Click **"Connect Nodes"**, then two blocks to create a connection.
4. Double-click the step name to edit it.
5. Click `[manual]` or `[auto]` to toggle step type.
6. Use "Export JSON" to save your flow.
7. Use "Import JSON" to reload a saved flow.

---

## 📦 Tech Stack

- No frameworks
- Vanilla HTML + JavaScript
- SVG for rendering connections
- GitHub Pages for deployment

---

## 📡 Optional: AI Integration

To use "Analyze with Mistral", you must have a local API compatible with:

```
POST http://localhost:7860/api/predict
{
  "data": ["string prompt"]
}
```

Returns:
```json
{ "data": ["AI feedback"] }
```

---

## 🧪 Try the Demo
This version is designed for GitHub Pages.
You can view a live version here:

👉 `https://<your-username>.github.io/fluxi-ai/`

Or open `index.html` locally in any modern browser.

---

## 👀 License

MIT License — Use, modify, or fork as you like!

---

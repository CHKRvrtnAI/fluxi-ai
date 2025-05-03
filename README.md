# Fluxi 🧠📊

**Fluxi is a visual editor for creating declarative AI plans.**

It empowers people — even with minimal technical skills — to design structured flows in JSON that language models can understand and execute.

No chains. No agents. No magic prompts.  
Just meaning, encoded in structure.

---

## ✨ What is Fluxi?

Fluxi is a **GUI** for building semantic execution plans — step by step.

Each block you create represents:
- a **logical action** (`step`)
- a **decision point** (`gate`)
- a **tool** the model can use
- or a **goal** to reach

Each connection defines a **dependency** or **reasoning flow**.  
The resulting JSON is not a description. It's an **intent**.

> 🧩 The meaning is not in the prompt. It’s in the plan.  
> The model doesn’t guess. It reads, understands, and acts.

---

## 🔧 Why Fluxi?

Fluxi gives you:
- ✅ A simple visual interface
- ✅ JSON that encodes logic and dependencies
- ✅ Compatibility with any LLM
- ✅ No hidden logic, no wrappers

---

## 🧪 How It Works

### 1. **Create a plan**

Use the GUI to visually compose a process with:
- `steps` → tasks to perform
- `tools` → external operations
- `gates` → branching logic
- `goals` → final outcomes

### 2. **Export JSON**

The GUI generates a semantic JSON plan — complete, inspectable, executable.

### 3. **Send to LLM**

Use the canonical Fluxi prompt:

```txt
This is a plan in JSON. Get the meaning and follow it logging what you do.
```

And send it to any model — local or cloud.

---

## 🧠 Example

Using that prompt, and a JSON plan like this:

```json
{
  "goal": "Generate and send a weekly summary email for the project stakeholders.",
  "steps": [
    { "id": "fetch-status", "action": "http_get", "output": "project_status" },
    { "id": "summarize", "action": "summarize_text", "output": "summary_text" },
    { "id": "compose-email", "action": "compose_email", "output": "email_draft" },
    { "id": "send-summary", "action": "send_email", "output": "email_status" }
  ]
}
```

The LLM will respond with something like:

```txt
1. Fetch the project status from the server using the http_get tool. Store the response in the project_status variable.

2. Summarize the project status using the summarize_text tool. Store the summary in the summary_text variable.

3. Compose the email using the compose_email tool, passing the summary_text and the appropriate tone as parameters. Store the email draft in the email_draft variable.

4. Send the email to the project stakeholders using the send_email tool, passing the email_draft as the input. Store the email status in the email_status variable.

5. The goal "Generate and send a weekly summary email for the project stakeholders." is achieved when the email is sent successfully.
```

That’s it.  
**No further logic required.**  
Just structure → semantics → action.

---

## 🌐 Works With *Any* LLM that can read JSON and reason on it, can execute a Fluxi plan.

---

## 🧭 Canonical Fluxi Invocation

```txt
This is a plan in JSON. Get the meaning and follow it logging what you do.
```

We just **show it meaning** — and let it think.


## 📬 Contact
Open to contributions, feedback, and new ideas.

> *Planning is declarative. Prompting is improvisation.*  
> — Fluxi

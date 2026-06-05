---
name: checkpoint-session
description: Use to create a quick safety checkpoint during long sessions before token limits, account switching, risky changes, or session closure.
---

# Checkpoint Session Skill

## 1. Purpose

Create a lightweight mid-session checkpoint that saves current state so any Claude account or machine can resume without losing context.

---

## 2. When to Use

- Every 3 to 5 meaningful steps during a long session.
- Before making any risky or hard-to-reverse change.
- Before switching Claude accounts or moving to another machine.
- When the conversation is growing long and context compression is likely.

---

## 3. What to Update

| File | What to write |
|---|---|
| `SESSION_LOG.md` | Add a checkpoint entry with date and completed actions so far |
| `HANDOFF.md` | Update Current State and Next Action to reflect latest progress |
| `TASKS.md` | Mark any newly completed tasks; add tasks discovered this session |

---

## 4. Minimal Checkpoint Format

When running a checkpoint, output this summary before updating files:

```
CHECKPOINT — [date]

Completed this session:
- [action 1]
- [action 2]

Files modified:
- [file 1]
- [file 2]

Next action:
- [single most important next step]
```

Then update SESSION_LOG.md, HANDOFF.md, and TASKS.md in that order.

---

## 5. Frequency Rule

Run a checkpoint:
- Every 3 to 5 meaningful steps (file creations, edits, decisions).
- Before any risky change (deleting, restructuring, overwriting).
- Before switching Claude accounts or machines.
- When context is long enough that compression may occur.

Do not checkpoint after trivial actions like single-line edits or read-only reviews.

---

## 6. GitHub Rule (once repository is connected)

After updating the three files, recommend the following — but only execute with explicit user approval:

```
git add .
git commit -m "checkpoint: [short description of session progress]"
git push
```

Do not run git commands automatically. Always ask first.

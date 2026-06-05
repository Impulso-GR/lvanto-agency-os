---
name: handoff-session
description: Use to close a work session by updating SESSION_LOG.md, TASKS.md and HANDOFF.md so another Claude account or machine can continue safely.
---

# Skill: handoff-session

## Purpose
Update the three continuity files at the end of a work session so the next Claude account or machine can continue with full context and minimal token overhead.

## When to Use
When the user says "wrap up", "end session", "update handoff", or "close session".

## Steps

### 1. Update SESSION_LOG.md
- Add a new `## YYYY-MM-DD` entry.
- List only completed actions, one line each.
- Keep the new entry under 5 lines.

### 2. Update TASKS.md
- Mark completed tasks with `[x]`.
- Add any new tasks discovered this session.
- Remove tasks that are no longer relevant.

### 3. Update HANDOFF.md
- Set **Current State** to reflect today's work.
- Set **Next Action** to the 1–3 most important next steps.
- Keep the file under 35 lines total.

## Output
List only the files modified and state the single most important next action.

## GitHub Note
Once GitHub is connected, recommend `git add`, `git commit` and `git push` only with user approval. Never run them automatically.

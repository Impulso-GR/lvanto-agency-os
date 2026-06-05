# Local Safety Snapshot

> Quick-glance state of Lvanto Agency OS for safe resume. Not a replacement for `HANDOFF.md` / `SESSION_LOG.md` — a fast safety note.

## Snapshot date
2026-06-04

## Agency OS status
- **Local only** — lives on this machine; **GitHub private repo still pending** (no remote backup yet).
- Documentation, agents, skills, and AnimalFood vertical are in place and reconciled with real state.

## AnimalFood daily workflow
- **Operational.** Daily plan runs on the state file + dated CSV, no Google Sheets needed.
- State source of truth: `docs/verticals/animalfood/animalfood-daily-sheet-state.md`.
- Daily output: `docs/verticals/animalfood/daily-plans/animalfood-daily-plan-YYYY-MM-DD.csv` (exact 16 columns, one row per brand/action).
- Today's CSV exists and was validated (3 carry-over rows).

## CSV / state workflow
- **Active.** On "buen día" / "qué tengo que hacer hoy": read state → carry over unfinished high-impact actions → generate plan → write the dated CSV.
- Update the CSV/state **only when a row changes status** (designed / scheduled / published / PSD ready / approved). Do not regenerate unnecessarily.

## Main pending external setup
1. **GitHub private repository** — connect this folder for off-machine backup and cross-account continuity (main pending action).
2. **Google Sheets / n8n / MCP** — later integration; the CSV is the temporary local sheet until then.

## Security note
- **Do not store credentials in this repo.** No API keys, tokens, passwords, billing data, or `.env` secrets.
- Keep secrets in the OS credential store / a secrets manager outside this folder.

## Where to resume
- Read `CLAUDE.md`, `TASKS.md`, `HANDOFF.md`, `SESSION_LOG.md` first.
- This file is a fast safety glance only.

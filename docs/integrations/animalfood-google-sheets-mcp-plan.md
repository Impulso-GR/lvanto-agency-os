# AnimalFood — Google Sheets MCP Setup Plan

> Planning document only. **Nothing is installed or connected by this file.** Defines the simplest, low-cost path to connect the AnimalFood daily workflow to a live Google Sheet via MCP, with scheduled checks at 06:00, 15:00, and 23:00 (America/Argentina/Buenos_Aires).
> Related: `docs/verticals/animalfood/animalfood-daily-sheet-state.md`, `docs/verticals/animalfood/daily-plans/`, `.claude/skills/animalfood-daily-plan/SKILL.md`, `docs/operations/local-snapshot.md`.

## 1. Purpose

Connect the AnimalFood daily planning workflow to a **single live Google Sheet** so the state file and dated CSVs are mirrored to a sheet Gonzalo and Aranza can read/edit from any device. The integration must be **simple, low-cost, least-permission, and read/write only the AnimalFood sheet**. It replaces manual CSV import once validated — but the local CSV/state remains the backup source of truth.

## 2. Target workflow

Three scheduled touchpoints per day (local time, America/Argentina/Buenos_Aires):

- **06:00 — Morning planning.** Read the Sheet, check pending rows, generate the daily plan, update state.
- **15:00 — Midday review.** Read the Sheet, detect progress, adjust priorities, ask Gonzalo/Aranza for missing updates.
- **23:00 — End-of-day review.** Read the Sheet, capture results, carry over unfinished work, prepare tomorrow.

Each touchpoint still obeys the existing rules: carry-over first, no unnecessary new work, Research-First, Brand Consistency, Creative Performance, Paid Traffic, and human approval before any external action.

## 3. Why MCP

- **Native to Claude Code** — an MCP server exposes Google Sheets read/write as tools Claude can call directly, no custom glue code.
- **Low-cost** — uses a free Google account + free-tier Google Cloud credential; no paid SaaS required.
- **Scoped** — can be limited to a single spreadsheet and least-permission access.
- **Auditable** — every read/write is an explicit tool call, easy to review.
- Avoids over-engineering: no need for n8n/automation platform unless scheduling proves insufficient.

## 4. Scheduling strategy

**Decision (2026-06-04): local-first.** Because the MCP server runs **locally**, scheduling must also be local. **Windows Task Scheduler is the chosen method** — remote/cloud Claude scheduled tasks are **not used** for this workflow (a cloud routine could not reach a local MCP server). See **Local MCP Decision** below.

Method ranking for this setup:

1. **Windows Task Scheduler** (chosen) — triggers Claude Code at 06:00 / 15:00 / 23:00 with the relevant prompt. Reliable on this Windows 11 machine and compatible with a local MCP server. Requires the PC/notebook to be on at those times.
2. **Claude Code scheduled tasks (remote routines)** — **not used here** (cloud execution can't reach the local MCP server). Available at v2.1.162 but out of scope for this local workflow.
3. **n8n** (last resort) — only if Task Scheduler proves insufficient (e.g. retries/queuing). Adds a moving part; avoid unless required.

Claude Code version confirmed: **2.1.162**. Timezone for all schedules: **America/Argentina/Buenos_Aires**.

## Local MCP Decision

The preferred setup is:

Claude Code local → Google Sheets MCP local → Google Sheet
Windows Task Scheduler triggers the workflow at 06:00, 15:00 and 23:00.

Reason:
This keeps the setup low-cost, local-first, easier to control, and compatible with a local MCP server.

## 5. Google Sheet structure

**Target sheet name:** `AnimalFood Daily Operations`.
**Specific URL / Sheet ID:** **PENDING** — Gonzalo must create the sheet and provide the specific URL (see Pending Gonzalo Inputs).

One tab, one row per brand/action. Columns (extends the CSV's 16 columns with 5 state/tracking columns):

`Date,Brand,Objective,Format,Content idea,Hook,CTA,Community action,Paid angle,Evidence / Confidence,Asset needed,Owner,Priority,Metric,Business impact,Next action,Status,Result,Learning,Carry-over action,Notes`

**Status values (controlled list):**
`Idea, To prepare, In production, Ready, Scheduled, Published, Measured, Paused, Carried over`

The first 16 columns match `animalfood-daily-plan-YYYY-MM-DD.csv`; the last 5 (`Status, Result, Learning, Carry-over action, Notes`) match the Master Tracking Table in `animalfood-daily-sheet-state.md`. This keeps the Sheet a strict superset of both local artifacts.

## Auth Decision (2026-06-04): OAuth, not service account

Service-account **key** creation is **BLOCKED** in this Google account/organization by policy **`iam.disableServiceAccountKeyCreation`**. We do **not** bypass or disable the org policy.

**Auth method = OAuth 2.0 (local).** Chosen candidate `xing5/mcp-google-sheets` supports OAuth natively. Setup: create an **OAuth client ID (Desktop app)** in Google Cloud (this is **not** a service-account key, so it is allowed) → one-time browser consent → a **refresh token** is stored locally and reused for the scheduled 06:00/15:00/23:00 runs. Limit the OAuth scope to **Google Sheets** (avoid full Drive). The authorizing Google account must have Editor access to the sheet (it is the owner), so **no sheet-sharing with a service-account email is needed**.

## 6. Required inputs from Gonzalo

- Google Sheet **URL or Sheet ID**.
- **Google account** to use for the integration.
- **Approval to create a Google Cloud credential** if needed.
- **Approval before installing any MCP server.**
- **Confirmation of Claude Code version** (to decide scheduling method).
- **Preferred local timezone:** America/Argentina/Buenos_Aires (confirm).
- Whether **Claude Code can remain running** for scheduled tasks.

## Pending Gonzalo Inputs

- Specific Google Sheet URL. — **PROVIDED**
- Sheet ID. — **PROVIDED** (`1kHApdwpoo9zyOoxEdvTr6YnPoH164BAlEN6hZqYUf8U`)
- Google account to authorize (OAuth).
- Confirmation that the PC/notebook can stay on at 06:00, 15:00 and 23:00.
- Approval before installing any MCP server.
- Approval before creating the **OAuth client ID** (Desktop app) — service-account key is blocked by org policy, so OAuth is the path.
- Decision on the OAuth consent screen mode (publish to Production to avoid ~7-day refresh-token expiry in Testing mode).

## 7. MCP server candidates to review

Evaluate (do not install yet) — pick one after a security/maintenance review:

- `amaboh/google-sheets-mcp-server`
- `mkummer225/google-sheets-mcp`
- `xing5/mcp-google-sheets`

Review criteria: auth model (OAuth vs service account), scope control (single-sheet restriction), read/write granularity, maintenance/recency, dependency footprint, and clarity of setup.

## 8. Security rules

- **Do not install MCP without review.**
- **Do not paste credentials into Markdown** (or any repo file).
- Store credentials in **`.env` or the system credential manager only** (OAuth client secret + token file — out of the repo).
- **Do not disable or bypass Google organization security policies** (e.g. `iam.disableServiceAccountKeyCreation`).
- Use **least-permission access** — limit the OAuth scope to **Google Sheets**; avoid full Drive unless required.
- **Read/write only the AnimalFood sheet** — no access to other files/sheets.
- **No ads, publishing, outreach, or budget changes** from this integration.
- **Human approval before installing or authorizing anything**, and before any external action.

## 9. Setup checklist

- [ ] Check Claude Code version.
- [ ] Review MCP candidate (security + maintenance).
- [ ] Create / identify the Google Sheet.
- [ ] Configure the Google credential (least-permission, single sheet).
- [ ] Add the MCP server to Claude Code.
- [ ] Test read.
- [ ] Test write.
- [ ] Test status update.
- [ ] Configure 06:00 / 15:00 / 23:00 scheduled prompts.
- [ ] Keep the local CSV/state backup in place.

## 10. Test plan

1. **Read** existing rows from the Sheet.
2. **Update** one `Status` cell.
3. **Append** one test row.
4. **Re-read** and confirm the change/append landed.
5. **Remove** the test row — only after confirmation.

Pass criteria: every step succeeds without touching any sheet other than the AnimalFood one, and no credential ever appears in logs or repo files.

## 11. Fallback if MCP is delayed

Until MCP is reviewed, approved, and validated, keep using the current operational workflow:

- `docs/verticals/animalfood/animalfood-daily-sheet-state.md` (state source of truth).
- Daily CSV files in `docs/verticals/animalfood/daily-plans/`.
- **Manual Google Sheets import** of the CSV when a shared view is needed.

This fallback is fully operational today and requires no external setup.

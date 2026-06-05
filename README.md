# Lvanto Agency OS

Internal AI infrastructure and operational brain for **Lvanto**, a digital marketing agency focused on landing pages, websites, social media management, paid campaigns, automation agents, and AI services for companies.

---

## 1. Purpose

Lvanto Agency OS is a Claude Code–driven workspace that centralizes the agency's strategy, production, and delivery. It acts as a senior operations consultant, marketing strategist, frontend implementation assistant, automation architect, and delivery QA — turning client work into clear, premium, implementation-ready deliverables and scalable internal systems.

It currently runs Lvanto's flagship vertical, **AnimalFood**, as a live daily-operations case study.

## 2. Current Operational Status

- **Repository:** live and backed up to a private GitHub repo — https://github.com/Impulso-GR/lvanto-agency-os
- **AnimalFood daily workflow:** operational, automated via Windows Task Scheduler (06:00 / 15:00 / 23:00), writing to a live Google Sheet through the Google Sheets MCP.
- **Migration to single operational source (`01 · CALENDARIO OPERATIVO`):** closed and validated; `Hoja 1` frozen as legacy backup.
- **Stabilization phase:** awaiting the first real unattended monitored run, then several days of live stabilization before adding new tooling.

## 3. Main Systems

- **Agency OS core** — role, rules, and behavior (`CLAUDE.md`, `AGENCY_OS.md`).
- **AnimalFood vertical** — context + content, B2B, launches, paid-traffic, and creative systems under `docs/verticals/animalfood/`.
- **Daily operations engine** — daily plan skill + state file + dated CSV + live Google Sheet dashboard.
- **Automation layer** — PowerShell wrapper scripts driven by Windows Task Scheduler.
- **Agents & Skills** — specialized routing and reusable operational procedures.
- **Continuity layer** — `SESSION_LOG.md`, `HANDOFF.md`, `TASKS.md` keep work resumable across machines/accounts.

## 4. AnimalFood Daily Operations

- The **Google Sheet "AnimalFood Daily Operations"** is the **live operational view** (10-tab dashboard: 00 DASHBOARD, 01 CALENDARIO OPERATIVO, 02 PRODUCCIÓN, 03 BANCO DE CONTENIDOS, 04 PROMOCIONES B2B, 05 MÉTRICAS, 06 ARANZA-TAREAS CM, 07 LÍNEAS DE PRODUCTO, 08 UGC-COMUNIDAD, 09 IDEAS DESCARTADAS).
- `01 · CALENDARIO OPERATIVO` is the **single operational source**; the dashboard (00) reads from it. `Hoja 1` is frozen legacy backup.
- **Local state files are backup/reference only:** `docs/verticals/animalfood/animalfood-daily-sheet-state.md` and the dated CSVs in `docs/verticals/animalfood/daily-plans/`.
- **State-change guard:** never advance a Status by schedule or assumption — only on explicit signal/confirmed data; never "Published" without a link, never "Measured" without real metrics.
- Rollback for the scripts is available at `scripts/backup/*.ps1.orig` (reverts prompts to `Hoja 1`).

## 5. Google Sheets MCP Integration

- Server `google-sheets` (`uvx mcp-google-sheets`) registered in **local scope** (`C:\Users\Pc\.claude.json`) — **not** in `.claude/settings.json`.
- **Auth = OAuth 2.0** (service-account keys are blocked by org policy and are not bypassed). OAuth consent screen published to Production to avoid short token expiry.
- **Credentials live outside the repo** in `C:\ClaudeSecrets\` (OAuth client JSON + token). Their contents are **never read, printed, or committed**.
- MCP is connected and validated end-to-end (read, write, status update, cleanup).

## 6. Windows Task Scheduler Automation

Three daily tasks, all verified:

| Task | Time | Script |
|---|---|---|
| AnimalFood-DailyPlan-0600 | 06:00 | `scripts/animalfood-daily-0600.ps1` |
| AnimalFood-MiddayReview-1500 | 15:00 | `scripts/animalfood-daily-1500.ps1` |
| AnimalFood-EndOfDay-2300 | 23:00 | `scripts/animalfood-daily-2300.ps1` |

- Launched via stable `pwsh` alias (`-NoProfile -ExecutionPolicy Bypass -File`); Interactive logon, run-if-missed, no wake-to-run, on-battery OK, 30-min limit.
- Scripts use **scoped `--allowedTools`** for the google-sheets MCP only — **never `--dangerously-skip-permissions`**.
- Logs are written to `logs/` (git-ignored).

## 7. Agents

Located in `.claude/agents/`:

- **agency-command-center** — default entry point / orchestrator; detects the front, routes to the right agent/skill, keeps contexts separated, returns consolidated output.
- **agency-director** — strategic decisions, scope protection, proposals.
- **landing-page-strategist** — landing page offer, layout, conversion logic.
- **animalfood-growth-strategist** — AnimalFood B2C/B2B growth actions.

## 8. Skills

Located in `.claude/skills/`:

- **handoff-session** — close a session and update continuity files.
- **checkpoint-session** — mid-session safety checkpoint.
- **lvanto-copywriting** — conversion copy for landings, ads, social, proposals.
- **lvanto-frontend-design** — visual/interface direction + pre-delivery QA.
- **animalfood-daily-plan** — strict sheet-style daily AnimalFood operating plan.

## 9. Folder Structure

```
VSCODE/
├── CLAUDE.md              # Role and rules for Claude Code
├── AGENCY_OS.md           # Agency master reference + growth engine
├── README.md              # This file
├── TASKS.md               # Active task list
├── SESSION_LOG.md         # Session history
├── HANDOFF.md             # Cross-session continuity
├── .gitignore
├── .claude/
│   ├── agents/            # Specialized agents
│   ├── skills/            # Reusable skills
│   └── settings.json      # Permissions (hardened for Windows/PowerShell)
├── docs/
│   ├── integrations/      # Google Sheets MCP plan + checklists
│   ├── operations/        # Ops research + snapshots
│   └── verticals/animalfood/   # AnimalFood systems + daily-plans/ + imports/
├── scripts/               # Daily automation scripts (+ backup/ rollback copies)
├── templates/             # Social calendar + campaign templates
└── logs/                  # Run logs (git-ignored, keeps .gitkeep)
```

## 10. Safety Rules

- **No ads, publishing, outreach, budget changes, or external actions without Gonzalo's explicit approval.**
- **Never** modify or commit secrets, credentials, environment files, API keys, tokens, or billing data.
- Credentials live **outside the repo** in `C:\ClaudeSecrets\` and must never be committed or printed.
- `.claude/settings.local.json` is **git-ignored**; `logs/*.log` are **git-ignored**.
- **Never** use `--dangerously-skip-permissions`.
- No destructive changes; do not delete files unless explicitly instructed.
- Make small, controlled changes and keep documentation updated.

## 11. How to Resume Work

When starting a session:
1. Read `CLAUDE.md`.
2. Read `TASKS.md`.
3. Read `HANDOFF.md`.
4. Read `SESSION_LOG.md`.
5. Read `AGENCY_OS.md`.
6. Summarize the current project state and ask before any risky change.

End each session with the **handoff-session** or **checkpoint-session** skill.

## 12. Git Workflow

- Private remote: `origin` → https://github.com/Impulso-GR/lvanto-agency-os (branch `master` tracks `origin/master`).
- Standard flow: `git add` → `git commit` → `git push`.
- **No force push, no history rewrite.**
- Confirm secrets/logs/local settings stay ignored before staging (`git status --ignored`, `git check-ignore`).

## 13. Current Next Priorities

1. **First real unattended monitored run** — let the next scheduled task fire on its own over `01 · CALENDARIO OPERATIVO`; do not run manually. Review the log + Sheet afterward.
2. **Stabilize the AnimalFood workflow over several days** (table-first output, carry-over chain, no-duplicate / update-on-status-change rules).
3. **Test "qué tengo que hacer hoy"** (animalfood-daily-plan).
4. **Audit/install a browser MCP — only after stabilization.**

---

*Lvanto Agency OS — the operational brain of the agency. Built to be clear, premium, and safe to continue from any machine or Claude account.*

# Agency OS Integrity Audit Skill

## Purpose

Audit the **full Lvanto Agency OS** for architecture quality, operational integrity, safety, documentation consistency, automation reliability, and production readiness. This skill is a **strict QA auditor — never a content generator.** Its job is to find problems, not to build features or write copy.

Run it **before adding any major new system**: Browser MCP, new agents, new automations, paid-traffic systems, a Trend Signals Log, an Extraordinary Content Standard, external integrations, or onboarding new clients.

## When to Use

- Before introducing a major new capability or integration.
- Before onboarding additional clients onto the OS.
- After a batch of structural changes, to confirm the system is still coherent and resumable.
- When Gonzalo asks "is the system healthy / production-ready / safe to keep building?"

## Operating Stance (non-negotiable)

- **Brutally honest over optimistic.** Do not soften findings. A reassuring summary that hides a real gap is a failure of this skill.
- **Do not hide problems.** Every blocker and risk must be surfaced explicitly.
- **Label uncertainty as uncertainty.** If something cannot be verified from files/state, say so — never assume it passes.
- **Evidence-based.** Every score and verdict must point to a concrete file, setting, or observation. No vibes.
- **Read-only by default.** This skill diagnoses; it does not fix.

## Hard Rules

- **Never modify files** unless Gonzalo explicitly asks (this skill audits; fixes are a separate, approved step).
- **Never install tools.**
- **Never run scheduled tasks** unless explicitly asked.
- **Never read or print credentials**, OAuth tokens, or `client_secret` contents. Confirm their *absence from the repo* by path/ignore rules only — never by opening them.
- **Never** recommend or use `--dangerously-skip-permissions`.
- Do not create, publish, or send anything external.

## Audit Method

Read-only inspection. Use file reads, `git` status/diff, `Get-ScheduledTaskInfo` (read-only), and `.gitignore` / `git check-ignore` checks. For the live Sheet, a **read-only** `get_sheet_data` is allowed to confirm structure/consistency — **never** a write. If a check cannot be completed safely or its inputs are missing, mark it **UNCERTAIN** rather than guessing.

---

## What to Verify

### 1. Core architecture
Files: `CLAUDE.md`, `AGENCY_OS.md`, `README.md`, `HANDOFF.md`, `TASKS.md`, `SESSION_LOG.md`, plus the folder structure.
Check:
- Each exists, is non-empty, and is internally consistent with the others (no contradictions about current state).
- A fresh reader could **understand and resume** the project from these files alone.
- HANDOFF/SESSION_LOG/TASKS agree on what is done vs pending.
- Folder structure matches what README and the scripts assume.

### 2. Agents
`agency-command-center`, `agency-director`, `landing-page-strategist`, `animalfood-growth-strategist`, and any future agents.
Check each for:
- a **clear, single purpose**;
- **no role overlap** that creates routing confusion;
- correct routing (command-center detects front → routes → keeps contexts separated);
- explicit **output rules**;
- **no generic/catch-all behavior** that dilutes the specialist role;
- stated **safety boundaries** (what it must not do).

### 3. Skills
`checkpoint-session`, `handoff-session`, `lvanto-copywriting` (verify the real name on disk — the audit request referenced "lvanto-cosign"; flag any naming mismatch), `lvanto-frontend-design`, `animalfood-daily-plan`, `agency-os-integrity-audit` (this one), and future skills.
Check each for:
- a **clear trigger**;
- **strict, defined output** (not loose prose where a structure is required);
- **no duplicate responsibility** with another skill or agent;
- **no dangerous tool usage** (no skip-permissions, no unscoped writes);
- whether it adds **real operational value** (or is dead weight).

### 4. AnimalFood vertical
Every file in `docs/verticals/animalfood/`.
Verify consistency across: context, daily-operator rules, content-system, paid-traffic-system, creative-ads-lab, operations-log, **trend-intelligence doctrine**, daily-sheet-state, content-log, and launches/B2B/growth docs.
Check that:
- brand identities (Canfeed/Catfeed/Enercan/IronPet) are consistent across files;
- rules in one doc do not contradict another (e.g. state-change guard, anti-repetition);
- the trend-intelligence doctrine's gates are reflected (or at least not contradicted) by the daily-plan flow.

### 5. Google Sheets MCP / live Sheet workflow
Check:
- the **Google Sheet is treated as the live operational view**; local state files are **backup/reference** only;
- **no duplicate-row risk** (one row per Cuenta+Pieza+Fecha; update-not-append rule present);
- **Status / Result / Learning** update rules are defined and consistent;
- the **sheet tabs the scripts expect** actually exist (esp. `01 · CALENDARIO OPERATIVO`, `03 · BANCO`, `05 · MÉTRICAS`, `09 · IDEAS DESCARTADAS`);
- the workflow can **survive restarts** (state recoverable, scheduler re-arms, MCP reconnects via OAuth token outside repo).

### 6. Scheduler and scripts
Files: `scripts/animalfood-daily-0600.ps1`, `…-1500.ps1`, `…-2300.ps1`; plus Task Scheduler and `logs/`.
Check:
- scripts parse cleanly and use **scoped `--allowedTools`** (no skip-permissions);
- Task Scheduler assumptions hold (LogonType, StartWhenAvailable, the **known 0600 never-ran gap**);
- the **0600 once-per-day guard** is present and correct (marker on exit 0, `-Force`, `logs/.animalfood-0600-lastrun.flag`);
- logs are being written and are git-ignored;
- a clear recommendation on whether **AtLogOn / WakeToRun** should be applied now or deferred (and why).

### 7. Security
Verify (by path/ignore rules only — **never open secret files**):
- no credentials, OAuth token contents, or `client_secret` JSON in the repo;
- `C:\ClaudeSecrets\` is **outside** the repo;
- `.claude/settings.local.json` is git-ignored;
- `logs/*.log` are git-ignored;
- no `--dangerously-skip-permissions` anywhere;
- no-scraping / no-engagement rules are present (per trend-intelligence doctrine).

### 8. Git / GitHub
Check:
- remote `origin` configured (private repo);
- working tree status (clean vs uncommitted);
- latest changes committed **and pushed**;
- `.gitignore` protects local/secret files;
- README accurately reflects current reality.

### 9. Output quality
Assess whether the system can actually produce: strategic content proposals · brand-pillar mapping · owner assignment · metrics · risk/confidence labels · evidence/hypothesis labeling · prompts/captions/design direction · **non-generic** recommendations. Penalize any path that yields generic or unlabeled output.

### 10. Production readiness score
Produce the scores and lists defined in the output format below.

---

## Scoring Guide

Score every module **0–10** using this scale (be strict):
- **0–3** Broken / missing / unsafe — blocks production use.
- **4–6** Works but with real gaps or risks — usable with caution.
- **7–8** Solid, minor improvements only.
- **9–10** Production-grade, no material concerns.

**Overall score** is not a blind average — weight **Security** and **Scheduler reliability** heavily; a critical blocker in either caps the overall at **5 max** regardless of other modules. State the weighting reasoning.

**Status labels:** ✅ Pass · ⚠️ Caution · ❌ Fail · ❓ Uncertain.

---

## Required Output Format (produce exactly this)

```
# Agency OS Integrity Audit

## 1. Executive verdict
- Score:
- Status:
- Can we keep building? Yes/No
- Main risk:

## 2. Module scorecard
| Module | Score | Status | Notes |
|---|---:|---|---|
| Architecture |  |  |  |
| Security |  |  |  |
| AnimalFood workflow |  |  |  |
| Scheduler reliability |  |  |  |
| Documentation |  |  |  |
| Strategic output quality |  |  |  |
| Git/GitHub safety |  |  |  |
| Extensibility |  |  |  |

## 3. Critical blockers
| Blocker | Impact | Fix |
|---|---|---|

## 4. Medium risks
| Risk | Impact | Fix |
|---|---|---|

## 5. Low-priority improvements
| Improvement | Why it matters | Timing |
|---|---|---|

## 6. Security review
| Check | Result |
|---|---|

## 7. Automation review
| Component | Result | Notes |
|---|---|---|

## 8. Strategic quality review
| Area | Result | Notes |
|---|---|---|

## 9. Recommended next 5 actions
1.
2.
3.
4.
5.

## 10. Final decision
State whether the system is ready to:
- continue strategy work;
- add Browser MCP;
- build Trend Signals Log;
- create Extraordinary Content Standard;
- onboard more clients.
(For each: Ready / Not yet — with the one condition that would change the answer.)
```

## Notes

- If a critical blocker exists, **say "No"** to "Can we keep building?" for the affected area — do not round up.
- Keep findings traceable: cite the file/line/setting behind each verdict.
- This skill complements `checkpoint-session` (safety snapshots) and `handoff-session` (continuity); it does **not** replace them and must not update those files itself.
- The audit ends with a recommendation only. Any fix is a separate, explicitly approved action.

# Lvanto Agency OS - Active Tasks

## Current Priority

- [x] Create base folder structure.
- [x] Configure Claude Code settings (settings.json — permissions hardened for Windows/PowerShell).
- [x] Create agent: agency-command-center (default entry point / orchestrator).
- [x] Create agent: agency-director.
- [x] Create agent: landing-page-strategist.
- [x] Create agent: animalfood-growth-strategist.
- [ ] Create remaining core agency agents.
- [ ] Create remaining operational skills.
- [x] Connect project to a private GitHub repository (Impulso-GR/lvanto-agency-os, private; commit 57f191a pushed; master tracks origin/master; no secrets committed).
- [x] Fill AGENCY_OS.md (master reference + growth engine).
- [x] Create AnimalFood vertical structure (docs/verticals/animalfood/).
- [x] Fill AnimalFood systems (content, b2b, launches, daily-operator) + import synthesis.
- [x] Add AnimalFood content-log, strict daily sheet system + template, paid-traffic-system.
- [ ] Fill README.md (repo overview).
- [x] Add "Budget % of total campaign budget" + budget allocation rules to Creative Ads Lab + template (validated; CSV header matches table).
- [x] Enforce daily-sheet HARD RULE (real Markdown table, exact 16-col header) in animalfood-daily-plan skill + daily-operator.
- [x] Create animalfood-daily-sheet-state.md and wire it into the daily plan (Sheet State Rule + Operating Principle).
- [x] Pre-load today's 3 carry-over rows into the daily-sheet state (carry-over chain live).
- [x] Add Delegated Output Preservation Rule to agency-command-center (table-first, no prose/blocks).
- [x] Add Daily Plan File Output Rule (write dated CSV to daily-plans/) to skill + operator; today's CSV created + validated.
- [ ] Stabilization testing: run daily plan over several days; confirm table-first output + carry-over chain hold.
- [ ] Update CSV/state only when a row changes status (Catfeed / Canfeed Pilar 1 / Animalfood repost).
- [x] Install uv/uvx + validate mcp-google-sheets package on this machine.
- [x] Register google-sheets MCP locally (OAuth) + complete OAuth authorization (token created).
- [x] Read-only test of Google Sheet 1kHApdwpoo9zyOoxEdvTr6YnPoH164BAlEN6hZqYUf8U (PASSED — tab Hoja 1).
- [x] Write/Status test (PASSED — temp row, Status To prepare→Ready, cleanup).
- [x] Write real 21-column header A1:U1 (validated).
- [x] Mirror today's 3 carry-over rows to A2:U4 (Catfeed/Canfeed = To prepare, Animalfood institucional = Idea); no duplicates.
- [x] Publish OAuth consent screen to Production (removes ~7-day token expiry).
- [x] Create wrapper scripts + logs/ + .gitignore (scoped MCP tools; no --dangerously-skip-permissions).
- [x] Manual test of 15:00 wrapper script (read-only, no Sheet change, clean exit, log written).
- [x] Windows Task Scheduler (06:00/15:00/23:00) registered + verified (3 tasks Ready; Interactive, run-if-missed, no wake-to-run, on-battery OK).
- [~] Scheduler validation — PARTIAL (corrected 2026-06-05 after integrity audit):
  - [x] 1500 validated in real scheduled production (recovered via run-if-missed 2026-06-05 18:42, LastTaskResult=0, new log, no signal → no changes, Sheet consistent).
  - [x] 2300 validated (ran on time 2026-06-04 23:00, LastTaskResult=0, log written).
  - [ ] **0600 NOT yet validated in production** — LastRunTime=1999, code 267011 (`task has not yet run`): the morning task has never executed. Root cause environmental (PC unavailable at 06:00 + catch-up recovers only the most-recent missed run). The 06:00 engine adds the day's rows, so workflow is currently 2/3 operational.
- [x] Reestructurar el Google Sheet como dashboard operativo (10 pestañas + DASHBOARD con KPIs/alertas, datos validados, formato visual). Aditivo: Hoja 1 intacta.
- [x] Repuntar los 3 scripts 06/15/23 de Hoja 1 → 01 · CALENDARIO OPERATIVO (solo bloque $Prompt; parseo 0 errores; doble fuente resuelta).
- [x] Backup de rollback de los 3 scripts originales (scripts/backup/*.ps1.orig).
- [x] Incorporar regla crítica state-change guard en los prompts (no avanzar Estado sin señal/dato; nunca Publicado sin link; nunca Medido sin métricas).
- [x] Probar 15:00 repuntado sobre el calendario real (leyó 01, no tocó Hoja 1, sin cambios sin señal, sin duplicados, encabezado intacto, log OK).
- [x] Probar 06:00 de forma AISLADA sobre TEST · CALENDARIO OPERATIVO — EJECUTADO, VERIFICADO y APROBADO por Gonzalo (2 filas nuevas, 0 duplicados, carry-over OK, contenido previo intacto, encabezado OK, 01 sin tocar, dashboard real sin afectar).
- [x] Probar 23:00 de forma AISLADA sobre TEST · CALENDARIO OPERATIVO — EJECUTADO, VERIFICADO y APROBADO por Gonzalo (no avanzó estados, carry-over=Sí solo en filas no terminadas, no escribió métricas, no creó TEST · MÉTRICAS, 05/01 intactos, dashboard real sin cambios).
- [x] Corregir bug de alertas por filas vacías en el dashboard (00, B30:B33): caption/visual/aprobación/dato pasaron de contar 399/397 filas vacías a contar solo filas reales (guarda Fecha o Cuenta o Pieza ≠ ""; SUMPRODUCT; locale es-AR ;). Verificado: 🔴2/🔴2/🔴2/🟢OK; alertas reales preservadas; sin errores.
- [x] LIMPIEZA del entorno TEST: pestaña TEST · CALENDARIO OPERATIVO borrada + scripts/test/ eliminado (no se creó TEST · MÉTRICAS). Backups intactos; Hoja 1 sin tocar; Task Scheduler sin tocar.
- [x] 0600 once-per-day guard added (commit 19a2dcd; parse-validated 0 errors): marker logs/.animalfood-0600-lastrun.flag, written only on exit 0, -Force override. Makes a future AtLogOn catch-up safe from double-runs. NOT yet exercised in production.
- [x] Capa 1 — enable Task Scheduler operational telemetry (commit fe0719e; log was OFF → now ON).
- [ ] **OBSERVE passive 0600 run 2026-06-06 06:00** (do NOT run manually): check Operational log + logs/ (new 0600 log + marker) + Sheet 01 (carry-over + new rows, no duplicates, no undue Estado advances).
- [ ] If 0600 fails: decide Capa 2 (WakeToRun) and/or Capa 3 (AtLogOn catch-up trigger) based on the Operational log; guard already makes Capa 3 safe.
- [ ] Only AFTER scheduler stability (0600 proven): continue Browser MCP evaluation/install.
- [ ] Build Trend Signals Log (doctrine §16 schema) + wire into daily-plan flow (trend doctrine is currently documented-only / inert).
- [~] **`animalfood-competitor-research` skill — conceptually APPROVED, DEFERRED** (design proposal done; NOT created):
  - Purpose: competitor/reference research PRODUCER that feeds `animalfood-trend-signals-log.md` (separate from daily-plan = consumer; obeys extraordinary-content-standard = rulebook).
  - Inputs: Gonzalo-provided competitor handles / URLs / screenshots · public Meta Ads Library findings · public TikTok Creative Center observations · Google Trends/RSS findings · manual Gonzalo/Aranza observations · own metrics when available.
  - Output (14 fields): competitor/reference summary · what they're doing · why it may work · what NOT to copy · AnimalFood adaptation · brand fit · strategic pillar · content opportunity · hook/caption angle · visual direction · risk · evidence/confidence · metric to validate · suggested Trend Signals Log row.
  - Rules: no unauthorized scraping · no automated likes/follows/comments/DMs/engagement · no copying competitor creative · no publishing/ads without Gonzalo approval · weak evidence = Low confidence · missing data = Needs data · produces content OPPORTUNITIES, not calendars.
  - **Decision: implement ONLY after the 0600 scheduler is stable, OR if Gonzalo explicitly chooses manual research mode.** Reason: do not add a new producer while the automation base is unproven (Opus audit anti-pattern).
  - Next future action: create SKILL.md (proposal first) → wire trigger into agency-command-center routing → validate with one real Gonzalo-provided competitor reference end-to-end.
- [ ] Test AnimalFood daily planning system ("qué tengo que hacer hoy" → animalfood-daily-plan).
- [ ] Test workflow from another machine (clone and continue).
- [ ] Audit/install browser MCP if useful (after AnimalFood live workflow is stable).

## Next Skills to Build

- [ ] client-onboarding
- [ ] campaign-planning
- [ ] social-calendar
- [ ] ai-automation-proposal
- [ ] brand-audit
- [ ] pre-delivery-check
- [x] handoff-session
- [x] checkpoint-session
- [x] lvanto-copywriting
- [x] lvanto-frontend-design
- [x] animalfood-daily-plan (daily AnimalFood sheet-style operating plan)

## Notes

This repository is the central operational infrastructure for Lvanto.

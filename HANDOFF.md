# Handoff

## Project
Lvanto Agency OS — internal AI infrastructure for a digital marketing agency.

## Current State (2026-06-04)
- Claude Code: installed and working.
- CLAUDE.md: complete (role, rules, behavior).
- TASKS.md: active and reconciled with real state.
- .claude/settings.json: permissions configured and hardened for Windows/PowerShell.
- Base folder structure: 19 directories across .claude/, docs/, templates/, clients/, projects/.
- Agents: agency-command-center (default entry point — detects front, routes to the right agent/skill, keeps contexts separated, returns consolidated operational/strategic output), agency-director, landing-page-strategist, animalfood-growth-strategist.
- Skills: handoff-session, checkpoint-session, lvanto-copywriting, lvanto-frontend-design, animalfood-daily-plan (generates the daily AnimalFood operating plan on "qué tengo que hacer hoy" — sheet-style: content, community, paid traffic, owners, metrics, next action).
- docs/operations/github-skills-research.md: 7 candidates evaluated; Reviews 1 and 2 complete.
- AGENCY_OS.md: filled — master reference + Future Growth Engine + Gonzalo Growth Targets.
- AnimalFood vertical: complete + extended — context, growth-system, content-system, b2b-system, launches, daily-operator (strict sheet-style), content-log (anti-repetición), paid-traffic-system, creative-ads-lab + raw import in imports/. Templates: daily-sheet (social-calendars), creative-ads-sheet (campaigns). Rules applied across creative gateways: Research-First, Brand Consistency, Creative Performance. Current fee 3,000,000 ARS/month (Gustavo in principle, pending Roberto); Gonzalo = creative director/growth strategist; flagship Lvanto case study.
- Budget correction RESOLVED (2026-06-04): "Budget % of total campaign budget" column + Budget Allocation Rules added to creative-ads-lab + template; both validated (CSV header matches table columns, 22 columns each).
- Daily-sheet HARD RULE (2026-06-04): Section 1 of the daily plan must be a real Markdown table with the exact 16-column header; separated blocks forbidden, CSV rows as only fallback. Applied to animalfood-daily-plan skill + daily-operator.
- Daily sheet STATE (2026-06-04): created animalfood-daily-sheet-state.md (local source of truth until Google Sheets). Wired into skill + operator via Sheet State Rule (read state before planning; decide carry over · pause · replace · measure first · discard) + Operating Principle (optimize Gonzalo's time; every recommendation must add value). Pre-loaded with today's 3 carry-over rows (Catfeed/Canfeed = To prepare, Animalfood repost = Idea) — carry-over chain is live.
- Output format ENFORCED end-to-end (2026-06-04): agency-command-center has the Delegated Output Preservation Rule; daily-plan skill + daily-operator require the real 16-column Markdown table first (no prose/blocks/decorative separators; CSV rows if too wide).
- STATUS: system ready for stabilization testing (run daily plan over several days; confirm table-first output + carry-over chain hold).
- Daily workflow OPERATIONAL (2026-06-04): runs on animalfood-daily-sheet-state.md (state) + dated CSV in docs/verticals/animalfood/daily-plans/ (animalfood-daily-plan-YYYY-MM-DD.csv, exact 16 cols). Today's CSV exists + validated (3 rows). Daily Plan File Output Rule added to skill + operator. Temporary local sheet until Google Sheets / n8n / MCP.
- WORKFLOW RULE: update the CSV/state only when a row changes status (Catfeed designed/scheduled/published · Canfeed Pilar 1 designed/PSD ready · Animalfood repost approved/scheduled/published). Do not regenerate unnecessarily.
- GOOGLE SHEETS MCP (2026-06-04): uv 0.11.19 installed (winget); mcp-google-sheets 0.6.3 validated; MCP server "google-sheets" registered in LOCAL scope (C:\Users\Pc\.claude.json — NOT .claude/settings.json) via uvx, env CREDENTIALS_PATH + TOKEN_PATH. OAuth (Desktop client) authorized; token at C:\ClaudeSecrets\animalfood-oauth-token.json (client JSON + token kept out of repo, contents never read). Service-account keys blocked by org policy → OAuth used. Plan/checklist: docs/integrations/. **CONNECTED + LIVE (2026-06-04):** MCP read/write validated end-to-end (read test, write test, Status-cell update To prepare→Ready, cleanup). Google Sheet "AnimalFood Daily Operations" (ID 1kHApdwpoo9zyOoxEdvTr6YnPoH164BAlEN6hZqYUf8U, tab Hoja 1) is now the LIVE operational view: real 21-column header at A1:U1 written + validated; today's 3 carry-over rows mirrored to A2:U4 (Catfeed = To prepare, Canfeed = To prepare, Animalfood institucional = Idea). RULE: Google Sheet = live operational view; local animalfood-daily-sheet-state.md remains BACKUP until scheduling is fully tested; do NOT duplicate rows; update rows only when Status/Result/Learning changes. **OAuth consent screen PUBLISHED TO PRODUCTION (2026-06-04)** — removes the ~7-day testing-mode token expiry.
- README.md: empty — not filled yet.
- GitHub: private repository not connected yet — planned for tomorrow.

## Task Scheduler — LIVE (2026-06-04)
3 daily tasks registered + verified (all State=Ready): AnimalFood-DailyPlan-0600 (06:00), AnimalFood-MiddayReview-1500 (15:00), AnimalFood-EndOfDay-2300 (23:00). Each launches its scripts/animalfood-daily-*.ps1 via stable pwsh alias (-NoProfile -ExecutionPolicy Bypass -File). Settings: LogonType=Interactive (run only when logged on), StartWhenAvailable=True (run if missed), WakeToRun=False, AllowStartOnBatteries=True, 30-min limit, IgnoreNew. User=DESKTOP-K1B4K78\Pc. Scripts use scoped google-sheets --allowedTools only (no --dangerously-skip-permissions). **FULLY VALIDATED (2026-06-04):** AnimalFood-MiddayReview-1500 manually launched via Start-ScheduledTask → LastTaskResult=0, returned to Ready, new log written (logs/animalfood-daily-1500_2026-06-04_090146.log), Sheet UNCHANGED (no fabricated writes, no new rows, header intact). Full pipeline Task Scheduler → pwsh → claude headless (scoped tools) → live Sheet confirmed working end-to-end. (06:00 and 23:00 not manually run — same script pattern + verified settings.) Rollback: Disable/Unregister the 3 AnimalFood-* tasks; local CSV/state fallback still works.

## Google Sheet — DASHBOARD OPERATIVO (2026-06-04)
El Sheet 1kHApd…Uf8U pasó de tabla plana a sistema de 10 pestañas (modo ADITIVO — Hoja 1 quedó INTACTA). Pestañas: 00 DASHBOARD · 01 CALENDARIO OPERATIVO (17 cols) · 02 PRODUCCIÓN (checkboxes) · 03 BANCO DE CONTENIDOS · 04 PROMOCIONES B2B · 05 MÉTRICAS · 06 ARANZA-TAREAS CM · 07 LÍNEAS DE PRODUCTO · 08 UGC-COMUNIDAD · 09 IDEAS DESCARTADAS O REPETIDAS. Cuentas: @animalfoodargentina, @canfeed.ar (Canfeed+Catfeed), @enercan.ar (Enercan+Enercat), @ironpet.ar. DASHBOARD con fórmulas vivas (semana, % listos+barra, pendientes/trabados, nuevas/carry-over, asignación Gonzalo/Aranza, cuenta más activa/atrasada, próximo post, próxima promo, 8 alertas). NOTAS TÉCNICAS: locale es-AR → fórmulas con ";"; formato condicional por grid (no cruza pestañas). Datos solo validados (CF-CAT-001, IronPet Gato 15kg/70, 3 carry-over, tareas Aranza, líneas).

## Migración de fuente operativa — APLICADA (2026-06-04)
**Doble fuente RESUELTA.** Los 3 scripts (06:00/15:00/23:00) fueron repuntados de `Hoja 1` → `01 · CALENDARIO OPERATIVO` (solo se reemplazó el bloque `$Prompt`; parseo 0 errores). `01 · CALENDARIO OPERATIVO` = **fuente operativa única**; el dashboard (00) vive sobre 01. `Hoja 1` = **respaldo legacy congelado** (los prompts instruyen NO leerla/escribirla).
- **Rollback disponible:** `scripts/backup/animalfood-daily-{0600,1500,2300}.ps1.orig` (originales apuntando a Hoja 1).
- **Regla crítica (state-change guard) incorporada en los prompts:** no avanzar Estado por horario ni suposición; cambiar solo con señal explícita / dato confirmado; nunca Publicado sin link/evidencia; nunca Medido sin métricas reales; sin señal → no cambiar nada.
- **15:00 PROBADO Y VALIDADO sobre el calendario real:** leyó 01, no tocó Hoja 1, no cambió nada (sin señal), no agregó/duplicó filas, encabezado intacto, log OK, dashboard sigue calculando.
- **06:00 y 23:00: PENDIENTES de prueba controlada.** El 06:00 AGREGA filas (carry-over + nuevas) → se prueba sobre pestaña duplicada `TEST · CALENDARIO OPERATIVO`, NUNCA sobre el real, sin tocar Task Scheduler.

## Migración 06/15/23 — CERRADA Y VALIDADA (2026-06-04)
Los 3 scripts viven sobre `01 · CALENDARIO OPERATIVO` (fuente única); `Hoja 1` = respaldo legacy congelado.
- **06:00 — aislado APROBADO:** test sobre pestaña duplicada → 2 filas nuevas (@enercan.ar, @ironpet.ar), 0 duplicados, carry-over y contenido previo respetados, ningún Estado avanzado, 01 y dashboard sin afectar.
- **15:00 — validado sobre el real** (corrida previa: leyó 01, no tocó Hoja 1, sin cambios sin señal, sin duplicados).
- **23:00 — aislado APROBADO:** no avanzó estados (sin señal/métricas), carry-over=Sí solo en lo no terminado, no escribió métricas ni creó TEST·MÉTRICAS, 05/01 intactos, dashboard sin cambios.
- **Bug de alertas por filas vacías CORREGIDO** (dashboard 00, B30:B33): caption/visual/aprobación/dato contaban checkboxes FALSE de filas vacías (399/397). Reescritas con SUMPRODUCT + guarda de fila real (Fecha(B) o Cuenta(C) o Pieza(E) ≠ "") y separadores `;` (es-AR). Ahora 🔴2/🔴2/🔴2/🟢OK; alertas reales preservadas (idea repetida 🔴1, promo 🔴5); sin errores.
- **Entorno TEST limpiado:** pestaña `TEST · CALENDARIO OPERATIVO` borrada + `scripts/test/` eliminado. Backups `scripts/backup/*.ps1.orig` intactos; `Hoja 1` y Task Scheduler sin tocar.
- **ROLLBACK disponible:** `scripts/backup/animalfood-daily-{0600,1500,2300}.ps1.orig` (revierte los prompts a Hoja 1).

## Next Actions
1. **PRIMERA CORRIDA REAL MONITOREADA:** dejar que dispare sola la próxima ejecución automática programada (Task Scheduler) sobre `01 · CALENDARIO OPERATIVO`. NO ejecutar manualmente 06:00 ni 23:00. Después, revisar log (`logs/`) + Sheet (filas agregadas, sin duplicados, estados sin avances indebidos, dashboard correcto).
2. Si falla algo, rollback desde `scripts/backup/*.ps1.orig`.
3. Connect this folder to a private GitHub repository.
4. Stabilization testing durante varios días contra el Sheet real (confirm table-first output, carry-over chain, y reglas no-duplicado / update-on-status-change).
5. Test AnimalFood daily planning system: "qué tengo que hacer hoy".
6. Test workflow from another machine.

## Key Files
| File | Purpose |
|---|---|
| CLAUDE.md | Role and rules for Claude Code |
| AGENCY_OS.md | Agency master reference + growth engine |
| docs/verticals/animalfood/ | AnimalFood priority vertical (context + systems) |
| TASKS.md | Active task list |
| SESSION_LOG.md | Session history |
| HANDOFF.md | This file — cross-session continuity |
| .claude/settings.json | Permissions (hardened for Windows/PowerShell) |
| .claude/agents/agency-command-center.md | Master orchestrator / default entry point |
| .claude/agents/agency-director.md | Strategic director agent |
| .claude/agents/landing-page-strategist.md | Landing page strategy agent |
| .claude/agents/animalfood-growth-strategist.md | AnimalFood growth strategy agent |
| .claude/skills/handoff-session/SKILL.md | End-of-session wrap-up |
| .claude/skills/checkpoint-session/SKILL.md | Mid-session safety checkpoint |
| .claude/skills/lvanto-copywriting/SKILL.md | Conversion copywriting |
| .claude/skills/lvanto-frontend-design/SKILL.md | Frontend design direction and QA |
| .claude/skills/animalfood-daily-plan/SKILL.md | Daily AnimalFood sheet-style operating plan |
| docs/verticals/animalfood/animalfood-daily-sheet-state.md | Daily plan state — local source of truth until Sheets |
| docs/operations/github-skills-research.md | External skills research tracker |

## Rules for the Next Session
- Start by reading CLAUDE.md, TASKS.md, HANDOFF.md, and SESSION_LOG.md.
- Keep changes small and controlled.
- Do not install tools without review.
- Do not modify .env files or credentials.
- End the session by running the handoff-session or checkpoint-session skill.

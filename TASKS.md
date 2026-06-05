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
- [ ] Connect project to a private GitHub repository.
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
- [x] Validate one real scheduled run — AnimalFood-MiddayReview-1500 via Start-ScheduledTask (LastTaskResult=0, new log, Sheet unchanged, correct behavior). Scheduled workflow fully validated.
- [x] Reestructurar el Google Sheet como dashboard operativo (10 pestañas + DASHBOARD con KPIs/alertas, datos validados, formato visual). Aditivo: Hoja 1 intacta.
- [x] Repuntar los 3 scripts 06/15/23 de Hoja 1 → 01 · CALENDARIO OPERATIVO (solo bloque $Prompt; parseo 0 errores; doble fuente resuelta).
- [x] Backup de rollback de los 3 scripts originales (scripts/backup/*.ps1.orig).
- [x] Incorporar regla crítica state-change guard en los prompts (no avanzar Estado sin señal/dato; nunca Publicado sin link; nunca Medido sin métricas).
- [x] Probar 15:00 repuntado sobre el calendario real (leyó 01, no tocó Hoja 1, sin cambios sin señal, sin duplicados, encabezado intacto, log OK).
- [x] Probar 06:00 de forma AISLADA sobre TEST · CALENDARIO OPERATIVO — EJECUTADO, VERIFICADO y APROBADO por Gonzalo (2 filas nuevas, 0 duplicados, carry-over OK, contenido previo intacto, encabezado OK, 01 sin tocar, dashboard real sin afectar).
- [x] Probar 23:00 de forma AISLADA sobre TEST · CALENDARIO OPERATIVO — EJECUTADO, VERIFICADO y APROBADO por Gonzalo (no avanzó estados, carry-over=Sí solo en filas no terminadas, no escribió métricas, no creó TEST · MÉTRICAS, 05/01 intactos, dashboard real sin cambios).
- [x] Corregir bug de alertas por filas vacías en el dashboard (00, B30:B33): caption/visual/aprobación/dato pasaron de contar 399/397 filas vacías a contar solo filas reales (guarda Fecha o Cuenta o Pieza ≠ ""; SUMPRODUCT; locale es-AR ;). Verificado: 🔴2/🔴2/🔴2/🟢OK; alertas reales preservadas; sin errores.
- [x] LIMPIEZA del entorno TEST: pestaña TEST · CALENDARIO OPERATIVO borrada + scripts/test/ eliminado (no se creó TEST · MÉTRICAS). Backups intactos; Hoja 1 sin tocar; Task Scheduler sin tocar.
- [ ] PRIMERA CORRIDA REAL MONITOREADA: dejar que la próxima ejecución automática programada (06:00 / 15:00 / 23:00) sea la primera prueba real sobre 01 · CALENDARIO OPERATIVO. NO ejecutar manualmente. Revisar log + Sheet después. Rollback: scripts/backup/*.ps1.orig.
- [ ] Test AnimalFood daily planning system ("qué tengo que hacer hoy" → animalfood-daily-plan).
- [ ] Test workflow from another machine (clone and continue).

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

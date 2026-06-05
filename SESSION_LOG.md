# Session Log

## 2026-06-05

### Canonical column map created (closes audit schema-drift risk)
- Created `docs/verticals/animalfood/animalfood-column-map.md` — single source of truth mapping the 16-col daily-plan output ↔ 17-col live `01 · CALENDARIO OPERATIVO` (canonical) ↔ 21-col legacy `Hoja 1` ↔ 12-col `05 · MÉTRICAS` ↔ local state file. 16 sections incl. full field-mapping table, dedup key (Fecha+Cuenta+Pieza/contenido), Estado vocabulary mapping (Spanish canonical ↔ English state file), carry-over rules, metrics/Result/Learning rules, script + agent usage rules. Key documented nuance: human-plan fields without a dedicated `01` column (Hook/CTA/Community/Paid/Asset/Business impact/Next action/Evidence) fold into Observaciones(Q); "Brand" splits into Cuenta(D)+Marca(E) via the account map. UNCERTAIN items (En revisión English equiv, 05 dedup key, whether to add Evidence column to `01`) flagged, not invented. Rule: any new tab/CSV must be added here before automation writes to it. Docs only — no scripts/Sheet/tasks modified.

### Documentation drift fixed — scheduler validation reconciled
- Integrity audit flagged a critical drift: HANDOFF.md claimed the scheduler was "FULLY VALIDATED" while the 0600 morning task has never run in production. Corrected HANDOFF + TASKS to the truth: **1500 + 2300 validated in real scheduled runs; 0600 NOT yet validated** (LastRunTime=1999, code 267011). Documented the 0600 once-per-day guard (marker logs/.animalfood-0600-lastrun.flag, writes only on exit 0, -Force available) and remediation layers (Capa 1 telemetry ENABLED; Capa 2 WakeToRun + Capa 3 AtLogOn NOT applied). Next Actions reordered: observe passive 2026-06-06 06:00 run → if it fails decide Capa 2/3 → only after scheduler stability continue Browser MCP. Docs only — no scripts/tasks/Sheet modified, no credentials read.

### Agency OS Integrity Audit skill created
- Created `.claude/skills/agency-os-integrity-audit/SKILL.md` — strict read-only QA auditor (never a content generator) to run BEFORE major additions (Browser MCP, new agents/automations, paid-traffic, Trend Signals Log, new clients). Verifies 10 areas: core architecture, agents, skills, AnimalFood vertical, Sheets/live-workflow, scheduler+scripts, security, Git/GitHub, output quality, production-readiness score. Strict scoring (Security + Scheduler weighted; critical blocker caps overall at 5). Fixed output format (executive verdict → module scorecard → blockers → risks → security/automation/strategic reviews → next 5 actions → final go/no-go). Hard rules: never modify files / install / run tasks / read credentials; brutally honest, label uncertainty. Flags naming check (request said "lvanto-cosign"; on disk it's lvanto-copywriting).

### Guard patch tail — confirmed complete + re-validated
- Verified `scripts/animalfood-daily-0600.ps1` run/finish tail is already final: captures `$ClaudeExit = $LASTEXITCODE` and writes marker `logs/.animalfood-0600-lastrun.flag` only when `$ClaudeExit -eq 0` (committed in 19a2dcd; no uncommitted changes). Re-ran parse-only validation (`Parser::ParseFile`, NOT executed) = 0 errors. No tasks run, Sheet untouched, no credentials read.

### Once-per-day guard added to 06:00 morning workflow
- Patched `scripts/animalfood-daily-0600.ps1` with a once-per-day guard (prep for the future AtLogOn catch-up trigger). Added `param([switch]$Force)`; marker file `logs/.animalfood-0600-lastrun.flag` holds the last *successful* run date (`yyyy-MM-dd`, invariant format). If marker == today and no `-Force` → logs SKIPPED and `exit 0`. Marker written ONLY when `claude` exits 0, so a failed 06:00 stays retryable by catch-up. Sheet-level Cuenta+Pieza+Fecha dedup in the prompt remains the row-level backstop.
- Validation: parse-only (`Parser::ParseFile`, NOT executed) = **0 errors**. Confirmed scoped `--allowedTools` preserved, NO `--dangerously-skip-permissions` (only in the safety comment), marker path inside `logs/`, marker write gated on exit 0. Sheet untouched, no tasks modified/run, no credentials read. Apply this guard BEFORE attaching Capa 3 AtLogOn.

### Scheduler diagnosis + Capa 1 telemetry enabled
- Diagnosed `AnimalFood-DailyPlan-0600`: never ran (LastRunTime 1999, code 267011). Config is identical to the working 1500 task (same LogonType=Interactive, StartWhenAvailable, settings) — only hour + script differ; script already validated in prior isolated test. Root cause: PC unavailable at 06:00 + StartWhenAvailable catch-up recovered the 15:00 run (18:42 today) but not the older 06:00 one. Confirmed via read-only Get-ScheduledTaskInfo + full task definition compare. Sheet `01` consistent (only 2026-06-04 rows; 0600 is the only script that adds daily rows → explains no Friday rows). Today's only run: 1500 recovered late (exit 0, no changes, state-change guard held). 2300 ran on time yesterday.
- **Capa 1 applied:** enabled `Microsoft-Windows-TaskScheduler/Operational` log (`wevtutil set-log … /enabled:true`, exit 0, IsEnabled=True) — it was OFF, so prior runs had no per-run telemetry. Capa 2 (WakeToRun) and Capa 3 (AtLogOn catch-up trigger) proposed but NOT applied. No tasks/scripts/Sheet modified. Next: observe passive 6/6 06:00 run in the new log before deciding Capa 2/3.

### Trend Intelligence doctrine — confirmed committed
- Verified `docs/verticals/animalfood/animalfood-trend-intelligence.md` is committed and pushed (origin/master). File unchanged since creation; implementation still deferred behind workflow stabilization. Next build step when ready: the normalized signals-log file, then the RSS pilot.

### Market & Trend Intelligence doctrine added
- Created `docs/verticals/animalfood/animalfood-trend-intelligence.md` (doctrine only — no MCPs installed, no tools built, no scraping, agents unchanged). Defines the AnimalFood signal-check layer that must run before content calendars, reels, carousels, stories, ads, campaigns or brand actions. 21 sections: purpose, role in Agency OS, systems/agents fed, 7 signal classes, approved + forbidden sources, per-source roles (Google Trends, RSS, Meta Ads Library, TikTok Creative Center, Playwright/browser, internal performance), brand-fit filter, trend rubric, confidence scoring, signal output schema, calendar + paid-ads gates, Gonzalo/Aranza/System roles, roadmap, safety rules. Core rule: no proposal from old assumptions alone — check current signals or label hypothesis-based. Built on prior research session. Implementation deferred behind workflow stabilization.

### README.md filled (repo overview)
- Wrote full `README.md` (14 sections): project name, purpose, current operational status, main systems, AnimalFood Daily Operations, Google Sheets MCP integration, Windows Task Scheduler automation, agents, skills, folder structure, safety rules, how to resume work, git workflow, current next priorities.
- Documented: private repo Impulso-GR/lvanto-agency-os; Google Sheet = live operational view; local state files = backup/reference; credentials in `C:\ClaudeSecrets\` (never committed/printed); `.claude/settings.local.json` + `logs/*.log` ignored; no ads/publishing/outreach/budget/external actions without Gonzalo approval; never `--dangerously-skip-permissions`. No secrets or token contents exposed.

### CHECKPOINT — GitHub backup live (private repo connected + pushed)
- **Local Git initialized** in `C:\Proyecto Code\VSCODE` (Git 2.54.0.windows.1). `.claude/settings.local.json` added to `.gitignore` (existing rules untouched: logs, .env, *client_secret*.json, token*.json, *oauth*token*.json).
- **Pre-stage safety audit PASSED:** `git status --ignored` + `git check-ignore` confirmed `.claude/settings.local.json` and all `logs/*.log` excluded. Keyword scan (secret/oauth/token/client_secret/ClaudeSecrets) found only documentation mentions — no real credential values; actual secrets stay in `C:\ClaudeSecrets\` (contents never read).
- **Initial commit:** `57f191a` "Initial commit: Lvanto Agency OS" — 44 files, 3662 insertions. Identity set repo-only (Gonzalo / gonza.mdq25@gmail.com). No secrets, logs, OAuth JSON, tokens or settings.local.json committed.
- **Remote connected + pushed:** `origin` = https://github.com/Impulso-GR/lvanto-agency-os.git (private). `git push -u origin master` succeeded; `master` tracks `origin/master`; working tree clean. No force push, no history rewrite.
- **Next priorities:** (1) Fill README.md; (2) stabilize AnimalFood live workflow over several days (real scheduled runs vs Sheet); (3) then audit/install browser MCP if useful.

## 2026-06-04

### Cierre de migración: 06:00 + 23:00 aprobados, bug de alertas corregido, TEST limpiado
- **06:00 aislado APROBADO** por Gonzalo (2 filas nuevas, 0 duplicados, carry-over/contenido previo/encabezado OK, 01 y dashboard sin afectar).
- **23:00 aislado APROBADO** por Gonzalo (no avanzó estados, carry-over=Sí solo en filas no terminadas, no escribió métricas, 05/01 intactos, dashboard sin cambios).
- **Bug de alertas por filas vacías CORREGIDO** (dashboard 00, celdas B30:B33). Las 4 alertas de `02 · PRODUCCIÓN` (caption/visual/aprobación/dato) contaban checkboxes FALSE de filas vacías del grid (mostraban 399/399/399/397). Causa: `COUNTIFS(...H=FALSE; G<>"Entregado")` sin guarda de fila real → toda fila vacía (checkbox FALSE + G vacía) contaba. Fix: reescritas con `SUMPRODUCT` agregando guarda de **fila real** (Fecha(B)≠"" **o** Cuenta(C)≠"" **o** Pieza(E)≠""), clamp `>0` para no doble-contar, separadores `;` (locale es-AR). Resultado verificado: caption/visual/aprobación = 🔴 2 (real, 2 piezas en producción), dato = 🟢 OK (las 2 reales ya tienen dato cargado). Alertas reales preservadas (idea repetida 🔴1, promo sin pallet 🔴5). Resto de alertas (idea repetida, bandera, sin publicar, promo) ya filtraban por Estado/columna no vacía → sin cambios. Fórmulas computan sin error.
- **Entorno TEST limpiado:** pestaña `TEST · CALENDARIO OPERATIVO` borrada (batch_update deleteSheet, sheetId 1866899332); `scripts/test/` eliminado. NO se creó `TEST · MÉTRICAS` (no hubo métricas reales). Backups `scripts/backup/*.ps1.orig` intactos; `Hoja 1` sin tocar; Task Scheduler sin tocar.
- **Sistema listo para la próxima ejecución automática REAL.** Decisión: NO ejecutar manualmente 06:00 ni 23:00; la próxima corrida programada será la primera prueba real monitoreada. **Rollback disponible** desde `scripts/backup/*.ps1.orig` (revierte los prompts a Hoja 1).

### Prueba AISLADA del 23:00 sobre TEST · CALENDARIO OPERATIVO — PASÓ
- **Mismo entorno aislado** (la pestaña TEST del test 06:00, que Gonzalo aprobó pero pidió NO borrar todavía). Script temporal: `scripts/test/animalfood-daily-2300-TEST.ps1` — copia del 23:00 apuntando solo a TEST; guardas duras: nunca escribir en 01 / Hoja 1 / 05 · MÉTRICAS real / ninguna otra pestaña; si hubiera métricas reales iría a `TEST · MÉTRICAS`, no al 05 real. Parseo 0 errores. Ejecutado directo (exit=0); log `logs/animalfood-daily-2300-TEST_*.log`. NO se tocó Task Scheduler; NO se corrió el 23:00 real.
- **Estado base de TEST (5 filas):** ¿Es carry-over? = Sí/Sí/Sí/No/No (filas 2-6). `05 · MÉTRICAS` real = solo encabezado.
- **Resultado verificado por lectura directa:**
  - Estados: **ninguno avanzado** — no había señal de publicación ni métricas (state-change guard OK; no marcó Publicado/Medido).
  - Carry-over: marcó `¿Es carry-over?=Sí` SOLO en fila 5 (@enercan.ar, "Idea") y fila 6 (@ironpet.ar, "Brief listo"), que estaban en "No"; filas 2-4 ya tenían Sí → las dejó intactas. Correcto.
  - Links O/P: en blanco (no marcó Publicado sin evidencia). Observaciones sin cambios.
  - Métricas: **no escribió nada** — no se creó `TEST · MÉTRICAS` y `05 · MÉTRICAS` real quedó solo con encabezado (sin métricas reales → no inventó).
  - Encabezado (fila 1): intacto. Filas agregadas: 0.
  - `01 · CALENDARIO OPERATIVO`: idéntica al base (3 filas) — NO se tocó.
  - Dashboard real: sin cambios (carry-over=3, pendientes=3, nuevas=0, Enercan/Ironpet Activos=0, mismas alertas) — sigue leyendo solo 01.
- **Conclusión:** el 23:00 repuntado se comporta correctamente (cierra sin inventar publicaciones ni métricas, marca carry-over solo en lo no terminado, no avanza estados por horario). **06:00 y 23:00 ambos validados en aislado.** Pendiente: revisión final de Gonzalo → recién entonces borrar `TEST · CALENDARIO OPERATIVO` (+ `TEST · MÉTRICAS` si existiera — no se creó) y `scripts/test/`.

### Prueba AISLADA del 06:00 sobre pestaña duplicada (TEST · CALENDARIO OPERATIVO) — PASÓ
- **Aislamiento:** se duplicó `01 · CALENDARIO OPERATIVO` → `TEST · CALENDARIO OPERATIVO` (misma planilla, vía MCP copy_sheet). El dashboard (00) referencia 01 por nombre, así que crear/escribir TEST NO afecta sus fórmulas/alertas. No se tocó Task Scheduler; NO se corrió el 06:00 real.
- **Script temporal:** `scripts/test/animalfood-daily-0600-TEST.ps1` — copia del 06:00 apuntando EXCLUSIVAMENTE a la pestaña TEST, con guardas duras de no escribir en 01 / Hoja 1 / ninguna otra pestaña. Mismos allowedTools scoped. Parseo 0 errores. Ejecutado directamente (exit=0); log: `logs/animalfood-daily-0600-TEST_*.log`.
- **Estado base de TEST antes del run:** header + 3 filas (todas fechadas hoy 2026-06-04: Catfeed Brief listo, Canfeed Pilar 1 Brief listo, Animalfood repost Idea).
- **Resultado verificado por lectura directa de la pestaña:**
  - Filas agregadas: **2** (A5 @enercan.ar Reel energía · A6 @ironpet.ar post comunidad) — cuentas sin acción previa hoy.
  - Duplicados: **0** (ninguna nueva coincide con Cuenta+Pieza de las 3 existentes).
  - Carry-over: respetado — las 3 ya estaban fechadas hoy → 0 recreadas, 0 duplicadas (comportamiento correcto).
  - Contenido previo: respetado — filas 2-4 byte-idénticas al base; NINGÚN Estado avanzado (state-change guard OK).
  - Nuevas: ¿Es carry-over?=No, ¿Existe contenido previo?=No; links O/P en blanco.
  - Encabezado (fila 1): intacto.
  - `01 · CALENDARIO OPERATIVO`: **idéntica al base** (header + 3 filas) — NO se tocó.
  - Otras pestañas: sin cambios (solo lectura de Banco/Ideas para anti-repetición).
- **Dashboard real NO afectado:** sigue leyendo solo 01 → @enercan.ar y @ironpet.ar marcan Activos=0 (las 2 filas de TEST son invisibles para el dashboard); carry-over=3 / pendientes=3 / nuevas=0; alertas idénticas a antes del test.
- **Conclusión:** el 06:00 repuntado se comporta correctamente (agrega sin duplicar, respeta carry-over y contenido previo, no avanza estados por horario). **La pestaña TEST se deja viva (NO se borró) hasta que Gonzalo revise.** Próximo: aprobación de Gonzalo → eliminar pestaña TEST + script temporal → luego probar 23:00.

### Migración de fuente operativa: scripts repuntados Hoja 1 → 01 · CALENDARIO OPERATIVO
- **Migración aplicada (modo aditivo):** los 3 scripts (06:00 / 15:00 / 23:00) fueron repuntados desde `Hoja 1` hacia `01 · CALENDARIO OPERATIVO` (17 cols, A1:Q1). Se reemplazó SOLO el bloque `$Prompt` en cada uno; el resto del script (allowedTools scoped, logging, cwd) intacto. Parseo de los 3: **0 errores**.
- **01 · CALENDARIO OPERATIVO = fuente operativa única.** El dashboard (00) ya vive sobre 01; con el repunte se elimina la doble fuente.
- **Hoja 1 = respaldo legacy congelado.** Queda intacta; los prompts ahora instruyen NO leerla ni escribirla.
- **Backup de rollback creado:** `scripts/backup/animalfood-daily-{0600,1500,2300}.ps1.orig` — versiones originales (apuntando a Hoja 1) para revertir si hace falta.
- **15:00 probado y validado (sobre el calendario real):** leyó `01 · CALENDARIO OPERATIVO`; NO tocó Hoja 1; no hizo cambios (no había señal explícita); no agregó filas; no duplicó; encabezado intacto; log generado OK; dashboard sigue calculando bien.
- **Regla crítica incorporada (state-change guard):** no avanzar estados por horario ni por suposición; cambiar Estado SOLO con señal explícita o dato confirmado; nunca marcar Publicado sin link/confirmación/evidencia; nunca marcar Medido sin métricas reales; sin señal → no cambiar nada.
- **PENDIENTE:** 06:00 y 23:00 pendientes de prueba controlada. El 06:00 es el más sensible porque AGREGA filas (carry-over + nuevas) — se probará sobre una pestaña duplicada `TEST · CALENDARIO OPERATIVO`, nunca sobre el calendario real.

### Google Sheet reestructurado como dashboard operativo (10 pestañas)
- Decisión (AskUserQuestion): aditivo + mínimo validado. Hoja 1 INTACTA (la automatización 06/15/23 sigue leyéndola); se crearon 10 pestañas nuevas al lado: 00 DASHBOARD, 01 CALENDARIO OPERATIVO (17 cols), 02 PRODUCCIÓN (checkboxes caption/visual/aprobación/dato), 03 BANCO DE CONTENIDOS, 04 PROMOCIONES B2B, 05 MÉTRICAS, 06 ARANZA-TAREAS CM, 07 LÍNEAS DE PRODUCTO, 08 UGC-COMUNIDAD, 09 IDEAS DESCARTADAS O REPETIDAS.
- Cuentas modeladas: @animalfoodargentina, @canfeed.ar (Canfeed+Catfeed), @enercan.ar (Enercan+Enercat), @ironpet.ar.
- Datos sembrados solo validados: ejemplo CF-CAT-001 (Banco, "Tu gato no es un perro chico" = ya desarrollado/reutilizable), IronPet Gato 15kg/70 bolsas confirmado + 5 promos pendientes, 3 filas carry-over migradas al Calendario, tareas reales de Aranza, líneas de producto.
- Dashboard 100% con fórmulas vivas: semana actual, % listos + barra REPT, pendientes/trabados, nuevas vs carry-over, piezas Gonzalo/Aranza, cuenta más activa/atrasada, próximo post, próxima promo B2B, y 8 ALERTAS (idea repetida, falta caption/visual/aprobación/dato, sin publicar +7d, bandera sin calentamiento, promo sin pallet). Probado: alertas disparan correcto (1 idea repetida, 2 sin caption/visual/aprobación, 5 promos sin pallet).
- Detalle técnico clave: locale es-AR → fórmulas con ";" (no ","); fechas se guardan como fecha real (USER_ENTERED). Formato condicional no puede cruzar pestañas (reglas por grid).
- Visual: encabezados azul oscuro, bandeado de filas, dropdowns (chips) de estado/audiencia/prioridad, checkboxes de producción, colores por cuenta (4 colores) y por estado (10), colores de alerta 🔴🟢🟡, filtros básicos, anchos de columna.
- PENDIENTE: repuntar los 3 scripts 06/15/23 de Hoja 1 → 01 CALENDARIO OPERATIVO (con aprobación) para evitar doble fuente.

### AnimalFood operations log created
- Created docs/verticals/animalfood/animalfood-operations-log.md — practical record of real operating style (promos, seller templates, WhatsApp comms, content, Gonzalo/Aranza tasks, design/copy decisions, feedback, metrics, bottlenecks, learnings). 10 sections incl. decision-quality, design-improvement, commercial-improvement, and evidence/confidence rules; 14-column ops table. Explains HOW we operate (Google Sheet tracks active work — no row duplication). No unrelated files changed.

### Scheduled workflow FULLY VALIDATED (real Task Scheduler run)
- Manually started AnimalFood-MiddayReview-1500 via Start-ScheduledTask. Task launched, ran, returned to State=Ready, LastTaskResult=0 (success). Did NOT start the 06:00 or 23:00 tasks.
- New log written: logs/animalfood-daily-1500_2026-06-04_090146.log (1169 bytes), distinct from the manual-test log.
- Google Sheet UNCHANGED (before/after identical): Catfeed/Canfeed=To prepare, Animalfood=Idea, all Result blank. No new rows; header untouched. Correct behavior — no fabricated progress written without a real signal.
- Confirms Task Scheduler → pwsh → claude headless (scoped google-sheets tools) → live Sheet pipeline works end-to-end. Scheduled workflow now LIVE + validated.

### Checkpoint — Windows Task Scheduler tasks registered + verified
- Registered 3 daily tasks (PowerShell ScheduledTasks cmdlets, stable pwsh alias, -NoProfile -ExecutionPolicy Bypass -File): AnimalFood-DailyPlan-0600 (06:00), AnimalFood-MiddayReview-1500 (15:00), AnimalFood-EndOfDay-2300 (23:00).
- Verified all 3: State=Ready, LogonType=Interactive (run only when logged on), StartWhenAvailable=True (run if missed), WakeToRun=False, AllowStartOnBatteries=True; 30-min limit; IgnoreNew (no overlap). User = DESKTOP-K1B4K78\Pc.
- Tasks NOT manually started; Google Sheet untouched; credentials never read/printed. No --dangerously-skip-permissions.
- Next: validate one real scheduled run (logs + Sheet behavior) — wait for next trigger or run one task manually later.

### Task Scheduler wrapper scripts created (not scheduled yet)
- Created scripts/animalfood-daily-0600.ps1 (morning plan), animalfood-daily-1500.ps1 (midday review), animalfood-daily-2300.ps1 (end-of-day/carry-over). Each: forces cwd C:\Proyecto Code\VSCODE, runs `claude -p` headless with SCOPED --allowedTools (4 google-sheets MCP tools only; NO --dangerously-skip-permissions), logs to logs/. Prompts enforce live-Sheet rules (no duplicate rows; update only Status/Result/Learning/Carry-over).
- Created logs/ (with .gitkeep) and .gitignore (ignores logs/* + credential patterns). No Task Scheduler tasks created; scripts not run. Pending: register the 3 tasks (run-if-missed + run-only-when-logged-on; no wake-to-run).

### OAuth consent screen — published to Production
- Consent screen moved Testing → Production (2026-06-04); removes the ~7-day testing-mode refresh-token expiry. MCP remains connected + live.
- Next: Windows Task Scheduler (06:00/15:00/23:00).

### Checkpoint — Google Sheets live operational view
- MCP connected + live; read + write/update/cleanup tests passed; 21-col header + today's 3 rows in Sheet (A1:U4). Sheet = live view, local state = backup until scheduling tested.
- Next: Windows Task Scheduler (06:00/15:00/23:00) + publish OAuth consent screen to Production.

### Google Sheets MCP — CONNECTED + LIVE (read/write validated, Sheet mirrored)
- MCP `google-sheets` confirmed connected after restart; OAuth token at C:\ClaudeSecrets\animalfood-oauth-token.json works (contents never read).
- §6 read test PASSED — tab `Hoja 1` listed; sheet read (empty before headers).
- §7 write/update test PASSED — temporary row written, Status cell updated To prepare→Ready, re-read confirmed, temp row cleared. No other sheet touched.
- Wrote real **21-column header** to A1:U1 (Date…Notes); re-read validated all 21 headers.
- Mirrored today's **3 carry-over rows** to A2:U4 from animalfood-daily-sheet-state.md + dated CSV (Catfeed = To prepare, Canfeed = To prepare, Animalfood institucional = Idea); verified rows empty first → no duplicates. 63 cells written; A1:U4 re-read validated.
- Google Sheet "AnimalFood Daily Operations" (1kHApd…Uf8U, tab Hoja 1) is now the **live operational view**.
- Documented across 5 files: animalfood-daily-sheet-state.md (Google Sheets — Live section + rule), install-checklist (Progress/Status updated), HANDOFF.md, TASKS.md (read/write/header/mirror checked off), SESSION_LOG.md.
- RULE added: Google Sheet = live operational view; local state file = backup until scheduling tested; do not duplicate rows; update rows only when Status/Result/Learning changes.
- Next: Windows Task Scheduler (06:00/15:00/23:00); publish OAuth consent screen to Production.

### Checkpoint — Google Sheets MCP OAuth completed
- MCP google-sheets registered locally; uv/uvx installed; mcp-google-sheets 0.6.3 validated.
- OAuth authorization completed via browser; token created at C:\ClaudeSecrets\animalfood-oauth-token.json (773 bytes). Token + client JSON contents never read or shown. Scopes = spreadsheets + drive (match server).
- Pending: restart Claude Code so the MCP loads; then read-only test of sheet 1kHApdwpoo9zyOoxEdvTr6YnPoH164BAlEN6hZqYUf8U.

### Google Sheets MCP — installed + registered (OAuth, pending consent)
- Installed uv 0.11.19 via winget (uvx; brings own Python — system Python was absent). Gonzalo provided OAuth client JSON at C:\ClaudeSecrets\ (content never read).
- Registered MCP server "google-sheets" in local scope (C:\Users\Pc\.claude.json) — uvx mcp-google-sheets@latest, env CREDENTIALS_PATH + TOKEN_PATH (token outside repo). .claude/settings.json untouched.
- Validated package mcp-google-sheets==0.6.3 (+50 deps) installs cleanly on this machine. Status currently "Failed to connect" = expected (no OAuth token yet).
- Next (user-only): restart Claude Code → first read of the sheet → Google browser consent → token written → connected. Then read/write tests + Windows Task Scheduler.

### Google Sheets MCP — pivot to OAuth (service-account key blocked)
- Org policy iam.disableServiceAccountKeyCreation blocks service-account JSON keys. Decision: do NOT bypass; pivot to OAuth 2.0 local. Recommended candidate unchanged — xing5/mcp-google-sheets supports OAuth natively (one-time consent → stored refresh token → unattended scheduled runs); keep Windows Task Scheduler + live Google Sheet.
- Updated 3 files: google-sheets-mcp-candidate-review.md (blocked note + OAuth recommendation + matrix), animalfood-google-sheets-mcp-plan.md (Auth Decision section, OAuth inputs, security: no policy bypass / Sheets-only scope), google-sheets-mcp-install-checklist.md (OAuth client ID instead of SA key; no SA-email sharing; OAuth secret+token storage; OAuth config + first-run consent; OAuth rollback). Note consent-screen Production to avoid ~7-day token expiry. Nothing installed.

### Google Sheets MCP install checklist (prep only)
- Created docs/integrations/google-sheets-mcp-install-checklist.md — Windows-adapted, prep only (nothing installed, no commands, no credentials). 10 sections: required software (Python/uvx/Claude Code), GCP + least-permission service account, share single sheet with SA email, secure key storage outside repo (.env/credential manager, .gitignore), local MCP config (uvx, service-account mode; settings.json untouched), read test, write/update test, CSV/state↔sheet sync (21-col contract), Windows Task Scheduler 06:00/15:00/23:00, rollback/disable. Sheet ID 1kHApd...Uf8U recorded (non-secret). Pending Gonzalo execution + go-ahead.

### Google Sheets MCP candidate review
- Created docs/integrations/google-sheets-mcp-candidate-review.md (desk research only, nothing installed/cloned). Evaluated xing5/mcp-google-sheets, mkummer225/google-sheets-mcp, amaboh/google-sheets-mcp-server across 11 dimensions. Recommended **xing5/mcp-google-sheets**: headless service-account auth (fits scheduled runs), no clone/build (uvx), Windows-documented, best maintained (~891★, v0.6.3 2026-05-14), cell/row updates, single-sheet scoping. Pending Gonzalo approval + inputs before any install.

### Google Sheets MCP plan — local-first decision
- Updated docs/integrations/animalfood-google-sheets-mcp-plan.md: local-first decision (Claude Code local → Google Sheets MCP local → Sheet; Windows Task Scheduler at 06:00/15:00/23:00; no remote Claude routines since MCP runs locally). Added "Local MCP Decision" + "Pending Gonzalo Inputs" sections. Sheet name target = "AnimalFood Daily Operations"; specific URL/Sheet ID PENDING. Noted Claude Code v2.1.162.

### Google Sheets MCP setup plan
- Created docs/integrations/animalfood-google-sheets-mcp-plan.md — planning only, nothing installed/connected. Defines low-cost MCP path to a single live AnimalFood sheet with 06:00/15:00/23:00 scheduled checks (America/Argentina/Buenos_Aires). 11 sections: purpose, target workflow, why MCP, scheduling (Claude Code tasks → Windows Task Scheduler → n8n), 21-column sheet structure + 9 status values, required inputs from Gonzalo, 3 MCP candidates to review, security rules, setup checklist, test plan, fallback (state file + CSV + manual import).

### Checkpoint — daily workflow operational
- Daily workflow now runs on state file + dated CSV (animalfood-daily-plan-2026-06-04.csv exists + validated, 3 rows × 16 cols).
- Re-asked "buen día": correctly avoided regenerating — file current, no status change, no unnecessary work created.
- Next CSV/state update only when a row changes status (Catfeed designed/scheduled/published · Canfeed Pilar 1 designed/PSD ready · Animalfood repost approved/scheduled/published).
- Next: connect private GitHub repository (still pending).

### Daily Plan File Output Rule (CSV workflow)
- Added "Daily Plan File Output Rule" to animalfood-daily-plan/SKILL.md and animalfood-daily-operator.md: on "buen día"/"qué tengo que hacer hoy", read state → carry over → generate plan → write CSV to docs/verticals/animalfood/daily-plans/animalfood-daily-plan-YYYY-MM-DD.csv (exact 16 columns), one row per brand/action, carry-over first, all rules applied, then summarize only file/priority/assets/Aranza tasks/missing data. Temporary local sheet until Sheets/n8n/MCP.

### Daily plan sheet file (CSV)
- Created docs/verticals/animalfood/daily-plans/animalfood-daily-plan-2026-06-04.csv — today's AnimalFood plan, 16 exact columns, one row per brand/action, using the 3 carry-over rows from animalfood-daily-sheet-state.md (Catfeed P1, Canfeed P2, Animalfood institucional P3). All fields quoted; validated (Import-Csv: 3 rows × 16 columns, aligned). No new work invented; nothing published or launched.

### Checkpoint — stabilization ready
- Daily-plan output now enforced end-to-end: command-center (Delegated Output Preservation Rule) + skill + operator all require the real 16-col Markdown table first.
- animalfood-daily-sheet-state.md created, wired, and pre-loaded with today's 3 carry-over rows (carry-over chain live).
- Creative Ads Lab + template: budget % column + allocation rules, validated.
- System ready for stabilization testing. Next: connect private GitHub repository (still pending).

### Output preservation rule (agency-command-center)
- Added "Delegated Output Preservation Rule" to .claude/agents/agency-command-center.md: when routing AnimalFood daily planning, must start directly with the required 16-column Markdown table (no "Buen día"/routing intro, no separated blocks, no decorative separators, no hidden rows; CSV rows if too wide), then only the five required sections. Fixes prose-before-table / separated-block regression.

### Pre-loaded today's rows into daily-sheet state
- Added 3 planned rows to animalfood-daily-sheet-state.md Master Tracking Table: Catfeed "Tu gato no es un perro chico" (To prepare), Canfeed Five S Plus Pilar 1 + PSD (To prepare), Animalfood repost institucional (Idea). Starts the carry-over chain; results/learning pending measurement.

### Checkpoint
- Budget correction resolved + validated (creative-ads-lab + template); daily-sheet table HARD RULE added; animalfood-daily-sheet-state.md created and wired (Sheet State Rule + Operating Principle) into skill + operator.
- AnimalFood daily plan generated via agency-command-center.
- Next: connect private GitHub repository (still pending).

### Wired state file into daily planning workflow
- Added Sheet State Rule + Operating Principle to animalfood-daily-plan/SKILL.md and animalfood-daily-operator.md. Both now read animalfood-daily-sheet-state.md before planning (check planned/pending/published/to-measure/no-repeat/carry-over; decide carry over · pause · replace · measure first · discard). Operating Principle: optimize Gonzalo's time; every recommendation must increase impact, reduce workload, improve quality/demand/B2B trust/paid performance, or create reusable systems. Added state file to "Read First" in both.

### Daily sheet state file
- Created docs/verticals/animalfood/animalfood-daily-sheet-state.md — local source of truth for the AnimalFood daily plan until Google Sheets is connected. Sections: Purpose, Sheet State Protocol (pre-plan check), Status Values (9 states), Master Tracking Table (11 columns), Rules. Must be checked before every new daily plan.

### Daily sheet table — hard rule (real Markdown table)
- Added HARD RULE to animalfood-daily-plan/SKILL.md and animalfood-daily-operator.md: Section 1 "Daily sheet table" must be a real Markdown table with the exact 16-column header (Date…Next action); one row per brand/action; forbids separated blocks, decorative separators, "Date:"/"Brand:" field lists, and prose before the table; CSV-compatible rows as the only fallback. Aligned section-1 headers + operator Hard Output Rule #3 to the mandated header.

### Budget allocation correction (Creative Ads Lab)
- Applied pending correction: added "Budget % of total campaign budget" column + Budget Allocation Rules.
- animalfood-creative-ads-lab.md: new "Budget % of total campaign budget" column in the Meta Ads Creative Sheet (header line + table); new Section 8 "Budget Allocation Rules" (60–70% proven, 20–30% tested, 10% experimental, 0% not ready, ≤30% per untested creative, no reallocation without data, percentages-only if total unknown, % + ARS if total known); renumbered Decision Rules → 9, Canva Note → 10, Safety Rules → 11.
- templates/campaigns/animalfood-creative-ads-sheet-template.md: added "Budget % of total campaign budget" to the table and CSV header; added "Budget Allocation Rules (quick reference)" block.
- Pending correction from 2026-06-03 now resolved.

## 2026-06-03
- Initialized Agency OS base folder structure (19 directories).
- Created first skill: handoff-session.
- Updated HANDOFF.md for cross-machine continuity.
- No agents created. No external tools installed.
- Created agent: agency-director (strategic director, scope protection, proposals).
- Created agent: landing-page-strategist (offer structure, sections, CTAs, conversion logic).
- Created docs/operations/github-skills-research.md (7 candidates evaluated, import criteria defined).
- Created skill: lvanto-copywriting (landing pages, ads, social, WhatsApp, proposals, hooks).
- Created skill: checkpoint-session (mid-session safety checkpoints, GitHub commit reminder).
- Created skill: lvanto-frontend-design (layout direction, design QA, responsive review, pre-delivery checklist).

### Checkpoint
- 2 agents created: agency-director, landing-page-strategist.
- 4 skills created: handoff-session, checkpoint-session, lvanto-copywriting, lvanto-frontend-design.
- GitHub skills research: Reviews 1 and 2 complete.
- GitHub repository: pending (tomorrow).

### Checkpoint — post-audit critical cleanup
- Ran Opus 4.8 strategic audit (read-only); produced improvement plan.
- Hardened .claude/settings.json with Windows/PowerShell deny rules (JSON validated).
- Added YAML frontmatter + GitHub approval note to handoff-session skill.
- Reconciled TASKS.md and HANDOFF.md with real current state.
- Added Model Usage Guidance and expanded session-start reads in CLAUDE.md.
- No agents/skills created. Nothing installed. GitHub still pending (tomorrow).

### AnimalFood vertical structure
- Filled AGENCY_OS.md with Future Growth Engine and Gonzalo Growth Targets sections.
- Created docs/verticals/animalfood/ with context, growth, content, b2b, and launches files (context filled; others are concise placeholders).

### Checkpoint — AnimalFood vertical
- AnimalFood separated as a priority vertical, distinct from Lvanto and future clients.
- AGENCY_OS.md filled with master reference + growth engine sections.
- GitHub still pending (tomorrow).

### AnimalFood agent
- Created agent: animalfood-growth-strategist (B2C/B2B growth, campaigns, launches, value justification).

### AnimalFood growth system
- Filled animalfood-growth-system.md with weekly growth loop, brand fronts, priorities, weekly output, and rules.

### Checkpoint
- Agents (3): agency-director, landing-page-strategist, animalfood-growth-strategist.
- AnimalFood growth system filled; content/b2b/launches still placeholders.
- GitHub still pending (tomorrow).

### AnimalFood content system
- Filled animalfood-content-system.md (daily content command, brand rotation, formats, data-backed strategy, role split, paid traffic alignment, daily output, rules).
- Added Sheet-Style Planning Output (15-column table) and Information Needed From Gonzalo sections.

### AnimalFood context import
- Saved raw export to imports/claude-animalfood-export-2026-06-03.md (source of truth).
- Synthesized into context, growth-system, content-system, b2b-system, launches (confirmed vs PENDIENTE preserved; income 2.2M vs 3M flagged for reconciliation).

### AnimalFood fee correction + daily operator
- Corrected animalfood-context.md: current fee 3,000,000 ARS/month (approved in principle by Gustavo, pending Roberto); added role evolution + flagship case study.
- Created animalfood-daily-operator.md (morning sheet-style daily plan, priorities, 13-column output table).

### Checkpoint — AnimalFood vertical complete
- All six AnimalFood docs populated + raw import saved as source of truth.
- Fee set to 3,000,000 ARS/month; Gonzalo = creative director/growth strategist; flagship Lvanto case study.
- GitHub still pending (tomorrow).

### Strict daily sheet system + content log
- Created animalfood-content-log.md (anti-repetición registry).
- Made animalfood-daily-operator.md strict (mandatory 16-column table, 5 fixed sections, Google Sheets/CSV rule, Canva note — Canva not connected).
- Created templates/social-calendars/animalfood-daily-sheet-template.md (reusable).

### AnimalFood paid traffic system
- Created animalfood-paid-traffic-system.md (core no-spend-without-hypothesis rule, campaign types, 17-field Meta Ads planning sheet, creative/A-B rules, metrics, B2B blocking rule, daily traffic assistant behavior, safety).

### Checkpoint — AnimalFood ready for tomorrow
- Daily operator validated (forces sheet-style output); paid traffic system validated (no-spend-without-hypothesis).
- AnimalFood vertical ready for tomorrow's morning planning.
- GitHub still pending.

### Master orchestration agent
- Created agent: agency-command-center (front detection, routing to agents/skills, consolidated sheet/strategic output, approval gates).

### AnimalFood daily plan skill
- Created skill: animalfood-daily-plan (triggers on "qué tengo que hacer hoy" etc.; reads AnimalFood files + TASKS/HANDOFF; returns strict sheet + 5 sections + final priority).

### Checkpoint — orchestrator + daily plan ready
- agency-command-center (default entry point) and animalfood-daily-plan skill in place.
- AnimalFood daily planning system ready to test tomorrow morning.
- GitHub still pending.

### Research-First Rule
- Added Research-First Rule to agency-command-center, animalfood-daily-plan skill, animalfood-daily-operator, and animalfood-paid-traffic-system.
- Added "Evidence / Confidence" column to the daily plan tables (operator + skill).

### Brand Consistency Rule
- Added AnimalFood Brand Consistency Rule (Canfeed/Catfeed colors, typography, Tim Flach, real packshots, tone "enseña", feline-distinct Catfeed) to agency-command-center, animalfood-daily-plan, animalfood-daily-operator, and animalfood-content-system.

### Creative Performance Rule
- Added AnimalFood Creative Performance Rule (evaluate readability/hierarchy/CTA/mobile/hook/purpose; proactive improvements; every suggestion tied to a business goal) to the same four files: agency-command-center, animalfood-daily-plan, animalfood-daily-operator, animalfood-content-system.

### Creative Ads Lab
- Created animalfood-creative-ads-lab.md (research-first creative/ads OS: principles, organic-to-paid workflow, A/B rules, production split, 21-col Meta Ads creative sheet, decision rules, Canva note, safety).
- Created templates/campaigns/animalfood-creative-ads-sheet-template.md (reusable, with CSV header).

### Session close (handoff)
- Session finalized before switching Claude accounts.
- Pending correction logged: add "Budget % of total campaign budget" + budget allocation rules to Creative Ads Lab + template.
- GitHub still pending.

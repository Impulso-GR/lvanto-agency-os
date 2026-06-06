# AnimalFood Daily Workflow - 06:00 MORNING PLAN
# Runs Claude Code headless against the LIVE Google Sheet via the google-sheets MCP.
# SAFETY: scoped --allowedTools only. NEVER add --dangerously-skip-permissions.
# Working directory is forced to the project root so the local-scope MCP + CLAUDE.md load.

param([switch]$Force)   # -Force overrides the once-per-day guard (manual re-run)

$ErrorActionPreference = "Stop"

$ProjectDir = "C:\Proyecto Code\VSCODE"
$LogDir     = Join-Path $ProjectDir "logs"
$Stamp      = Get-Date -Format "yyyy-MM-dd_HHmmss"
$LogFile    = Join-Path $LogDir "animalfood-daily-0600_$Stamp.log"

if (-not (Test-Path $LogDir)) { New-Item -ItemType Directory -Path $LogDir | Out-Null }
Set-Location $ProjectDir

# --- ONCE-PER-DAY GUARD ---------------------------------------------------
# Prevents duplicate morning-plan runs when an AtLogOn catch-up trigger (or a
# manual retry) fires after the 06:00 run already succeeded today.
# The marker is written ONLY on exit 0 (below), so a FAILED 06:00 leaves no
# marker and the catch-up is free to retry. Sheet-level Cuenta+Pieza+Fecha
# dedup in the prompt remains the row-level backstop.
$Today      = Get-Date -Format "yyyy-MM-dd"     # invariant format (not es-AR locale)
$MarkerFile = Join-Path $LogDir ".animalfood-0600-lastrun.flag"

if (-not $Force -and (Test-Path $MarkerFile) -and
    ((Get-Content $MarkerFile -Raw -ErrorAction SilentlyContinue).Trim() -eq $Today)) {
    "=== AnimalFood 06:00 SKIPPED $(Get-Date -Format o): already ran today ($Today); use -Force to override ===" |
        Tee-Object -FilePath $LogFile
    exit 0
}
# --------------------------------------------------------------------------

# Only the google-sheets MCP tools this workflow needs. No file-write or shell tools.
$AllowedTools = @(
  "mcp__google-sheets__list_sheets",
  "mcp__google-sheets__get_sheet_data",
  "mcp__google-sheets__update_cells",
  "mcp__google-sheets__batch_update_cells"
) -join ","

$Prompt = @'
You are operating the AnimalFood daily workflow. The Google Sheet 1kHApdwpoo9zyOoxEdvTr6YnPoH164BAlEN6hZqYUf8U, tab "01 · CALENDARIO OPERATIVO", is the SINGLE LIVE source (17-column header at A1:Q1: Fecha, Día, Hora, Cuenta, Marca/línea, Tipo de audiencia, Objetivo, Formato, Pieza/contenido, Estado, Responsable, Prioridad, ¿Es carry-over?, ¿Existe contenido previo?, Link archivo, Link post publicado, Observaciones). Accounts: @animalfoodargentina, @canfeed.ar (Canfeed+Catfeed), @enercan.ar (Enercan+Enercat), @ironpet.ar. Estado vocabulary (exact, no others): Idea, Brief listo, En diseño, En revisión, Aprobado, Programado, Publicado, Medido, Pausado, Descartado. RULES: never touch row 1 (header); read before write; do NOT duplicate — one row per Cuenta(D)+Pieza/contenido(I) per Fecha(A): if it already exists for today, UPDATE that row instead of appending. STATE-CHANGE GUARD: never advance Estado by time-of-day or assumption; change Estado ONLY when there is an explicit signal or confirmed data; never set Publicado without a link, confirmation or clear evidence; never set Medido without real metrics; if there is no signal, change nothing. Anti-repetition: before marking a new Idea, check "03 · BANCO DE CONTENIDOS" and "09 · IDEAS DESCARTADAS O REPETIDAS"; if the concept already exists, set ¿Existe contenido previo?(N)=Sí and treat it as reuse/carry-over, NOT new. Locale is es-AR (formulas use ';'). The old flat "Hoja 1" tab is legacy/frozen backup — do NOT read or write it. Do not read or print credentials.

TASK (06:00 PLAN): Read "01 · CALENDARIO OPERATIVO" (A1:Q). (1) CARRY-OVER: any prior-day row whose Estado(J) is NOT in {Publicado, Medido, Descartado, Pausado} → re-create it for today (same Cuenta+Pieza, KEEP its current Estado exactly as-is — do not advance it; set ¿Es carry-over?(M)=Sí), unless it already exists for today (then skip). Estado=Pausado means intentionally paused / blocked / dependency-blocked (NOT abandoned) → do NOT re-create it; it can be manually reactivated later by changing its Estado back to a non-terminal value. (2) NEW: generate today's plan with the animalfood-daily-plan skill and APPEND only rows that do not already exist for today (match Cuenta(D)+Pieza(I)); set Estado=Idea or "Brief listo", Prioridad in {Bandera,Alta,Media,Baja}, ¿Es carry-over?(M)=No, ¿Existe contenido previo?(N)=Sí only if found in Banco/Ideas. Fill A Fecha(today), B Día, D Cuenta, E Marca/línea, F Tipo de audiencia, G Objetivo, H Formato, I Pieza/contenido, J Estado, K Responsable, L Prioridad, M, N; leave O/P (links) blank; put hook/CTA/community/asset/metric notes in Q Observaciones. Append below the last used row only. Print a one-paragraph summary of added vs carried-over.
'@

"=== AnimalFood 06:00 MORNING run started $(Get-Date -Format o) ===" | Tee-Object -FilePath $LogFile
claude -p $Prompt --allowedTools $AllowedTools --add-dir $ProjectDir *>&1 | Tee-Object -FilePath $LogFile -Append
$ClaudeExit = $LASTEXITCODE
"=== AnimalFood 06:00 MORNING run finished $(Get-Date -Format o) exit=$ClaudeExit ===" | Tee-Object -FilePath $LogFile -Append

# Mark today as done ONLY on success, so failures stay retryable by the catch-up trigger.
if ($ClaudeExit -eq 0) { $Today | Set-Content -Path $MarkerFile -NoNewline -Encoding ascii }

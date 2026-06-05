# AnimalFood Daily Workflow - 15:00 MIDDAY REVIEW
# Runs Claude Code headless against the LIVE Google Sheet via the google-sheets MCP.
# SAFETY: scoped --allowedTools only. NEVER add --dangerously-skip-permissions.
# Working directory is forced to the project root so the local-scope MCP + CLAUDE.md load.

$ErrorActionPreference = "Stop"

$ProjectDir = "C:\Proyecto Code\VSCODE"
$LogDir     = Join-Path $ProjectDir "logs"
$Stamp      = Get-Date -Format "yyyy-MM-dd_HHmmss"
$LogFile    = Join-Path $LogDir "animalfood-daily-1500_$Stamp.log"

if (-not (Test-Path $LogDir)) { New-Item -ItemType Directory -Path $LogDir | Out-Null }
Set-Location $ProjectDir

# Only the google-sheets MCP tools this workflow needs. No file-write or shell tools.
$AllowedTools = @(
  "mcp__google-sheets__list_sheets",
  "mcp__google-sheets__get_sheet_data",
  "mcp__google-sheets__update_cells",
  "mcp__google-sheets__batch_update_cells"
) -join ","

$Prompt = @'
You are operating the AnimalFood daily workflow. The Google Sheet 1kHApdwpoo9zyOoxEdvTr6YnPoH164BAlEN6hZqYUf8U, tab "01 · CALENDARIO OPERATIVO", is the SINGLE LIVE source (17-column header at A1:Q1: Fecha, Día, Hora, Cuenta, Marca/línea, Tipo de audiencia, Objetivo, Formato, Pieza/contenido, Estado, Responsable, Prioridad, ¿Es carry-over?, ¿Existe contenido previo?, Link archivo, Link post publicado, Observaciones). Accounts: @animalfoodargentina, @canfeed.ar (Canfeed+Catfeed), @enercan.ar (Enercan+Enercat), @ironpet.ar. Estado vocabulary (exact, no others): Idea, Brief listo, En diseño, En revisión, Aprobado, Programado, Publicado, Medido, Pausado, Descartado. RULES: never touch row 1 (header); read before write; do NOT duplicate — one row per Cuenta(D)+Pieza/contenido(I) per Fecha(A): if it already exists for today, UPDATE that row instead of appending. STATE-CHANGE GUARD: never advance Estado by time-of-day or assumption; change Estado ONLY when there is an explicit signal or confirmed data; never set Publicado without a link, confirmation or clear evidence; never set Medido without real metrics; if there is no signal, change nothing. Anti-repetition: before marking a new Idea, check "03 · BANCO DE CONTENIDOS" and "09 · IDEAS DESCARTADAS O REPETIDAS"; if the concept already exists, set ¿Existe contenido previo?(N)=Sí and treat it as reuse/carry-over, NOT new. Locale is es-AR (formulas use ';'). The old flat "Hoja 1" tab is legacy/frozen backup — do NOT read or write it. Do not read or print credentials.

TASK (15:00 REVIEW): Read "01 · CALENDARIO OPERATIVO". Update Estado(J) ONLY for rows with an explicit, confirmed progress signal (do not advance by time or assumption); you may append a short factual note to Observaciones(Q). Never set Publicado without a link/evidence; never set Medido without real metrics. Do NOT add rows, do NOT touch the header, do NOT change any other column. If there is no confirmed signal, change NOTHING. Print a one-paragraph summary of what changed (or that nothing changed).
'@

"=== AnimalFood 15:00 MIDDAY run started $(Get-Date -Format o) ===" | Tee-Object -FilePath $LogFile
claude -p $Prompt --allowedTools $AllowedTools --add-dir $ProjectDir *>&1 | Tee-Object -FilePath $LogFile -Append
"=== AnimalFood 15:00 MIDDAY run finished $(Get-Date -Format o) exit=$LASTEXITCODE ===" | Tee-Object -FilePath $LogFile -Append

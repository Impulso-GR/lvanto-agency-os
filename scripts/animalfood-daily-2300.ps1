# AnimalFood Daily Workflow - 23:00 END-OF-DAY REVIEW / CARRY-OVER
# Runs Claude Code headless against the LIVE Google Sheet via the google-sheets MCP.
# SAFETY: scoped --allowedTools only. NEVER add --dangerously-skip-permissions.
# Working directory is forced to the project root so the local-scope MCP + CLAUDE.md load.

$ErrorActionPreference = "Stop"

$ProjectDir = "C:\Proyecto Code\VSCODE"
$LogDir     = Join-Path $ProjectDir "logs"
$Stamp      = Get-Date -Format "yyyy-MM-dd_HHmmss"
$LogFile    = Join-Path $LogDir "animalfood-daily-2300_$Stamp.log"

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

TASK (23:00 CLOSE / CARRY-OVER): Read "01 · CALENDARIO OPERATIVO". (1) Only for pieces with a confirmed publish signal: set Estado(J)=Publicado and write the post URL into Link post publicado(P); set Medido ONLY if real metrics exist. Never mark Publicado/Medido without evidence. (2) For anything unfinished, set ¿Es carry-over?(M)=Sí so the 06:00 run re-creates it tomorrow. (3) Capture qualitative learnings in Observaciones(Q). Append to "05 · MÉTRICAS" ONLY when real, confirmed metrics exist (columns: Fecha, Cuenta, Marca, Pieza, Formato, Audiencia, Alcance, Interacciones, Guardados, Compartidos, Comentarios, Observación/aprendizaje) — never invent or fill placeholder metrics. METRICS DEDUP GUARD: before appending to "05 · MÉTRICAS", READ the tab and check the dedup key Fecha + Cuenta + Pieza/contenido (use Formato as a tiebreaker when the same piece ran in multiple formats on the same day). If a matching row already exists, UPDATE that existing row's metric cells instead of appending; if no matching row exists, append ONE new row below the last used row. Never duplicate metrics rows. Never touch the 05 header row (row 1). Never invent placeholder metrics — only write metrics when real, confirmed metrics exist. Do NOT add rows to the Calendario, do NOT touch any header. If there is no signal, change nothing. Print a one-paragraph summary.
'@

"=== AnimalFood 23:00 END-OF-DAY run started $(Get-Date -Format o) ===" | Tee-Object -FilePath $LogFile
claude -p $Prompt --allowedTools $AllowedTools --add-dir $ProjectDir *>&1 | Tee-Object -FilePath $LogFile -Append
"=== AnimalFood 23:00 END-OF-DAY run finished $(Get-Date -Format o) exit=$LASTEXITCODE ===" | Tee-Object -FilePath $LogFile -Append

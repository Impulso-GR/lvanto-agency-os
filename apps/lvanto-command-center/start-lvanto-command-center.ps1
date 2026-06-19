# Lvanto Command Center - local dev launcher
# Local machine setup only. Static frontend prototype (mock data, no backend).
# Double-click the desktop shortcut to run this.

$ErrorActionPreference = 'Stop'
$app = 'C:\Proyecto Code\VSCODE\apps\lvanto-command-center'
$url = 'http://localhost:5173'

Set-Location $app
Write-Host 'Lvanto Command Center - starting...' -ForegroundColor Cyan

# First run only: install dependencies if missing
if (-not (Test-Path (Join-Path $app 'node_modules'))) {
    Write-Host 'First run: installing dependencies (this can take a minute)...' -ForegroundColor Yellow
    npm install
}

# Start the Vite dev server in a NEW terminal window that stays open
Write-Host 'Launching dev server in a new window...' -ForegroundColor Cyan
Start-Process -FilePath 'powershell.exe' -WorkingDirectory $app -ArgumentList @(
    '-NoExit',
    '-Command',
    "Set-Location `"$app`"; Write-Host 'Lvanto Command Center dev server (keep this window open)' -ForegroundColor Green; npm run dev"
)

# Give Vite a few seconds to boot, then open the browser
Start-Sleep -Seconds 6
Write-Host "Opening $url ..." -ForegroundColor Cyan
Start-Process $url

Write-Host 'Done. The dev server runs in the other window. You can close THIS window.' -ForegroundColor DarkGray

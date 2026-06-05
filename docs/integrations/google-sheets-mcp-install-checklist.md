# Google Sheets MCP — Install Checklist (xing5/mcp-google-sheets, local Windows)

> **Preparation document. DO NOT install, run commands, or create credentials yet.** This is the step-by-step plan to follow once Gonzalo executes it manually.
> Candidate chosen: `xing5/mcp-google-sheets` (see `google-sheets-mcp-candidate-review.md`). Decision + scheduling: `animalfood-google-sheets-mcp-plan.md`.

## Target facts (non-secret)
- **Sheet name:** AnimalFood Daily Operations
- **Sheet ID:** `1kHApdwpoo9zyOoxEdvTr6YnPoH164BAlEN6hZqYUf8U`
- **Sheet URL:** https://docs.google.com/spreadsheets/d/1kHApdwpoo9zyOoxEdvTr6YnPoH164BAlEN6hZqYUf8U/edit
- **Environment:** local Claude Code on Windows 11, PowerShell.
- **Scheduling:** local Windows Task Scheduler at 06:00 / 15:00 / 23:00 (America/Argentina/Buenos_Aires).

> The Sheet ID/URL are document identifiers, **not secrets**. The **OAuth client secret and token file ARE secrets** — they must never be pasted into Markdown, chat, or committed to the repo.

> **⚠️ Auth change (2026-06-04):** service-account **key** creation is **BLOCKED** in this Google account/org by policy `iam.disableServiceAccountKeyCreation`. We do **not** bypass it. **Setup uses OAuth 2.0**, not a service-account JSON key. `xing5/mcp-google-sheets` supports OAuth natively.

---

## 1. Required software

- [ ] **Python 3.10+** — verify: `python --version`.
- [ ] **uv / uvx** (runs the server without cloning) — install per astral.sh docs; verify: `uvx --version`.
- [ ] **Claude Code** — already installed (**v2.1.162**).
- [ ] A **Google account** Gonzalo controls (for Google Cloud + sheet ownership).
- [ ] No clone/build needed — `xing5/mcp-google-sheets` runs via `uvx mcp-google-sheets@latest`.

## 2. Google Cloud / OAuth client setup (service-account key BLOCKED)

> Service-account **JSON key** creation is blocked by org policy `iam.disableServiceAccountKeyCreation`. **Do not attempt it.** Use OAuth instead.

Do this in the Google Cloud Console with Gonzalo's account:

- [ ] Create (or pick) a **Google Cloud project**, e.g. `animalfood-daily-ops`.
- [ ] **Enable API:** Google Sheets API (add Google Drive API **only if** a required operation needs it — prefer Sheets-only).
- [ ] Configure the **OAuth consent screen**:
  - User type: **External** (or Internal if the org allows).
  - Add Gonzalo's Google account as a **test user**.
  - **Publish to Production** to avoid the ~7-day refresh-token expiry that "Testing" mode imposes (otherwise expect periodic re-consent).
  - Scope: **Google Sheets** only (avoid full Drive unless necessary).
- [ ] Create an **OAuth client ID** → application type **Desktop app** (e.g. `animalfood-sheets-oauth`).
- [ ] Download the **OAuth client JSON** (the `client_secret...json`) **once**. This is **not** a service-account key — it is the OAuth client secret, allowed under the policy.

> Least-permission note: OAuth runs as the authorizing user. Keep the scope to Sheets so the integration cannot roam the whole Drive.

## 3. Confirm the authorizing account can access the Sheet

With OAuth, the integration acts **as the Google account that authorizes it** — there is **no service-account email to share with**.

- [ ] Confirm the **Google account** Gonzalo will authorize is the **owner of** (or has **Editor** access to) the **AnimalFood Daily Operations** sheet.
- [ ] If a different account will authorize, give it **Editor** on this sheet only (Share → add that account → Editor → uncheck "Notify").
- [ ] No broad Drive folder sharing needed.

## 4. Where credentials should be stored securely

Two OAuth artifacts are secrets: the **client secret JSON** and the **token file** created after consent.

- [ ] Store both **outside this repo**, e.g. `%USERPROFILE%\.secrets\animalfood\` (`client_secret.json`, `token.json`).
- [ ] Lock down the folder (Windows): restrict to your user — e.g. `icacls "%USERPROFILE%\.secrets\animalfood" /inheritance:r /grant:r "%USERNAME%:(OI)(CI)F"`.
- [ ] **Never** put either file in `docs/`, in any `.md`, in chat, or in git.
- [ ] Reference them only via **environment variables / `.env`** that are git-ignored (exact var names per the server's OAuth docs, e.g. a client-secret path + token path).
- [ ] Add a repo `.gitignore` entry for `.env`, `*client_secret*.json`, and `token*.json` **before** the repo is pushed to GitHub.
- [ ] Alternative: Windows Credential Manager / a secrets manager instead of files.

## 5. Configure MCP locally

> **Do not run yet** — and do not edit `.claude/settings.json` until Gonzalo gives the go-ahead.

Planned config for `xing5/mcp-google-sheets` (**OAuth mode**):

- Command: `uvx mcp-google-sheets@latest`
- Environment variables for the server (exact names per the server's OAuth docs at install time):
  - OAuth **client secret path** → `client_secret.json` from step 4.
  - OAuth **token path** → where the refresh token is cached after consent (step "first-run authorization").
  - No `SERVICE_ACCOUNT_PATH` (blocked); `DRIVE_FOLDER_ID` only if Drive scope is actually used.
- **First-run authorization (one-time):** run the server once interactively so the browser consent completes and the **token file is written**. Scheduled runs then reuse/refresh that token unattended.
- Registration options (pick one at execution time):
  - `claude mcp add google-sheets --env <oauth env vars> -- uvx mcp-google-sheets@latest`, **or**
  - a project `.mcp.json` entry, **or**
  - `.claude/settings.json` MCP block (deferred — not now).
- [ ] Keep the registration **local to this project**.

## 6. Test read access

- [ ] Start a Claude Code session with the MCP server enabled.
- [ ] Ask it to **list sheets / read** the AnimalFood Daily Operations sheet by ID `1kHApdwpoo9zyOoxEdvTr6YnPoH164BAlEN6hZqYUf8U` (tool `get_sheet_data`).
- [ ] Confirm the header row and existing rows come back. **Pass = read works, no other sheet accessed.**

## 7. Test write / update access

- [ ] **Append** one test row via `update_cells` / `batch_update_cells`.
- [ ] **Update** one `Status` cell on the test row (e.g. `To prepare` → `Ready`).
- [ ] **Re-read** to confirm the change landed.
- [ ] **Delete the test row** — only after confirmation.
- [ ] **Pass =** append + cell update + re-read all succeed on this sheet only.

## 8. Sync local CSV/state with the Google Sheet

- [ ] **Column contract:** the sheet's 21 columns = the 16 CSV columns (`Date … Next action`) + 5 state columns (`Status, Result, Learning, Carry-over action, Notes`). Keep order identical to the MCP plan §5.
- [ ] **Direction of truth (initial):** local `animalfood-daily-sheet-state.md` + dated CSV remain source of truth until the sheet is validated; the sheet mirrors them.
- [ ] **Morning (06:00):** read sheet → carry over pending rows → write today's plan rows (Status `To prepare`/`Idea`) → keep dated CSV as backup.
- [ ] **Midday (15:00):** read sheet → update Status/Result on rows that progressed.
- [ ] **End-of-day (23:00):** read sheet → capture Result/Learning → set Carry-over action → prepare tomorrow.
- [ ] After each run, the **dated CSV in `docs/verticals/animalfood/daily-plans/` stays as the local backup**.

## 9. Schedule 06:00 / 15:00 / 23:00 with Windows Task Scheduler

For each of the three times, create one task:

- [ ] Open **Task Scheduler** → **Create Task** (not Basic).
- [ ] **General:** name e.g. `AnimalFood-Daily-0600`; "Run only when user is logged on" (local MCP needs the session); set correct user.
- [ ] **Triggers:** New → Daily → start time `06:00` (repeat for `15:00`, `23:00`); enabled.
- [ ] **Actions:** Start a program → point to a small **launcher script** (e.g. `scripts\animalfood-daily-run.ps1`) that opens Claude Code with the daily-plan prompt. (Script to be written later; not part of this checklist.)
- [ ] **Conditions:** uncheck "Start only on AC power" if on a notebook; optionally "Wake the computer to run".
- [ ] **Settings:** allow "Run task as soon as possible after a missed start" (covers the PC being off).
- [ ] Confirm the **PC/notebook is on** at those times (pending Gonzalo confirmation) — otherwise missed-run catch-up applies.
- [ ] Timezone: machine local = America/Argentina/Buenos_Aires.

## 10. Rollback / disable instructions

- [ ] **Pause scheduling:** in Task Scheduler, **Disable** the three `AnimalFood-Daily-*` tasks (or Delete).
- [ ] **Disconnect MCP:** remove the server — `claude mcp remove google-sheets` (or delete the `.mcp.json` / settings entry). Confirm it no longer appears in `claude mcp list`.
- [ ] **Revoke access:** revoke the app at the Google account's **Security → Third-party access**; and/or delete the **OAuth client ID** in Google Cloud Console. Delete the local **`token.json`** so no cached refresh token remains.
- [ ] **Fallback (always available):** keep using `animalfood-daily-sheet-state.md` + dated CSVs + manual Google Sheets import. The local workflow keeps working with zero external dependencies.
- [ ] **Cleanup:** if abandoning, delete the local `client_secret.json` + `token.json` from `%USERPROFILE%\.secrets\animalfood\` and remove the env vars.

---

## Progress (2026-06-04)
- ✅ **uv 0.11.19 installed** via winget (provides `uvx`; brings its own Python — system Python was absent).
- ✅ **OAuth client JSON** created by Gonzalo, stored at `C:\ClaudeSecrets\animalfood-oauth-client-secret.json` (content never read).
- ✅ **MCP server registered** (local scope) in `C:\Users\Pc\.claude.json` — command `uvx mcp-google-sheets@latest`, env `CREDENTIALS_PATH` + `TOKEN_PATH=C:\ClaudeSecrets\animalfood-oauth-token.json`. `.claude/settings.json` untouched.
- ✅ **Package validated** — `mcp-google-sheets==0.6.3` + 50 deps install cleanly on this machine.
- ✅ **OAuth token exists and works** — token at `C:\ClaudeSecrets\animalfood-oauth-token.json` (contents never read). MCP **connected**.
- ✅ **§6 Read test PASSED** — tab `Hoja 1` listed; sheet read successfully (was empty before headers).
- ✅ **§7 Write/update test PASSED** — temporary row written, one Status cell updated `To prepare → Ready`, re-read confirmed, temp row cleared. No other sheet touched.
- ✅ **Real 21-column header written + validated** — `A1:U1` (`Date … Notes`).
- ✅ **Today's 3 carry-over rows mirrored** — `A2:U4` (Catfeed = To prepare, Canfeed = To prepare, Animalfood institucional = Idea). No duplicates.
- ✅ **OAuth consent screen published to Production** (2026-06-04) — removes the ~7-day "Testing"-mode refresh-token expiry; no periodic re-consent expected.
- ⏭ **Next (user):** Windows Task Scheduler 06:00/15:00/23:00 (§9).

## Status
- **Auth = OAuth 2.0** (service-account key blocked by org policy `iam.disableServiceAccountKeyCreation`; not bypassed). Token exists and works. **Consent screen = Production** (no short token expiry).
- **LIVE:** Google Sheet "AnimalFood Daily Operations" (`1kHApdwpoo9zyOoxEdvTr6YnPoH164BAlEN6hZqYUf8U`, tab `Hoja 1`) is the **live operational view** — header + 3 rows in place. Local `animalfood-daily-sheet-state.md` remains **backup** until scheduling is fully tested.
- **Operating rule:** do not duplicate rows; update rows only when Status / Result / Learning changes.
- Remaining before fully scheduled: confirm PC stays on at 06:00/15:00/23:00; Task Scheduler setup (§9).

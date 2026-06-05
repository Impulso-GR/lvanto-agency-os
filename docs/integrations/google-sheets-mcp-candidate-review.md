# Google Sheets MCP — Candidate Review (local Claude Code)

> **Review only. Nothing installed, cloned, or connected.** Desk research from public repos/READMEs on 2026-06-04 to pick the safest Google Sheets MCP server for a **local** Claude Code → Google Sheets read/write workflow (project: `AnimalFood Daily Operations`).
> Related: `docs/integrations/animalfood-google-sheets-mcp-plan.md`.

## Evaluation context
- Target: local MCP server on this Windows 11 machine, triggered by Windows Task Scheduler at 06:00 / 15:00 / 23:00.
- Must: read + write/update individual rows/cells, run unattended after a one-time authorization, least-permission, single-sheet scope, Windows-friendly.
- Claude Code v2.1.162.

## ⚠️ Update (2026-06-04): service-account path BLOCKED → OAuth pivot

Google Cloud blocked service-account **key** creation in this account/organization via policy **`iam.disableServiceAccountKeyCreation`**. We will **not** try to bypass or disable the org policy.

Consequence: the **service-account JSON key** auth mode is **unavailable**. The setup pivots to **OAuth 2.0** (local, with a stored refresh token). This re-frames the evaluation — the deciding factor is now "best OAuth/local support," not "headless service account."

Good news: this does **not** change the recommended candidate. `xing5/mcp-google-sheets` supports **OAuth 2.0 natively** (alongside service accounts), so we keep it and switch only the auth mode. OAuth requires creating an **OAuth client ID** (Desktop app) in Google Cloud — that is **not** a service-account key and is **not** blocked by the policy.

---

## Candidate 1 — `xing5/mcp-google-sheets`

| Dimension | Finding |
|---|---|
| Purpose | Python MCP server bridging MCP clients and the Google Sheets/Drive API; full CRUD + listing/batching/sharing/formatting. |
| Setup complexity | Low–moderate. Runs in one line via `uvx mcp-google-sheets@latest` — **no clone/build required**. GCP project + API enable still needed. |
| Credential method | **Service Account (recommended, headless)**, OAuth 2.0, direct credential injection (`CREDENTIALS_CONFIG`), or ADC. |
| Required permissions | Google Sheets API + Google Drive API; service account shared only on the target Drive folder/sheet. |
| Read/write support | **Yes — full.** `get_sheet_data`, `update_cells`, `batch_update_cells`, `add_rows`/`add_columns`, etc. (19 tools). |
| Windows compatibility | **Documented**, with PowerShell + CMD examples for env vars and Base64. |
| Maintenance / activity | **Strongest.** ~891 stars, 209 forks, 12 releases; latest **v0.6.3 (2026-05-14)**. Active. |
| Security risks | Low–moderate. Service account = headless, no per-run browser. Risk = key file handling; mitigate with least-permission + share only the AnimalFood sheet/folder. README warns against pasting creds into online encoders. |
| Can update rows/cells | **Yes** (`update_cells` / `batch_update_cells`, A1 notation). |
| Fit for AnimalFood Daily Ops | **Best fit.** Headless service-account auth = reliable scheduled runs; no clone; Windows-documented; can scope to one Drive folder. |

## Candidate 2 — `mkummer225/google-sheets-mcp`

| Dimension | Finding |
|---|---|
| Purpose | Node/TypeScript MCP connector for Google Sheets; granular cell/row/column read + edit. |
| Setup complexity | **Moderate–high.** Must **clone + `npm install` + `npm run build` + `npm run start`** (build from source). |
| Credential method | **OAuth 2.0 only** (Desktop app flow); `gcp-oauth.keys.json`; `refresh_auth`. **No service account.** |
| Required permissions | Google Sheets API; specific scopes not documented. |
| Read/write support | **Yes.** Read (`read_all_from_sheet`, `read_rows`, `read_columns`, `read_headings`) + write (`edit_cell`, `edit_row`, `edit_column`, `insert_row`, `insert_column`). |
| Windows compatibility | Not explicitly documented (Node runs on Windows, but no notes). |
| Maintenance / activity | Moderate. ~136 stars, 38 forks, **only ~7 commits**; commit dates not visible. |
| Security risks | Moderate. **OAuth interactive flow is awkward for unattended/scheduled runs** (token can expire/need re-consent); local token file must be protected. |
| Can update rows/cells | **Yes** (`edit_cell` / `edit_row`). |
| Fit for AnimalFood Daily Ops | **Weaker.** OAuth-only + build-from-source is more fragile for headless 06:00/15:00/23:00 scheduling. |

## Candidate 3 — `amaboh/google-sheets-mcp-server`

| Dimension | Finding |
|---|---|
| Purpose | Python MCP server for Google Sheets (create/read/write/manage, formulas, formatting). |
| Setup complexity | Moderate–high. Clone repo, create venv, configure OAuth creds; Python ≥3.10 + `uv`. |
| Credential method | **OAuth 2.0** (browser authorization on first run); local `token.json`. |
| Required permissions | Google Sheets API + Google Drive API; granular scopes not documented. |
| Read/write support | Yes — read, write, update cells via formulas. |
| Windows compatibility | Basic (`.venv\Scripts\activate` shown); no platform-specific notes. |
| Maintenance / activity | **Weakest / early-stage.** ~2 stars, ~3 commits, beta-level; commit dates not visible. |
| Security risks | Moderate, plus **immaturity risk** (small/unproven codebase). OAuth token must be secured. |
| Can update rows/cells | Yes (cells/formulas). |
| Fit for AnimalFood Daily Ops | **Not recommended.** Too early-stage / low adoption for an operational daily workflow. |

---

## Comparison summary

| Criterion | xing5 | mkummer225 | amaboh |
|---|---|---|---|
| Auth available under org policy | ✅ OAuth 2.0 (also SA, now blocked) | ✅ OAuth only | ✅ OAuth only |
| Unattended after 1-time consent | ✅ stored refresh token | ✅ `refresh_auth` | ⚠️ token-based |
| No clone/build needed | ✅ `uvx` | ❌ build from source | ❌ clone + venv |
| Windows documented | ✅ | ❌ | ⚠️ basic |
| Read + cell/row write | ✅ | ✅ | ✅ |
| Maintenance / adoption | ✅ ~891★, May 2026 | ⚠️ ~136★, few commits | ❌ ~2★, beta |
| License | MIT | MIT | MIT |
| Single-sheet scoping | ✅ Drive folder share | ⚠️ | ⚠️ |

## Recommendation (revised for OAuth/local)

**Recommended candidate: `xing5/mcp-google-sheets`, in OAuth 2.0 mode.**

Reasons:
1. **Native OAuth 2.0 support** — works without any service-account key, so it satisfies the `iam.disableServiceAccountKeyCreation` org policy. After a one-time browser consent it stores a **refresh token** locally, allowing unattended Task Scheduler runs.
2. **No clone/build** — runs via `uvx mcp-google-sheets@latest`; lowest moving parts.
3. **Documented Windows (PowerShell) setup.**
4. **Best maintained / most adopted** (≈891 stars, release 2026-05-14).
5. Supports exact-cell/row updates (`update_cells`, `batch_update_cells`) needed to flip `Status` and append rows.
6. Uses the **authorizing user's own access** — least-permission is achieved by limiting the OAuth scope to Sheets (no broad Drive access required).

Why not switch candidate: `mkummer225` (OAuth-only) and `amaboh` (OAuth-only) would also run on OAuth, but `mkummer225` requires clone+build and `amaboh` is early-stage (~2★). `xing5` already supports OAuth **and** keeps every other advantage, so no switch is warranted.

**OAuth caveats to handle at setup:**
- Create an **OAuth client ID (Desktop app)** in Google Cloud — not a service-account key (allowed).
- Set the **OAuth consent screen to Production / published** (or add Gonzalo as a test user and accept that "Testing"-mode refresh tokens can expire ~7 days, forcing periodic re-consent).
- Limit scope to **Google Sheets** (avoid full Drive) where the server allows; only widen if a required operation needs it.
- Store the OAuth **client secret and token file out of this repo** — `.env` / credential manager only; never in Markdown or chat.
- No publishing/ads/outreach/budget actions through this integration; human approval before any external action.

**Not installed. Decision pending Gonzalo's approval + the OAuth inputs (Google account to authorize, OAuth client creation, install/authorize approval) in the MCP plan.**

## Sources
- [github.com/xing5/mcp-google-sheets](https://github.com/xing5/mcp-google-sheets)
- [github.com/mkummer225/google-sheets-mcp](https://github.com/mkummer225/google-sheets-mcp)
- [github.com/amaboh/google-sheets-mcp-server](https://github.com/amaboh/google-sheets-mcp-server)

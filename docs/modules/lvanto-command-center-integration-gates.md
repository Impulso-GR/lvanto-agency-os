# Lvanto Command Center — Integration Gates (Staged)

> **Planning document only — nothing here is installed or connected.** Defines the staged gates by which Lvanto Command Center may *later* connect to real systems. Each gate is sequential and behind explicit Gonzalo approval. The current app is a **local static/mock prototype (v0.5)**; all gates below are **closed**.
>
> Related: [[lvanto-command-center-product-spec]] · [[lvanto-command-center-visual-review-v1]] · [[animalfood-meta-readonly-pilot]] · [[animalfood-monday-operating-protocol]].

---

## Principles

- **One writer, one source of truth** at any time (no duplicate writable sources).
- **Read before write** — every write capability is preceded by a stable read-only phase.
- **Default deny** — a gate is closed until *all* its prerequisites + approval are met.
- **Reversible** — every gate has a rollback.
- **Never** publish, spend, scrape logged-in platforms, or modify external data without a dedicated, approved gate.

Gate status legend: 🔒 closed (today) · 🟡 candidate · 🟢 open.

---

## Gate 1 — Google Sheets (read-only) 🔒
- **Purpose:** surface live `01 · CALENDARIO` / `05 · MÉTRICAS` in the app (read).
- **Value:** real operational data instead of mock; single screen for the day.
- **Risk:** Low-Medium — credential handling; accidental over-scope; rate limits.
- **Prerequisites:** server-side read proxy (service account, server-only); per-user/client scoping enforced **in the app layer** (RLS not yet present); read-only scope; secrets in deploy secret store.
- **Approval:** Gonzalo + confirmation the service account is read-only.
- **Rollback:** disable the connector; app falls back to mock.
- **Never:** expose the service account to the browser; write anything.

## Gate 2 — Google Sheets (controlled writes) 🔒
- **Purpose:** write status/metrics back to the Sheet from the app.
- **Value:** the app becomes the operating surface, not just a viewer.
- **Risk:** **High** — wrong writes corrupt the live calendar; dedup must hold.
- **Prerequisites:** Gate 1 stable; Supabase canonical OR a strict single-writer rule; the `column-map` dedup key enforced; full audit log; per-action confirmation.
- **Approval:** Gonzalo, per entity; staged (one tab first).
- **Rollback:** revert to read-only; restore from backup; Sheet remains source until cutover proven.
- **Never:** write without dedup check + audit; two writers at once.

## Gate 3 — Auth / Supabase 🔒
- **Purpose:** real login, roles, and row-level security by `client_id`.
- **Value:** safe multi-client isolation; foundation for writes.
- **Risk:** Medium — auth misconfig; data leak across clients.
- **Prerequisites:** product-spec schema (`client_id` first-class); RLS policies; least-privilege roles; secrets managed.
- **Approval:** Gonzalo; security review of RLS.
- **Rollback:** disable auth gate; revert to local/no-auth prototype.
- **Never:** ship without client isolation tested; store secrets in repo.

## Gate 4 — Meta manual metrics import 🔒
- **Purpose:** structured manual import of IG/FB metrics into `05 · MÉTRICAS` (still human-entered, just assisted).
- **Value:** closes the empty-metrics gap without an API.
- **Risk:** Low — no external connection; data-entry errors only.
- **Prerequisites:** manual-capture workflow live; dedup key; "real numbers only" rule.
- **Approval:** Gonzalo.
- **Rollback:** stop importing; manual stays source.
- **Never:** invent/estimate numbers.

## Gate 5 — Meta API / Ads (read-only first, later) 🔒
- **Purpose:** auto-pull organic + paid metrics (read-only); later, supervised paid visibility.
- **Value:** automated metrics + paid funnel read.
- **Risk:** **High** — OAuth scope creep; session reuse; perceived "spend control".
- **Prerequisites:** the read-only pilot ([[animalfood-meta-readonly-pilot]]) gate cleared; **Read scope only**; app-layer scoping; **no spend/campaign capability**.
- **Approval:** Gonzalo, explicit, per scope.
- **Rollback:** revoke token; remove connector.
- **Never:** request write/financial scope; change budgets/campaigns; reuse logged-in browser sessions.

## Gate 6 — Notifications (real: Telegram / email) 🔒
- **Purpose:** push the Decision Inbox / alerts to phone.
- **Value:** the right alert reaches the right person off-screen.
- **Risk:** Medium — noisy/over-permissioned bots; sensitive data in messages.
- **Prerequisites:** notification model stable in-app; severity tiers; PII filtering; Telegram bot token in secret store.
- **Approval:** Gonzalo.
- **Rollback:** disable channel; in-app inbox remains.
- **Never:** send financials/credentials/raw internal data; message external clients.

## Gate 7 — Cowork / Scheduled Tasks 🔒
- **Purpose:** let Cowork run supervised overnight routines (read/report).
- **Value:** automated morning prep / audits.
- **Risk:** **High** — computer-use can act on logged-in apps without sandbox.
- **Prerequisites:** see [[lvanto-cowork-night-operator-plan]]; read-only, no-publish, no-spend boundaries written; "act without asking" OFF; scoped allowed-tools.
- **Approval:** Gonzalo, per routine.
- **Rollback:** disable the scheduled task.
- **Never:** publish, spend, scrape logged-in platforms, or log into accounts without a separate gate.

## Gate 8 — Browser MCP / Playwright 🔒
- **Purpose:** public-only, no-login research automation.
- **Value:** faster supervised signal capture (Ads Library, public profiles, MercadoLibre).
- **Risk:** **High** — easy to drift into logged-in scraping / actions.
- **Prerequisites:** public-only + no-login rule written and accepted; supervised; allow-listed domains; **a separate audit before install** (per Monday Protocol).
- **Approval:** Gonzalo, after the audit.
- **Rollback:** uninstall MCP.
- **Never:** log in, publish, comment, DM, or scrape authenticated platforms.

## Gate 9 — RSS / Google Trends 🔒
- **Purpose:** lowest-risk external signal source (public feeds / trends).
- **Value:** seasonal/market signal freshness for the Signals Log.
- **Risk:** Low — public read; data quality/fragility (Trends).
- **Prerequisites:** Signals Log schema; append-with-confidence discipline; source recorded.
- **Approval:** Gonzalo (low bar).
- **Rollback:** stop the feed.
- **Never:** present unverified trend as fact (label confidence).

---

## Cross-gate rules (apply to all)

- No gate opens before the scheduler is stable and Gonzalo approves.
- Secrets live in the deploy platform's secret store, never in the repo or UI.
- Every write/action gate requires an **audit log**.
- The local prototype always remains a safe fallback.
- **Never, without a dedicated approved gate:** publish to social, spend on ads, change campaigns/budgets, scrape logged-in platforms, log into external accounts, or write to Google Sheets.

*Planning only — installs nothing, connects nothing, configures no credentials.*

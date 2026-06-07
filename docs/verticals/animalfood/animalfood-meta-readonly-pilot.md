# AnimalFood — Meta Read-Only Metrics Pilot (Future, Deferred)

> **Standalone plan for a future supervised pilot** to connect Meta metrics to Agency OS **read-only**. This is the automation step that comes *after* the manual habit is proven. It connects **nothing** today — it is the gated blueprint we follow when (and only when) the decision gate in §11 is cleared. Until then, [[animalfood-meta-insights-manual-workflow]] is the source of truth.
>
> **Audit conclusion that produced this plan (Claude CoWork, 2026-06-07):** CoWork browser/computer-use must **not** be used for Meta metrics (session reuse + write-capable + injection risk). The **connector/MCP path with OAuth read-only** can be considered later. **Official Meta Ads MCP (Read scope)** can serve *paid* metrics. **Instagram Graph API (read-only)** can serve *organic* IG/FB insights. Before Monday, **manual capture is the only safe path.**
>
> Related: [[animalfood-meta-insights-manual-workflow]] · [[animalfood-column-map]] · [[animalfood-trend-signals-log]] · [[animalfood-paid-traffic-system]] · [[animalfood-creative-ads-lab]] · `animalfood-daily-plan` skill.

---

## 1. Purpose

Define a **safe, supervised, read-only** way to automate the collection of AnimalFood Instagram/Facebook metrics into Agency OS, so `05 · MÉTRICAS` and [[animalfood-trend-signals-log]] can be fed with **real own-performance data** without ever exposing a write surface (no publishing, no ad changes, no budgets, no DMs/comments). This plan exists so that when automation is justified, we execute a **known-safe path** instead of improvising under time pressure.

## 2. What this pilot IS for

- Reading **organic** Instagram/Facebook insights for AnimalFood's own business accounts (reach, interactions, saves, shares, comments, and any still-supported profile/click metrics).
- Reading **paid** Meta Ads reporting metrics (spend, reach, results, CPR/CPM/CTR) for AnimalFood ad accounts, **read-only**.
- Auto-populating the **same `05 · MÉTRICAS` schema and dedup key** the manual workflow already fills by hand — automation only speeds up an existing, proven habit.
- Producing a **structured CSV/table** for human verification before anything touches the live Sheet.
- Proving that a scoped, read-only connector can run **under supervision** with no write capability.

## 3. What this pilot is NOT for

- ❌ Not for publishing, scheduling, or boosting any content.
- ❌ Not for creating, editing, pausing, or activating campaigns / ad sets / ads.
- ❌ Not for changing budgets, bids, targeting, or any financial action.
- ❌ Not for sending DMs, replying to comments, liking, following, or any engagement automation.
- ❌ Not for connecting personal accounts — **own AnimalFood business assets only**.
- ❌ Not for writing to the live Sheet **during the pilot** (Sheet integration is a separate, later decision — §8 step 6).
- ❌ Not a replacement for the manual workflow yet — manual stays the source of truth until this pilot passes its gate.

## 4. Approved paths

Two independent, read-only connector/MCP paths. **Both are OAuth/token-scoped — neither reuses the browser session.**

### 4.1 Instagram Graph API — read-only (ORGANIC metrics)
- Serves **organic** IG/FB insights for own Business/Creator accounts linked to Facebook Pages.
- Read scopes only (see §6). Auto-fills the same rows the manual workflow fills by hand — **same 12-col schema, same dedup key**.
- Token stored **outside the repo** (e.g. `C:\ClaudeSecrets\`), never committed — same handling pattern as the google-sheets MCP token.
- Note: Meta deprecated several organic metrics in Graph API v21 (Jan 2025: `profile_views`, `website_clicks`, non-Reels `video_views`, etc.) — expect a **reduced** organic field set; capture what is still returned, leave the rest blank.

### 4.2 Official Meta Ads MCP — Read scope (PAID metrics)
- Official Meta connector (`mcp.facebook.com/ads`), OAuth-based.
- **Read scope only** — never Read-write, never Read-write-financial.
- Serves paid reporting across FB/IG/Reels/Stories placements.
- The MCP exposes write tools (create campaign, edit budget, activate) — these are **left unauthorized** by selecting the Read tier; the scope is the guardrail, not the tool's "paused by default" behavior.

## 5. Rejected paths (do not use)

- ❌ **CoWork browser/computer-use on logged-in Meta** — no sandboxing, inherits your live session, can in principle reach Ads Manager / DMs / settings; not read-only-enforceable.
- ❌ **Chrome session/cookie reuse** — any path that rides the logged-in browser session instead of a scoped token.
- ❌ **Ads Manager browser navigation** — clicking through Ads Manager via the agent (write-capable surface, no scope guarantee).
- ❌ **Scraping** of any kind.
- ❌ Third-party "connect Meta in 60s" connectors that request broad/write scopes or proxy through their servers — only the official MCP (Read) and own-app Graph API (read scopes) are approved.

## 6. Required permissions / scopes

**Organic (Instagram Graph API):** read scopes only —
- `instagram_basic`
- `instagram_manage_insights`
- `pages_read_engagement`
- `pages_show_list`
- `read_insights`
- (tied to an IG **Business/Creator** account linked to a Facebook Page)
- **Never** `ads_management`, `instagram_content_publish`, `pages_manage_posts`, `pages_messaging`, or any publish/manage/messaging scope.

**Paid (official Meta Ads MCP):** OAuth → Meta Business login → select **Read** tier only.
- **Never** Read-write. **Never** Read-write-financial.

**Token handling (both):** scoped token stored outside the repo (`C:\ClaudeSecrets\`), never committed, revocable; review granted scopes after every run.

## 7. Guardrails (non-negotiable)

- **Read-only only** — both paths scoped to read; write scopes never granted.
- **No publishing** — no content publish scope, ever.
- **No campaign creation** — write tools left unauthorized.
- **No budget changes** — no financial scope, ever.
- **No DMs / comments / likes / follows** — no messaging or engagement scope.
- **No "act without asking"** — the agent must pause for approval; supervised the entire run.
- **No Sheet writes during the pilot** — output goes to a CSV/table for human review only.
- **Own AnimalFood business assets only** — no personal accounts, no client accounts without explicit authorization.
- **Real numbers only** — never invent, estimate, or placeholder; blank = unknown (consistent with the manual workflow).

## 8. Safe pilot sequence

1. **Test / secondary asset first** — run against one low-stakes AnimalFood account (e.g. a dormant line), never the mother account on the first run.
2. **Connect read-only** — Graph API read scopes for organic and/or Meta Ads MCP Read tier for paid; confirm the scope screen shows **read-only** before authorizing.
3. **Export CSV / table** — pull a fixed metric set into a local CSV/table; **do not** write to the Sheet.
4. **Manual verification** — Gonzalo cross-checks the exported numbers against the Meta UI (and against any overlapping manual rows) to confirm accuracy and that nothing else was touched.
5. **Revoke / review token** — review the granted scopes; revoke the token when the run ends (re-issue per supervised run until the pilot is promoted).
6. **Only later consider Sheet integration** — promoting from "CSV export" to "auto-write `05 · MÉTRICAS`" is a **separate decision** (same schema + dedup key as the manual workflow, validated like the google-sheets MCP: local scope, scoped allowed-tools, token outside repo). Not part of the first pilot.

## 9. Data fields desired for `05 · MÉTRICAS`

Target the existing **12-column** schema (per [[animalfood-column-map]]) so manual and automated rows are interchangeable:

`Fecha · Cuenta · Marca · Pieza / contenido · Formato · Audiencia · Alcance · Interacciones · Guardados · Compartidos · Comentarios · Observación / aprendizaje`

- **Fecha** = post publish date (`yyyy-MM-dd`).
- **Cuenta** = @account · **Marca** = brand/line.
- **Pieza / contenido** = piece name (match `01 · CALENDARIO OPERATIVO` wording so they reconcile).
- **Formato** = Carrusel / Reel / Story / Post · **Audiencia** = B2C / B2B / Institucional.
- **Alcance** = reach · **Interacciones** = interactions · **Guardados** = saves · **Compartidos** = shares · **Comentarios** = comments.
- **Observación / aprendizaje** = one-line learning; profile visits / DMs / link clicks (when still returned) go here since there is no dedicated column.
- **Paid metrics** (spend / results / CPR / CPM / CTR) do **not** belong in `05 · MÉTRICAS` — route those to the paid-traffic / creative-ads sheets ([[animalfood-paid-traffic-system]] / [[animalfood-creative-ads-lab]]), not the organic metrics tab.
- **Dedup key:** `Fecha + Cuenta + Pieza/contenido` (Formato tiebreaker) — update the existing row, never duplicate (matches the 23:00 metrics-dedup guard).

## 10. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Browser/computer-use rides logged-in session (write-capable) | **Rejected path** — connector/MCP only; never CoWork browser control for Meta |
| Cookie/session reuse | OAuth/token-scoped paths only; no browser-session paths |
| Over-broad OAuth scope ("write to be safe") | Read tier / read scopes only; scope screen verified before authorizing |
| Accidental campaign/budget change | No write or financial scope granted; write tools unauthorized |
| Prompt injection via comments/DMs/page content | "Act without asking" OFF; supervised run; read-only data only |
| Phone-triggered run becomes remote control of desktop | Run only from the supervised desktop session; no phone triggers during pilot |
| Token leakage | Token stored in `C:\ClaudeSecrets\` outside repo, never committed, revoked after run |
| Bad data written to live Sheet | No Sheet writes during pilot; CSV → human verification first |
| Organic metric gaps (v21 deprecations) | Capture what's returned; blank for deprecated fields; never estimate |
| Third-party connector proxies data / broad scopes | Only official Meta Ads MCP + own-app Graph API approved |

## 11. Decision gate before implementation

This pilot proceeds **only when ALL of these are true** — checked by Gonzalo, in writing:

1. **Scheduler is stable** for several consecutive days (06:00 / 23:00 daily flows green, no carry-over regressions).
2. **Manual workflow is live** and `05 · MÉTRICAS` already holds real rows (the habit + schema are proven, not theoretical).
3. **Gonzalo explicitly approves** the specific path(s) (organic Graph API and/or Ads MCP Read) and the **test asset** for the first run.
4. **Read-only scopes confirmed** on the authorization screen before any token is issued.
5. **Supervised window booked** — a human watches the entire first run; "act without asking" is OFF.
6. **Token handling confirmed** — storage outside repo + revoke plan agreed.

If any item is unmet → **stay on the manual workflow.** No partial / unsupervised start.

## 12. Why this is deferred until after Monday

- Proper read-only OAuth scoping + token review is **deliberate setup**, not a 60-second connect — rushing it is exactly how an over-broad scope slips in.
- The current rules (and the audit) forbid connecting/installing/configuring now; this document is **research/plan only**.
- The **manual workflow already closes the #1 data gap this week** (`05 · MÉTRICAS` empty) with **zero risk** — there is no urgency that justifies an unsupervised connect before Monday.
- Sequencing: prove the **habit and schema** manually first; automation only speeds up something that already works. Until the §11 gate clears, **manual capture is the only safe path.**

---

*Docs/plan only — this file connects nothing. No Meta connection, no install, no MCP configured, no Sheet modified, no task run, no credentials read.*

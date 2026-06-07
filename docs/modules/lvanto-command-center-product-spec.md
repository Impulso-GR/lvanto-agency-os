# Lvanto Command Center — Product Vision & UI Architecture Spec (Future, Deferred)

> **Specification only.** This documents the future private, multi-client internal operating system for Lvanto Agency OS. It builds **nothing** — no app, no packages, no frontend code, no auth, no Sheet writes. Primary input: the Claude Chrome external research audit dated **2026-06-07** for "Lvanto Command Center." Status: **Phase 0 (spec)**, deferred behind a decision gate. **Patched 2026-06-07** per internal audit — added Paid Media / Traficker end-to-end, Phase-1 client-isolation enforcement, missing entities (Campaign / Paid metric / Date / AuditLog / Note), notification scope, and IA MVP/future tags.
>
> Related: [[remotion-video-automation]] · [[animalfood-meta-readonly-pilot]] · [[animalfood-column-map]] · [[animalfood-trend-signals-log]] · [[animalfood-role-excellence-system]].

---

## 1. Product vision

**What it is.** Lvanto Command Center is a **private, role-aware, multi-client internal operating system** for Lvanto — the single place where Gonzalo and the team see priorities, tasks, signals, opportunities, metrics, decisions, and system health **across all clients**, with each client cleanly separated.

**Problem it solves.** Today the operational brain is spread across a Google Sheet, markdown docs, logs, WhatsApp, and memory. There is no single, trustworthy, role-aware surface that answers *"what matters right now, for which client, and what needs my decision?"* The Command Center consolidates that without duplicating sources of truth.

**Why it matters.**
- **Gonzalo:** less cognitive overload; a Decision Inbox instead of scattered judgment calls; proof of operational maturity he can show to win clients.
- **Aranza:** unambiguous tasks and guardrails per client/brand; no strategy interpretation required.
- **Lvanto:** a scalable, productizable system — AnimalFood becomes the case study, not the ceiling.
- **Future clients (Broker Capital, VigilArg, Sileoni, others):** onboard as **workspaces**, reusing the same architecture.

**What it must NOT become.**
- ❌ An **AnimalFood-only dashboard** (the single biggest architectural failure mode).
- ❌ A reporting-only tool (it is operational, not just charts).
- ❌ A duplicate writable source of truth competing with the canonical DB.
- ❌ A generic Bootstrap admin panel.
- ❌ A system that publishes, spends, or changes campaigns.

---

## 2. Core architectural principle

**Lvanto is the system; clients are workspaces; brands/accounts live inside clients.**

```
Lvanto Command Center (the system)
└── Client (workspace)            e.g. AnimalFood, Broker Capital, VigilArg, Sileoni
    └── Brand                     e.g. Canfeed, IronPet, Catfeed, Enercan
        └── Account               e.g. @canfeed.ar, @ironpet.ar
            └── Content / Tasks / Signals / Metrics / Decisions …
```

- **`client_id` is a mandatory, first-class parent on every entity from Day 1** — even while AnimalFood is the only client. No entity may exist without a `client_id` (where applicable). This is non-negotiable and prevents the AnimalFood-only trap.
- **AnimalFood is the first case study**, the proving ground for the architecture — never the architecture itself.
- Adding a client = creating a workspace, not refactoring the system.

---

## 3. User roles and permissions

| Role | Can see | Can do | Cannot do | Sensitivity limits |
|---|---|---|---|---|
| **Admin / Gonzalo** | Everything, all clients/brands; system health; decisions; (future) financials | Approve decisions; (future) trigger writes/actions; manage users/clients; configure | — | Full access; the only role that can approve writes/financial views |
| **Operator / Aranza** | Assigned client(s)/brand(s): tasks, signals, metrics, dates, claims guard | Read; mark her own task progress (future write, gated); add operational notes (future) | Approve decisions; see other clients; see financials/margins; publish/spend | Scoped to assigned workspaces only; no cross-client visibility |
| **Traficker / Paid Media** | Assigned client(s)/brand(s): paid campaigns, spend, results, paid metrics (read); Paid Media Center | Read paid performance; (future, gated) flag/annotate a campaign | Approve decisions; change budgets/spend/targeting; publish; cross-client access; financials beyond own client | Scoped to assigned workspaces; **spend visibility ≠ spend control** — actual changes happen in Meta/Google Ads Manager, human-approved, never from this system |
| **Future team member** | Scoped client(s)/brand(s) per assignment | Read; scoped operational updates (future, gated) | Cross-client access; approvals; financials; settings | Least-privilege; explicit per-client grants |
| **Future client viewer** | **Only their own client** workspace: curated reports/metrics/dates | Read curated views only | See internal strategy, raw signals, other clients, costs/margins, claims internals | Hard client isolation; curated, never raw internal data |

Principle: **least privilege + hard client isolation.** Default deny; grants are explicit and per-client.

---

## 4. Information architecture

> Each surface tagged **[MVP]** (Phase 1) / **[P2+]** (Phase 2 or later) / **[Future]**. **§7 is the authoritative Phase-1 list**; tags here must stay reconciled with it.

- **Login** **[MVP]** — auth gate (Supabase Auth); role + client scoping resolved here.
- **Lvanto Main Menu** **[MVP]** — system-level home: all clients, cross-client priorities, system health.
- **Client Workspaces** **[MVP]** — per-client home (AnimalFood first); client switcher in sidebar.
- **Brand Dashboards** **[MVP]** — per-brand view inside a client (Canfeed, IronPet…); brand switcher.
- **Task Board** **[MVP]** — operational tasks (Linear-like density), filterable by client/brand/owner/status.
- **Signal Center** **[MVP]** — the trend/intelligence signals log surfaced as a filterable view.
- **Metrics Center** **[MVP]** — **organic** performance summary per brand/account (read-only).
- **Paid Media Center** **[P2+ / Phase 4]** — read-only paid campaigns, spend, results per client/brand (Meta/Google); **no spend or edit actions** (see Traficker role §3, paid metrics §5).
- **Notification Center** **[MVP placeholder]** — inbox of alerts (see §12).
- **Claims Guard** **[P2+]** — allowed / blocked / needs-confirmation claims per brand (see §14).
- **Opportunity Center** **[P2+]** — strategic opportunities derived from signals (needs a canonical opportunities file first).
- **Decision Inbox** **[P2+]** — decisions awaiting Gonzalo (needs a canonical decisions file first; see §13).
- **Important Dates / Calendar** **[P2+]** — seasonal, client, report, and campaign-relevant dates.
- **Assets** **[P2+]** — references/links to brand kits, packshots, PSD bases (pointers, not secrets).
- **Reports** **[Future]** — executive/client reports.
- **Settings** **[MVP-lite]** — users, roles, clients, integrations (admin only).
- **Logs / System Health** **[MVP placeholder]** — audit trail + scheduler/integration health (Grafana-lite).

---

## 5. Data model

> Every entity that belongs to a client **must carry `client_id`**. MVP source of truth is **read-only Google Sheets / markdown / logs**; the "future table" column is the canonical Supabase/Postgres target for write phases.

| Entity | Purpose | Key fields | MVP source of truth | Future DB table |
|---|---|---|---|---|
| **Client** | Top-level workspace | `client_id` (PK), name, status, industry, owner | Config/markdown | `clients` |
| **Brand** | Brand within a client | `brand_id`, `client_id`, name, positioning lane, tone | Sheet/markdown | `brands` |
| **Account** | Social/web account of a brand | `account_id`, `brand_id`, `client_id`, handle, platform | Sheet/markdown | `accounts` |
| **Content piece** | A planned/produced piece | `content_id`, `client_id`, `brand_id`, fecha, formato, estado, pieza | Sheet `01 · CALENDARIO` (read) | `content_pieces` |
| **Task** | Operational to-do | `task_id`, `client_id`, `brand_id`, owner, status, due, blocked? | Sheet (read) | `tasks` |
| **Signal** | Trend/intelligence signal | `signal_id`, `client_id`, type, source, confidence, risk, decision, status | `animalfood-trend-signals-log.md` (read) | `signals` |
| **Opportunity** | Strategic opportunity from signals | `opportunity_id`, `client_id`, `brand_id`, pillar, decision, confidence | **Markdown (P2 — needs canonical opportunities file)** | `opportunities` |
| **Metric (organic)** | Confirmed **organic** performance | `metric_id`, `client_id`, `brand_id`, `account_id`, fecha, alcance, interacciones, guardados, compartidos, comentarios | Sheet `05 · MÉTRICAS` (read) | `metrics_organic` |
| **Campaign (paid)** | Paid campaign → ad-set → ad hierarchy | `campaign_id`, `client_id`, `brand_id`, `account_id`, platform (Meta/Google), objetivo, estado (+`ad_set_id`/`ad_id` children) | (future) Meta/Google **read-only** | `campaigns` |
| **Paid metric** | **Paid** performance (read-only) | `paid_metric_id`, `client_id`, `brand_id`, `campaign_id`, fecha, spend, impresiones, alcance, resultados, CPR, CPM, CTR | (future) Meta/Google **read-only** | `metrics_paid` |
| **Notification** | Alert to a user | `notification_id`, `client_id` (nullable=system), `scope` (system\|client), type, priority, owner, status, action | Derived (read) | `notifications` |
| **Decision** | Item needing Gonzalo | `decision_id`, `client_id`, linked signal/opportunity/task, options, status | **Markdown/log (P2 — needs canonical decisions file)** | `decisions` |
| **Claim** | Allowed/blocked claim | `claim_id`, `client_id`, `brand_id`, text, status (allowed/blocked/needs-confirm), source | Markdown (read) | `claims` |
| **Asset** | Pointer to a brand asset | `asset_id`, `client_id`, `brand_id`, type, link | Markdown/Sheet (read) | `assets` |
| **Date / Event** | Important date (seasonal/client/report/campaign) | `event_id`, `client_id` (nullable=system), `scope`, date, type, note | Markdown/config (read) | `events` |
| **Note / Activity** | Operational note/activity on an entity | `note_id`, `client_id`, entity_ref, author, text, ts | (future) | `notes` |
| **Report** | Client/exec report | `report_id`, `client_id`, period, status | (future) | `reports` |
| **AuditLog** | Immutable record of every future write/action | `audit_id`, `client_id` (nullable=system), actor, action, entity_ref, before/after, ts | Logs (append-only) → future table | `audit_log` |
| **User** | A person | `user_id`, name, email, default_role | Auth config | `users` |
| **Role** | Permission set | `role_id`, name, scopes, client grants | Auth config | `roles` (+ `user_client_roles`) |

`client_id` applies to all of the above **except** `User` and `Role` themselves (which are linked to clients via a join table `user_client_roles`).

**Scope flag:** entities that can be *system-level* — `Notification`, `Date/Event`, `AuditLog` — carry a `scope` (`system` | `client`). System-scope rows have a **null `client_id`** and are visible to **Admin only** (e.g. scheduler/system alerts), so client filters never hide them and they never leak into a client view.

---

## 6. Data sources & source-of-truth rules

- **Google Sheets** — initial **read-only** operational database (`01 · CALENDARIO`, `05 · MÉTRICAS`, etc.) via the Sheets API. Read-only in MVP.
- **Markdown docs** — strategic doctrine / standards (content standard, role system, column map, signals doctrine). Not operational state.
- **Logs** — audit trail (SESSION_LOG, operations log). Append-only history.
- **Future Supabase/PostgreSQL** — the **canonical database** once write actions are introduced; migrations from Sheets happen here.
- **Future Meta read-only** — organic/paid metrics via the read-only pilot ([[animalfood-meta-readonly-pilot]]).
- **Future browser/research module** — supervised, read-only signal capture.
- **Future notification module** — Telegram/email/PWA push.

> **HARD RULE: no duplicate writable source of truth.** At any given time, exactly **one** system is authoritative for writes for a given entity. In MVP that is the Sheet (and Lvanto only reads). When Supabase becomes canonical, the Sheet becomes read-only/derived or is retired for that entity — never two writers.

---

## 7. MVP scope — Phase 1 (read-only)

- **Read-only only** — zero write actions anywhere.
- **AnimalFood** as the first workspace.
- **Client → Brand → Account hierarchy implemented from Day 1**, with `client_id` everywhere.
- **Client isolation enforced server-side (app layer) in Phase 1.** Operational data is read from Sheets, which Supabase **RLS does not protect**; therefore every Sheet read is scoped per user/client on the backend **before any response leaves the server**. RLS becomes the enforcement layer only once Postgres is canonical (Phase 3+).
- **Phase-1 Postgres holds only** auth + the registry (`clients`, `brands`, `accounts`, `users`, `roles`, `user_client_roles`). All operational data (tasks/signals/metrics) is **read** from Sheets/markdown; nothing operational is written.
- Basic **login + roles** (Admin/Gonzalo, Operator/Aranza; Traficker = scoped read when paid arrives).
- **Task view** (from Sheet, read).
- **Signal log** view (from markdown/Sheet, read).
- **Metric summary** (from `05 · MÉTRICAS`, read — currently empty, shows "no data yet").
- **Decision Inbox & Opportunity Center → deferred to Phase 2** (each needs a canonical decisions/opportunities file before it can read anything; not shipped in Phase 1).
- **Notification inbox placeholder** (UI only, no live triggers).
- **System health placeholder** (scheduler status surface, static/manual at first).

---

## 8. Excluded from MVP (explicit)

- ❌ Sheet writes
- ❌ Meta API
- ❌ Browser automation
- ❌ AI recommendations
- ❌ Telegram / WhatsApp
- ❌ Client portal
- ❌ Automatic task creation
- ❌ Campaign / publishing actions
- ❌ Financial / margin data
- ❌ PDF reports

---

## 9. Future scope

- Notifications to phone; **Telegram bot** (primary future channel); **email digest** (secondary); **PWA push**.
- **Approval buttons** (Decision Inbox → action).
- **Task creation** (gated, audited).
- **AI opportunity scoring**.
- **Meta read-only metrics** integration.
- **Browser research module** (supervised, read-only).
- **Client replication engine** (clone the AnimalFood workspace pattern for a new client).
- **Executive reports**.
- **Client viewer portal** (curated, isolated).

> Per audit: **WhatsApp Business API is not recommended for MVP**; Telegram is the future primary internal phone channel, email digest secondary.

---

## 10. UI/UX direction

**Feel:** premium B2B SaaS — **Linear + Vercel + Notion + Grafana-lite**, *not* a generic Bootstrap dashboard.

- **Dark mode default**; refined, restrained, high information density without clutter.
- **Left sidebar** with **client switcher** + **brand switcher**.
- **Cards** for overview surfaces; **dense tables** for operational data.
- **Status chips**, **notification badges**, **right-side detail panels**.
- **Command palette** (⌘K) for fast navigation.
- **Mobile companion view** (read + future approvals).
- **Empty / no-data states designed explicitly** (e.g. `05 · MÉTRICAS` empty → "no data yet — run manual capture"), since launch data is sparse.
- Baseline **accessibility** (contrast, keyboard navigation, focus states) and responsive behaviour for the mobile companion.
- No amateur / Bootstrap look.

**Inspiration patterns (and what to borrow):**
- **Linear** — task/status density, keyboard-first, speed.
- **Vercel** — project cards, clean status badges, deploy-style health.
- **Notion** — multiple views over the same data (table/board/calendar).
- **Grafana / Datadog** — alerting + system-health panels.
- **AgencyAnalytics / DashThis** — the multi-client reporting *concept* — but Command Center is **operational, not reporting-only**.

---

## 11. Main dashboard widgets

- Active clients (count + status).
- Today's priorities (cross-client or per-client).
- Pending decisions (→ Decision Inbox).
- Assigned tasks (by owner).
- Blocked tasks.
- New signals.
- Upcoming dates.
- Missing metrics (e.g. `05 · MÉTRICAS` empty).
- Brand inactivity (dark accounts, e.g. Enercan).
- Claim risks (Claims Guard flags).
- Scheduler health (06:00 / 23:00 runs).
- System alerts.

---

## 12. Notification logic

| Type | Trigger | Priority | Owner | Suggested action | MVP vs future |
|---|---|---|---|---|---|
| Date opportunity | Upcoming relevant date | Medium | Gonzalo/Aranza | Plan a piece (later) | Future |
| Stalled task | Task no movement > N days | High | Aranza | Unblock / reassign | Future (UI placeholder MVP) |
| Metric missing | Expected metrics absent (e.g. `05` empty) | Medium | Aranza | Run manual capture | Future |
| New signal | Signal logged | Low–Medium | Gonzalo | Triage in Signal Center | Future |
| Claim risk | Blocked/needs-confirm claim near content | **High** | Gonzalo | Hold/confirm | Future |
| Scheduler failure | 06:00/23:00 run fails | **High** | Gonzalo | Investigate | Future |
| Brand inactivity | Account dark > N days | Medium | Gonzalo | Set objective | Future |
| Pending approval | Decision awaiting Gonzalo | High | Gonzalo | Decide | Future |
| Client/report deadline | Report/period due | Medium | Gonzalo | Prepare report | Future |
| Budget pacing (paid) | Spend pace off vs plan | High | Traficker/Gonzalo | Review in Ads Manager (human) | Future (Phase 4) |
| Spend anomaly (paid) | Spend spikes/drops vs baseline | High | Traficker/Gonzalo | Investigate in Ads Manager (human) | Future (Phase 4) |
| Results below target (paid) | KPI under threshold | Medium | Traficker/Gonzalo | Review creative/targeting (human) | Future (Phase 4) |
| Campaign ended (paid) | Campaign reached end / stopped | Low | Traficker | Note + report | Future (Phase 4) |
| Scheduler failure (system) | 06:00/23:00 run fails | **High** | Admin/Gonzalo | Investigate | Future (system-scope) |

**Channels:** MVP = **in-app inbox only** (placeholder). Future = Telegram (primary) → email digest (secondary) → PWA push. No WhatsApp in MVP.

**Scope & owner:** every notification carries a `scope` (`system` | `client`); **system-scope** alerts (scheduler/system) go to **Admin only**. **Owner is derived from the linked entity's assignee/role** (e.g. a stalled task → that task's owner), not hard-coded per type. Paid notifications are **read-only signals to a human** — they never trigger a spend or campaign change.

---

## 13. Decision Inbox

**Why essential for Gonzalo.** The system surfaces dozens of signals/opportunities/tasks; most are not decisions. The Decision Inbox isolates **only the items that genuinely need his judgment**, so he is not forced to scan everything.

**What appears there:** approve/hold publishing; resolve a hypothesis (e.g. confirm a signal's source); set an objective for a dark brand; approve a paid test (future); confirm a claim; choose between ranked opportunities.

**How it links:** every decision references its origin — a **Signal** (needs validation), an **Opportunity** (Use/Adapt/Watch), or a **Task** (blocked/awaiting approval). Deciding updates the linked entity's status, closing the loop (Signal → Decision → Task → Metric → Learning).

**Why it prevents overload:** it converts an unbounded stream into a **bounded queue of explicit choices**, each with options and context — the antidote to scattered, ad-hoc judgment.

---

## 14. Claims Guard

A per-brand registry enforcing claim safety (the discipline already practiced for AnimalFood):
- **Allowed claims** — confirmed, on-brand, safe to publish (e.g. Canfeed "Five S Plus. Salud Total."; the 5 pillar names; the official Protect Pack sentence).
- **Blocked claims** — must never be stated (e.g. humidity/oxygen barrier, multicapa, valve, hermetic seal, materials, freshness days, AAFCO, unverified stats; cat "+6% YoY"; fixed B2B prices).
- **Needs confirmation** — plausible but unverified until a source is confirmed (e.g. Enercat ingredients).

**Why it protects clients.** It prevents the agency from publishing unverified or non-existent claims (product trust + legal exposure), enforces uncertainty labeling, and scales the same protection to every future client — a differentiator, not just a safeguard.

---

## 15. Tech stack recommendation

**A) Low-code proof-of-concept — Retool / Appsmith**
- Pros: fastest to a clickable read-only prototype over Sheets; minimal effort.
- Cons: not a branded product; weak custom UX; lock-in; poor long-term scaling.
- Complexity: Low.
- Recommendation: **proof-of-concept only** — validate flows, then discard. Not the product.

**B) Recommended custom MVP — Next.js + Tailwind + shadcn/ui + Supabase (Auth/Postgres/RLS) + Google Sheets API (read-only) + Vercel**
- Pros: premium branded UI; real auth + role/RLS foundation; read-only Sheets now, canonical Postgres later; Vercel deploy; matches the Linear/Vercel/Notion feel.
- Cons: more upfront build than low-code; needs disciplined `client_id`/RLS design.
- Complexity: Medium.
- Recommendation: **chosen path for the real MVP.**

**C) Long-term scalable — Next.js + Supabase + Edge Functions + Telegram Bot + Resend/Postmark + Metabase (embedded)**
- Pros: full operational platform — actions, notifications, email, embedded analytics; scales multi-client.
- Cons: highest complexity; only justified once write/notification phases arrive.
- Complexity: High.
- Recommendation: **the destination**, reached by evolving (B), not by starting here.

---

## 16. Stitch / v0 / Figma / UI generation plan

- **Stitch** — visual exploration only; not production code.
- **v0** — generate shadcn/React **scaffolds** later (accelerates B), then hand-refine.
- **Figma** — optional high-fidelity design before/with v0.
- **Lovable** — possible but **higher risk** (full-stack auto-generation can produce duplicate sources of truth / unmanaged auth) — avoid for the canonical build.
- **None of these are the source of truth** — they feed the custom build; the codebase + canonical DB are authoritative.

---

## 17. Security & safety rules

- **Role-based access**; default deny; least privilege.
- **Client data separation** — hard isolation; no cross-client visibility by default.
- **Row-level security (RLS)** in future Supabase, scoped by `client_id` + role.
- **Phase-1 isolation (pre-RLS):** because Phase-1 operational data is read from Sheets (not Supabase), client/role scoping is enforced **server-side in the app layer** before any response; RLS becomes the enforcement layer once Postgres is canonical (Phase 3+). The Sheets **service account is server-only** and never exposed to the client.
- **No write without Gonzalo's approval** (and no writes at all in MVP).
- **No campaign / publish / spend actions** — ever, from this system, without explicit human action + approval. The **Traficker role is read-only**; paid changes happen in Ads Manager, not here.
- **No credential exposure** — secrets live in the **deploy platform's secret store** (Vercel env vars / a secrets manager), never in the repo or UI; the local `C:\ClaudeSecrets\` convention applies only to local agent tooling, not the deployed app.
- **No sensitive notifications without filtering** (no financials/margins to non-admins; no raw internal data to client viewers).
- **PII handling:** lead/customer data (e.g. the existing "Leads" sheets) is **out of MVP scope**; if ever ingested it must be access-restricted, isolated per client, and never sent in notifications.
- **Audit log for all future write actions.**
- **No cross-client leaks** — enforced at query (RLS) and UI layers.

---

## 18. Risk register

| Risk | Severity | Why it matters | Mitigation |
|---|---|---|---|
| Overbuilding | High | Burns time on features before validating the read-only core | Strict phased roadmap; Phase 1 = read-only only |
| Duplicate source of truth | High | Conflicting data, silent corruption | Hard rule §6; one writer per entity; Sheet read-only in MVP |
| AnimalFood-only architecture | High | Cannot scale to other clients; costly rewrite | `client_id` first-class from Day 1; AnimalFood = workspace, not system |
| Permission leaks | High | Cross-client data exposure; trust loss | RLS by `client_id`; least privilege; default deny |
| Notification overload | Medium | Alerts ignored; Decision Inbox loses value | Priority tiers; Decision Inbox isolation; tunable thresholds |
| Generic AI recommendations | Medium | Erodes the research-first/evidence standard | Defer AI to Phase 6; tie every recommendation to a signal/evidence |
| Premature write actions | High | Accidental Sheet/campaign changes | Read-only MVP; writes gated behind approval + audit |
| Sensitive data exposure | High | Financials/margins/credentials surfaced wrongly | Role filtering; exclude financials from MVP; secrets never in UI |
| Pretty UI but weak operations | Medium | Looks good, doesn't actually run the agency | Operational-first; reporting is a feature, not the product |
| Unclear migration from Sheets | Medium | Stuck between Sheet and Postgres | Define the cutover per entity; one canonical writer at all times |
| Paid spend visibility mistaken for spend control | High | Could imply the system can change budgets/campaigns | Read-only paid; Traficker role has no write; spend/edits only in Ads Manager, human-approved |
| Phase-1 cross-client leak via Sheets (pre-RLS) | High | RLS does not protect Sheet reads | App-layer scoping enforced server-side before response; service account server-only (C2) |
| Paid metrics retrofitted onto organic-only model | Medium | Schema rewrite when paid arrives | Separate `Campaign`/`Paid metric` entities defined now (§5) |

---

## 19. Phased roadmap

**Phase 0 — Documentation / spec.**
Goal: agree the vision + architecture. What ships: this document; decision gate defined. No build.

**Phase 1 — Read-only dashboard.**
Goal: a trustworthy single-pane read surface. What ships: login + roles; AnimalFood workspace; client/brand hierarchy with `client_id`; Task/Signal/Decision/Metric read views; notification + system-health placeholders. No writes.

**Phase 2 — Notification layer.**
Goal: the right alert reaches the right person. What ships: notification triggers (§12); Telegram bot (primary) + email digest (secondary); Decision Inbox live. Still read-only operational data.

**Phase 3 — Approvals / actions.**
Goal: act safely from the system. What ships: approval buttons; gated task creation/status updates; Supabase becomes canonical for written entities; full audit log. Sheet becomes read-only/derived for migrated entities.

**Phase 4 — Metrics automation (organic + paid, read-only).**
Goal: stop manual metric entry. What ships: Meta read-only integration ([[animalfood-meta-readonly-pilot]]) for **organic AND paid** metrics; auto-populated **Metrics Center + Paid Media Center**; campaign/spend read-only (no spend control); baselines for opportunity validation.

**Phase 5 — Multi-client scaling.**
Goal: onboard real clients fast. What ships: client replication engine; second/third workspaces (Broker Capital, VigilArg, Sileoni); per-client RLS proven at scale.

**Phase 6 — AI recommendations.**
Goal: evidence-based suggestions, not generic ones. What ships: AI opportunity scoring tied to signals/metrics; QA-gated; always labeled with confidence.

**Phase 7 — Client-facing portal / productized offer.**
Goal: turn the system into a sellable Lvanto product. What ships: curated, isolated client viewer portal; executive reports; the Command Center as a differentiator Lvanto sells.

**Gate before Phase 1 build:** scheduler stable for several days; canonical-source decision confirmed (Sheet read-only); Gonzalo's explicit go; stack (B) chosen; `client_id`-first schema agreed.

---

*Specification only — this document builds nothing. No app, no packages, no frontend code, no auth configured, no Google Sheets modified, no tasks run, no credentials read. AnimalFood is the first workspace and case study; the architecture is multi-client from Day 1.*

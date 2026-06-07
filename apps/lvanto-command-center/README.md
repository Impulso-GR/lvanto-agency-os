# Lvanto Command Center — Static Frontend MVP

A **local, static visual prototype** of the Lvanto Command Center — a private, multi-client operating system for the Lvanto agency. **AnimalFood is the first active workspace, not the whole system.**

> ⚠️ Prototype only. **Mock data, no backend, no auth, no live Google Sheets, no APIs.** Nothing here is wired to anything.

## Stack
- Vite + React 18 + TypeScript
- Tailwind CSS (dark carbon theme, Lvanto brand tokens)
- React Router (client-side routing)

## Install
```bash
cd apps/lvanto-command-center
npm install
```

## Run (dev)
```bash
npm run dev
```
Then open the printed URL (default **http://localhost:5173**).

## Build / preview
```bash
npm run build     # type-check + production build
npm run preview   # serve the production build locally
```

## Routes / screens
| Route | Screen |
|---|---|
| `/` | Lvanto Main Dashboard (multi-client overview) |
| `/clients/animalfood` | AnimalFood Workspace (9-brand portfolio) |
| `/clients/animalfood/brands/canfeed` | Canfeed Brand Dashboard (production module + Claims Guard) |
| `/clients/animalfood/tasks` | Task Board (10-state kanban + selected-task detail panel) |

Sidebar links to **Dashboard / Clients / Tasks** are routed. **Signals, Metrics, Notifications, Decisions, Claims Guard, Paid Media, Reports, Settings, System Health** are shown as **"soon"** (disabled) — future phases.

## What is static / mock
- All data lives in `src/data/mockData.ts` (clients, brands, tasks, signals, alerts, health, activity, Canfeed claims).
- All buttons (Approve, Move Status, Open Brief, etc.) are **visual only** — no actions.
- Metrics surfaces show **honest empty states** ("No real performance data yet — 05 · MÉTRICAS pending") — **no fake charts or invented numbers**.

## What is NOT connected (by design)
- ❌ Google Sheets (no read or write)
- ❌ Supabase / auth / login
- ❌ Meta API / Meta Ads / Paid Media (read-only manual placeholder only)
- ❌ Browser automation / n8n / CoWork
- ❌ Any backend, API route, or secret

## Brand direction (locked)
Dark carbon `#070707`; panels `#0d0d0d / #141414 / #1c1c1c`; primary accent **orange `#FF6B2B`** (restrained); premium accent **gold `#C4A35A`** (strategic only); warm text `#F2EFE9`; muted `#888 / #585858`; hairline borders `rgba(255,255,255,.07)`; 14px radius. Dense premium SaaS — no pet-food theme, no fake metrics, no invented brand names.

## Next steps
1. Refine hierarchy/spacing per `docs/modules/lvanto-command-center-visual-review-v1.md`.
2. Prototype Notification Center → Paid Media → Metrics screens.
3. Add mobile companion views (Gonzalo admin / Aranza operator).
4. **No real data connection** until the architecture gate in `docs/modules/lvanto-command-center-product-spec.md` (§19) is cleared.

## Source of truth (docs)
- `docs/modules/lvanto-command-center-product-spec.md`
- `docs/modules/lvanto-command-center-visual-review-v1.md`
- `docs/modules/lvanto-command-center-visual-prototype-prompts.md`
- `docs/verticals/animalfood/animalfood-brand-registry.md`
- `docs/verticals/animalfood/animalfood-monday-operating-protocol.md`

# Lvanto — Cowork Night Operator Plan

> **Planning document only — Cowork is NOT enabled by this file.** Defines how Claude Cowork *may later* be used as a supervised overnight operator for Lvanto/AnimalFood, and the hard boundaries it must respect. Nothing here installs, configures, schedules, or connects anything.
>
> Related: [[lvanto-command-center-integration-gates]] (Gate 7) · [[animalfood-meta-readonly-pilot]] · [[animalfood-monday-operating-protocol]] · [[lvanto-command-center-product-spec]].

---

## 1. Why a plan before enabling

Cowork can use **connectors** and, when none exists, **browser/computer use** — which acts on your logged-in apps without a sandbox. That power is useful for overnight prep but dangerous if unscoped. This plan fixes the boundaries **before** Gate 7 is ever opened.

## 2. What Cowork can safely do overnight (when approved)

- **Read** the repo docs (this Agency OS) and summarize state.
- **Read-only** prep: draft tomorrow's operating summary from existing docs + (later, gated) read-only Sheets.
- **Public, no-login research** (only if the Browser gate is separately approved): Meta Ads Library, public profiles, MercadoLibre, public trends — *observe and log*, never act.
- **Produce proposals** into the repo (markdown): suggested signals, opportunity candidates, task drafts — clearly labeled "propuesta / requires approval."
- **Self-report** via a written handoff doc (see §5).

## 3. What Cowork must NOT do (hard boundaries)

- ❌ Publish, schedule, comment, DM, or like on any social platform.
- ❌ Spend money, change budgets, or touch campaigns / Ads Manager.
- ❌ Write to Google Sheets (or any live operational source).
- ❌ Log into external accounts; reuse logged-in sessions for actions.
- ❌ Scrape logged-in / authenticated platforms.
- ❌ Read or move credentials / `.env` / secrets.
- ❌ Modify external data of any kind.
- ❌ Run with "act without asking" enabled.
- ❌ Install MCPs that can publish, spend, or scrape authenticated platforms.

## 4. What it should inspect (read-only)

- The local Command Center routes/screens (for a UX/state read): `/hoy`, `/clients/animalfood`, `/clients/animalfood/brands/canfeed`, `/clients/animalfood/tasks`, `/claims`, `/auditoria-meta`, `/system-health`.
- The repo docs: brand registry, signals log, claims guard sources, Monday protocol, this plan, the integration gates.
- (Later, gated) read-only Sheets `01` / `05`.

## 5. How it should report (handoff through repo docs)

- Write a dated handoff note (e.g. `docs/handoffs/cowork-YYYY-MM-DD.md`) containing: what it read, what it proposes, what is blocked, what needs Gonzalo's decision, and **explicit "no external action taken."**
- Never act on its own proposals — they wait for Gonzalo / Claude Code.
- Claude Code ↔ Cowork hand off **only through committed repo docs** (SESSION_LOG, handoff notes), never through silent external state.

## 6. Scheduled Tasks (when approved, Gate 7)

- Allowed: **read + report** routines (e.g. "draft the morning operating summary at 06:00").
- Each routine: scoped allowed-tools, read-only, output reviewed by Gonzalo before any action.
- No routine may publish, spend, or write to external systems.
- Regular human review of scheduled output to catch drift.

## 7. What requires Gonzalo approval (always)

- Enabling Cowork computer/browser use at all (Gate 7).
- Any connector that can write/act.
- Any scheduled routine.
- Any move from read-only to action.
- Any browser automation (also needs the Browser gate + its own audit).

## 8. Why Cowork must not publish / spend / scrape / log in without a separate gate

- **No sandbox on computer use** — a mistake acts on the real account.
- **Session reuse** — browser control inherits your logged-in Meta/Sheets/Gmail sessions.
- **Prompt-injection risk** — a malicious comment/page/DM could steer an unsupervised agent.
- **Irreversibility** — a publish/spend/delete can't be cleanly undone.
- Therefore: each capability is its own **explicit, audited, approved gate**, defaulting to read-only and supervised.

## 9. Status

🔒 **Cowork is not enabled.** This plan is the precondition, not the activation. Opening Gate 7 requires: scheduler stable, this plan accepted, boundaries written, "act without asking" OFF confirmed, and Gonzalo's explicit go.

*Planning only — enables nothing, schedules nothing, connects nothing, reads no credentials.*

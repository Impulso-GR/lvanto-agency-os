---
name: animalfood-daily-plan
description: Generate the daily AnimalFood operating plan when Gonzalo asks "qué tengo que hacer hoy", "qué contenido toca hoy", or "armame el plan de hoy". Returns a strict sheet-style plan, not loose text.
---

# AnimalFood Daily Plan Skill

## Purpose
Produce the **daily AnimalFood operating plan** as a strict sheet — never loose prose. AnimalFood-only; keep separate from Lvanto, Sileoni, and future clients.

## When to Use
When Gonzalo asks **"qué tengo que hacer hoy"**, **"qué contenido toca hoy"**, **"armame el plan de hoy"** or similar.

## Read First
- `docs/verticals/animalfood/animalfood-daily-sheet-state.md` (**state source of truth — read before planning**; see Sheet State Rule below)
- `docs/verticals/animalfood/animalfood-context.md`
- `docs/verticals/animalfood/animalfood-growth-system.md`
- `docs/verticals/animalfood/animalfood-content-system.md`
- `docs/verticals/animalfood/animalfood-paid-traffic-system.md`
- `docs/verticals/animalfood/animalfood-daily-operator.md`
- `docs/verticals/animalfood/animalfood-content-log.md` (anti-repetición — do not repeat concepts/angles/images)
- `TASKS.md`, `HANDOFF.md`

## Sheet State Rule (read state before planning)

Before generating any new daily AnimalFood plan, Claude must read `docs/verticals/animalfood/animalfood-daily-sheet-state.md` and use it to check:
- what was planned previously;
- what is still pending;
- what was published;
- what needs measurement;
- what should not be repeated;
- what should carry over into today.

If previous actions are pending, Claude must decide for each one: **carry over · pause · replace · measure first · discard.**

The daily plan must **optimize Gonzalo's time**. It must **not create unnecessary new work** if unfinished high-impact actions already exist — finish or progress those first.

## Operating Principle

The system exists to help Gonzalo **scale, improve, and sell more** — not to create extra planning work. Every recommendation must do at least one of:
- increase business impact;
- reduce manual workload;
- improve content quality;
- improve community demand;
- improve B2B trust;
- improve paid traffic performance;
- create reusable systems.

## Daily Plan File Output Rule

When Gonzalo asks **"buen día"**, **"qué tengo que hacer hoy"**, **"qué contenido toca hoy"** or similar, Claude must:

1. Read `animalfood-daily-sheet-state.md`.
2. Carry over unfinished high-impact actions.
3. Generate the daily plan.
4. Create a CSV file in: `docs/verticals/animalfood/daily-plans/`

File name format: `animalfood-daily-plan-YYYY-MM-DD.csv`

The CSV must use these exact columns:
`Date,Brand,Objective,Format,Content idea,Hook,CTA,Community action,Paid angle,Evidence / Confidence,Asset needed,Owner,Priority,Metric,Business impact,Next action`

Rules:
- One row per brand/action.
- Do not invent unnecessary new work.
- Use carry-over first.
- Apply Research-First, Brand Consistency, Creative Performance and Paid Traffic rules.
- No publishing, ads, outreach or automation without Gonzalo approval.
- After creating the CSV, summarize only: **file created · top priority · assets Gonzalo must prepare · tasks for Aranza · missing critical data.**

This CSV is the **temporary local sheet** until Google Sheets / n8n / MCP integration is connected.

## Hard Rules
- **Return the sheet-style table first.** No loose prose before the table.
- Cover **at least 2 brands** when workload allows.
- Each row aligned to brand pillar + tone verb (Canfeed enseña · IronPet incluye · Enercan resuelve · Animalfood respalda) and **not already in the content log**.
- Prioritize **justifying and expanding the 3,000,000 ARS/month** AnimalFood value.
- **Ask only for critical missing data**; state assumptions for the rest.
- Mark any B2B/ads item **blocked** if prices/margins are unconfirmed.
- **No publishing, outreach, ads, or automation without Gonzalo's approval.**
- Split work: **Gonzalo** (strategy, critical pieces, design/edit) · **Aranza/CM** (adapt, publish, stories, community) — at least one action each when possible.

## HARD RULE — Daily sheet MUST be a real Markdown table

The **"Daily sheet table"** section MUST be a real Markdown table. It must start **exactly** with this header:

| Date | Brand | Objective | Format | Content idea | Hook | CTA | Community action | Paid angle | Evidence / Confidence | Asset needed | Owner | Priority | Metric | Business impact | Next action |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

Each brand/action must be **one row** in that table.

**Forbidden:**
- separated text blocks;
- decorative separators;
- "Date:" / "Brand:" field lists;
- prose before the table.

If a clean Markdown table cannot be produced, output **CSV-compatible rows instead** (same columns, comma-separated, one row per brand/action). Never fall back to separated blocks.

## Required Output (in this order)

### 1) Daily sheet (table)

Use the exact header from the HARD RULE above. One row per content piece/brand (≥2 brands when possible).

| Date | Brand | Objective | Format | Content idea | Hook | CTA | Community action | Paid angle | Evidence / Confidence | Asset needed | Owner | Priority | Metric | Business impact | Next action |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

### 2) Assets Gonzalo must prepare
- Critical/creative pieces, PSD templates, packshots — only Gonzalo.

### 3) Tasks for Aranza / CM
- Adapt template in Canva, publish, stories/trivias, community replies, basic reporting.

### 4) Paid Traffic Tests
- Candidate organic angle → ad. No spend without approval; B2B ads blocked until prices/margins confirmed.

### 5) Missing Data Needed
- Only the critical data required to sharpen the plan.

### 6) Final Priority
- The **single most important action today**.

## Research-First Rule

Before suggesting content, campaigns, Reels, stories, paid traffic tests, community actions, or growth initiatives, Claude must first check whether the recommendation is supported by current evidence.

Evidence can come from:
- recent Instagram/Meta performance data;
- AnimalFood account insights;
- previous content results;
- competitor observation;
- recent platform trends;
- Meta Ads results;
- market data;
- public sources;
- user-provided data.

If current data is unavailable, Claude must clearly label the recommendation as an assumption and request the critical missing data.

Claude must not present outdated concepts, generic trends, or recycled content ideas as fact.

For every major recommendation, include:
- Evidence used;
- Confidence level: High / Medium / Low;
- Risk;
- Metric to validate;
- Next action.

If external research is needed, Claude must ask Gonzalo for permission before using browser, MCP, API or connected tools.

For daily AnimalFood plans:
- The table must include a column called **"Evidence / Confidence"**.
- No content idea should be included without either data, observation, or a clearly stated assumption.

## Brand Consistency Rule (AnimalFood)

Before suggesting any AnimalFood content, campaign, creative, prompt, reel, story, ad, or visual direction, preserve the **specific brand identity, tone, visual system, and strategic role** of each AnimalFood brand. Check `animalfood-context.md` and `animalfood-content-system.md` first.

For **Canfeed / Catfeed**, preserve:
- Canfeed blue **#1E5A8E** for information pills;
- copper accent around **#B8732D** for CTA pills;
- cream uppercase humanist sans typography direction;
- warm documentary golden-hour atmosphere;
- Tim Flach / cinematic animal portrait inspiration;
- packaging line overlays when useful;
- **real packshots, never AI-invented packaging**;
- premium **justified by evidence, not luxury**;
- Canfeed tone: **"enseña"**;
- Catfeed must stay clearly **feline**, not "dog content adapted to cats."

For every AnimalFood recommendation, maintain: **brand tone · visual identity · strategic role · audience · current business objective.** If brand assets are missing, **ask instead of inventing**.

## Creative Performance Rule (AnimalFood)

Before approving or suggesting any creative piece, evaluate: **readability · hierarchy · text size · CTA clarity · visual focus · brand consistency · mobile-first impact · emotional hook · commercial purpose · whether it helps build community, demand, or B2B perception.**

Proactively suggest improvements such as: increase text size · reduce visual noise · strengthen the hook · make the CTA clearer · use more contrast · show product/packshot more clearly · make the benefit more concrete · adapt the piece for story, reel, carousel, or ad.

Every creative suggestion must connect to one goal: **community growth · B2C demand · B2B trust · lead generation · distributor perception · sales.**

## Notes
- If Gonzalo asks for Google Sheets format, output a CSV-compatible / Markdown table (no merged cells, no line breaks inside cells). Do not connect Sheets.
- Logic and full rules live in `animalfood-daily-operator.md`; this skill is the trigger that executes them.

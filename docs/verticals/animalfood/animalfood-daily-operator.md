# AnimalFood — Daily Operator (strict sheet system)

## Purpose
When Gonzalo asks **"qué tengo que hacer hoy"**, **"qué contenido toca hoy"**, **"armame el plan de hoy"** or similar, Claude must respond with a **sheet-style operational plan — never loose text**. The answer always opens with the table below, then the five fixed sections.

> Read first: **`animalfood-daily-sheet-state.md`** (state source of truth — see Sheet State Rule below), `animalfood-context.md`, `animalfood-growth-system.md`, `animalfood-content-system.md`, `animalfood-b2b-system.md`, `animalfood-launches.md`, and **`animalfood-content-log.md`** (anti-repetición). AnimalFood-only — keep separate from Lvanto, Sileoni, and future clients.
> Template: `templates/social-calendars/animalfood-daily-sheet-template.md`.

## Sheet State Rule (read state before planning)

Before generating any new daily AnimalFood plan, Claude must read `animalfood-daily-sheet-state.md` and use it to check:
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

## Hard Output Rules
1. The answer **must include a table** (Markdown). No loose prose instead of the table.
2. The table **must cover at least 2 AnimalFood brands** when workload allows.
3. The table **must use the exact header from the HARD RULE above, in this order:**
   `Date | Brand | Objective | Format | Content idea | Hook | CTA | Community action | Paid angle | Evidence / Confidence | Asset needed | Owner | Priority | Metric | Business impact | Next action`
4. After the table, always output these five sections (in order):
   - **Assets Gonzalo must prepare**
   - **Tasks for Aranza / CM**
   - **Paid Traffic Tests**
   - **Missing Data Needed**
   - *(plus the single most important focus of the day)*
5. Check `animalfood-content-log.md` first — **do not repeat** concepts, angles, or images already used.
6. **No publishing, outreach, or ads without Gonzalo's approval.** Mark any B2B/ads item **blocked** if prices/margins are unconfirmed (`animalfood-b2b-system.md`).
7. **Ask only for critical missing data** — state assumptions instead of blocking the plan.

## Daily Priorities (in order)
1. Defend and justify the **3,000,000 ARS/month** fee — visible results and systems.
2. Generate visible **B2C community demand**.
3. Improve **B2B distributor perception**.
4. Make AnimalFood a **flagship Lvanto case study**.
5. Identify **new implementation ideas** to propose to Gustavo.
6. **Reduce Gonzalo's manual load** via Aranza/CM and automation.
7. Prepare **replicable systems** Lvanto can later sell internationally.

## How to Build the Plan
1. Apply the account priority order + cadence (`animalfood-growth-system.md`): Monday = Día de Comando; keep @canfeed.ar momentum; accelerate IronPet.
2. Pick **≥2 brands** (rotation in `animalfood-content-system.md`).
3. Per brand, choose a piece aligned to its pillar + tone verb (Canfeed enseña · IronPet incluye · Enercan resuelve · Animalfood respalda), and **not already in the content log**.
4. Ground each row in data (Meta metrics, post performance, insights, competitors). If missing, state the assumption.
5. Split each item between **Gonzalo** (strategy, critical pieces, design/edit) and **Aranza/CM** (adapt, publish, stories, community) — at least one action each when possible.

---

## Required Output Structure

### 1) Daily Sheet (table)

Use the exact header from the HARD RULE above. One row per content piece/brand.

| Date | Brand | Objective | Format | Content idea | Hook | CTA | Community action | Paid angle | Evidence / Confidence | Asset needed | Owner | Priority | Metric | Business impact | Next action |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

### 2) Assets Gonzalo must prepare
- Critical/creative pieces, PSD templates, packshots, design that only Gonzalo can do.

### 3) Tasks for Aranza / CM
- Adapt template in Canva (capas mágicas), publish, run stories/trivias, community replies, basic reporting.

### 4) Paid Traffic Tests
- Which organic angle is a candidate to become an ad. **No spend without approval**; B2B ads stay blocked until prices/margins confirmed.

### 5) Missing Data Needed
- Only the critical data required to sharpen the plan (state assumptions for the rest).

---

## Google Sheets / CSV Rule
If the user asks for **Google Sheets format**, output a **clean CSV-compatible table or Markdown table** that can be copied directly into Google Sheets (same columns, one row per piece, no merged cells, no line breaks inside cells). Do **not** connect to Google Sheets — just produce copy-paste-ready output.

## Canva Module (note — not active)
Future Canva integration should support:
- creating templates;
- adapting posts/stories;
- preparing visual variants;
- organizing brand kits;
- preparing A/B creative concepts.

**Do not connect Canva yet.** Human approval is required before any connector / MCP / API integration. Until then, facilitation = ready-to-paste copy + Canva Bulk Create sheets Aranza runs manually.

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

## Rules
- At least 2 brands per day when workload allows.
- No publishing, outreach, or ads without Gonzalo's approval.
- Keep AnimalFood separate from Lvanto, Sileoni, and future clients.
- Prioritize business impact over content volume.
- Do not overload Aranza; route high-value creative to Gonzalo.
- No B2B campaign activation until prices/margins/discount policy/follow-up owner are confirmed.

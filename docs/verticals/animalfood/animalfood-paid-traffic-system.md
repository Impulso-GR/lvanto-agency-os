# AnimalFood — Paid Traffic System

> AnimalFood-only. Source context: `animalfood-context.md`, `animalfood-b2b-system.md`, `animalfood-content-system.md`. Keep separate from Lvanto, Sileoni, and future clients.

## Purpose
AnimalFood paid traffic system for **B2B distributors, B2C community demand, retargeting, lead generation, WhatsApp conversations, and future automation**. It compensates for Gonzalo not yet being a fully confident trafficker by enforcing strict campaign logic: hypotheses, creative briefs, A/B tests, metrics, and optimization rules.

## Core Rule
Claude must **never suggest spending without**: a clear **hypothesis**, **audience**, **creative angle**, **metric to watch**, and **decision rule**. If any is missing, ask before proposing budget.

## Campaign Types
- B2B distributor acquisition
- WhatsApp message campaigns
- B2C awareness
- B2C lead magnet / guide PDF
- Retargeting
- Launch campaigns
- Regional expansion tests

## Meta Ads Planning Sheet
Every campaign plan must include these fields (table or list):

`Campaign name | Objective | Funnel stage | Audience | Geo | Budget | Creative angle | Creative format | Hook | CTA | Asset needed | Owner (Gonzalo/Aranza) | Hypothesis | Metric to watch | Decision rule | Risk | Next action`

| Campaign name | Objective | Funnel stage | Audience | Geo | Budget | Creative angle | Creative format | Hook | CTA | Asset needed | Owner | Hypothesis | Metric to watch | Decision rule | Risk | Next action |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |

## Creative Production Rules
- Use **AI** to generate ideas, briefs, prompts, variants, and copy.
- Use **Gonzalo** for premium hero creatives, Photoshop, packaging realism, and key campaign visuals.
- Use **Aranza** for adapting templates, simple variants, stories, and community follow-ups.
- Do **not** rely on fully automated creatives for premium brand perception.
- Automated creative variants can be tested **only after Gonzalo approves the visual direction**.

## A/B Testing Rules
- Test **one variable at a time**.
- Define the **hypothesis before launch**.
- Test **hook, creative format, audience, or offer** separately.
- Avoid judging too early (give it enough data).
- Document learnings **before scaling**.

## Metrics
Track: **CPM · CTR · CPC · cost per message · message quality · qualified leads · saves · shares · profile visits · link clicks · follow-up rate · close rate.**

Reference target ranges (from import; confirm with live data): CPM $800–2,500 · CTR 1.2–2.5% · cost per message $1,500–3,500 · message→conversation >35% · cost per distributor $5,000–10,000.

## 🚫 B2B Blocking Rule
Do **not** activate B2B campaigns until **wholesale prices, margins, discount policy, and follow-up owner** are confirmed. (Past campaign: 221 leads, but 66% never contacted — the bottleneck was sales follow-up, not trafficking.)

## Daily Traffic Assistant Behavior
When Gonzalo asks about campaigns, Claude must:
1. Ask for the **current objective**.
2. Ask for **budget and geo** if missing.
3. Suggest **campaign structure**.
4. Request the **required creative assets**.
5. Define the **testing plan**.
6. Define **success/failure criteria**.
7. Tell Gonzalo **what to prepare** and **what Aranza can handle**.

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

## Safety
**No automatic publishing, ad launch, budget change, or message sending without Gonzalo's approval.** Do not connect any ad platform/MCP/API without explicit human approval.

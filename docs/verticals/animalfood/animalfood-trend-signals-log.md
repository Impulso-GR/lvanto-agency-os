# AnimalFood — Trend Signals Log

> **Status:** Documentation only — no tools installed yet. This file is the **normalized memory layer** that makes [[animalfood-trend-intelligence]] (`animalfood-trend-intelligence.md`) operational by hand, before any MCP/automation. It stores signals so AnimalFood agents stop planning from old assumptions.

---

## 1. Purpose

Store **current and historical signals** — market, search, competitor, platform, internal performance, seller/client feedback, seasonal and contextual — in one normalized table so every AnimalFood agent and skill can check real evidence **before** proposing content, ads, calendars, or brand actions. It converts the Trend Intelligence doctrine from inert documentation into a usable, queryable memory.

## 2. Relationship to Trend Intelligence doctrine

- `animalfood-trend-intelligence.md` = **the rules** (purpose, signal classes, approved sources, gates, scoring).
- This file (`animalfood-trend-signals-log.md`) = **the memory** (the actual signals, scored and dated).
- This is **roadmap step 2** from the doctrine (§20): *"Signals log — create the normalized signals file as the shared read surface."*
- The doctrine's **Calendar Creation Gate** (§17) and **Paid Ads Gate** (§18) are satisfied by reading this log. If this log has no current signal for a topic, the plan must be labeled **hypothesis-based**.

## 3. What counts as a signal

A signal is a **concrete, sourced observation** that could change a content, creative, paid, or strategic decision. It must have: a **date**, a **source**, and an honest **confidence**. A vague impression, an undated memory, or an assumption is **not** a signal until it is sourced — log it as **Low / Needs validation**, never as fact.

## 4. Signal types

- **Market** — category demand, pricing, distribution, pet-industry shifts.
- **Search / Google Trends** — search interest, rising queries, topic momentum.
- **Competitor** — what rival brands post or advertise (observe angles, never copy).
- **Platform format** — formats, sounds, hashtags gaining traction (IG/TikTok).
- **Internal performance** — how our own posts/ads actually performed.
- **Seller feedback** — what distributors/sellers report from the field.
- **Client feedback** — what end clients/community report.
- **Seasonal** — calendar, weather, holidays (Argentina-specific).
- **Economic / context** — macro/economic conditions affecting buying.
- **Creative pattern** — recurring creative/angle/visual patterns worth testing.

## 5. Source rules

Use **only** the approved sources from the doctrine (§5): Google Trends; RSS/news/public web; Meta Ads Library web interface; TikTok Creative Center public pages; public/no-login supervised browser review; Gonzalo-provided screenshots/links/metrics; own IG/FB metrics (manual now, API later); live Google Sheet performance (`05 · MÉTRICAS`); seller/client feedback.

**Forbidden** (doctrine §6): unauthorized scraping; automated scraping of logged-in IG/FB/TikTok; automated likes/follows/comments/DMs/engagement; copying competitor content; any publishing/ads/outreach/budget change without Gonzalo's approval. Every signal must record its real source — no source, no confidence above **Low**.

## 6. Evidence / Confidence scoring

| Confidence | Meaning |
|---|---|
| **High** | Corroborated by ≥2 approved sources, or backed by our own performance data. |
| **Medium** | One solid approved source, recent and on-topic. |
| **Low / Hypothesis** | Single weak sighting, stale, or assumption-based. **Must be labeled hypothesis-based.** |

Always record the **date** of the signal alongside confidence (freshness matters). Never present Low/Hypothesis as validated.

## 7. Risk scoring

| Risk | Meaning |
|---|---|
| **Low** | Safe to act on; on-brand; no platform/reputational exposure. |
| **Medium** | Some brand-fit or timing risk; validate before scaling. |
| **High** | Platform/reputational/brand risk, off-brand, or legally/ToS sensitive — do not act without explicit Gonzalo review. |

## 8. Brand-fit rules

Before a signal becomes a recommendation it must pass the doctrine's brand-fit filter (§13): brand identity · visual style · tone · audience · business objective · B2C demand · B2B trust · community value · sales usefulness. Record brand fit as **Yes / Partial / No**. A popular but off-brand trend is **Rejected or re-shaped**, never forced. Preserve each brand's role: Canfeed *enseña* · IronPet *incluye* · Enercan *resuelve* · Animalfood *respalda* · Catfeed clearly feline.

## 9. Decision values

- **Use** — act on it now (passes confidence + brand fit + acceptable risk).
- **Adapt** — valuable but must be re-shaped to fit the brand/format.
- **Watch** — promising but not yet strong enough; monitor.
- **Reject** — off-brand, stale, or too risky.
- **Needs data** — cannot decide yet; requires a source, date, or metric first.

## 10. How agents must use this log

- **Read this log before** building any calendar, reel, carousel, story, ad, campaign, or brand action (doctrine gates §17/§18).
- If a relevant **current** signal exists → use it and cite it.
- If no current signal exists → the recommendation must be **explicitly labeled hypothesis-based**, and a **Needs data** row should be added here.
- Never treat a logged signal as truth; weigh it by its confidence and freshness.
- Internal performance (our own data) **outranks** external trends when they conflict.
- When acting on a signal, set its **Status** and record the **Metric to validate** so the loop closes.

## 11. Trend signal table

| Date | Signal type | Source | Platform | Brand | Signal observed | Why it matters | Suggested adaptation | Brand fit | Evidence / Confidence | Risk | Metric to validate | Decision | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-06-05 | Market / Internal | UNCERTAIN — undated, source unconfirmed | — | Catfeed | Cat segment "+6% YoY" | If real, supports prioritizing the cat segment / Catfeed growth | Lead with Catfeed cat-specific content (e.g. "tu gato no es un perro chico") | Yes (feline, on-brand) | Low/Medium — **needs source + date** | Low | Saves/comments on cat-segment pieces vs baseline | Needs data | Gonzalo | Needs validation |
| 2026-06-04 | Internal performance | Own IG observation (per content notes) | Instagram | Canfeed | Overview-format pillar post performed weakly (~50 views) | Overview format underperforms → single-pillar posts likely better | Split pillar content into single-pillar carousels (Pilar 1, 2…) | Yes | Medium — *if source/date confirmed* | Low | Shares/saves on Pilar 1 single vs the overview | Adapt | Gonzalo → Aranza | Watch |
| 2026-06-05 | Seasonal | Hypothesis — no Trends/RSS pull yet | — | Canfeed / Catfeed / IronPet / Enercan | June/winter (AR) may favor energy / immunity / coat / health angles | Seasonal angle could lift relevance if confirmed | Prepare winter angle concepts but hold until confirmed | Partial — depends on brand role | Low — **hypothesis** until Google Trends/RSS confirms | Low | Search interest (Trends AR) + engagement on a test piece | Watch | Gonzalo | Needs validation |
| 2026-06-05 | Internal performance / operational gap | Live Sheet `01 · CALENDARIO` (audit) | — | Enercan / IronPet | No active current content rows for these accounts | Two brands are dark → growth gap + uneven coverage | Define an objective/reference for one of them before planning | N/A (operational) | Medium (direct observation) | Medium | First content row created + first post published | Needs data | Gonzalo | Needs validation |
| 2026-06-05 | Client / Seller feedback | Ailen / AnimalFood WhatsApp (seller comms) | WhatsApp | AnimalFood (B2B) | Seller promo communication from the field | Real commercial input → basis for B2B seller templates | Build B2B seller promo templates from the actual messaging | Yes (B2B trust) | Medium — *confirm exact content with Gonzalo* | Low | Seller adoption / B2B reply quality | Use | Gonzalo | Watch |

## 12. Seed signals from current known information

The five rows in §11 are the **seed signals** captured at log creation (2026-06-05):
1. **Catfeed "+6% YoY"** — undated/unsourced → **Low/Medium, Needs data** until confirmed.
2. **Canfeed overview ~50 views → single-pillar posts** — **Medium** (if source confirmed) → **Adapt**.
3. **June/winter AR energy/immunity/coat/health angles** — **Low/hypothesis** until Google Trends/RSS → **Watch**.
4. **Enercan/IronPet dark accounts** — internal/operational gap → **Needs data**.
5. **Seller promo comms (Ailen / AnimalFood WhatsApp)** — client/seller feedback → **Use** for B2B seller templates (confirm exact content).

These are honest starting points, not validated facts. Confidence and freshness must be upgraded as real sources are added.

## 13. Safety rules

- **Do not treat signals as truth** — weigh by confidence + freshness.
- **Do not copy competitors** — observe angles, adapt, never reproduce.
- **No unauthorized scraping; no automated engagement** of any kind.
- **If a signal is weak → label Low confidence.** If current data is missing → **Status = Needs validation**.
- **No calendar** may be built from this log unless signals are current enough, **or** the calendar is explicitly labeled **hypothesis-based**.
- **No publishing, ads, outreach, or budget change without Gonzalo's explicit approval.**
- This log is **documentation only for now** — no tools installed.

## 14. Future automation notes

- Per doctrine roadmap (§20), the safe build order after this log is: **RSS feed source** (lowest risk) → **Google Trends** (Argentina/Spanish, mind fragility) → **manual competitor + platform review** (Meta Ads Library / TikTok Creative Center logged by hand) → **public-only browser MCP** → **own-account performance API** (Instagram Graph API, last).
- When automation arrives, it must **append to this same table** using the columns in §11 and the dedup discipline of the [[animalfood-column-map]] — no new structure may receive automated writes without being documented first.
- **Gate dependency:** automation here should wait until the scheduler is stable (the 0600 morning task is not yet validated in production — see HANDOFF). Do not stack new tooling on an unstable base.

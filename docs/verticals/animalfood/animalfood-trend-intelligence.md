# AnimalFood — Market & Trend Intelligence Layer (Doctrine)

> **Status:** Doctrine only. No MCPs installed, no tools built, no scraping. This file defines *how* the layer must behave before any implementation. Agents are NOT modified by this file.

---

## Core Rule

**No AnimalFood content calendar, reel, carousel, story, ad, campaign or brand action may be proposed from old assumptions alone.** The system must first check current signals when possible, or **clearly label the recommendation as hypothesis-based** so Gonzalo knows it has not been validated against live evidence.

---

## 1. Purpose

The Market & Trend Intelligence Layer is a shared **signal-check service** for the AnimalFood vertical. Its job is to answer one question, on demand, before any creative or strategic move:

> *"Before we propose this, what do current market, trend, competitor, platform, internal-performance, seller-feedback and contextual signals say?"*

It is a **pre-flight checkpoint**, not a content generator and not a publisher. It pulls, normalizes, scores and stores signals so that every downstream AnimalFood decision is made **with evidence**, not from a blank page or stale memory.

## 2. Role inside Agency OS

- It is a **reference service**, not an actor. It does not act on its own, does not publish, does not engage.
- It is consulted by `agency-command-center` as a **pre-flight gate** and read by the AnimalFood systems before they produce output.
- It is **read-only and additive**: it proposes signals and adaptations; the existing agents — and ultimately Gonzalo — decide.
- It follows the same discipline as the daily-operations scripts: never advance a state or assert a fact without explicit signal/confirmed data.

## 3. Systems and Agents It Must Feed

| Consumer | What it takes from this layer |
|---|---|
| `agency-command-center` | Runs the signal check as a pre-flight gate, then routes with context |
| `animalfood-growth-strategist` | Market + seasonal + competitor signals for weekly growth actions |
| `animalfood-daily-plan` | Top current signals before building the day's plan |
| `animalfood-content-system` | Topic + format momentum for the content bank |
| `animalfood-paid-traffic-system` | Competitor ad findings (Meta Ad Library) before ad planning |
| `animalfood-creative-ads-lab` | Competitor + platform creative signals for concepts |
| `animalfood-operations-log` | Records which signals were acted on and the outcome |

## 4. Signal Classes

1. **Market signals** — category demand, pricing moves, distribution, pet-industry shifts.
2. **Trend / search signals** — search interest, rising queries, topic momentum (e.g. Google Trends).
3. **Competitor signals** — what rival brands are posting and advertising.
4. **Platform format signals** — formats, sounds, hashtags gaining traction on IG/TikTok.
5. **Internal performance signals** — how *our own* posts/ads actually performed.
6. **Seller / client feedback signals** — what distributors, sellers and clients report from the field.
7. **Seasonal / economic / contextual signals** — calendar, weather, holidays, macro/economic context (Argentina-specific).

## 5. Approved Data Sources

- **Google Trends** — trend/search signal.
- **RSS / news / public web monitoring** — market + contextual signal.
- **Meta Ads Library web interface** — competitor signal (public transparency tool).
- **TikTok Creative Center public pages** — platform format signal (hashtags, sounds, top ads).
- **Public / no-login browser-assisted review** — supervised reading of public pages only.
- **Gonzalo-provided screenshots, links, metrics and references** — direct, trusted input.
- **Own Instagram / Facebook metrics** — if provided manually now, or via official API later.
- **Live Google Sheet performance data** (`05 · MÉTRICAS` and the operational calendar) — internal performance.
- **Seller / client feedback** — field intelligence.

## 6. Forbidden / Risky Data Sources

- **Unauthorized scraping** of any kind.
- **Automated scraping of logged-in Instagram / Facebook / TikTok** accounts or feeds.
- **Automated likes, follows, comments, DMs or any engagement.**
- **Copying competitor content** (inspiration and adaptation only — never reproduction).
- **Publishing, ads, outreach or budget changes without Gonzalo's explicit approval.**

These are non-negotiable. Any source or method not clearly inside Section 5 is treated as forbidden until reviewed.

## 7. Google Trends Role

Google Trends is a **trend/search signal — not absolute truth.** Use it to:
- validate whether a topic has rising, flat or falling search interest;
- check **seasonality** (when demand for a topic peaks during the year);
- compare relative interest between topics.

Always read it as **relative interest, Argentina geo + Spanish where possible**, and corroborate before treating it as confident. It is fragile and approximate; never present a Trends reading as a guaranteed outcome.

## 8. RSS / Web Monitoring Role

RSS / news / public web monitoring is the **lowest-risk market + contextual source.** Use it to track pet-industry news, nutrition and veterinary topics, brand blogs and category shifts. It is publish-to-consume and fully legitimate. Findings feed market and seasonal/contextual signal classes.

## 9. Meta Ads Library Role

The **Meta Ads Library web interface** is the primary **competitor ad signal** source — a public transparency tool, viewed manually or via supervised public browsing. It shows competitors' *currently active* IG/FB ads. Note: the Meta Ad Library **API** is out of scope (in 2026 it covers only political/social-issue ads, EU-only — not commercial competitor research). Use the library to understand competitor *angles and offers*, never to copy creative.

## 10. TikTok Creative Center Role

The **TikTok Creative Center public pages** provide **platform format signals**: trending hashtags, sounds ("approved for business use"), and top ads, filterable by region and industry. Accessible without login (guest view is limited). Used to spot format/sound momentum worth adapting — never to copy a specific creator's content.

## 11. Browser MCP / Playwright Role

A browser MCP (e.g. Playwright) **may be reviewed later**, but strictly bounded:
- **Allowed only** for **public / no-login pages** (Google Trends UI, TikTok Creative Center, Meta Ads Library web, news) or **supervised research**.
- **Must NOT automate logged-in Instagram / Facebook / TikTok accounts** unless explicitly reviewed and approved.
- Never used for engagement of any kind.
- Treated as the *last* and most carefully scoped source, not a default.

## 12. Internal Performance Data Role

Internal performance is the **highest-value, lowest-risk signal** because it is *our own* data:
- **Live Google Sheet** performance (`05 · MÉTRICAS` + operational calendar) — use now.
- **Own IG/FB metrics** — manual export now; official Instagram Graph API (own business accounts) reviewed later.

What worked and what failed for AnimalFood's own accounts always outranks external trends when the two conflict.

## 13. Brand-Fit Filter

Every trend must pass a brand-fit check before it is recommended. A trend is only adopted if it fits:
- **brand identity**
- **visual style**
- **tone**
- **audience**
- **business objective**
- **B2C demand**
- **B2B trust**
- **community value**
- **sales usefulness**

A trend that is popular but off-brand is **rejected or re-shaped**, never forced.

## 14. Trend Evaluation Rubric

For each candidate trend, evaluate:
1. **Relevance** — does it match AnimalFood's category, accounts and audience?
2. **Momentum** — is it rising, peaking or fading? (timing matters)
3. **Brand fit** — does it pass Section 13?
4. **Effort vs. payoff** — production cost against likely value.
5. **Risk** — platform, reputational or brand risk of participating.
6. **Business usefulness** — does it serve B2C demand, B2B trust, community or sales?
7. **Window** — how long is it actionable before it's stale?

Only trends that clear relevance + brand fit + a positive effort/payoff are promoted to a recommendation.

## 15. Evidence / Confidence Scoring

Each signal carries a confidence level:

| Confidence | Meaning |
|---|---|
| **High** | Corroborated by ≥2 approved sources, or backed by our own performance data. |
| **Medium** | One solid approved source, recent and on-topic. |
| **Low / Hypothesis** | Single weak sighting, stale, or assumption-based. **Must be labeled hypothesis-based.** |

No recommendation may present **Low/Hypothesis** confidence as if it were validated. Freshness (date of the signal) is always recorded alongside confidence.

## 16. Output Schema for Trend Signals

Every captured signal is logged with these fields:

`Date · Source · Platform · Brand · Signal observed · Why it matters · Suggested adaptation · Brand fit · Evidence / Confidence · Risk · Metric to validate · Decision`

This is the single normalized shape that all seven consumer systems read.

## 17. Calendar Creation Gate

Before creating a **weekly or monthly content calendar**, the system must have **at least one** of:
- current **trend signals**;
- recent **performance data**;
- **Gonzalo-provided references**;
- **seller / client feedback**;
- **otherwise, the calendar must be explicitly labeled hypothesis-based.**

A calendar built on none of the above, without that label, is not allowed.

## 18. Paid Ads Gate

Before proposing any **paid ad or campaign**, the system must have:
- a **competitor or platform signal** (e.g. Meta Ads Library / Creative Center observation), **and/or**
- **internal performance data** on a comparable past ad, **and/or**
- **Gonzalo-provided references or direction**;
- plus a defined **metric to validate** and a stated **risk level**.

No ad spend, audience, budget or launch is ever *executed* by this layer — it only informs the proposal. **Execution requires Gonzalo's explicit approval** (see Section 21).

## 19. Roles: Gonzalo / Aranza / System

- **Gonzalo** — final decision-maker and creative director. Provides references, screenshots, metrics and approvals. Nothing external (ads, publishing, outreach, budget) happens without his explicit approval.
- **Aranza** — community manager; source of platform/community feedback and execution of approved content. Field-level seller/community input flows through her where relevant.
- **System (this layer)** — gathers, normalizes, scores and stores signals; proposes adaptations and flags risk. It never publishes, engages, or spends. It informs; humans decide.

## 20. Implementation Roadmap

Sequenced lowest-risk → highest-risk. **Nothing is built yet.** Stabilization of the live AnimalFood workflow remains the prior priority.

1. **Doctrine (this file)** — define rules first. ✅
2. **Signals log** — create the normalized signals file (Section 16 schema) as the shared read surface.
3. **RSS feed source** — lowest risk, lowest setup; validate end-to-end as a pilot.
4. **Google Trends** — add as trend/search signal (review fragility + Argentina/Spanish fit first).
5. **Manual competitor + platform review** — TikTok Creative Center + Meta Ads Library findings logged by hand.
6. **Public-only browser MCP** — reviewed and scoped to no-login pages only.
7. **Own-account performance API** — Instagram Graph API (own accounts) last, most setup.
8. **Wire consumers** — connect the seven systems/agents to read the signals log; add the pre-flight gate to command-center.

## 21. Safety Rules

- **No ads, publishing, outreach, budget changes or external actions without Gonzalo's explicit approval.**
- **No unauthorized scraping; no automated scraping of logged-in social accounts.**
- **No automated likes, follows, comments, DMs or engagement.**
- **No copying competitor content** — adapt and out-think, never reproduce.
- **Never** modify or commit secrets, credentials, tokens, or billing data. Credentials live outside the repo in `C:\ClaudeSecrets\`.
- **Never** use `--dangerously-skip-permissions`; MCPs are registered in local scope with scoped `--allowedTools`.
- This layer is **read-only and additive** — it proposes, humans dispose.
- Any source or method not explicitly approved in Section 5 is forbidden until reviewed.

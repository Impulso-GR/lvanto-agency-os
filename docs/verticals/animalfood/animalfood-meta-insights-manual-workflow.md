# AnimalFood — Manual Meta Insights Capture Workflow

> **Zero-risk, manual-first.** How Gonzalo/Aranza capture Instagram/Facebook performance by hand and feed it into `05 · MÉTRICAS` and [[animalfood-trend-signals-log]] — **no Meta API, no MCP, no Ads CLI, no scraping.** Screenshots + manual entry only. This makes the daily plan run on **real own-performance data** instead of assumptions, while the data gap (`05 · MÉTRICAS` is empty) is the #1 blind spot flagged by every audit.
>
> Related: [[animalfood-column-map]] · [[animalfood-trend-signals-log]] · [[animalfood-extraordinary-content-standard]] · [[animalfood-content-log]] · `animalfood-daily-plan` skill.

---

## 1. Purpose

Give Gonzalo and Aranza a simple, repeatable way to **capture real Instagram/Facebook performance manually** and log it into the live Sheet (`05 · MÉTRICAS`) and the Trend Signals Log, so `animalfood-daily-plan` can make **evidence-based** decisions — without connecting any Meta API/MCP yet.

## 2. Why manual first

- **Zero risk:** no OAuth, no tokens, no ad-account permissions, no write surface, no API limits — nothing that could change a campaign or expose credentials.
- **Fills the real gap now:** `05 · MÉTRICAS` is currently empty, so "data-driven" planning has no data. Manual capture closes that this week, not in 4–8 weeks.
- **Right sequencing:** the official Instagram Graph API (read-only) is a *later* pilot, gated behind scheduler stability and Gonzalo's approval (see §14). Manual proves the *habit and schema* first; automation just speeds it up later.
- **Low effort:** a few screenshots + a handful of rows per week.

## 3. What data to capture weekly

For each reviewed post, capture the metrics that Instagram/Facebook actually show:
- **reach**
- **interactions** (total engagement)
- **saves**
- **shares**
- **comments**
- **profile visits** (if available)
- **DMs / WhatsApp replies** (if available)
- **link clicks** (if available)
- **best post of the week** (per account)
- **worst post of the week** (per account)

If a metric isn't shown for a given post, leave it blank — **never invent or estimate a number.**

## 4. What screenshots to take

- The **post Insights panel** for each reviewed post (the screen showing reach/interactions/saves/shares/comments).
- The **account Insights overview** for the week (reach + interactions trend) per account.
- Any **profile-visits / link-clicks / DM** counts if visible.
- Store screenshots in a dated folder **outside the repo** (e.g. `C:\AnimalFoodInsights\YYYY-MM-DD\`) — **do not commit screenshots** to git. The Sheet holds the numbers; screenshots are just the human source of truth.

## 5. Which accounts to review

All four, every week:
- **@animalfoodargentina** (mother account / institucional)
- **@canfeed.ar** (Canfeed + Catfeed)
- **@enercan.ar** (Enercan + Enercat)
- **@ironpet.ar** (IronPet dog + cat)

Even "dormant" accounts (Enercan/IronPet) get a quick look — a dark account is itself a signal.

## 6. Which posts to review

Per account, per week — keep it lean:
- **All posts published that week** (usually a handful).
- **The best performer** and **the worst performer** of the week (always tag these two).
- Any post that **clearly over- or under-performed** vs the account's normal range (an anomaly worth a signal).
- Do **not** review every historical post — only this week's plus the two extremes.

## 7. How to translate screenshots into `05 · MÉTRICAS`

`05 · MÉTRICAS` has 12 columns (per [[animalfood-column-map]]):

`Fecha · Cuenta · Marca · Pieza / contenido · Formato · Audiencia · Alcance · Interacciones · Guardados · Compartidos · Comentarios · Observación / aprendizaje`

For each reviewed post, add **one row**:
- **Fecha** = the post's publish date (`yyyy-MM-dd`).
- **Cuenta** = the account (@canfeed.ar, etc.); **Marca** = the brand/line (Catfeed, Canfeed, etc.).
- **Pieza / contenido** = the piece name (match the wording used in `01 · CALENDARIO OPERATIVO` so they reconcile).
- **Formato** = Carrusel / Reel / Story / Post.
- **Audiencia** = B2C / B2B / Institucional.
- **Alcance** = reach · **Interacciones** = interactions · **Guardados** = saves · **Compartidos** = shares · **Comentarios** = comments.
- **Observación / aprendizaje** = the one-line learning (e.g. "single pilar > overview"; profile visits / DMs / link clicks go here if captured, since there's no dedicated column).
- **Dedup key:** `Fecha + Cuenta + Pieza/contenido` (+ Formato tiebreaker) — **never add a second row for the same post; update the existing one** (matches the 23:00 metrics-dedup guard).
- Only enter **real, confirmed numbers.** Blank = unknown, never a placeholder.

## 8. How to translate findings into `animalfood-trend-signals-log.md`

Not every metric is a signal — only **decision-changing patterns** become signal rows. For each real insight, add a row using the 15-col signals-log schema:

`Date · Signal type=Internal performance · Source=Manual IG/FB insights (screenshot) · Platform · Brand · Signal observed · Why it matters · Suggested adaptation · Brand fit · Evidence/Confidence · Risk · Metric to validate · Decision · Owner · Status`

Guidance:
- **Confidence** = Medium for a single week's own-data observation; **High** only if corroborated across ≥2 weeks or sources.
- Log the **best post** (what worked → do more) and **worst post** (what to stop/fix) as signals.
- Log **anomalies** (a format that suddenly spiked or died).
- A dark account staying dark = an **operational-gap** signal.

## 9. Metrics glossary

- **Reach** — unique accounts that saw the post (audience size).
- **Interactions** — total engagement actions (likes + comments + saves + shares, as Meta groups them).
- **Saves** — strongest intent signal for educational/B2B content (people keep it for later).
- **Shares** — strongest reach-amplification + advocacy signal.
- **Comments** — community/conversation signal (the goal for community posts).
- **Profile visits** — interest in the brand beyond the post (consideration).
- **DMs / WhatsApp replies** — direct lead / commercial-intent signal.
- **Link clicks** — traffic / conversion-intent signal.
- **Best/Worst of week** — the relative extremes per account; the fastest way to learn what to repeat vs drop.

Rule of thumb per goal: **saves** → education/B2B value · **shares** → reach · **comments** → community · **DMs/clicks** → commercial intent.

## 10. Minimum weekly routine for Aranza

Once a week (≈15–20 min):
1. Open each of the 4 accounts' Insights.
2. Screenshot this week's posts' Insights + the account overview (store outside repo, dated folder).
3. Enter **one row per post** into `05 · MÉTRICAS` (real numbers only; dedup by Fecha+Cuenta+Pieza).
4. Tag the **best** and **worst** post per account in the Observación column.
5. Flag anything surprising for Gonzalo (one line).
6. Do **not** interpret strategy — just capture accurately. Interpretation is Gonzalo's (§11).

## 11. Review routine for Gonzalo

Once a week (≈15 min), after Aranza captures:
1. Read the new `05 · MÉTRICAS` rows + the best/worst tags.
2. Decide the **2–3 learnings** worth acting on → write them as signal rows in `animalfood-trend-signals-log.md` (Decision: Use / Adapt / Watch / Reject / Needs data).
3. Confirm/upgrade or kill standing hypotheses (e.g. resolve "gato +6% YoY" with a real number, or the "single pilar > overview" signal).
4. Decide what to repeat, what to stop, what to test next — feeding next week's plan.

## 12. How this feeds daily-plan

`animalfood-daily-plan`'s mandatory pre-flight already reads `05 · MÉTRICAS` (live Sheet) and the signals log. So once data exists:
- The plan can cite **real own-performance evidence** instead of HYPOTHESIS labels.
- "Metric to validate" rows can finally be measured against a **baseline**.
- Best-format learnings (e.g. IronPet community ~89%, Canfeed singles > overview) become **confirmed signals**, not assumptions.
- This converts the strategic layer from "honest about missing data" to "actually data-driven."

## 13. What not to do

- ❌ No Meta API connection · no Meta Ads MCP · no Ads CLI · no Instagram Graph API yet.
- ❌ No campaign creation, no budget changes, no boosting.
- ❌ No automated DMs/comments/likes/follows · no engagement automation.
- ❌ No scraping (manual screenshots only).
- ❌ No invented/estimated metrics — blank if unknown.
- ❌ No committing screenshots to git (numbers live in the Sheet; images stay outside the repo).
- ❌ No paid action of any kind without **Gonzalo's explicit approval**.

## 14. Future Instagram Graph API read-only pilot

When justified (post-Monday, after the scheduler is stable for several days), this manual workflow can be **partially automated** with a **read-only Instagram Graph API** pilot (own business accounts only):
- Scope: `instagram_manage_insights` / read scopes **only** — never `ads_management`, never the Meta Ads MCP.
- It would auto-populate the same `05 · MÉTRICAS` rows this workflow fills by hand — same schema, same dedup key.
- Validate exactly like the google-sheets MCP (local scope, scoped allowed-tools, token in `C:\ClaudeSecrets\` outside the repo, never committed).
- Until then, **manual is the source of truth.** The manual habit + schema defined here is the prerequisite that makes the pilot safe and useful.

## 15. Safety rules

- **Manual screenshots + manual entry only** — no API/MCP/CLI/scraping.
- **Real, confirmed numbers only** — never invent, estimate, or placeholder.
- **Dedup discipline:** one row per `Fecha + Cuenta + Pieza/contenido` in `05 · MÉTRICAS`.
- **Screenshots stay outside the repo**; never commit images or any account credentials.
- **No paid action, no publishing, no automation without Gonzalo's explicit approval.**
- This file is **documentation/process only** — it connects nothing.

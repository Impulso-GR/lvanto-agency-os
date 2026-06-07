# Remotion — Video Automation Module (Future, Deferred)

> **Standalone plan for a future, deferred video-automation module.** Documents Remotion as a candidate production module for templated, multi-brand, data-driven video — to be built **only after** the daily workflow, metrics capture, and market-intelligence layers are stable, and **only in a separate repo** outside this Agency OS brain. This file installs nothing, runs nothing, and creates no code or video.
>
> **Audit conclusion that produced this plan (2026-06-07):** Remotion is a **strong fit** for templated/multi-brand/data-driven video automation, a **weak fit** for emotional brand films and one-off artistic motion graphics, and **not** immediate core work. Verdict: **WATCH / deferred** behind a decision gate.
>
> Related: [[animalfood-meta-readonly-pilot]] · [[animalfood-meta-insights-manual-workflow]] · [[animalfood-content-system]] · [[animalfood-creative-ads-lab]] · [[animalfood-trend-signals-log]] · [[animalfood-column-map]] · `animalfood-daily-plan` skill.

---

## 1. Purpose

Define, in advance, a **safe and well-scoped** way to add programmatic video generation to Lvanto/AnimalFood so that when it is justified we execute a **known plan** instead of improvising. The goal is to automate **repetitive, templated, multi-brand** video (reskinned across AnimalFood's brands and reused as a Lvanto client service) while keeping the craft-heavy, emotional brand work where it belongs (real photography + After Effects/Premiere).

## 2. What Remotion is

- A framework for making videos **with code** (React) instead of a timeline editor: every frame is a React component, animations are JavaScript functions, and the engine renders to MP4.
- You build a **template once**, then feed it data (text, numbers, images, brand colors) and it renders **many variations automatically**.
- It pairs well with Claude Code: because the video *is* code, an AI agent can generate and edit the compositions under human review — the only realistic way our team (operator is not a senior programmer) can drive it.
- Free for individuals and for-profit companies with ≤3 employees; a paid company license applies above that (see §8).

## 3. What Remotion is NOT

- ❌ Not a timeline video editor (not a Premiere/CapCut replacement).
- ❌ Not a tool a non-developer opens and uses directly — it requires React/dev work (routed through Claude Code here).
- ❌ Not a generator of emotional brand photography/film — it **composites** assets, it does not shoot or art-direct them.
- ❌ Not for high-end artistic motion graphics or complex compositing.
- ❌ Not part of this Agency OS brain repo — it is a **separate codebase** (§10).
- ❌ Not an immediate build — it is **deferred** behind the §13 gate.

## 4. Difference vs Premiere / After Effects

| | Premiere / After Effects | Remotion |
|---|---|---|
| Model | Timeline, manual, visual craft | Code, templated, automated |
| Best at | One-off cinematic/artistic motion graphics, real-footage editing, color grading, compositing | Scaled, data-driven, repeatable variations |
| Cost of 50 variants | ~50× the work | Write template once → render 50× |
| Driven by | A motion designer | A developer / an AI agent |
| AnimalFood brand films (Tim Flach-style emotional photography) | ✅ the right tool | ❌ not its strength |

Complementary, not competing: AE/Premiere = craft and emotion; Remotion = volume and consistency.

## 5. Best use cases for AnimalFood

- **Weekly metrics recap Reels** auto-built from `05 · MÉTRICAS` data.
- **Templated educational shorts** ("Sabías que…", feeding guides, product-spec cards) rendered consistently per brand, enforcing the Brand Consistency Rule (Canfeed/Catfeed palette, typography) automatically.
- **Multi-brand reskins:** one template → Canfeed + Catfeed + Enercan/Enercat + IronPet versions with swapped palette/logo/packshot.
- **Price / promo update videos** regenerated when values change, with no re-editing.

## 6. Best use cases for Lvanto clients

- **Productized "social template engine":** a client buys a branded template; we render their recurring content at scale → recurring revenue.
- **Monthly client report videos** auto-generated from campaign data (premium upsell on the reports we already deliver).
- **Personalized/variant video at volume** (real-estate listings, restaurant menus, testimonial cards) — impractical by hand.
- **Landing-page hero animations** via the embeddable Remotion Player.

## 7. What NOT to use it for

- ❌ Emotional brand films / Tim Flach-style hero content.
- ❌ High-end artistic motion graphics or complex compositing.
- ❌ Real-footage editing and color grading.
- ❌ Any one-off where craft beats scale (use AE/Premiere + real photography).
- ❌ Anything that would let templated output flatten AnimalFood's premium brand perception.

## 8. Licensing / commercial considerations

- **Free** for individuals and **for-profit companies with ≤3 employees**, including commercial output. Lvanto today (Gonzalo + Aranza) is almost certainly inside the free tier.
- The threshold is **company size, not per-project** — making videos *for clients* does not by itself trigger a fee; **growing past 3 employees does.**
- Company license then: **~$25/seat/month, $100/month minimum (~$1,000/yr), 4 seats included** (verify current pricing at purchase time).
- **Action item:** before crossing 3 people — or if any doubt about agency/client use — confirm the case in writing with Remotion (`hi@remotion.dev`); the public license page does not spell out every agency nuance.

## 9. Risks and constraints

- **Learning curve** is the main risk — it is a real codebase (Node, React, `node_modules`, builds, renders). Mitigated only by routing it through Claude Code with human review.
- **Maintenance surface:** a separate app to keep updated; render time/cost grows with length and quality.
- **Brand-quality ceiling:** cannot produce the emotional photography standard; over-reliance would cheapen the brand.
- **Focus risk:** building a code module mid-stabilization of the daily scheduler would split attention — hence the gate.
- **Output QA:** every rendered video must pass the Creative Performance Rule (readability / hierarchy / CTA / mobile / hook / purpose) and carry **no invented claims**.

## 10. Why it should be a separate repo/module

- This Agency OS repo is the operational **brain** (markdown docs + PowerShell scripts). Remotion is a heavy **code project** with build artifacts and `node_modules`.
- Mixing them would pollute the brain repo, complicate diffs/reviews, and create dependency/version noise.
- Plan: a **separate repo** (e.g. `lvanto-video`) — versioned, built, and rendered independently — **referenced from** Agency OS docs but never merged into it. Brand kits and data exports cross the boundary as inputs; code stays out.

## 11. Proposed first pilot

The smallest thing that proves the **template → render → brand-consistency** loop:

- **One 15-second Canfeed educational Reel template.**
- **3-card format** ("Sabías que…" → point → CTA), single pillar, single brand.
- **One real packshot** (high-res, on-brand) — no AI-generated or placeholder product imagery.
- **Brand colors + typography** per the Brand Consistency Rule (Canfeed palette).
- **No invented claims** — all copy factual; no HYPOTHESIS dressed as fact.
- Rendered **locally, once**, reviewed against the Creative Performance Rule.
- *Stretch (only after the basic render works):* feed one real row from `05 · MÉTRICAS` into a metrics card to prove the data link.

## 12. Required assets

- **Brand kit:** Canfeed palette, typography, and **logo as SVG**.
- **1 real packshot** (high-res, on-brand).
- **Licensed** music/audio track (or silent) — no unlicensed audio.
- **Final copy** for the 3 cards (factual, claim-safe).
- **Dev environment** with Claude Code authoring the React; human review on output.
- **Separate repo** (`lvanto-video` or similar) to hold the code.

## 13. Decision gate before implementation

This module proceeds **only when ALL of these are true** — confirmed by Gonzalo, in writing:

1. **Scheduler stable** for several consecutive days (06:00 / 23:00 daily flows green, no carry-over regressions).
2. **Manual metrics habit active** — `05 · MÉTRICAS` holds real rows (per [[animalfood-meta-insights-manual-workflow]]).
3. **First strategic content loop validated** — Signal → Pillar → Concept → Publication → Metric → Learning has run end-to-end at least once on real data.
4. **Gonzalo's explicit approval** of the pilot scope and the Canfeed test template.
5. **Separate repo created** (`lvanto-video`), outside this Agency OS repo.
6. **License tier confirmed** — verified inside the free tier (or budget approved for a company license).

If any item is unmet → **do not build.** No partial start.

## 14. Future data connection

Once built and gated, Remotion becomes the rendering layer for data we already maintain — inputs flow **into** the separate repo; no Agency OS write surface is exposed:

- **`05 · MÉTRICAS` → weekly recap videos:** real own-performance numbers drive auto-generated weekly recap Reels (read-only export, never a write-back).
- **Trend Signals Log → content-video themes:** confirmed signals ([[animalfood-trend-signals-log]]) decide *what* templated videos to produce (theme/angle selection), keeping output evidence-based, not guesswork.
- **Brand kits → template rendering:** per-brand palette/typography/logo/packshot sets feed the reskin engine so every render is automatically on-brand (Brand Consistency Rule enforced in code).

## 15. Final verdict

**WATCH / deferred.** Strong strategic fit for templated, multi-brand, data-driven video and for a productized Lvanto service, but **not** immediate core work. Park as a deliberate future module, in a **separate repo**, behind the §13 decision gate. Until that gate clears, this remains a documented "watch" item only.

---

*Docs/plan only — this file installs nothing, runs no npm, creates no code or video, modifies no Agency OS scripts or Sheet, runs no tasks, and reads no credentials.*

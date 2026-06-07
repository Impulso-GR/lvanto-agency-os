# Lvanto Command Center — Visual Prototype Review v1

> **Documentation only.** Captures the first round of Stitch visual exploration (references provided by Gonzalo) and **locks the approved visual direction** before any further prototyping. This builds nothing, writes no frontend code, connects no data, and configures no Stitch/MCP/API.
>
> Source references reviewed (Stitch outputs, Gonzalo): **Lvanto Main Dashboard v1** · **AnimalFood Workspace v1 / v2 / v3** · **Canfeed Brand Dashboard v1 / v2** · **Task Board v1 / v2 / v3**.
>
> Related: [[lvanto-command-center-product-spec]] · [[lvanto-command-center-visual-prototype-prompts]] · [[animalfood-brand-registry]] · [[animalfood-monday-operating-protocol]].

---

## 1. Overall verdict

The visual direction is **promising and approved as a foundation — but NOT final UI.** v1 successfully proves the Lvanto-first, multi-client, premium-dark command-center concept. It is approved as the **base direction** to carry into a future v0/frontend translation, pending refinement of hierarchy, readability, and the task-detail interaction. No further open-ended Stitch iteration is needed to validate the concept.

---

## 2. Approved visual DNA (locked)

These are now the **fixed** design constants for all future Command Center UI:
- **Lvanto-first**, not AnimalFood-only — multi-client framing always visible.
- **Dark carbon UI** (near-black base, elevated panels).
- **Orange `#FF6B2B`** as the **restrained primary accent** (not a fill — accents, focus, the single most important action).
- **Gold `#C4A35A` only for strategic/premium signals** (insights, premium markers) — scarce by design.
- **Warm off-white text** (`#F2EFE9`) primary; muted grays for secondary/metadata.
- **Thin borders** (`rgba(255,255,255,.07)`), ~14px radii.
- **Dense but premium SaaS** — operational hierarchy over decoration.
- **Operational command center**, never a pet-food theme.
- **No fake metrics**; **honest empty states** everywhere data is absent.

---

## 3. Screen-by-screen review

### A. Lvanto Main Dashboard — **APPROVED (system-level direction)**
- **Strengths:** multi-client architecture clearly visible; AnimalFood reads as *active but not dominant*; system health, global alerts, and today's priorities all present and legible at the system level.
- **Needed later:** refine hierarchy and spacing (tighten the visual rhythm; make the priority/alert zones breathe without losing density).
- **Verdict:** approved as the **shell reference** for the whole product.

### B. AnimalFood Workspace — **APPROVED (direction); final = v2 aesthetic + v3 structure**
- **Strengths:** the workspace model works; portfolio, priorities, signals, and decisions are visible in one client-scoped view.
- **Needed later:** show **all brands** (full 9-brand portfolio); improve readability; make **Top Priorities dominant**; keep **"Action Required"** strong and prominent.
- **Final build:** combine **v2's aesthetic** with **v3's operational structure**.

### C. Canfeed Brand Dashboard — **APPROVED (brand-level base)**
- **Strengths:** active production module; Claims Guard; Production Checklist; Action Queue; Visual Direction panel — all the right brand-level surfaces.
- **Needed later:** improve **sidebar readability**; tighten **CTA wording**; reformat **Strategic Signals**.
- **Final build:** use **v2** as the brand-dashboard base.

### D. Task Board — **PARTIALLY APPROVED (hybrid)**
- **Use:** **v2** for Lvanto branding, sidebar, and the clean board; **v1** for the **selected-task detail-panel** concept.
- **Do NOT use:** **v3** as final — it **lost the detail panel** and stayed too empty.
- **Final Task Board requirement:**
  - **full pipeline statuses** (Idea · Brief listo · En diseño · En revisión · Aprobado · Programado · Publicado · Medido · Pausado · Descartado);
  - **task cards** showing owner / priority / status / next action;
  - **right-side Selected Task Detail panel** with checklist, claim restrictions, related signals, and action buttons.

---

## 4. What to avoid

- ❌ **Do not invent new brand names** (e.g. "STRATOS") — it is **Lvanto Command Center**, brands come only from the Brand Registry.
- ❌ No **pet-food / animal** theme.
- ❌ No **blue corporate SaaS** palette.
- ❌ No **military / cyber / security** aesthetic.
- ❌ No **fake charts or metrics**.
- ❌ Do not **overuse orange** — it stays a restrained accent.
- ❌ Do not **compress text into unreadable microcopy**.
- ❌ Do not run **endless Stitch iterations without purpose** — exploration is done for now.

---

## 5. Design principles for future UI

- **Action-first layout** — the screen serves the next decision, not decoration.
- **One dominant next action per screen** — unmistakable primary CTA.
- **Claims Guard always visible where claims matter** (brand/content surfaces).
- **Empty data must be honest** — designed empty states, never invented numbers.
- **Decision queue must be actionable** — clear options, owner, origin.
- **Metrics must not be invented** — only real captured data renders.
- **Client and brand context must always be visible** — breadcrumb + switchers persistent.
- **Gonzalo (Admin) and Aranza (Operator) roles must be distinct** — different surfaces, scoping, and emphasis.

---

## 6. Recommended next screen order

If prototyping continues:
1. **Notification Center**
2. **Paid Media / Traficker Center**
3. **Metrics Center**
4. *Later:* mobile companion views (Gonzalo admin / Aranza operator).

**Recommendation:** **pause Stitch iterations now** and lock the direction with this document. The concept is validated; more iteration without a specific question is low-value.

---

## 7. Future functional translation notes (for v0 / frontend)

When/if a build is approved (behind the spec's decision gate):
- **Shell reference:** Lvanto Main Dashboard (A).
- **Client workspace:** AnimalFood Workspace **v2/v3 hybrid** (v2 aesthetic + v3 structure).
- **Brand dashboard:** Canfeed Dashboard **v2**.
- **Task board:** Task Board **v2** + **v1 detail panel**.
- **Build with static mock data first.**
- **No real data connection** until the architecture gate ([[lvanto-command-center-product-spec]] §19) is cleared.

---

## 8. Final recommendation

- **Visual exploration v1 is complete enough.** The foundation is approved.
- **Do not build the app yet.**
- **Do not connect data yet.**
- **Do not install the Stitch MCP yet.**
- **Next practical product action:** this review *is* that action (direction documented). Then **return to production work** (Canfeed PSD / Monday operating loop), and only prototype **Notification Center / Paid Media** if a concrete need arises.

The product track is now **paused at a clean, documented checkpoint** — ready to resume into v0 translation when the gate clears, without re-deriving the visual direction.

---

*Documentation only — no app built, no frontend code, no Google Sheets modified, no tasks run, nothing installed, no Stitch/MCP/API configured, no credentials read. Stitch outputs were reviewed as external visual references only.*

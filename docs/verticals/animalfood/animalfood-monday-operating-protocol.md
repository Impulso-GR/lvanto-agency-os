# AnimalFood — Monday Operating Protocol

> **From architecture to execution.** This is the practical day-to-day protocol for running AnimalFood through Agency OS starting **Monday 2026-06-08**, using only the tools available **today** — no new installs, no API/MCP/browser-tool setup. Documentation/process only: it builds nothing, configures nothing, and writes nothing to Sheets.
>
> Tooling roles:
> - **Claude VSCode / Claude Code** = system brain — files, Sheets (read; write only when explicitly approved), docs, logs, decisions.
> - **Claude Chrome Extension** = supervised external research arm (public, no-login).
> - **Meta AI** = supervised creative *sensor* for Meta-native mechanics — **not** a source of truth.
> - **Google Sheet** = operational source of truth.
> - **[[animalfood-brand-registry]] + Claims Guard + [[animalfood-trend-signals-log]]** = the strategic filters every output passes through.
>
> Related: [[animalfood-content-system]] · [[animalfood-extraordinary-content-standard]] · [[animalfood-role-excellence-system]] · [[animalfood-column-map]] · [[animalfood-meta-insights-manual-workflow]] · `animalfood-daily-plan` skill.

---

## 1. Operating principle

AnimalFood Agency OS now moves **from architecture to execution**. No more speculative modules unless a real need appears. **Default behavior every working day:**

1. **Read current state** (Sheet + registry + signals + claims).
2. **Identify active work** (what's already in motion).
3. **Use research only when it would change a decision** — not for its own sake.
4. **Produce or unblock tasks** — the output is *action*, not more documentation.

> If a step doesn't change what Gonzalo or Aranza does next, skip it.

---

## 2. Daily start workflow

Every working day Gonzalo can ask: **"What should AnimalFood do today?"**

The system must then:
- read **`01 · CALENDARIO OPERATIVO`** (live, source of truth);
- read **`05 · MÉTRICAS`** if available;
- check the **Brand Registry** (roles/lanes/status);
- check the **Trend Signals Log** (active signals);
- check **Claims Guard** (allowed/blocked/needs-data per brand);

…and return:
- **top priorities** (ranked);
- **Gonzalo actions**;
- **Aranza actions**;
- **blocked items**;
- **what not to touch**;
- **one recommended next move.**

*(The `animalfood-daily-plan` skill already performs this read-and-return loop.)*

---

## 3. Current Monday priority

- **Primary priority:** **Canfeed — Protect Pack × Five S Plus — pieza puente + PSD base.**
- **Status:** *En diseño* (live in `01`, rows 6 & 10, Prioridad **Alta**).
- **Next action:** **Gonzalo designs S1 Cover + S4 Protect Pack hero first** (per the production pack — S1 locks the reusable base, S4 is the claim-critical hero/packshot).
- **Why:** it defends Canfeed's premium value through **system completeness + evidence + protection** (never price), and it **unlocks the reusable PSD base** for the future Five S Plus per-pillar pieces.

---

## 4. Meta AI — Creative Sensor protocol

**Meta AI is defined as:**
- an **optional first-pass creative sensor**;
- useful for **Instagram/Facebook-native mechanics**;
- **NOT** a source of truth; **NOT** final strategy; **NOT** a claims authority; **NOT** a metrics source.

**Use Meta AI when:** before planning story games · before brainstorming reel mechanics · before choosing carousel structures · before community formats · before any Meta-native engagement idea.

**Do NOT use Meta AI for:** product claims · pricing · margins · metrics · paid-campaign decisions · publishing decisions · final content approval.

**Every Meta AI output must be labeled:** `Hypothesis` · `Needs validation` · `Platform-native suggestion`. It never enters the Sheet or a brief directly — it goes through Chrome validation (§6) then VSCode conversion (§8).

---

## 5. Prompt template — Meta AI (paste into Meta AI)

```
Act as an Instagram/Facebook-native creative strategist for pet food brands.
I manage AnimalFood brands in Argentina:
- Canfeed: super premium dog food, education/evidence, Five S Plus / Salud Total, premium value.
- Catfeed: premium feline-specific nutrition.
- IronPet: accessible performance / fair price / community.
- Enercan: functional accessible, pork monoprotein and turmeric, careful claims.
- AnimalFood Argentina: institutional mother brand.

Suggest Meta-native content mechanics for:
- Stories;
- Reels;
- carousels;
- community posts;
- UGC;
- polls/games;
- educational sequences.

Rules:
- Do not invent product claims.
- Do not mention medical benefits.
- Do not compare prices.
- Do not create final captions.
- Do not create a calendar.
- Give content mechanics and why they may work on Instagram/Facebook.
- Separate suggestions by brand.
- Include confidence: High / Medium / Low.
- Include which metric each mechanic should improve: saves, shares, comments, reach, profile visits, DMs.
- Include risks.

Output:
1. Platform-native mechanics.
2. Best mechanics by brand.
3. Story game ideas.
4. Reel structures.
5. Carousel structures.
6. What NOT to do.
7. Which suggestions need validation with our own metrics.
```

---

## 6. Chrome Extension — research protocol

**Claude Chrome Extension is the supervised external research arm.**

**Use for:** public websites · public Instagram/Facebook profiles · Meta Ads Library · MercadoLibre · visible competitor examples · reels/screens · public trends and references.

**Do NOT use for:** logged-in Business Suite · Ads Manager changes · publishing · DMs · comments · automated actions · any sensitive account operation.

Rule: **public, no-login, read-only, supervised.** Research only changes a decision — it never takes an action.

---

## 7. Prompt template — Claude Chrome (run after Meta AI)

```
Validate these Meta AI creative hypotheses with public research.

Rules:
- Research only.
- Do not create content.
- Do not create calendar.
- Do not interact with profiles.
- Do not log in.
- Do not publish/comment/DM.
- Use public web, public profiles, Ads Library, visible examples only.

Task:
Review whether these mechanics appear plausible in current Instagram/Facebook
pet-food or consumer-brand patterns.
Find visible examples if available.
Classify each suggestion: Use / Adapt / Watch / Reject / Needs data.

For each:
- evidence observed;
- confidence;
- risk;
- which AnimalFood brand it fits;
- metric to validate.

Output:
Research report only.
No final content.
```

---

## 8. Claude VSCode — conversion protocol

After Meta AI + Chrome research, Claude VSCode converts findings into Agency OS format.

**Rules:**
- do not create final content unless requested;
- do not modify the Sheet unless explicitly approved;
- check the **Brand Registry**;
- check **Claims Guard**;
- check the **Trend Signals Log**;
- classify each useful finding as one of: **Trend Signal · Opportunity candidate · Task candidate · Rejected · Needs data.**

This is the gate where platform-native ideas become **claim-safe, brand-correct, evidence-labeled** Agency OS items — or get rejected.

---

## 9. Prompt template — Claude VSCode conversion

```
Convert this Meta AI + Chrome research output into Agency OS findings.

Rules:
- Do not create content yet.
- Do not create calendar.
- Do not modify Sheet.
- Do not commit unless explicitly requested.
- Check AnimalFood Brand Registry.
- Check Claims Guard.
- Check Trend Signals Log.
- Preserve uncertainty.
- Label weak evidence as HYPOTHESIS / Needs data.

Output:
1. What is usable.
2. What is rejected.
3. What needs validation.
4. Suggested Trend Signals rows.
5. Suggested Opportunity candidates.
6. Suggested Tasks, if any, but proposal only.
7. Recommended next action for Gonzalo.
```

---

## 10. Manual paid-media / traficker protocol (Monday)

**No Meta Ads connection yet.** If Gonzalo wants paid-media visibility, use a **manual report only** — Gonzalo (or Aranza) reads the numbers from Ads Manager by hand and brings them in. Fields:
- campaign name · objective · funnel stage · spend · reach · impressions · CTR · CPC · messages/leads · CPL · diagnosis · next action · approval needed.

**Rules:**
- no campaign changes;
- no budget changes;
- no automatic paid recommendations;
- no Meta Ads MCP yet;
- no CoWork / browser control;
- **every paid recommendation is manually reviewed and approved by Gonzalo.**

Paid visibility = a read-only manual snapshot for a human decision; the system never touches spend.

---

## 11. Monday operating checklist

**Gonzalo should:**
1. Ask Agency OS for the **live tour / daily priorities**.
2. Work on **Canfeed S1 (Cover) + S4 (Protect Pack hero)**.
3. If creative research is needed, run the **Meta AI Creative Sensor** (§5).
4. **Validate with the Chrome Extension** only if needed (§7).
5. **Convert findings through Claude VSCode** (§9).
6. **Approve or reject** the IronPet community post.
7. Ask Aranza for **manual metrics** only when appropriate.

**Aranza can:**
- publish the **IronPet community post** after approval (reply by pet name);
- run **manual metrics capture** into `05`;
- prepare **simple Canva execution tasks**;
- **wait for** the Canfeed PSD base before deriving pilares 2–5.

---

## 12. What remains blocked

- Browser own-MCP / agent-browser install;
- Meta Graph API;
- Meta Ads MCP;
- CoWork browser control;
- n8n automation;
- Command Center prototype;
- Stitch / v0;
- Remotion;
- wet / pouch / snack;
- Enercat content;
- fixed B2B prices;
- "+6% YoY" as fact.

---

## 13. Criteria for success on Monday

Monday is successful if:
- Gonzalo knows the **top 3 priorities in under 5 minutes**;
- **Canfeed PSD S1/S4 advances**;
- **no brands are mixed** (each stays in its lane);
- **no claims are invented**;
- **at least one real metric is captured OR one approved post moves forward**;
- the system produces **decisions, not generic ideas**.

---

## 14. Decision gate — installing browser tools later

Do **not** install browser/API tools until **all** of these are true:
- the **Monday workflow works manually**;
- the **Research Layer protocol is proven** (Meta AI → Chrome → VSCode loop run at least once);
- a **public-only browser pilot is defined**;
- **guardrails are written**;
- the **no-login rule is accepted**;
- **Gonzalo explicitly approves.**

If any is unmet → keep operating with current tools.

---

## 15. Final recommendation

For Monday:
- **Use current tools.** Do not install new browser/API tools yet.
- **Meta AI** can be used manually as a creative sensor (labeled hypothesis).
- **Chrome Extension** remains the supervised, public, no-login research arm.
- **Claude VSCode** remains the Agency OS brain and the conversion/claims gate.
- **Primary output must be action, not more architecture.**

The Monday loop, in one line: **read state → design Canfeed S1/S4 → (optional) Meta AI sense → Chrome validate → VSCode convert → approve IronPet post / capture one metric.**

---

*Documentation/process only — builds nothing, installs nothing, configures no browser/MCP/API tools, modifies no Google Sheet, runs no scheduled tasks, reads no credentials, and creates no content calendar, final captions, or campaign/publishing actions. The prompt templates are reusable operator tools, not content.*

# Lvanto Command Center — Visual Prototype Prompt Pack

> **Prompts for visual prototyping only** (Google Stitch / v0 / Figma-style exploration). This pack lets Gonzalo *see* the Lvanto Command Center UI **without building the product**. It contains **no code, no backend, no API, no auth, no data connection** — only descriptive prompts that produce static visual mockups.
>
> **Source of truth:** [[lvanto-command-center-product-spec]] (architecture + IA + roles + entities), [[animalfood-brand-registry]] (brands/lanes/status), [[animalfood-monday-operating-protocol]] (current active work), [[animalfood-column-map]] (status vocabulary).
>
> **Non-negotiable framing:** this is **Lvanto OS** — a *multi-client* agency operating system. **AnimalFood is the first active workspace, not the whole system.** Every screen must read as Lvanto-first with client workspaces. **Never** make it look like an AnimalFood-only or pet-food-themed dashboard.

---

## 1. Prototype objective

**What this is:** a set of prompts to generate **static, high-fidelity visual mockups** of the Lvanto Command Center, so the team can evaluate layout, hierarchy, density, and "feel" before any build.

**What this is NOT:** a functional dashboard, a coded app, a data-connected tool, or an MVP. No logic, no real metrics, no live Sheet, no auth. All data shown is **illustrative mock content** representing the real current state (read-only, sourced from the docs above) — but it is **decorative in the prototype**, not wired to anything.

**Hard rules for every generated screen:** Lvanto-first · multi-client (client + brand switchers) · dark premium B2B SaaS · empty states never faked into charts · claims/blocked/needs-data always visible · paid media read-only/manual · no pet-food visual theme.

---

## 2. Global design system — master prompt

> Paste this first (or as the system/style preamble) in any tool, then append a screen prompt from §3.

```
You are designing the UI for "Lvanto Command Center" — a private, premium, multi-client
internal operating system for a digital marketing agency (Lvanto). It is NOT a single-brand
dashboard: it manages multiple CLIENT WORKSPACES, each containing brands and accounts.

VISUAL DIRECTION
- Premium B2B SaaS. Dark mode default. Clean, dense, professional, calm.
- Inspiration: Linear (task/status density, keyboard-first), Vercel (project cards, status
  badges, deploy-style health), Notion (multiple views over data), Grafana/Datadog
  (alerting + system-health panels). NOT Bootstrap, NOT a colorful amateur dashboard.
- No pet-food theme. No childish icons. This is an agency operating system.

LAYOUT
- Persistent LEFT SIDEBAR: Lvanto wordmark/logo at top; a CLIENT SWITCHER (dropdown) and,
  when inside a client, a BRAND SWITCHER; primary nav (Dashboard, Tasks, Signals, Metrics,
  Notifications, Decisions, Claims Guard, Paid Media, Reports, Settings, System Health).
- Top bar: breadcrumb (Lvanto / Client / Brand), global search with a COMMAND PALETTE feel
  (⌘K), notification bell with a badge count, user avatar with role label.
- Main content area: cards for overviews, dense tables for operational data.
- RIGHT-SIDE DETAIL PANEL that slides in when a row/card is selected.

STYLE TOKENS
- Background: near-black/very dark neutral (e.g. #0B0D10 / #111317), elevated surfaces a
  step lighter (#16191E), subtle 1px borders (#23272E).
- Text: high-contrast off-white primary, muted gray secondary.
- ONE restrained accent (deep indigo/blue) for primary actions/focus; semantic colors used
  sparingly: amber=warning/needs-data, red=high/blocked, green=ok, gray=neutral/placeholder.
- Typography: modern grotesque/geometric sans (Inter/Geist feel); tight, legible, clear
  hierarchy (H1 page title, section labels in small caps, dense table type).
- Generous whitespace despite density; 8px spacing grid; rounded-md cards; soft shadows.
- STATUS CHIPS (pill-shaped) and NOTIFICATION BADGES are core components.
- Empty states are designed and elegant — never faked charts or invented numbers.

TONE: trustworthy, premium, restrained. The kind of internal tool a serious agency runs on.
```

---

## 3. Screen prompts

> Each prompt assumes the §2 design system. All content below is illustrative of the real current state.

### A. Login screen
```
Design the Lvanto Command Center LOGIN screen. Minimal, premium, dark. Centered card on a
near-black background with a subtle gradient/grid texture. Lvanto wordmark at top. Email +
password fields, a primary "Sign in" button (indigo), and an SSO option. Below: a small,
role-aware hint line ("Access is role-based: Admin / Operator / Traficker"). A discreet
footer: "Private internal system — Lvanto Agency OS." No marketing copy, no illustrations.
It should feel like Linear/Vercel sign-in: quiet, confident, secure.
```

### B. Lvanto Main Dashboard (multi-client overview)
```
Design the LVANTO MAIN DASHBOARD — the system-level home across ALL clients (not one brand).
Left sidebar with client switcher set to "All clients." Main area:
- A row of CLIENT CARDS: "AnimalFood" (Active — green chip, shows brand count + open tasks),
  and placeholder cards for "Broker Capital", "VigilArg", "Sileoni" rendered as INACTIVE /
  "Not onboarded" (muted, dashed border, gray chip).
- A "Today's priorities" panel (cross-client list, top items).
- A "Global alerts" panel (high/medium/low, with badges).
- A "System health" strip (repo clean, Sheets status, scheduler status, integrations).
Emphasize that Lvanto manages multiple clients; AnimalFood is simply the first active one.
```

### C. AnimalFood Client Workspace
```
Design the ANIMALFOOD CLIENT WORKSPACE (one client inside Lvanto). Breadcrumb: Lvanto /
AnimalFood. Sidebar brand switcher now visible. Main area shows BRAND CARDS for:
AnimalFood Argentina (Institutional, Active), Canfeed (Premium, Active — priority),
Catfeed (Premium feline, Active), IronPet (Accessible/Community, Active),
Enercan (Functional, Dormant — "Pending objective"), Enercat (Needs data),
Puro / SuperPet / Ulyses (Economic/value, Not active).
Each card: brand name, positioning lane, a STATUS CHIP (Active / Dormant / Needs data /
Not active), and a tiny metric line that says "No data yet" where applicable.
Side panels: "Top priorities" (Canfeed PSD, IronPet post, metric capture), "Alerts"
(metrics empty, brand inactivity), "Signals (recent)". Keep it client-scoped, not global.
```

### D. Canfeed Brand Dashboard
```
Design the CANFEED BRAND DASHBOARD. Breadcrumb: Lvanto / AnimalFood / Canfeed.
Header: brand name + positioning chip "Super-premium · evidence · Five S Plus".
Cards:
- ACTIVE PIECE: "Protect Pack × Five S Plus — pieza puente + PSD base" with status chip
  "En diseño" (amber), priority "Alta", owner "Gonzalo → Aranza", and a "Next action:
  design S1 Cover + S4 Protect Pack hero."
- CLAIM RISK PANEL: Allowed (Five S Plus · Salud Total; 5 pillar names; official Protect
  Pack sentence) vs Blocked (humidity/oxygen barrier, multicapa, valve, hermetic seal,
  materials, freshness days, AAFCO, unverified stats, price comparison). Use green/red chips.
- METRICS PLACEHOLDER: empty state "No performance data yet — run manual capture."
- SIGNALS AFFECTING CANFEED: cards for "Manufacturer-led vs retailer-led" and
  "IronPet portfolio tension (defend premium via system/evidence, not price)."
Premium, restrained, evidence-forward — never show invented numbers.
```

### E. Task Board (Linear-style)
```
Design a LINEAR-STYLE TASK BOARD for the AnimalFood workspace. Horizontal columns in the
Sheet's status vocabulary: Idea | Brief listo | En diseño | En revisión | Aprobado |
Programado | Publicado | Medido | Pausado | Descartado. Dense, dark, draggable-looking cards.
Example cards:
- "Canfeed — Protect Pack × Five S Plus" in EN DISEÑO — priority Alta — owner Gonzalo → Aranza.
- "Catfeed — Tu gato no es un perro chico" in BRIEF LISTO — priority Alta — owner Gonzalo.
- "IronPet — Mostranos a tu compañero" in IDEA — priority Media — owner Aranza/CM.
- "AnimalFood — Institucional repost" in PAUSADO — muted, with a 'dependency-blocked' tag.
Each card: brand color-dot (subtle, not pet-themed), title, priority chip, owner avatar,
client/brand label. A right-side detail panel appears when a card is selected.
```

### F. Signal Center
```
Design the SIGNAL CENTER as a dense, filterable table + optional card view (Notion-like).
Columns: Signal | Affected brands | Confidence | Risk | Decision | Owner | Status.
Rows (illustrative):
- "MercadoLibre price-positioning / portfolio ladder" — Canfeed/IronPet/Enercan/Catfeed/
  SuperPet — Confidence Medium-high — Risk Medium — Decision Adapt/Monitor — Gonzalo — Watch.
- "IronPet internal positioning (misma planta / precio justo)" — IronPet/Canfeed — Medium —
  Medium — Adapt/Monitor — Gonzalo — Watch.
- "Manufacturer-led vs retailer-led" — All — Medium — Low — Adapt (no spend) — Gonzalo — Watch.
- "Wet/pouch/snack" — Catfeed/IronPet/Enercan — Medium — Medium — BLOCKED/Watch — Gonzalo.
- "Cat +6% YoY" — Catfeed — Low — Low — NEEDS DATA — Gonzalo.
- "Dark accounts / Enercan objective" — Enercan/IronPet — Medium — Medium — Needs data — Gonzalo.
Use colored chips for confidence/risk/decision. Selecting a row opens a detail panel with the
signal's source and "metric to validate."
```

### G. Metrics Center (designed empty state)
```
Design the METRICS CENTER in a professional EMPTY STATE — because there is no performance
data yet. Do NOT invent charts or numbers. Center the screen on an elegant empty-state block:
a subtle icon, headline "No real performance data yet", subtext "Metrics appear here once
manual capture begins (05 · MÉTRICAS is currently empty)." A secondary CTA-style placeholder
button "Start manual capture" (clearly a placeholder). Below, a row of DISABLED/empty metric
cards labeled: Saves, Shares, Comments, Reach, Profile visits, DMs — each shown grayed out
with a thin "—" and "no data" tag. The whole screen should feel intentional and premium, not
broken — an honest empty state, never fake data.
```

### H. Notification Center
```
Design the NOTIFICATION CENTER as a grouped inbox (by priority). Each notification row shows:
priority chip, title, owner avatar, suggested action, status, timestamp. Groups:
- HIGH: "Canfeed PSD still in design" — owner Gonzalo — action "Design S1 + S4" — Open.
- MEDIUM: "05 · MÉTRICAS empty" — owner Aranza — action "Run manual capture" — Open.
- MEDIUM: "IronPet community post needs approval" — owner Gonzalo — action "Approve/Reject" — Open.
- LOW: "Enercat Needs Data" — owner Gonzalo — action "Confirm ingredients" — Open.
- SYSTEM: "Sheets API intermittent / scheduler check" — owner Admin — action "Investigate" — Open.
Right-side detail panel on selection. Dark, dense, Linear-like. Badges in the sidebar reflect
unread counts. System notifications visually distinct (gray) and Admin-only.
```

### I. Decision Inbox (Phase 2 placeholder)
```
Design the DECISION INBOX clearly marked as a PHASE 2 / PLACEHOLDER surface (a subtle banner:
"Prototype only — requires a canonical decisions source (not yet built)"). Show a queue of
decision cards, each with a question, linked origin (signal/opportunity/task), options
(Approve / Hold / etc.), and owner = Gonzalo:
- "Approve IronPet community post?"
- "Confirm Catfeed design status?"
- "Set Enercan objective?"
- "Locate the +6% YoY source?"
- "Confirm Enercat ingredient data?"
Cards look actionable but are visibly disabled/ghosted to signal 'future'. Premium, calm,
decision-focused — the antidote to scattered judgment.
```

### J. Claims Guard
```
Design the CLAIMS GUARD screen: per-brand claim panels, each with three columns —
ALLOWED (green), BLOCKED (red), NEEDS CONFIRMATION (amber). Panels:
- CANFEED — Allowed: "Five S Plus. Salud Total.", 5 pillar names, official Protect Pack
  sentence. Blocked: humidity/oxygen barrier, multicapa, valve, hermetic seal, materials,
  freshness days, AAFCO, unverified stats, price comparison. Needs: —
- IRONPET — Allowed: accessible/fair-price, community. Blocked: "Canfeed más barato",
  medical claims. Needs: nutrition specifics.
- ENERCAN — Allowed: pork monoprotein + turmeric direction (careful). Blocked: medical
  claims, new wet/snack. Needs: specific functional outcomes.
- ENERCAT — Allowed: "owned feline line" only. Blocked: all ingredient/functional claims.
  Needs: ingredients (until confirmed).
- WET/POUCH/SNACK (portfolio) — Blocked: implying any such product exists. Needs: availability.
Make blocked items unmistakable. This is a safety surface; clarity over decoration.
```

### K. Paid Media / Traficker Center (manual, read-only)
```
Design the PAID MEDIA / TRAFICKER CENTER as a READ-ONLY, MANUAL-DATA placeholder. Prominent
banner: "Manual paid report only · No Meta connection · No campaign or budget actions ·
Read-only future module." Show a vertical FUNNEL visualization with stages: Awareness ·
Consideration · Traffic/Engagement · Lead/WhatsApp/DM · Conversion/Distributor inquiry ·
Remarketing/Retention. Each stage is an empty/placeholder slot (no numbers). Below, a simple
"Manual report" table shell with columns: Campaign · Objective · Funnel stage · Spend ·
Reach · Impressions · CTR · CPC · Messages/Leads · CPL · Diagnosis · Next action ·
Approval needed — all empty/awaiting manual entry. Clearly communicate: the system never
changes spend; a human enters numbers and Gonzalo approves any recommendation.
```

### L. System Health
```
Design the SYSTEM HEALTH screen, Grafana-lite. Status tiles:
- Repository: "Clean — working tree clean" (green); "Last commit: <placeholder hash/message>".
- Google Sheets: "Connected (read-only) — intermittent today" (amber).
- Scheduler (06:00 / 23:00): "Status unverified" (amber).
- Integrations: Meta API "Not connected", Meta Ads MCP "Not connected", Browser/Agent
  "Not installed", n8n "Not connected" — all gray "Blocked/by design".
- Security: "Role-based access · client isolation · no writes without approval" (green).
Use status dots and tidy tiles. No live graphs — status states only. Honest and calm.
```

---

## 4. Mobile companion prompts

### Gonzalo — Admin mobile
```
Design the LVANTO COMMAND CENTER ADMIN MOBILE view (Gonzalo). Dark, premium, single-column,
thumb-friendly. Top: client switcher (AnimalFood). Sections, in order of importance:
1) TOP DECISIONS (approval queue): "Approve IronPet post", "Set Enercan objective" — each a
   tappable card with Approve/Hold.
2) URGENT ALERTS: high-priority badges (Canfeed PSD in design).
3) TODAY'S PRIORITY: one hero card — "Design Canfeed S1 + S4".
4) APPROVAL QUEUE count.
Minimal, fast, decision-first. No dense tables on mobile — just what needs his judgment.
```

### Aranza — Operator mobile
```
Design the LVANTO COMMAND CENTER OPERATOR MOBILE view (Aranza). Dark, premium, single-column.
Scoped to her assigned brands only (no cross-client, no strategy). Sections:
1) ASSIGNED TASKS: "IronPet — Mostranos a tu compañero" (status: waiting approval),
   "Manual metrics capture" (ready).
2) ASSETS NEEDED: "IronPet Canva template (no invented packshot)".
3) WHAT I CAN EXECUTE NOW vs WHAT REQUIRES APPROVAL (two clearly separated groups).
She must understand her work WITHOUT reading any strategy doc. Clear, calm, unambiguous.
```

---

## 5. Stitch prompt version (visual exploration)

> Google Stitch favors descriptive, screen-focused, visual prompts. Strip implementation detail.

**How to use:** paste the §2 master prompt as the style brief, then a §3 screen prompt, and add this Stitch wrapper:

```
Generate a high-fidelity dark-mode UI mockup (no code, visual only) for the screen described.
Focus on layout, hierarchy, spacing, typography, chips, badges, and empty states. Premium B2B
SaaS, Linear/Vercel/Notion/Grafana-lite feel. Multi-client agency OS (Lvanto), AnimalFood is
one client. Do NOT add logic, data wiring, or backend. Produce one clean desktop frame
(and a mobile frame where relevant). No pet-food theme, no fake charts.
```

Recommended Stitch order: **B (Main Dashboard) → C (AnimalFood Workspace) → D (Canfeed) → E (Task Board)** first, to lock the multi-client feel before detail screens.

---

## 6. v0 prompt version (shadcn/React scaffold — prototype only)

> v0 generates shadcn/ui React scaffolds. Keep it prototype-only with **static mock data**.

**How to use:** paste §2 as the design brief, then a §3 screen, and add this v0 wrapper:

```
Build a PROTOTYPE-ONLY React + shadcn/ui screen (Tailwind, dark mode) for the screen described.
Use ONLY hardcoded static mock data — NO API calls, NO fetch, NO backend, NO auth, NO database,
NO Google Sheets. Components only: sidebar, client/brand switchers, cards, dense tables, status
chips (Badge), notification badges, right-side Sheet/Drawer detail panel, command palette
(Command). Multi-client agency OS (Lvanto); AnimalFood is one client workspace. Honest empty
states (no fake charts). Do not wire anything. Output a single static page component.
```

Guardrails for v0 output: it is a **throwaway visual scaffold**, not the product. Do not commit it as functional code, do not connect data, do not add routes/auth. The canonical build (if approved) follows the spec's stack B separately.

---

## 7. Prototype evaluation checklist

Judge any generated prototype against ALL of these:
- [ ] **Lvanto-first** — reads as a multi-client agency OS, not a single brand's tool.
- [ ] **AnimalFood is only one client** — other clients visible as inactive placeholders.
- [ ] **Brands separated correctly** — each brand in its lane; none mixed (esp. Canfeed vs IronPet, Catfeed vs Enercat).
- [ ] **Professional UI** — premium dark SaaS; no Bootstrap/amateur/pet-food look.
- [ ] **Priority in <60s** — Gonzalo can spot today's #1 (Canfeed S1/S4) within a minute.
- [ ] **Aranza clarity** — she understands her tasks without reading strategy docs.
- [ ] **Blocked/needs-data visible** — dormant brands, Needs-data, blocked claims all surfaced.
- [ ] **Claims protected** — Claims Guard shows allowed/blocked/needs-confirm clearly.
- [ ] **Paid media read-only/manual** — no connection, no spend actions, banner explicit.
- [ ] **No fake metrics** — Metrics Center is an honest empty state, not invented charts.

If any box fails, revise the prompt — don't accept the mockup.

---

## 8. Final recommendation

- **Test Stitch first** for visual exploration (fastest path to evaluate layout/feel; no code).
- **Use v0 later** for a shadcn/React scaffold once the visual direction is locked — still prototype-only, static mock data, never wired.
- **Figma** optional for high-fidelity polish between the two.

**Verdict:** **Create the visual prototype now. Do NOT build the functional app yet. Do NOT connect data yet.** The prototype exists to validate the multi-client UX and the Lvanto-first framing before the spec's decision gate (scheduler stable, canonical source confirmed, Gonzalo's go) is cleared for any real build.

---

*Documentation only — this pack builds nothing, installs nothing, configures no auth, connects no Google Sheets, creates no backend or API routes, and commits no functional code. The prompts are operator tools for external visual-prototyping apps; any output they produce is a throwaway mockup, not the product.*

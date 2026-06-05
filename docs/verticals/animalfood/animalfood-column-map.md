# AnimalFood — Canonical Column Map

> ⚠️ **Schema drift was flagged by the Agency OS integrity audit (2026-06-05):** three different column structures (16 / 17 / 21) coexist for the same daily workflow. This file is the **single source of truth** for how they map. Any script, skill, or agent that reads or writes AnimalFood operational data must follow this map.

---

## 1. Purpose

Define **one canonical map** between every column structure used in the AnimalFood daily workflow:
- the **16-column** daily-plan output table (human-facing);
- the **17-column** live Google Sheet tab `01 · CALENDARIO OPERATIVO`;
- the legacy **21-column** `Hoja 1` structure;
- the **12-column** `05 · MÉTRICAS` tab;
- any CSV / local backup structures.

So that a field in one structure always maps unambiguously (or is explicitly documented as non-mapping) to every other.

## 2. Why this file exists

To prevent **silent field drift, broken automations, wrong appends, duplicate rows, and confusion** between human planning output and live Sheet structure. The human daily plan and the automated Sheet use *different* schemas; without a written map, a write can land in the wrong column, a row can duplicate, or a status can be mis-set. The integrity audit rated this a **medium risk**; this file closes it.

## 3. Current known structures

| Structure | Where | Columns | Language | Role |
|---|---|---:|---|---|
| Daily-plan output table | `animalfood-daily-plan` skill + command-center; CSVs in `docs/verticals/animalfood/daily-plans/` | 16 | English | **Human-facing** planning output |
| `01 · CALENDARIO OPERATIVO` | Live Google Sheet (A1:Q1) | 17 | Spanish | **Canonical live operational source** |
| `Hoja 1` | Live Google Sheet (A1:U1) | 21 | English | **Legacy/frozen backup** — do NOT use for new automation |
| `05 · MÉTRICAS` | Live Google Sheet | 12 | Spanish | Confirmed performance metrics (append-only on real data) |
| `animalfood-daily-sheet-state.md` | Local repo (Master Tracking Table) | 11 | English | **Backup/reference** state until Sheets fully stable |

## 4. Canonical live source

**The live operational source is the Google Sheet tab `01 · CALENDARIO OPERATIVO` (17 columns, A1:Q1).**
- The dashboard (`00`) and all automation read from `01`.
- `Hoja 1` (21-col) is **legacy/frozen backup** and must **not** be read or written by new automation.
- Local files (`animalfood-daily-sheet-state.md`, daily-plan CSVs) are **backup/reference**, not the live source.
- The daily-plan 16-column output is **human-facing**; any write to the live Sheet must map correctly to the 17-column `01` schema below.

## 5. Daily-plan 16-column output

Order as produced by the `animalfood-daily-plan` skill and the command-center required table (CSV header in `daily-plans/`):

| # | Column |
|---:|---|
| 1 | Date |
| 2 | Brand |
| 3 | Objective |
| 4 | Format |
| 5 | Content idea |
| 6 | Hook |
| 7 | CTA |
| 8 | Community action |
| 9 | Paid angle |
| 10 | Evidence / Confidence |
| 11 | Asset needed |
| 12 | Owner |
| 13 | Priority |
| 14 | Metric |
| 15 | Business impact |
| 16 | Next action |

## 6. Live Sheet `01 · CALENDARIO OPERATIVO` 17-column schema

Header at A1:Q1 (exact, Spanish, es-AR locale):

| Col | # | Field |
|---|---:|---|
| A | 1 | Fecha |
| B | 2 | Día |
| C | 3 | Hora |
| D | 4 | Cuenta |
| E | 5 | Marca / línea |
| F | 6 | Tipo de audiencia |
| G | 7 | Objetivo |
| H | 8 | Formato |
| I | 9 | Pieza / contenido |
| J | 10 | Estado |
| K | 11 | Responsable |
| L | 12 | Prioridad |
| M | 13 | ¿Es carry-over? |
| N | 14 | ¿Existe contenido previo? |
| O | 15 | Link archivo |
| P | 16 | Link post publicado |
| Q | 17 | Observaciones |

## 7. Legacy `Hoja 1` 21-column schema

Header at A1:U1 (English). **Frozen — reference only, no new automation.** Note: columns 1–16 are **identical to the daily-plan 16-column output**, plus 5 trailing operational columns.

| # | Field | | # | Field |
|---:|---|---|---:|---|
| 1 | Date | | 12 | Owner |
| 2 | Brand | | 13 | Priority |
| 3 | Objective | | 14 | Metric |
| 4 | Format | | 15 | Business impact |
| 5 | Content idea | | 16 | Next action |
| 6 | Hook | | 17 | Status |
| 7 | CTA | | 18 | Result |
| 8 | Community action | | 19 | Learning |
| 9 | Paid angle | | 20 | Carry-over action |
| 10 | Evidence / Confidence | | 21 | Notes |
| 11 | Asset needed | | | |

## 8. Field mapping table

Master mapping: **daily-plan 16-col → live `01` 17-col → legacy `Hoja 1` 21-col.**
"→ Q (Observaciones)" means the field has **no dedicated column** in `01` and must be folded into the free-text Observaciones cell.

| Daily-plan (16) | `01 · CALENDARIO` (17) | `Hoja 1` (21) | Notes |
|---|---|---|---|
| Date | A · Fecha | 1 · Date | Direct. Format `yyyy-MM-dd` (invariant). |
| Brand | **E · Marca / línea** (+ derive **D · Cuenta**) | 2 · Brand | ⚠️ `01` splits account vs brand. "Brand" (e.g. Catfeed) → Marca/línea; **Cuenta** must be derived via the account map (see §13). |
| Objective | G · Objetivo | 3 · Objective | Direct. |
| Format | H · Formato | 4 · Format | Direct. |
| Content idea | I · Pieza / contenido | 5 · Content idea | Direct. **Part of the dedup key (§9).** |
| Hook | → Q · Observaciones | 6 · Hook | No dedicated `01` column → fold into Observaciones. |
| CTA | → Q · Observaciones | 7 · CTA | Fold into Observaciones. |
| Community action | → Q · Observaciones | 8 · Community action | Fold into Observaciones. |
| Paid angle | → Q · Observaciones | 9 · Paid angle | Fold into Observaciones. |
| Evidence / Confidence | → Q · Observaciones | 10 · Evidence / Confidence | No dedicated `01` column. **UNCERTAIN** whether a dedicated column should be added later — see §15. |
| Asset needed | → Q · Observaciones | 11 · Asset needed | Fold into Observaciones. |
| Owner | K · Responsable | 12 · Owner | Direct (Gonzalo / Aranza-CM). |
| Priority | L · Prioridad | 13 · Priority | Values differ: see §10 note (Bandera/Alta/Media/Baja in `01`). |
| Metric | → Q · Observaciones (planning) / **05 · MÉTRICAS** (at close, real data only) | 14 · Metric | Planning-time metric note → Observaciones; confirmed metrics → `05` (§12). |
| Business impact | → Q · Observaciones | 15 · Business impact | Fold into Observaciones. |
| Next action | → Q · Observaciones | 16 · Next action | Fold into Observaciones. |
| *(none)* | B · Día | *(none)* | Derived from Fecha (day name). |
| *(none)* | C · Hora | *(none)* | Optional scheduled time; usually blank. |
| *(none)* | F · Tipo de audiencia | *(none)* | B2C / B2B / Institucional. **UNCERTAIN** auto-derivation — in the human plan it's implied by Objective; set explicitly when known. |
| *(Status, Hoja1 #17)* | J · Estado | 17 · Status | Status lives in `01.J`; the 16-col human plan has **no** Status column. Vocabularies differ → §10. |
| *(none)* | M · ¿Es carry-over? | 20 · Carry-over action | `01` uses Sí/No flag; Hoja 1 used a free-text action. Maps loosely. |
| *(none)* | N · ¿Existe contenido previo? | *(none)* | Sí/No; set Sí when found in `03 · BANCO` / `09 · IDEAS`. No 16-col equivalent. |
| *(none)* | O · Link archivo | *(none)* | Asset file link; blank until produced. |
| *(none)* | P · Link post publicado | *(none)* | Published post URL; blank until Publicado. |
| *(Result, Hoja1 #18)* | *(none in `01`; → 05 · MÉTRICAS)* | 18 · Result | Result is not a `01` column → confirmed outcomes go to `05` (§12). |
| *(Learning, Hoja1 #19)* | → Q · Observaciones | 19 · Learning | Qualitative learning folded into Observaciones; quantitative → `05`. |
| *(Notes, Hoja1 #21)* | → Q · Observaciones | 21 · Notes | Fold into Observaciones. |

## 9. Deduplication key

**Canonical dedup key = `Fecha` + `Cuenta` + `Pieza/contenido`** (`01` columns **A + D + I**).

- **No script, skill, or agent may APPEND a row without checking this key first.** If a row with the same Fecha+Cuenta+Pieza already exists, **UPDATE** that row instead of appending.
- Daily-plan 16-col equivalent: `Date` + `Brand` + `Content idea`.
- `Hoja 1` equivalent: `Date` + `Brand` + `Content idea` (legacy — reference only).
- **`05 · MÉTRICAS`:** dedup key is **UNCERTAIN / not yet enforced** — proposed key `Fecha` + `Cuenta` + `Pieza` (+ `Formato` if needed). The audit flagged the missing metrics dedup as a risk; treat metrics append as at-risk of duplication until this key is enforced in the 2300 script.

## 10. Status values

Two vocabularies exist. **The live `01.J · Estado` (Spanish) is canonical.** The local state file uses English; map as below.

| `01 · Estado` (canonical, Spanish) | `animalfood-daily-sheet-state.md` (English) |
|---|---|
| Idea | Idea |
| Brief listo | To prepare |
| En diseño | In production |
| En revisión | *(no clean equivalent — **UNCERTAIN**; closest: "In production/review")* |
| Aprobado | Ready |
| Programado | Scheduled |
| Publicado | Published |
| Medido | Measured |
| Pausado | Paused |
| Descartado | *(maps to discarded; state file uses "Carried over" for unfinished — **different concept**, see §11)* |

**Prioridad values (`01.L`):** `Bandera`, `Alta`, `Media`, `Baja`. The 16-col plan often uses P1/P2/P3 — map P1→Alta (or Bandera if critical), P2→Media, P3→Baja.

## 11. Carry-over rules

- Carry-over is tracked in `01` by the flag **`M · ¿Es carry-over?` = Sí/No** — **not** by a status value.
- The **23:00** close run sets `M = Sí` for any unfinished piece (Estado not in Publicado/Medido/Descartado).
- The **06:00** run re-creates each `M = Sí` piece for the new day **keeping its Estado exactly as-is** (never advancing it), unless a row with the same dedup key already exists for today (then skip).
- "Carried over" in the English state file ≈ `M = Sí`; do not confuse it with a Spanish Estado value (there is none for "carried over").

## 12. Metrics / Result / Learning rules

- **Confirmed quantitative metrics → `05 · MÉTRICAS` only**, appended by the 23:00 run **only when real, confirmed metrics exist**. Never invent or fill placeholder metrics.
- `05 · MÉTRICAS` columns (12): `Fecha, Cuenta, Marca, Pieza / contenido, Formato, Audiencia, Alcance, Interacciones, Guardados, Compartidos, Comentarios, Observación / aprendizaje`.
- **Result** (Hoja 1 #18) has no `01` column → confirmed outcomes live in `05`.
- **Learning** (Hoja 1 #19): qualitative → `01.Q · Observaciones`; quantitative → `05`.
- **Publicado** requires a link in `01.P`; **Medido** requires real metrics in `05`. Never set either without evidence (state-change guard).

## 13. Script usage rules

- Scripts write **only** to `01 · CALENDARIO OPERATIVO` (and `05 · MÉTRICAS` for confirmed metrics at 23:00). **Never** to `Hoja 1`.
- Before appending, **check the §9 dedup key** (Fecha+Cuenta+Pieza); update-not-append on a match.
- **Account map (Cuenta derivation):** `@animalfoodargentina` (Institucional / mother), `@canfeed.ar` (Canfeed + Catfeed), `@enercan.ar` (Enercan + Enercat), `@ironpet.ar` (IronPet dog + cat). A "Brand" in the human plan maps to its account here.
- Fold human-plan fields without a dedicated `01` column (Hook, CTA, Community action, Paid angle, Asset needed, Business impact, Next action, Evidence/Confidence, planning Metric) into `01.Q · Observaciones`.
- Preserve es-AR locale (formulas use `;`). Never touch row 1 (header).

## 14. Agent and skill usage rules

- `animalfood-daily-plan` may **output** the 16-column human table (its CSVs stay 16-col). When that plan is **written to the live Sheet**, it must be **mapped to the 17-column `01` schema** per §8 — not pasted 1:1.
- `agency-command-center` enforces the 16-column table as the human-facing format; it must not assume the live Sheet shares that schema.
- Any agent/skill proposing a Sheet write must reference this map and the §9 dedup key.
- No agent/skill may treat `Hoja 1` as live.

## 15. Migration / legacy notes

- `Hoja 1` (21-col) is the original flat structure; it is **frozen**. The 16-col daily-plan output is its columns 1–16. It remains only as historical backup; the rollback scripts in `scripts/backup/*.ps1.orig` still point at it (rollback path only).
- **UNCERTAIN / open question:** whether `01` should gain dedicated columns for Evidence/Confidence and audience-derived fields instead of folding them into Observaciones. Not decided — do **not** add columns to `01` without updating this map first.
- The local `animalfood-daily-sheet-state.md` (11-col) predates the live Sheet and remains backup until scheduling is fully stable (note: 0600 not yet validated — see HANDOFF).

## 16. Safety rules

- **The live source is `01 · CALENDARIO OPERATIVO`.** `Hoja 1` must not be used for new automation.
- **No append without checking the §9 dedup key** (Fecha + Cuenta + Pieza/contenido).
- **Any future Sheet tab or CSV format must be added to this map BEFORE any automation writes to it.** No undocumented structure may receive automated writes.
- If a field is missing from one structure, document how it maps or why it does not — **never invent** a mapping; mark **UNCERTAIN** instead.
- Respect the state-change guard: never advance Estado without an explicit signal; never Publicado without a link; never Medido without real metrics.
- Do not modify this file's canonical decisions casually — schema drift is a flagged risk; changes here are architectural and must be intentional.

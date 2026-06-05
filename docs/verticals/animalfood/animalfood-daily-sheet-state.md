# AnimalFood — Daily Sheet State

> Internal backup for the AnimalFood daily planning sheet. **Google Sheets is now connected** (see "Google Sheets — Live" below). AnimalFood-only — keep separate from Lvanto, Sileoni, and future clients.
> Related: `animalfood-daily-operator.md`, `animalfood-content-log.md`, `.claude/skills/animalfood-daily-plan/SKILL.md`, `docs/integrations/google-sheets-mcp-install-checklist.md`.

## Google Sheets — Live (2026-06-04)

The Google Sheet **"AnimalFood Daily Operations"** is now the **live operational view**:
- **Sheet ID:** `1kHApdwpoo9zyOoxEdvTr6YnPoH164BAlEN6hZqYUf8U` · **Tab:** `Hoja 1`.
- Read/write via the `google-sheets` MCP (OAuth) is **working and validated**.
- **Header row** `A1:U1` written and validated (21 columns).
- Today's **3 carry-over rows mirrored** to `A2:U4` (Catfeed = To prepare, Canfeed = To prepare, Animalfood institucional = Idea).

**Dashboard operativo (2026-06-04):** el Sheet se reestructuró a 10 pestañas (00 DASHBOARD … 09 IDEAS DESCARTADAS O REPETIDAS) en modo **aditivo** — `Hoja 1` quedó intacta y la automatización 06/15/23 la sigue usando. El plan diario operativo nuevo vive en `01 · CALENDARIO OPERATIVO` (17 columnas) con DASHBOARD de KPIs/alertas. Cuentas: @animalfoodargentina, @canfeed.ar (Canfeed+Catfeed), @enercan.ar (Enercan+Enercat), @ironpet.ar. **Doble fuente temporal** hasta repuntar los scripts de `Hoja 1` a `01 · CALENDARIO OPERATIVO`. Notas técnicas: locale es-AR (fórmulas con `;`); el control de repetición vive en `03 · BANCO DE CONTENIDOS` + alerta "idea repetida" del DASHBOARD.

**Rule (Google Sheet = live operational view):**
- The Google Sheet is now the **live operational view**.
- This local state file remains the **backup** until scheduling (06:00/15:00/23:00) is fully tested.
- **Do not duplicate rows** — one row per brand/action.
- **Update rows only when Status / Result / Learning changes** (otherwise leave them as-is).

## Purpose

This file works as the internal source of truth for the AnimalFood daily planning sheet until Google Sheets is connected. It tracks what is **planned**, what is **pending**, what was **executed**, what needs **measurement**, and what should be **carried into the next day** — so the daily plan stays connected across days instead of restarting from zero each morning.

## Sheet State Protocol

Before generating a new daily plan, Claude must check:
- what was planned previously;
- what is still pending;
- what was published;
- what needs measurement;
- what should not be repeated;
- what action carries over.

## Status Values

Use one of:
- **Idea**
- **To prepare**
- **In production**
- **Ready**
- **Scheduled**
- **Published**
- **Measured**
- **Paused**
- **Carried over**

## Master Tracking Table

| Date | Brand | Content / Campaign | Format | Owner | Status | Metric to watch | Result | Learning | Carry-over action | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| 2026-06-04 | Catfeed | "Tu gato no es un perro chico" | Carrusel 5 slides | Gonzalo | To prepare |  Saves + shares + comments |  |  |  | Aprobada a producir; confirmar si ya está diseñada |
| 2026-06-04 | Canfeed | Five S Plus — Pilar 1 (Protect Pack) + PSD reutilizable | Carrusel 4 slides | Gonzalo → Aranza | To prepare | Shares + saves |  |  |  | PSD con capas para que Aranza arme pilares 2–5 |
| 2026-06-04 | Animalfood (institucional) | Repost institucional placa pilar (bajada "respaldo") | Story repost | Aranza/CM | Idea | Profile visits + DM quality |  |  |  | Reusa placa Canfeed; publicar tras aprobación de Gonzalo |

## Rules

- This file must be checked **before every new daily plan**.
- Do not repeat content unless there is a strategic reason.
- If yesterday's plan was not completed, carry over **only what still matters**.
- If results are missing, ask Gonzalo or Aranza for the **critical metric**.
- Use this file to keep the daily plan **connected across days**.
- This is **not** a replacement for Google Sheets; it is the **local source of truth until integration**.

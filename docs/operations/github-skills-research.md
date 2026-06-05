# GitHub Skills Research Tracker

## 1. Purpose

This document tracks external Claude Code skills, subagents, and templates found on GitHub before any of them are imported into Lvanto Agency OS. No external resource is added to `.claude/` without passing the criteria below and receiving explicit operator approval.

---

## 2. Selection Criteria

A candidate is worth reviewing if it meets most of the following:

- **Direct usefulness** for Lvanto services: landing pages, paid ads, SEO, social media, frontend, automations, or agency operations.
- **Low token overhead**: concise instructions, no bloated prompts or unnecessary context.
- **No unsafe hooks or auto-executing scripts**: must not run shell commands, install packages, or call external APIs without explicit user action.
- **Easy to adapt**: structured as plain markdown files that can be copied into `.claude/skills/` with minimal changes.
- **Clear license or public repo**: MIT, Apache 2.0, or clearly public with no usage restrictions.
- **Commercially applicable**: outputs must be usable in real client deliverables without heavy rewriting.

---

## 3. Candidate Repositories

| # | Repository | Description |
|---|---|---|
| 1 | `coreyhaines31/marketingskills` | Marketing skills: CRO, copywriting, SEO, analytics, growth engineering |
| 2 | `davila7/claude-code-templates` | Templates, agents, commands, hooks, MCPs, and skills collection |
| 3 | `VoltAgent/awesome-claude-code-subagents` | Curated Claude Code subagents collection |
| 4 | `VoltAgent/awesome-agent-skills` | Broad agent skills collection across many domains |
| 5 | `alirezarezvani/claude-skills` | Large Claude skills and plugins collection |
| 6 | `AgriciDaniel/claude-ads` | Paid advertising audit skill |
| 7 | `anthropics/claude-code` (frontend-design skill) | Official Anthropic frontend design skill |

---

## 4. Evaluation Table

| Repository | Category | Potential Use for Lvanto | Risk Level | Action | Notes |
|---|---|---|---|---|---|
| `coreyhaines31/marketingskills` | Marketing | CRO audits, copy review, SEO, growth strategy | Low | Review first | Directly aligned with agency services |
| `anthropics/claude-code` (frontend-design) | Frontend | Landing page design direction, UI structure | Low | Review second | Official source — highest trust level |
| `AgriciDaniel/claude-ads` | Paid Ads | Meta Ads / Google Ads audit and planning | Low–Medium | Review third | Verify scope before importing |
| `davila7/claude-code-templates` | Multi-purpose | Agents, hooks, MCPs — broad reference | Medium | Review for structure | Useful as structural reference; filter carefully |
| `VoltAgent/awesome-claude-code-subagents` | Subagents | Reference for subagent design patterns | Medium | Review selectively | Curated list — verify each entry individually |
| `VoltAgent/awesome-agent-skills` | Multi-domain | Broad skills; filter for marketing/ops relevance | Medium | Review selectively | Large scope — needs filtering |
| `alirezarezvani/claude-skills` | Multi-domain | Large collection — unknown quality per skill | Medium–High | Review last | Audit each skill before adopting |

**Risk levels defined:**
- **Low** — official or well-scoped, markdown-only, no hooks.
- **Medium** — public but unverified; inspect for hooks or auto-executing scripts before importing.
- **High** — broad, unverified, or complex; review each file individually before any use.

---

## 5. Initial Recommendation

Review in this order:

1. **`coreyhaines31/marketingskills`** — highest direct value for Lvanto. CRO and copywriting skills map directly to landing pages and campaign work.
2. **`anthropics/claude-code` frontend-design skill** — official source, low risk, useful for landing page and web project workflows.
3. **`AgriciDaniel/claude-ads`** — if Lvanto is actively running paid campaigns, this could become a core skill quickly.
4. **`VoltAgent/awesome-claude-code-subagents`** — review for structural patterns and subagent design inspiration.
5. **`davila7/claude-code-templates`** — broad reference for agents, hooks, and MCPs; filter carefully for relevant items.

> **Do not install or copy anything until each repository is reviewed and explicitly approved.**

**Before importing any skill:**
1. Read the full file.
2. Confirm no hooks or shell commands run automatically.
3. Get operator approval.
4. Copy into `.claude/skills/<skill-name>/SKILL.md` and adapt to Lvanto context.

---

## Review 1 — coreyhaines31/marketingskills

**Status:** Approved for manual review. Not approved for bulk installation.

**Reason:**
This repository is highly aligned with Lvanto services because it focuses on CRO, copywriting, SEO, analytics, paid ads, content strategy, and growth engineering. However, importing every skill at once would create noise and unnecessary overhead.

**Initial candidates for selective adaptation:**
1. copywriting
2. page-cro / CRO
3. seo-audit
4. paid-ads
5. content-strategy
6. social-content
7. email-sequence
8. pricing-strategy

**Decision:**
Do not run npx installers yet. Review each candidate skill manually, copy only the useful logic, and adapt it into Lvanto-specific local skills under `.claude/skills/`.

**Recommended first import candidate:**
`copywriting` — because it will support landing pages, ads, proposals, social content, and client messaging.

---

## Review 2 — anthropics/claude-code frontend-design skill

**Status:** Approved for manual review. Not approved for direct copy yet.

**Reason:**
The frontend-design skill is relevant because Lvanto will sell landing pages, websites, and visual implementation services. It can help translate strategy and copy into stronger interface decisions: layout, hierarchy, spacing, visual polish, responsive behavior, and brand consistency.

**Potential use for Lvanto:**
1. Landing page visual direction
2. Website section layout
3. UI hierarchy review
4. Responsive design checks
5. Visual consistency before client delivery
6. Frontend implementation guidance

**Decision:**
Do not copy the official skill directly yet. Review the structure and adapt the useful logic into a Lvanto-specific local skill focused on commercial websites and landing pages.

**Recommended local skill name:** `lvanto-frontend-design`

---

*Last updated: 2026-06-03*

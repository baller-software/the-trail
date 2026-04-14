---
spec-version: v1
---

# Competitive Research

## 1. Research Summary

- **Date of research:** 2026-04-14
- **Competitors analyzed:**
  - [Internet Archive — Oregon Trail collections](https://archive.org/details/OregonTrailMainframe) (various editions via in-browser emulation)
  - [The Oregon Trail (2021) — Gameloft/HMH](https://store.steampowered.com/app/2013360/The_Oregon_Trail/) (modernized commercial remake)
- **Research scope:** Surface-level, gameplay-focused comparison
- **Source product profile:** `gspec/profile.md`

## 2. Competitor Profiles

### Internet Archive

- **What they do:** Hosts playable versions of multiple Oregon Trail editions via in-browser emulation. The closest to the 1971 original is a 2015 Applesoft BASIC reconstruction of the 1975 HP BASIC source code, running on a JavaScript Apple IIe emulator.
- **Key features and capabilities:**
  - Multiple versions available: 1975 mainframe reconstruction, 1990 MS-DOS, 1992 Deluxe, 1995 Oregon Trail II
  - In-browser emulation via EM-DOSBOX (MS-DOS titles) and JavaScript Apple IIe emulator (mainframe version)
  - Zero-cost, no account required
  - Text-based gameplay preserved in the 1975 mainframe version
  - Core mechanics: supply purchasing, hunting (speed-typing "BANG"), random events, river crossings, fort stops, turn-based travel
- **Strengths:** Zero-friction browser access; broad version coverage; significant community engagement (millions of views); free
- **Weaknesses:** No save states; no onboarding or historical context; CPU-heavy emulation can stutter; no mobile optimization; the 1975 version is a third-party reconstruction, not the authentic 1971 teletype experience; no curated landing page connecting the versions

### Gameloft / Houghton Mifflin Harcourt (2021)

- **What they do:** Released a modernized remake of the Oregon Trail based on the 1985 MECC edition. Multi-platform commercial release.
- **Key features and capabilities:**
  - Pixel-art characters with 3D environments and modern visual effects
  - Resource management (food, equipment, health, morale, hygiene)
  - Hunting/fishing/foraging mini-games
  - Branching narrative with dialogue, side quests, multiple routes
  - Improved historical representation (Native American and Black perspectives)
  - Available on Apple Arcade ($6.99/mo), Steam/Switch ($29.99), Xbox, PlayStation
  - Cosmetic retro visual filter (does not affect gameplay)
- **Strengths:** Strong production values; improved representation; no predatory monetization; faithful to the spirit of the franchise; Metacritic 76/100
- **Weaknesses:** Not based on the 1971 original; difficulty too easy for experienced players; limited replayability; UI feels mobile-first on console; no classic gameplay mode; requires purchase or subscription

## 3. Competitive Feature Matrix

| Feature / Capability | Internet Archive | Gameloft/HMH (2021) | Our Product (Specified) |
|---|---|---|---|
| 1971 original gameplay fidelity | Partial (1975 reconstruction) | ❌ (based on 1985 edition) | ✅ (core mission) |
| Text-based terminal interface | ✅ (1975 version only) | ❌ (pixel art + 3D) | ✅ |
| Monochrome terminal aesthetic | ❌ (emulated Apple II look) | ❌ (cosmetic filter only) | ✅ |
| Browser-based, no install | ✅ | ❌ (app store / Steam) | ✅ |
| Free, no account | ✅ | ❌ ($6.99/mo or $29.99) | ✅ |
| Supply purchasing | ✅ | ✅ | Specified |
| Hunting mechanic | ✅ | ✅ (mini-game) | Specified |
| Random events (disease, weather) | ✅ | ✅ | Specified |
| River crossings | ✅ | ✅ | Specified |
| Fort / resupply stops | ✅ | ✅ | Specified |
| Turn-based travel | ✅ | ✅ | Specified |
| Onboarding / instructions | ❌ | ✅ | Specified |
| Save / load game state | ❌ | ✅ | ❌ |
| Mobile support | ❌ | ✅ (mobile-first) | ❌ (desktop-focused) |
| Historical context / about page | ❌ | ✅ (narrative) | ❌ |

## 4. Categorized Findings

### Table-Stakes Features

Features that every Oregon Trail version includes. Users expect these as baseline gameplay.

- **Supply purchasing** — Buy supplies (food, ammunition, clothing, oxen, miscellaneous supplies) at the start and at forts. Offered by: both competitors. Our status: Specified.
- **Hunting mechanic** — The original used a speed-typing challenge ("BANG"). Present in all versions in some form. Offered by: both competitors. Our status: Specified.
- **Random events** — Disease, bad weather, broken equipment, theft, hostile encounters. Core to the Oregon Trail experience. Offered by: both competitors. Our status: Specified.
- **River crossings** — Decision point: ford, caulk and float, or wait. Offered by: both competitors. Our status: Specified.
- **Fort / resupply stops** — Periodic opportunities to buy more supplies. Offered by: both competitors. Our status: Specified.
- **Turn-based travel system** — Travel proceeds in discrete turns (two-week intervals in the 1971 original). Offered by: both competitors. Our status: Specified.

### Differentiating Features

Features that only some competitors offer.

- **Onboarding / gameplay instructions** — Gameloft includes onboarding; the Internet Archive drops players in cold. The 1971 original printed a brief intro and instructions at game start, so including them is historically authentic. Our status: Specified.
- **Save / load game state** — Gameloft supports saves; Internet Archive does not. Our status: Not included (user decision — a full game fits in one session).

### White-Space Features

Capabilities that no competitor does well or at all.

- **True 1971 gameplay fidelity** — Neither competitor offers a faithful recreation of the original 1971 game. The Internet Archive's closest is a third-party 1975 reconstruction. Gameloft is based on the 1985 edition. This is the product's core differentiator.
- **Monochrome terminal aesthetic** — No competitor replicates the green/amber-on-black terminal look of the era. Gameloft's retro filter is cosmetic only. This is a strong visual differentiator.

## 5. Gap Analysis

Gap analysis was performed against the product profile's stated goals and use cases (no feature PRDs exist yet).

### Specified Features Already Aligned

- **Browser-based, no install** — Matches the Internet Archive's zero-friction model while avoiding Gameloft's app store / purchase requirement.
- **Free, no account** — Matches Internet Archive; differentiates from Gameloft's paid model.
- **Core gameplay mechanics** — Supply purchasing, hunting, random events, river crossings, fort stops, and turn-based travel are all implied by the profile and align with table-stakes expectations.

### Table-Stakes Gaps (High Priority)

No table-stakes gaps — all core gameplay mechanics are accounted for in the product profile.

### Differentiation Gaps

- **Save / load** — Would differentiate against Internet Archive, but excluded by user decision. Revisit if user feedback indicates session loss is a problem.

### White-Space Opportunities

- **1971 gameplay fidelity** — The product's primary white-space claim is confirmed by research. No competitor serves this niche.
- **Monochrome terminal aesthetic** — Confirmed as unoccupied territory. A purpose-built terminal UI is a strong differentiator.

### Excluded by Design

- **Modern graphics / pixel art** — Contradicts "What It Isn't" (not a modern remake). Gameloft's approach is explicitly out of scope.
- **Mobile-first design** — Profile states the experience is designed for desktop. Mobile is not a target.
- **Multiplayer** — Profile explicitly excludes multiplayer.
- **Educational platform features** — Profile explicitly excludes curriculum integration.
- **Narrative / branching storylines** — Gameloft's dialogue and side quests are modernizations that contradict 1971 fidelity.

## 6. Additional Feature Proposals

Features proposed beyond competitive findings, informed by the product profile's mission, target audience, and use cases.

### Proposed

- **About / preservation context page** — A static page explaining the game's 1971 origins. Connects to the "historical curiosity" use case and the preservation mission. Suggested priority: P2. Standalone. **Rejected by user** — not needed for this scope.
- **Shareable result screen** — End-of-game summary supporting the "sharing the experience" use case. Suggested priority: P2. Standalone. **Rejected by user.**

## 7. Accepted Findings & Proposals

### Accepted for Feature Development

- **Core gameplay mechanics** (supply purchasing, hunting, random events, river crossings, fort/resupply stops, turn-based travel) — Source: competitive table-stakes. Category: table-stakes. Priority: P0.
- **Onboarding / gameplay instructions** — Source: competitive differentiator + historical authenticity. Category: differentiating. Priority: P1.
- **1971 gameplay fidelity** — Source: white-space analysis. Category: white-space. Priority: P0.
- **Monochrome terminal aesthetic** — Source: white-space analysis. Category: white-space. Priority: P0.

### Rejected

- **Save / load game state** — User decision: not needed right now. A full game fits within a single session.
- **About / preservation context page** — User decision: not needed for current scope.
- **Shareable result screen** — User decision: not needed.

### Modified

None.

## 8. Strategic Recommendations

- **Competitive positioning is strong.** The product occupies a genuine white space — no competitor offers a faithful, purpose-built browser recreation of the 1971 original. The Internet Archive's closest offering is a third-party reconstruction of the 1975 source, and Gameloft targets a completely different market segment.
- **Top priorities:** Nail the core gameplay mechanics (P0) and the monochrome terminal aesthetic (P0). These two together create the authentic 1971 experience that is the product's entire value proposition.
- **Onboarding matters more than it seems.** The Internet Archive's lack of instructions is a real weakness. Including the original's intro text is both historically authentic and practically useful — it lowers the barrier for the "historical curiosity" audience who never played the original.
- **Revisit save/load post-launch.** If user feedback indicates that accidental tab closures or interrupted sessions are common pain points, browser-based save (localStorage) would be a low-effort, high-value addition.

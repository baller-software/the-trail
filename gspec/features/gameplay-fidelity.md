---
spec-version: v1
---

# Feature: 1971 Gameplay Fidelity

## Overview

**Feature Name:** 1971 Gameplay Fidelity
**Summary:** Ensure the game faithfully recreates the specific mechanics, structure, and feel of the original 1971 Oregon Trail — not the 1985 MECC version, not a modern reinterpretation, but the game as originally designed by Rawitsch, Heinemann, and Dillenberger.

**Problem:** No existing Oregon Trail product faithfully recreates the 1971 original. The Internet Archive's closest offering is a third-party reconstruction of the 1975 BASIC source code running through an emulator. The official Gameloft/HMH franchise is based on the 1985 edition with heavy modernization. Players and preservationists who want the authentic 1971 experience have nowhere to go.

**Why now:** This is the product's core differentiator and entire reason for existing. Fidelity to the 1971 original is not a nice-to-have — it is the value proposition.

## Users & Use Cases

- **Nostalgic adults** who played the original in school want the game they remember, not a modernized version wearing retro clothing.
- **Retro computing enthusiasts** value historical accuracy and will notice deviations from the documented original.
- **First-time players** drawn by cultural curiosity want to understand what the actual 1971 experience was like, not a polished approximation.

## Scope

### In-Scope Goals

- Match the original 1971 game's structure: a linear westward journey divided into discrete two-week turns
- Reproduce the original's decision points and player inputs (numeric choices, typed responses)
- Use the original's event types and probability model as closely as documentation allows
- Preserve the original's text-only interaction model — no graphical mini-games, no mouse-driven UI within gameplay
- Match the original's tone and writing style (terse, informational, uppercase text)
- Reproduce the original's hunting mechanic (speed-typing challenge)
- Follow the original's win/loss conditions and game flow

### Out-of-Scope

- Features from later editions (1978, 1985, 1990) that were not in the 1971 original
- Tombstone messages, party naming, occupation selection (these were added in later versions)
- Animated graphics, pixel art, or any visual elements beyond text
- Difficulty levels or configurable settings not present in the 1971 original
- Romanticized or narrative embellishments — the original was terse and functional

### Deferred Ideas

- A "differences from the original" documentation page noting any known deviations
- Support for the 1975 or 1978 revisions as alternate play modes

## Capabilities

### P0 — Core Fidelity Requirements

- [ ] Game structure matches the 1971 original's turn-based journey format
  - The journey is divided into approximately 12 two-week turns
  - Each turn follows the original's sequence: status display, decision prompt, event resolution, travel progress
  - The route follows the historical landmarks from the 1971 version

- [ ] Player inputs match the original's interaction style
  - Players respond to numbered prompts by typing a number
  - Players enter dollar amounts for purchases
  - Players type responses for the hunting mechanic
  - No point-and-click or graphical interaction within the game

- [ ] Event types and probabilities follow the 1971 original's documented model
  - Random events are drawn from the same categories as the original (illness, weather, equipment, encounters)
  - Event probabilities are calibrated to match documented values where available
  - Any approximations are documented for transparency

- [ ] Game text matches the tone and style of the 1971 original
  - All in-game text is uppercase
  - Prompts are terse and functional, not narrative or descriptive
  - Text follows the original's phrasing where documented (e.g., "DO YOU WANT TO EAT" not "Would you like to have a meal?")

- [ ] The hunting mechanic uses the original's speed-typing approach
  - The player must type a specific word (e.g., "BANG") as quickly as possible
  - The amount of food obtained is inversely proportional to response time
  - Ammunition is consumed per hunting attempt

### P1 — Authenticity Details

- [ ] Supply categories and pricing reflect the 1971 original's values
  - Item types match what the original offered (oxen, food, ammunition, clothing, miscellaneous supplies)
  - Prices and starting budget match documented values where available

- [ ] Game difficulty and survival odds approximate the original's balance
  - The game is challenging — reaching Oregon should not be trivially easy
  - Random events create genuine tension and resource pressure
  - The experience should feel comparable to documented accounts of the original's difficulty

## Dependencies

- **Core gameplay mechanics** — This feature defines the fidelity standard that core mechanics must meet
- **Monochrome terminal aesthetic** — The visual presentation is part of the fidelity equation

## Assumptions & Risks

### Assumptions

- Identified as a white-space feature during competitive analysis — no competitor faithfully recreates the 1971 original
- The 1971 game's mechanics are documented well enough through published source code listings (the BASIC source has been reprinted in multiple publications), academic papers, and community knowledge
- Minor approximations are acceptable where exact values are undocumented, as long as the overall feel is authentic

### Open Questions

- Which specific publication of the BASIC source code is most authoritative?
- Are there any gameplay mechanics in the 1971 original that are commonly misattributed from later versions?
- How did the original handle edge cases (e.g., zero food, zero ammunition, all party members sick)?

### Key Risks and Mitigations

- **Risk:** The 1971 source is incomplete or ambiguous on certain mechanics. **Mitigation:** Cross-reference multiple sources; document any gaps and the choices made to fill them.
- **Risk:** Strict fidelity produces a game that feels broken or unfair by modern standards (e.g., pure RNG deaths). **Mitigation:** Preserve the original behavior — this is a preservation project, not a balance patch. Set expectations in onboarding.

## Success Metrics

- Players familiar with the original report that the experience feels authentic
- Game structure, events, and mechanics can be traced to documented 1971 source material
- No features from later editions (1985, 1990) are present unless they were also in the 1971 original

## Implementation Context

This feature describes product requirements only. Implementation details — including technology choices, architecture, and code structure — are defined elsewhere and may vary across projects.

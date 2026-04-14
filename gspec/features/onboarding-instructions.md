---
spec-version: v1
---

# Feature: Onboarding Instructions

## Overview

**Feature Name:** Onboarding Instructions
**Summary:** Display a brief introduction and gameplay instructions when the player starts a new game, faithful to the original 1971 game's opening text.

**Problem:** The Internet Archive drops players into Oregon Trail with no context or instructions — a known weakness. The 1971 original actually printed introductory text explaining the premise and basic mechanics before gameplay began. Including historically authentic onboarding serves both preservation fidelity and practical usability for players unfamiliar with the game.

**Why now:** This is a low-effort feature that improves first-time player experience while reinforcing the product's authenticity. It differentiates against the Internet Archive's cold-start approach.

## Users & Use Cases

- **First-time players** exploring the game out of historical curiosity need to understand the premise and basic mechanics before making their first decisions.
- **Nostalgic players** may remember the introductory text and expect to see it — its absence would feel like something is missing.
- **Quick-session players** need to get oriented fast so they can start playing within the first minute.

## Scope

### In-Scope Goals

- Display introductory text at the start of a new game explaining the journey premise
- Provide basic gameplay instructions (what decisions the player will make, what resources they manage)
- Match the tone and style of the 1971 original's opening text as closely as documentation allows
- Allow the player to proceed to gameplay after reading the introduction

### Out-of-Scope

- A tutorial mode that walks through gameplay step-by-step
- Contextual help or hints during gameplay
- A separate "How to Play" page outside the game flow
- Historical educational content about the real Oregon Trail
- Animated or graphical onboarding sequences

### Deferred Ideas

- An option to skip the introduction on repeat plays
- A "first time?" prompt that shows extended instructions only for new players

## Capabilities

### P1 — Core Onboarding

- [x] A new game begins with introductory text displayed in the terminal
  - The text explains the journey premise (who you are, where you're going, when, and why)
  - The text is presented in the same terminal style as all other game text (uppercase, monospace, phosphor-colored)
  - The introduction fits on approximately one screen of terminal output

- [x] Basic gameplay instructions are presented before the first player decision
  - The player understands what resources they will manage (food, ammunition, clothing, oxen, miscellaneous supplies)
  - The player understands the basic structure (travel in turns, make decisions, respond to events)
  - Instructions are terse and functional, matching the 1971 original's style

- [x] The player can proceed from the introduction to gameplay with a simple input
  - A prompt (e.g., "PRESS ENTER TO BEGIN") signals the transition from intro to gameplay
  - No multi-step onboarding flow — one screen of text, then play

### P1 — Authenticity

- [x] Introduction text follows the documented phrasing of the 1971 original where available
  - Cross-referenced against published source code and historical accounts
  - Any deviations from the original text are noted internally for transparency

## Dependencies

- **Core gameplay mechanics** — Onboarding leads directly into the first gameplay decision (supply purchasing)
- **1971 gameplay fidelity** — The introduction text must match the original's documented opening
- **Monochrome terminal aesthetic** — The introduction renders through the terminal interface

## Assumptions & Risks

### Assumptions

- Identified as a differentiating feature during competitive analysis — the Internet Archive lacks onboarding; the 1971 original included it
- The original 1971 game's introductory text is documented in published source code listings
- Players will read the introduction at least on their first play; repeat players will skim past it quickly

### Open Questions

- What was the exact introductory text in the 1971 original? Verify against the BASIC source listing.
- Did the original separate the introduction from the first purchasing prompt, or were they on the same screen?

### Key Risks and Mitigations

- **Risk:** The introduction is too long and delays eager players from getting to gameplay. **Mitigation:** Keep it to one screen of text — the original was brief.
- **Risk:** The documented original text is incomplete or ambiguous. **Mitigation:** Reconstruct from the closest available source; note any approximations.

## Success Metrics

- First-time players understand the game premise and basic mechanics before their first decision
- The introduction text is consistent with documented 1971 source material
- Players reach actual gameplay (supply purchasing) within 30 seconds of starting a new game

## Implementation Context

This feature describes product requirements only. Implementation details — including technology choices, architecture, and code structure — are defined elsewhere and may vary across projects.

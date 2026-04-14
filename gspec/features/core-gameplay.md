---
spec-version: v1
---

# Feature: Core Gameplay Mechanics

## Overview

**Feature Name:** Core Gameplay Mechanics
**Summary:** The essential game systems that make up a complete Oregon Trail playthrough — supply management, hunting, random events, river crossings, fort stops, and turn-based travel.

**Problem:** Without these mechanics, there is no game. Every version of Oregon Trail — from the 1971 original to modern remakes — includes these systems. Players expect them as baseline functionality. The game is defined by the interplay of resource management, random chance, and player decision-making across a multi-turn westward journey.

**Why now:** These are the foundational systems the entire product depends on. Nothing else can be built or tested without them.

## Users & Use Cases

- **Nostalgic players** revisiting the game want to recognize the same decision points they remember — buying oxen, rationing food, deciding whether to ford a river.
- **First-time players** exploring the game out of curiosity need intuitive mechanics that are self-explanatory through the text prompts.
- **Quick-session players** need a complete gameplay loop that can be experienced in 15–30 minutes.

## Scope

### In-Scope Goals

- Implement the full gameplay loop from departure (Independence, Missouri) to arrival (Oregon's Willamette Valley) or player death
- Supply purchasing at game start and at fort stops along the trail
- Hunting mechanic faithful to the original (speed-typing challenge)
- Random event system covering disease, weather, equipment failure, theft, and encounters
- River crossing decision points (ford, caulk and float, wait, ferry)
- Fort and landmark stops for resupply and rest
- Turn-based travel with discrete time intervals
- Party health and resource tracking across turns
- Win/loss conditions (reach Oregon or all party members die)

### Out-of-Scope

- Save/load functionality (excluded per product decision)
- Multiplayer of any kind
- Side quests, branching narratives, or modern story elements
- Mini-games beyond the original hunting mechanic
- Difficulty settings beyond what existed in the 1971 original

### Deferred Ideas

- Scoring system based on remaining supplies and party health at journey's end
- Detailed per-party-member health tracking (if the original supported it)

## Capabilities

### P0 — Required for a Complete Game

- [x] Player can purchase initial supplies (food, ammunition, clothing, oxen, miscellaneous supplies) with a fixed starting budget
  - Starting budget and item prices reflect the 1971 original's values
  - Player receives feedback on total spent and remaining funds
  - Purchases affect gameplay outcomes throughout the journey

- [x] Travel proceeds in discrete turns representing time intervals along the trail
  - Each turn advances the party a variable distance based on conditions
  - Turn progression displays distance traveled and distance remaining
  - The journey covers named landmarks matching the historical route

- [x] Player can go hunting to acquire food during travel
  - Hunting uses the original speed-typing mechanic (type a word quickly for better results)
  - Hunting consumes ammunition
  - Food acquired depends on typing speed / accuracy

- [x] Random events occur during travel based on probability
  - Events include disease, bad weather, broken wagon parts, lost trail, theft, and hostile encounters
  - Event outcomes affect supplies, health, and travel progress
  - Event frequency and severity are calibrated to the original game's probability tables

- [x] Player encounters river crossings that require a decision
  - Options include fording, caulking the wagon and floating, waiting for conditions to improve, or paying for a ferry
  - Each option carries risk proportional to river conditions
  - Failed crossings can result in lost supplies or party member deaths

- [x] Player reaches fort and landmark stops along the trail
  - Forts allow purchasing additional supplies
  - Landmarks provide progress milestones and contextual text

- [x] Party health and resources are tracked and displayed between turns
  - Food is consumed each turn based on ration settings
  - Party members can fall ill and die
  - Running out of critical supplies (food, oxen) creates dire consequences

- [x] The game ends when the party reaches Oregon or all members die
  - Reaching Oregon displays a success message
  - Party death displays a failure message with cause
  - The player can start a new game after completion

### P1 — Important for Authentic Feel

- [x] Player can set travel pace (affecting speed, health, and supply consumption)
  - Faster pace covers more distance but increases risk of illness and supply depletion
  - Slower pace is safer but risks arriving too late in the season

- [x] Player can set food ration level (filling, meager, bare bones)
  - Ration level affects party health and food consumption rate
  - Lower rations increase risk of illness

- [x] Weather and seasonal changes affect travel conditions
  - Later months bring harsher conditions (cold, snow)
  - Weather affects event probabilities and travel speed

## Dependencies

- **Monochrome terminal aesthetic** — All gameplay is rendered through the terminal interface
- **1971 gameplay fidelity** — Mechanics must match the original game's documented behavior

## Assumptions & Risks

### Assumptions

- Identified as a table-stakes feature set during competitive analysis — every Oregon Trail version includes these mechanics
- The 1971 original's mechanics are sufficiently documented through published source code listings, academic papers, and community knowledge to enable accurate recreation
- A complete game can be played in a single session (15–30 minutes), so save/load is not required

### Open Questions

- What are the exact probability tables for random events in the 1971 original?
- What were the precise item prices and starting budget?
- How did the original calculate travel distance per turn?

### Key Risks and Mitigations

- **Risk:** Incomplete documentation of original mechanics leads to inaccurate recreation. **Mitigation:** Cross-reference multiple historical sources; document any approximations.
- **Risk:** Gameplay balance feels off without the original's exact values. **Mitigation:** Playtest extensively and adjust based on feel, noting any deviations from documented values.

## Success Metrics

- Players can complete a full game (reach Oregon or die) without encountering broken mechanics or dead ends
- All core decision points (purchasing, hunting, river crossings, pace/rations) are functional and affect outcomes
- A complete playthrough takes 15–30 minutes

## Implementation Context

This feature describes product requirements only. Implementation details — including technology choices, architecture, and code structure — are defined elsewhere and may vary across projects.

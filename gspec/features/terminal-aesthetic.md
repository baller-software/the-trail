---
spec-version: v1
---

# Feature: Monochrome Terminal Aesthetic

## Overview

**Feature Name:** Monochrome Terminal Aesthetic
**Summary:** Present the entire game through a monochrome CRT terminal interface — green or amber phosphor text on a black background — replicating the visual experience of the 1970s computer labs where the original Oregon Trail was played.

**Problem:** No existing Oregon Trail product delivers an authentic terminal visual experience. The Internet Archive renders the game through emulators that approximate but don't purposefully recreate the aesthetic. Gameloft's retro visual filter is purely cosmetic and sits on top of a modern pixel-art game. A purpose-built terminal interface is a strong visual differentiator that reinforces the product's authenticity mission.

**Why now:** The visual presentation is inseparable from the gameplay experience for a text-based terminal game. The aesthetic isn't a skin — it's the product identity.

## Users & Use Cases

- **Nostalgic players** associate Oregon Trail with green or amber text on a black screen. The visual triggers the memory before the gameplay does.
- **Retro computing enthusiasts** appreciate accurate CRT simulation as part of the preservation value.
- **First-time players** need the visual context to understand that this is a historical artifact, not a broken modern game with missing graphics.

## Scope

### In-Scope Goals

- A single-column terminal text interface as the sole game presentation layer
- Green phosphor theme (default) and amber phosphor theme as the two display modes
- CRT visual effects (scanlines, phosphor glow, screen curvature) that reinforce the terminal feel
- Monospace typography consistent with 1970s terminal displays
- All visual hierarchy achieved through text formatting (caps, spacing, ASCII borders) — not color or font variation
- Responsive scaling so the terminal is readable on different screen sizes

### Out-of-Scope

- Light mode or any non-dark color scheme
- Multiple font choices or font size settings
- Pixel art, illustrations, or graphical elements inside the terminal
- Modern UI components (modals, dropdowns, tooltips, progress bars) inside the game area
- Animated sprites or graphical transitions

### Deferred Ideas

- Additional phosphor color themes (e.g., white phosphor P4)
- A "clean" mode that removes CRT effects entirely for maximum readability

## Capabilities

### P0 — Core Visual Identity

- [ ] The game renders inside a terminal frame styled as a CRT monitor
  - Black background with a subtle bezel border
  - Fixed maximum width matching a classic 80-column terminal
  - Centered on the page with the background extending to fill the viewport

- [ ] All game text displays in a single monospace font
  - The font visually evokes a 1970s terminal character set
  - All text is the same font — no heading/body distinction
  - Text renders in ALL CAPS following the original game's convention

- [ ] Green phosphor theme is the default display mode
  - Three brightness levels (bright, medium, dim) for visual hierarchy
  - Text color is a single hue (green) at varying brightness — no other colors
  - Background is near-black, not pure black

- [ ] Amber phosphor theme is available as an alternative
  - Same three-brightness-level system in amber tones
  - Player can switch between green and amber themes
  - Theme preference persists across sessions

- [ ] Phosphor glow effect on text simulates CRT bloom
  - Subtle text-shadow in the active phosphor color
  - Small radius to avoid visual noise

### P1 — Enhanced CRT Feel

- [ ] Scanline overlay simulates a CRT display
  - Semi-transparent horizontal lines across the terminal
  - Subtle enough to not impair readability
  - Does not interfere with text selection or input

- [ ] Screen curvature effect adds depth to the terminal frame
  - Vignette darkening at screen edges
  - Creates the impression of a curved glass surface

- [ ] Optional typewriter text rendering simulates terminal print speed
  - Text appears character-by-character at a configurable rate
  - Skippable via keypress so it doesn't frustrate repeat players
  - Respects reduced-motion accessibility preferences

### P2 — Polish

- [ ] Optional screen flicker effect for maximum authenticity
  - Very subtle opacity variation
  - Off by default due to photosensitivity concerns
  - Opt-in only via an explicit setting

## Dependencies

- **Core gameplay mechanics** — The terminal displays the game's text output and accepts player input
- **1971 gameplay fidelity** — The visual style must support, not contradict, the authentic gameplay experience

## Assumptions & Risks

### Assumptions

- Identified as a white-space feature during competitive analysis — no competitor offers a purpose-built terminal aesthetic for Oregon Trail
- The visual style guide (`gspec/style.md`) defines the specific design tokens, colors, typography, and effects — this PRD defines the product requirements that the style guide implements
- Modern browsers can render CRT effects (scanlines, glow, curvature) performantly using standard web capabilities

### Open Questions

- Should the theme toggle be accessible during gameplay or only from a pre-game settings area?
- Should the typewriter effect speed be configurable or fixed?

### Key Risks and Mitigations

- **Risk:** CRT effects reduce readability for some users. **Mitigation:** Keep effects subtle; ensure all text meets accessibility contrast requirements with effects applied; support reduced-motion preferences.
- **Risk:** The aesthetic feels gimmicky rather than authentic. **Mitigation:** Restrain the effects — less is more. The terminal should feel like a real display, not a theme park recreation.

## Success Metrics

- Players describe the visual experience as "feeling like a real terminal" or "looking like the old computers"
- All text meets accessibility contrast standards with CRT effects active
- The interface renders correctly and performs smoothly across target browsers

## Implementation Context

This feature describes product requirements only. Implementation details — including technology choices, architecture, and code structure — are defined elsewhere and may vary across projects.

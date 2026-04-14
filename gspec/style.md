---
spec-version: v1
---

# Visual Style Guide — Oregon Trail

## 1. Overview

### Design Vision Statement

Recreate the look and feel of a 1970s monochrome CRT terminal — the kind found in school computer labs where the original Oregon Trail was played. Every visual decision serves one question: "Would this feel at home on a 1971 Teletype or early CRT monitor?"

### Target Platforms

- **Primary:** Desktop web browsers (Chrome, Firefox, Safari, Edge)
- **Secondary:** Tablet browsers (landscape orientation)
- **Tertiary:** Mobile browsers (functional but not optimized — the original was not a mobile experience)

### Visual Personality

**Technical & nostalgic** — The aesthetic is sparse, monochromatic, and deliberately lo-fi. There are no gradients, no illustrations, no rounded cards, no modern UI conventions. The interface is a terminal. Text appears. The player types. That's it.

### Design Rationale

The 1971 Oregon Trail ran on Teletype terminals and early CRT displays. Players experienced green or amber phosphor text on a dark screen, fixed-width characters, and no graphical elements whatsoever. This style guide preserves that experience by constraining the visual language to what those terminals could actually produce — with minor concessions for web usability (clickable elements, responsive scaling) that do not break the illusion.

---

## 2. Color Palette

All colors are derived from real CRT phosphor types used in 1970s–1980s terminals. The application supports two themes corresponding to the two most common phosphor colors of the era.

### Primary Colors — Green Phosphor (P1 theme, default)

| Token              | Hex       | RGB              | HSL                | Usage                                    |
| ------------------ | --------- | ---------------- | ------------------ | ---------------------------------------- |
| `--green-bright`   | `#33FF00` | `51, 255, 0`    | `108°, 100%, 50%`  | Primary text, active/highlighted content |
| `--green-medium`   | `#20C200` | `32, 194, 0`    | `110°, 100%, 38%`  | Standard body text                       |
| `--green-dim`      | `#0A5C00` | `10, 92, 0`     | `113°, 100%, 18%`  | Faded/secondary text, disabled states    |
| `--green-glow`     | `#33FF00` | `51, 255, 0`    | `108°, 100%, 50%`  | Text-shadow glow effect (with opacity)   |

### Primary Colors — Amber Phosphor (P3 theme)

| Token              | Hex       | RGB              | HSL                | Usage                                    |
| ------------------ | --------- | ---------------- | ------------------ | ---------------------------------------- |
| `--amber-bright`   | `#FFB000` | `255, 176, 0`   | `41°, 100%, 50%`   | Primary text, active/highlighted content |
| `--amber-medium`   | `#CC8C00` | `204, 140, 0`   | `41°, 100%, 40%`   | Standard body text                       |
| `--amber-dim`      | `#664600` | `102, 70, 0`    | `41°, 100%, 20%`   | Faded/secondary text, disabled states    |
| `--amber-glow`     | `#FFB000` | `255, 176, 0`   | `41°, 100%, 50%`   | Text-shadow glow effect (with opacity)   |

### Neutral Colors

| Token            | Hex       | RGB            | Usage                                         |
| ---------------- | --------- | -------------- | --------------------------------------------- |
| `--screen-black` | `#0A0A0A` | `10, 10, 10`  | Primary background — CRT "off-black"          |
| `--screen-dark`  | `#111111` | `17, 17, 17`  | Slightly lighter background for depth/overlay |
| `--screen-edge`  | `#050505` | `5, 5, 5`     | CRT bezel/border area                         |

There are no grays. Terminal displays had only the phosphor color at varying brightness levels and black. All non-text areas are black.

### Secondary Colors

Not applicable. Monochrome terminals did not have secondary or accent colors. All visual hierarchy is achieved through brightness variation of the single phosphor color and through text formatting (spacing, alignment, capitalization).

### Semantic Colors

Semantic states are communicated through **text content**, not color changes. The terminal has one color. Errors, warnings, and success states are expressed through words and symbols, not visual styling.

| State   | Visual Treatment                                                  |
| ------- | ----------------------------------------------------------------- |
| Error   | Bright phosphor text + `***` prefix (e.g., `*** YOU HAVE DIED`) |
| Warning | Medium phosphor text + `---` prefix or ALL CAPS                  |
| Info    | Medium phosphor text, standard formatting                        |
| Success | Bright phosphor text (e.g., final score display)                 |

---

## 3. Typography

### Font Families

| Role         | Font Stack                                                       | Rationale                                                         |
| ------------ | ---------------------------------------------------------------- | ----------------------------------------------------------------- |
| **All text** | `"VT323", "Courier New", "Courier", "Lucida Console", monospace` | VT323 is a Google Font modeled on the DEC VT320 terminal charset. Falls back through period-appropriate monospace fonts. |

There is only one font role. Terminals did not distinguish between heading and body fonts. All text is monospace at a single size per context.

**Font source:** [Google Fonts — VT323](https://fonts.google.com/specimen/VT323)

### Type Scale

The type scale is intentionally flat. Terminals rendered all text at a single size. Visual hierarchy is created through whitespace, capitalization, and line separators — not font size variation.

| Token        | Size   | Weight | Line Height | Usage                                            |
| ------------ | ------ | ------ | ----------- | ------------------------------------------------ |
| `--text-lg`  | 24px   | 400    | 1.4         | Primary game text on desktop                     |
| `--text-md`  | 20px   | 400    | 1.4         | Primary game text on smaller screens             |
| `--text-sm`  | 16px   | 400    | 1.4         | Minimum size — mobile fallback                   |

VT323 only ships at weight 400. Do not apply bold or italic — terminals did not support them. Emphasis is achieved through CAPITALIZATION, `***` asterisk borders, or extra line spacing.

### Text Formatting Conventions

- **Emphasis:** ALL CAPS
- **Strong emphasis:** Asterisk borders (`*** TEXT ***`) or bright phosphor color
- **Separation:** Blank lines or rows of dashes (`------`)
- **No underlines, no bold, no italic** — these did not exist on the original terminals

---

## 4. Spacing & Layout

### Spacing Scale

Spacing is measured in character units to maintain the terminal grid. One character cell is the base unit.

| Token    | Value | Character Equivalent | Usage                          |
| -------- | ----- | -------------------- | ------------------------------ |
| `--sp-1` | 1ch   | 1 character          | Inline spacing between words   |
| `--sp-2` | 2ch   | 2 characters         | Indentation, column gaps       |
| `--sp-4` | 4ch   | 4 characters         | Section indentation            |
| `--ln-1` | 1em   | 1 blank line         | Paragraph separation           |
| `--ln-2` | 2em   | 2 blank lines        | Section separation             |
| `--ln-3` | 3em   | 3 blank lines        | Major section breaks           |

### Grid System

There is no columnar grid. The layout is a single column of text, left-aligned, mimicking a terminal's character buffer.

| Token              | Value  | Usage                                                  |
| ------------------ | ------ | ------------------------------------------------------ |
| `--terminal-width` | 80ch   | Maximum line width — matches the classic 80-column terminal |
| `--terminal-pad`   | 2ch    | Padding inside the terminal frame                      |

The terminal container is centered horizontally on the page with the screen-black background extending to fill the viewport.

### Breakpoints

| Name     | Width    | Behavior                                    |
| -------- | -------- | ------------------------------------------- |
| Desktop  | ≥ 768px  | Full 80-column terminal, `--text-lg` size   |
| Tablet   | 600–767px| 80-column terminal, `--text-md` size        |
| Mobile   | < 600px  | Fluid width with horizontal scroll if needed, `--text-sm` size |

### Layout Patterns

- **Single column, top-to-bottom text flow** — all game content renders sequentially, as it would on a physical terminal
- **No sidebars, no cards, no floating elements** — the screen is one continuous text stream
- **Vertical scrolling only** — new content appears below old content, scrolling the view down (auto-scroll to bottom)

---

## 5. Themes

### Green Phosphor Theme (Default)

| Surface          | Color           | Token              |
| ---------------- | --------------- | ------------------ |
| Background       | `#0A0A0A`       | `--screen-black`   |
| Primary text     | `#20C200`       | `--green-medium`   |
| Highlighted text | `#33FF00`       | `--green-bright`   |
| Dimmed text      | `#0A5C00`       | `--green-dim`      |
| Text glow        | `#33FF00` @ 40% | `--green-glow`     |

### Amber Phosphor Theme

| Surface          | Color           | Token              |
| ---------------- | --------------- | ------------------ |
| Background       | `#0A0A0A`       | `--screen-black`   |
| Primary text     | `#CC8C00`       | `--amber-medium`   |
| Highlighted text | `#FFB000`       | `--amber-bright`   |
| Dimmed text      | `#664600`       | `--amber-dim`      |
| Text glow        | `#FFB000` @ 40% | `--amber-glow`     |

### Theme Switching

A small, unobtrusive toggle allows the player to switch between green and amber phosphor themes. The toggle should be outside the terminal frame (e.g., in the bezel area) to avoid breaking the in-game immersion. Persist the player's choice in `localStorage`.

### Dark Mode / Light Mode

Not applicable. There is no light mode. The application is always dark — CRT terminals were always light-on-dark. The background is always near-black.

---

## 6. Component Styling

This is a text-based terminal game. "Components" are minimal — most interaction happens through text prompts and typed responses.

### Buttons

There are no traditional buttons. Player actions are taken by typing responses to text prompts. However, where clickable affordances are needed for web usability (e.g., theme toggle, "Start Game" on a splash screen):

| Variant     | Appearance                                                                    |
| ----------- | ----------------------------------------------------------------------------- |
| Default     | Phosphor-colored text, no background, no border — looks like terminal text    |
| Hover       | Bright phosphor color + glow effect                                           |
| Active      | Brief inverse flash (phosphor background, black text) for 100ms              |
| Disabled    | Dim phosphor color                                                            |
| Focus       | Blinking cursor appears adjacent to the element                               |

All clickable text uses `cursor: pointer`. No rounded corners, no padding, no box model — just text.

### Form Elements — Text Input

The primary input is a text field where the player types responses. It must feel like typing on a terminal.

| Property         | Value                                                                         |
| ---------------- | ----------------------------------------------------------------------------- |
| Background       | Transparent (inherits `--screen-black`)                                       |
| Border           | None                                                                          |
| Text color       | Bright phosphor color (`--green-bright` / `--amber-bright`)                   |
| Font             | Same as all other text (VT323, same size)                                     |
| Caret            | Block cursor, phosphor-colored, blinking at 1Hz (530ms on, 530ms off)        |
| Prompt prefix    | `> ` or `? ` rendered before the input, not editable                          |
| Focus indicator  | The blinking cursor IS the focus indicator — no rings, outlines, or glows     |

There are no labels, helper text, or validation styling on the input. The game prompt above the input serves as the label.

### Cards & Containers

Not applicable. There are no cards. The terminal frame is the only container.

#### Terminal Frame

| Property        | Value                                                                          |
| --------------- | ------------------------------------------------------------------------------ |
| Background      | `--screen-black`                                                               |
| Border          | 2px solid, slightly lighter than background (`#1A1A1A`) — subtle CRT bezel    |
| Border radius   | 4px — slight rounding to suggest a CRT screen edge                            |
| Box shadow      | Inset shadow to simulate screen curvature: `inset 0 0 60px rgba(0,0,0,0.4)`  |
| Max width       | `--terminal-width` (80ch)                                                      |
| Min height      | 60vh                                                                           |
| Padding         | `--terminal-pad` (2ch) horizontal, 1em vertical                               |

### Navigation Elements

Not applicable. There is no navigation. The game is a single continuous text flow. The player navigates by making choices within the game prompts.

---

## 7. Visual Effects

### CRT Screen Effects

These effects simulate a real CRT monitor. They should be implemented as CSS overlays on the terminal frame, using pseudo-elements or dedicated overlay divs so they don't interfere with text selection or input.

#### Scanlines

- Semi-transparent horizontal lines across the screen
- `repeating-linear-gradient` with 1px dark lines every 3–4px
- Opacity: 0.05–0.08 (subtle — should not impair readability)
- Applied via `::after` pseudo-element with `pointer-events: none`

#### Phosphor Glow

- Text-shadow on all terminal text to simulate phosphor bloom
- Green theme: `0 0 5px rgba(51, 255, 0, 0.4)`
- Amber theme: `0 0 5px rgba(255, 176, 0, 0.4)`
- Keep the glow radius small (5px) to avoid visual noise

#### Screen Curvature (Optional)

- Very subtle vignette darkening at edges via radial gradient overlay
- `radial-gradient(ellipse at center, transparent 70%, rgba(0,0,0,0.3) 100%)`
- Creates the impression of a curved CRT screen

#### Flicker (Optional — off by default)

- Very subtle opacity animation (0.97–1.0) at ~60Hz
- **Must be opt-in** — screen flicker can trigger photosensitive conditions
- If implemented, default to off with a toggle in settings

### Shadows & Elevation

Not applicable. There is no elevation system. The terminal is a flat plane. The only shadow is the inset shadow on the terminal frame to simulate screen curvature.

### Border Radius

| Token             | Value | Usage                     |
| ----------------- | ----- | ------------------------- |
| `--radius-screen` | 4px   | Terminal frame outer edge |

No other border radii exist. Everything inside the terminal is sharp-cornered (or rather, has no boxes at all).

### Transitions & Animations

| Effect               | Duration | Easing          | Usage                                              |
| -------------------- | -------- | --------------- | -------------------------------------------------- |
| Text appear          | 0ms      | None            | Game text appears instantly (or with typewriter)    |
| Typewriter print     | 30–50ms  | Linear (per char)| Optional: text appears character-by-character       |
| Cursor blink         | 1060ms   | Step (530/530)  | Block cursor on/off cycle                          |
| Theme switch         | 200ms    | Ease-in-out     | Color transition when switching phosphor theme     |
| Screen power-on      | 800ms    | Ease-out        | Optional: brightness ramp on initial load          |

#### Typewriter Effect

Text may optionally render character-by-character at 30–50ms per character to simulate terminal print speed. This should be skippable (click or keypress jumps to full text) to avoid frustrating repeat players.

---

## 8. Iconography

Not applicable. The 1971 Oregon Trail had no icons. Any symbolic communication uses ASCII text characters:

| Symbol | Meaning                    |
| ------ | -------------------------- |
| `>`    | Input prompt               |
| `?`    | Question/choice prompt     |
| `***`  | Alert / important message  |
| `---`  | Section divider            |
| `===`  | Major section divider      |
| `#`    | Decorative border element  |

No icon library is needed.

---

## 9. Imagery & Media

Not applicable. This is a text-only interface. There are no images, photographs, illustrations, or media elements within the game.

The only graphical elements are:

- The CRT screen effects (scanlines, glow, vignette) described in Section 7
- The terminal frame border described in Section 6
- ASCII text art if used for title screens or game events (rendered in the terminal font, not as images)

---

## 10. Accessibility

### Contrast Requirements

- **WCAG AA compliance** for all text
- Bright phosphor on `--screen-black`:
  - Green bright (`#33FF00`) on `#0A0A0A` — contrast ratio **10.2:1** (passes AAA)
  - Green medium (`#20C200`) on `#0A0A0A` — contrast ratio **7.8:1** (passes AAA)
  - Amber bright (`#FFB000`) on `#0A0A0A` — contrast ratio **8.9:1** (passes AAA)
  - Amber medium (`#CC8C00`) on `#0A0A0A` — contrast ratio **6.5:1** (passes AA)
- Dim phosphor colors are used only for decorative or secondary content, never for essential information

### Focus States

- The blinking block cursor serves as the primary focus indicator for the text input
- For any non-input interactive elements (theme toggle, start button): a visible bright phosphor outline or inverse text treatment
- All interactive elements must be reachable and operable via keyboard (Tab, Enter, arrow keys)

### Text Accessibility

| Guideline          | Value                                                    |
| ------------------- | -------------------------------------------------------- |
| Minimum font size   | 16px (`--text-sm` on mobile)                            |
| Maximum line length  | 80 characters (inherent to terminal width)              |
| Line height          | 1.4 (comfortable for monospace reading)                 |
| Text resizing        | Must support browser zoom up to 200% without breaking   |

### CRT Effects & Accessibility

- Scanlines must be subtle enough (< 0.08 opacity) to not reduce effective contrast below AA
- Flicker effect must be **off by default** and opt-in only (WCAG 2.3.1 — Three Flashes)
- A `prefers-reduced-motion` media query should disable the typewriter effect and any screen animations
- Consider a high-contrast mode that removes CRT effects entirely for users who need maximum readability

### Screen Reader Considerations

- Game text should be semantically structured (use `role="log"` or `aria-live="polite"` for new game output)
- Input prompts should have associated `aria-label` attributes describing what input is expected
- Game state changes should be announced to screen readers

---

## 11. Responsive Design

### Breakpoints

| Name    | Min Width | Max Width | Font Size    | Terminal Width |
| ------- | --------- | --------- | ------------ | -------------- |
| Mobile  | 0         | 599px     | `--text-sm`  | 100% fluid     |
| Tablet  | 600px     | 767px     | `--text-md`  | 80ch or 100%   |
| Desktop | 768px     | —         | `--text-lg`  | 80ch fixed     |

### Mobile-Specific Patterns

| Guideline              | Value                                                          |
| ---------------------- | -------------------------------------------------------------- |
| Touch target size      | 44px minimum for any tappable element                          |
| Input field            | Full-width, `font-size: 16px` minimum (prevents iOS zoom)     |
| Terminal padding       | Reduced to 1ch on mobile                                       |
| Line wrapping          | Allowed on mobile (terminal content wraps rather than scrolls horizontally) |
| Virtual keyboard       | Input should remain visible above the keyboard when focused    |

The mobile experience is a concession to accessibility, not a design target. The game was designed for keyboards, and the desktop experience is authoritative.

---

## 12. Usage Examples

### Terminal Text Output

```
 YOU ARE NOW ON THE OREGON TRAIL.

 THIS IS THE YEAR 1848. YOUR FAMILY OF
 FIVE WILL COVER THE ROUTE FROM
 INDEPENDENCE, MISSOURI TO OREGON CITY
 BY OCTOBER.

 HOW MUCH DO YOU WANT TO SPEND ON YOUR OXEN TEAM?
 > _
```

All text is left-aligned, monospaced, uppercase (following the 1971 original), with the phosphor color on a black background. The `>` prompt and blinking block cursor indicate the input area.

### Choice Prompt

```
 DO YOU WANT TO:
   1. CONTINUE ON THE TRAIL
   2. STOP AND REST
   3. GO HUNTING

 > _
```

Numbered choices are indented with 2–4 spaces. The player types a number to respond.

### Alert / Event

```
 *** HEAVY RAINS ***

 THE RIVER IS TOO DEEP TO FORD.

 DO YOU WANT TO:
   1. WAIT FOR CONDITIONS TO IMPROVE
   2. ATTEMPT TO FLOAT ACROSS
   3. TAKE A FERRY ($5.00)

 > _
```

Important events use `***` borders and bright phosphor color.

### Status Display

```
 -----------------------------------
 WEATHER: WARM
 HEALTH:  GOOD
 PACE:    STEADY
 RATIONS: FILLING
 -----------------------------------
 NEXT LANDMARK: 63 MILES
 MILES TRAVELED: 302
 -----------------------------------
```

Status blocks use dash separators and aligned columns (using spaces in monospace).

### Reference Mockups

Interactive HTML mockups are available in `gspec/mockups/` to demonstrate the visual style in context:

| Mockup                                       | Description                                                                                                                                                                                                  |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`landing.html`](mockups/landing.html)       | Landing/splash page — demonstrates the green phosphor CRT aesthetic applied to a hero section with ASCII art, mission statement, gameplay feature cards, terminal-style preview windows, and a call-to-action. |
| [`gameplay.html`](mockups/gameplay.html)     | In-game general store screen at Independence, MO — demonstrates the CRT aesthetic applied to a trading interface with inventory table, store clerk dialogue, status display, and input prompt.                |

These mockups are **design references**, not production code. They use Tailwind CDN and inline styles for rapid prototyping. When implementing, translate the visual patterns into the token system defined in this style guide.

### Do's and Don'ts

**Do:**
- Use ALL CAPS for game text (the original did)
- Use ASCII characters for all visual separators and decoration
- Keep text left-aligned within the terminal
- Allow the terminal to scroll naturally with new content
- Use brightness (bright/medium/dim phosphor) for visual hierarchy

**Don't:**
- Add color beyond the single phosphor hue
- Use modern UI elements (dropdowns, modals, tooltips, progress bars)
- Apply font weight or style variations (bold, italic)
- Add images, SVGs, or non-text visual elements inside the terminal
- Center-align or right-align game text (terminals were left-aligned)
- Use font sizes smaller than 16px

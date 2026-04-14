---
spec-version: v1
---

# Technology Stack Definition — Oregon Trail

## 1. Overview

- **Architecture style:** Single-page application (SPA) — a fully client-side static site with no backend. All game logic runs in the browser.
- **Deployment target:** GitHub Pages — static file hosting from a repository branch or GitHub Actions artifact.
- **Scale and performance requirements:** Minimal. The app serves a single player at a time with no network requests during gameplay. The entire application should load in under 1 second on a broadband connection. Total bundle size target: under 150 KB gzipped.

## 2. Open Questions & Clarifications

None. The project scope is well-defined: a frontend-only, static-site TypeScript game deployed to GitHub Pages with no backend, no auth, and no external services.

## 3. Core Technology Stack

### Programming Languages

- **Primary language:** TypeScript 5.x (strict mode enabled)
  - **Rationale:** The user requested TypeScript. Strict mode aligns with the practices guide's prohibition on `any` and ensures type safety across game state, events, and UI.
- **Secondary languages:** None. CSS is used for styling but is not a programming language.
- **Language-specific tooling:**
  - **Linter:** ESLint with `@typescript-eslint` and `eslint-plugin-react-hooks`
  - **Formatter:** Prettier

### Runtime Environment

- **Runtime platform:** Modern web browsers (Chrome, Firefox, Safari, Edge — latest 2 major versions). No server-side runtime.
- **Version requirements:** ES2020+ target. No polyfills — the target audience uses modern browsers.
- **Container runtime:** Not applicable — static files served directly.

## 4. Frontend Stack

### Framework

- **UI framework:** React 19
  - **Rationale:** React is the most widely supported UI library in the TypeScript ecosystem. The practices guide already references React patterns (hooks, error boundaries, `useMemo`/`useCallback`). React 19's improved rendering and built-in optimizations are a good fit. For a text-based game, React's declarative model maps cleanly to "render current game state as terminal output."
- **Update strategy:** Follow React's stable releases. No canary/experimental channels.

### Build Tools

- **Bundler:** Vite 6.x
  - **Rationale:** Vite provides instant HMR during development, fast production builds via Rollup, first-class TypeScript support, and a minimal configuration surface. It is the standard build tool for modern React projects.
- **Transpiler:** Vite's built-in esbuild for development, Rollup for production.
- **Build optimization:** Vite's default tree-shaking and minification. No additional optimization tools needed given the small bundle target.

### State Management

- **Approach:** React's built-in `useReducer` + React Context
  - **Rationale:** The Oregon Trail game state (supplies, mileage, party health, turn number, event queue) maps naturally to a reducer pattern. The state shape is well-defined and transitions are discrete. There is no need for an external state management library — `useReducer` provides predictable state transitions with full TypeScript support, and Context makes the game state available to any component that needs it.
- **Data fetching strategy:** Not applicable — no network requests during gameplay. All game data is bundled with the application.

### Styling Technology

- **CSS approach:** CSS Modules (`.module.css` files)
  - **Rationale:** CSS Modules provide locally scoped class names with zero runtime cost. For a monochrome terminal aesthetic with a small number of styles, CSS Modules offer the right balance of scoping and simplicity without the overhead of a CSS-in-JS library or a utility framework like Tailwind (which would be overkill for a fixed-palette terminal UI).
- **Design token mapping:** CSS custom properties (variables) defined in a global stylesheet serve as the design tokens. CSS Modules reference these variables directly (e.g., `color: var(--color-terminal-green)`). Token values are defined in `gspec/style.md` and mapped 1:1 to CSS custom properties.
- **Responsive design:** Not a primary concern per the profile ("designed for desktop"). Basic viewport meta tag included, but no responsive breakpoint system.
- **Component library:** None. The UI is custom terminal-style text rendering — no off-the-shelf component library applies.

## 5. Backend Stack

Not applicable. The application runs entirely in the browser with no server-side component.

### Framework

N/A

### Database

N/A

### Caching Layer

N/A

### Message Queue / Event Bus

N/A

## 6. Infrastructure & DevOps

### Cloud Provider

- **Provider:** GitHub Pages
  - **Rationale:** Free static hosting directly from the repository. Zero configuration for a static SPA. Aligns with the project's non-commercial, zero-cost philosophy.
- **Key services used:** GitHub Pages for hosting, GitHub Actions for CI/CD.
- **Custom domain:** Not planned initially. The default `<username>.github.io/<repo>` URL is sufficient.

### Container Orchestration

N/A — static files served by GitHub Pages. No containers.

### CI/CD Pipeline

- **Platform:** GitHub Actions
  - **Rationale:** Native integration with GitHub Pages deployment. Free for public repositories. Supports the practices guide's requirement for pipeline-first development with lint, typecheck, test, build, and deploy stages.
- **Workflow configuration:** YAML workflow files in `.github/workflows/`. A single workflow handles the full pipeline: lint → typecheck → test → build → deploy.
- **Deployment trigger:** Automatic deployment on push to `main` branch. Pull requests run the full pipeline without deploying.
- **GitHub Pages configuration:** Deploy from GitHub Actions using the `actions/deploy-pages` action with the `actions/upload-pages-artifact` action pointing to the Vite build output directory (`dist/`).

### Infrastructure as Code

N/A — no infrastructure to provision. GitHub Pages configuration is defined in the repository settings and the GitHub Actions workflow file.

## 7. Data & Storage

### File Storage

N/A — no user-generated content or uploaded files.

### CDN Integration

GitHub Pages includes a built-in CDN via GitHub's infrastructure. No additional CDN configuration needed.

### Data Warehouse / Analytics

N/A — no analytics platform. Per the profile, there are no growth targets or business metrics.

## 8. Authentication & Security

N/A — no user accounts, no authentication, no authorization. The application is a static, anonymous, single-player game.

### Authentication

N/A

### Authorization

N/A

### Security Tools

- **Secrets management:** No application secrets. The only secret is the `GITHUB_TOKEN` provided automatically by GitHub Actions for Pages deployment.
- **Security scanning:** `npm audit` run as part of CI to flag known vulnerabilities in dependencies.
- **Dependency updates:** Dependabot enabled for automated dependency update PRs.

## 9. Monitoring & Observability

N/A — this is a static, client-side game with no server infrastructure to monitor.

### Application Monitoring

N/A

### Logging

N/A — no server-side logging. Browser `console.log` is used only during development and stripped in production builds.

### Tracing

N/A

### Error Tracking

N/A — no error tracking service. The application is a self-contained game with no external dependencies at runtime.

## 10. Testing Infrastructure

### Testing Frameworks

- **Unit testing:** Vitest
  - **Rationale:** Vitest shares Vite's configuration and transform pipeline, eliminating the dual-config problem of Jest + Vite. Native TypeScript and ESM support. Jest-compatible API for familiarity. Fast execution with HMR-aware watch mode.
- **Component testing:** Vitest + React Testing Library (`@testing-library/react`)
  - **Rationale:** React Testing Library encourages testing components from the user's perspective (what's rendered) rather than implementation details. Pairs naturally with Vitest.
- **E2E testing:** Playwright
  - **Rationale:** Playwright provides reliable cross-browser E2E testing with first-class TypeScript support. Headless by default (per practices guide). Built-in auto-waiting reduces flakiness compared to alternatives.
- **Integration testing:** Vitest — game engine logic (state transitions, event resolution, supply calculations) is tested as integration tests that exercise multiple modules together.

### Test Data Management

- **Test database strategy:** N/A — no database.
- **Fixture management:** Game scenario fixtures (predefined game states for testing specific situations) are TypeScript objects in `tests/fixtures/`.
- **Mock/stub approach:** Minimal mocking needed. The game has no external API calls. The primary mock target is `Math.random` (for deterministic testing of random events).

### Performance Testing

N/A — the application is a lightweight text game. Performance testing is not warranted. Build size is monitored via Vite's build output.

## 11. Third-Party Integrations

None. The application has no external service dependencies at runtime. It is entirely self-contained.

### External Services

N/A

### API Clients

N/A

## 12. Development Tools

### Package Management

- **Package manager:** npm
  - **Rationale:** npm ships with Node.js and requires no additional installation. For a project with a small dependency tree and no monorepo structure, npm's performance is adequate and its ubiquity reduces onboarding friction.
- **Dependency management strategy:** Keep dependencies minimal. Pin exact versions in `package-lock.json` (npm's default behavior). Use Dependabot for automated security updates.
- **Private package registry:** N/A

### Code Quality Tools

- **Linter:** ESLint 9.x with flat config (`eslint.config.js`)
  - Plugins: `@typescript-eslint/eslint-plugin`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- **Formatter:** Prettier 3.x
  - Configuration: single quotes, no semicolons (or configured to team preference)
- **Static analysis:** TypeScript's built-in strict mode serves as the primary static analysis tool.
- **Pre-commit hooks:** Husky + lint-staged
  - Runs Prettier and ESLint on staged files before each commit.

### Local Development

- **Local environment setup:** `npm install` then `npm run dev`. No Docker, no local databases, no environment variables.
- **Hot reload:** Vite's built-in HMR provides instant feedback during development.
- **Node.js version:** 20.x LTS (specified via `.node-version` or `engines` field in `package.json`).

## 13. Migration & Compatibility

### Legacy System Integration

N/A — greenfield project with no legacy systems.

### Upgrade Path

- **Technology update strategy:** Follow stable releases of React, Vite, and TypeScript. Update dependencies monthly or when Dependabot flags security issues.
- **Breaking change management:** Given the small codebase and minimal dependency tree, major version upgrades can be handled directly.
- **Deprecation timeline:** N/A

## 14. Technology Decisions & Tradeoffs

### Key Architectural Decisions

| Decision | Choice | Alternative Considered | Tradeoff |
|---|---|---|---|
| UI framework | React 19 | Vanilla TypeScript (no framework) | React adds ~40 KB to the bundle but provides a declarative rendering model, component composition, and ecosystem tooling that accelerates development. The terminal UI would require building a DIY rendering layer without it. |
| UI framework | React 19 | Preact | Preact is smaller (~3 KB) but has a smaller ecosystem and occasional compatibility gaps with React libraries. React's size is acceptable within the 150 KB budget. |
| Build tool | Vite | Parcel, Webpack | Vite is faster in development (native ESM) and produces optimized builds. Webpack is more configurable but that flexibility is unnecessary here. |
| Styling | CSS Modules | Tailwind CSS | Tailwind's utility-class approach is designed for diverse, responsive UIs. A monochrome terminal game needs fewer than 20 style rules — CSS Modules are simpler and add zero runtime weight. |
| State management | useReducer + Context | Zustand, Redux Toolkit | External state libraries add bundle size and conceptual overhead. The game state is a single reducer with well-defined actions — React's built-in primitives handle this cleanly. |
| E2E testing | Playwright | Cypress | Playwright has better cross-browser support, faster execution, and native TypeScript support. Cypress has a richer interactive debug UI but that is less important for a text-based game. |
| Deployment | GitHub Pages | Vercel, Netlify | GitHub Pages is free, zero-config for static sites, and keeps everything in one platform (code + hosting). Vercel/Netlify offer more features (serverless functions, edge config) that this project doesn't need. |

### Risk Mitigation

- **Risk:** React is a large dependency for a simple text game.
  - **Mitigation:** Monitor bundle size in CI. If React's overhead becomes problematic, Preact is a drop-in replacement via Vite's alias configuration (`react` → `preact/compat`).
- **Risk:** GitHub Pages has limited configuration (no server-side redirects, no custom headers).
  - **Mitigation:** The SPA uses hash-based routing or a single `index.html` entry point, avoiding the need for server-side routing. A `404.html` redirect hack handles direct URL access if needed.

## 15. Technology-Specific Practices

### Framework Conventions & Patterns

- **Component pattern:** Functional components with hooks exclusively. No class components.
- **Component file structure:** One component per file. The file name matches the component name in PascalCase (e.g., `TerminalOutput.tsx`).
- **Custom hooks:** Extract reusable game logic into custom hooks prefixed with `use` (e.g., `useGameState`, `useTerminalInput`). Keep hooks focused on a single concern.
- **Error boundaries:** Wrap the game UI in a React error boundary component that displays a styled error message in the terminal aesthetic rather than a blank screen.
- **React strict mode:** Enable `<React.StrictMode>` in development to surface potential issues early.

### Library Usage Patterns

- **Game state reducer:** Define game actions as a discriminated union type. The reducer is a pure function with exhaustive switch/case over action types. No side effects in the reducer — side effects (random events, timers) are handled in the component or a custom hook that dispatches actions.
  ```typescript
  type GameAction =
    | { type: 'BUY_SUPPLIES'; payload: Supplies }
    | { type: 'TRAVEL' }
    | { type: 'HUNT' }
    | { type: 'RESOLVE_EVENT'; payload: GameEvent }
    // ...
  ```
- **CSS Module usage:** Import styles as a typed object. Use `composes` for style composition rather than duplicating declarations.
  ```typescript
  import styles from './TerminalOutput.module.css';
  ```
- **CSS custom property tokens:** All visual values (colors, fonts, spacing) are defined as CSS custom properties on `:root` and referenced throughout. Never hard-code color hex values or font sizes in component styles.

### Language Idioms

- **Strict TypeScript:** Enable all strict flags (`strict: true` in `tsconfig.json`). Use discriminated unions for game state variants (e.g., `GamePhase = 'setup' | 'traveling' | 'event' | 'gameOver'`).
- **Immutable state updates:** Always return new objects/arrays from the reducer. Use spread syntax or `structuredClone` for deep copies when needed. Never mutate state directly.
- **Exhaustive checks:** Use `never` type assertions in switch statements to ensure all cases are handled at compile time.
- **Import organization:** Group imports in this order: (1) React/library imports, (2) component imports, (3) hook imports, (4) type imports, (5) style imports. Separate groups with a blank line.

### Stack-Specific Anti-Patterns

- **Do not use `useEffect` for game logic.** Game state transitions should be driven by user actions dispatched to the reducer, not by effects watching state changes. Effects are for DOM side effects (focus management, scroll position) only.
- **Do not use `localStorage` for save games** unless explicitly scoped as a feature. The 1971 original had no save system.
- **Do not add a router.** The game is a single-page, single-view application. All "screens" (title, setup, gameplay, game over) are state-driven renders within one component tree, not separate routes.
- **Do not over-componentize.** A text-based terminal UI has a flat structure. Avoid deep component trees — a `TerminalScreen` → `TerminalOutput` → `TerminalInput` hierarchy is sufficient. Do not create a component for every line of text.
- **Do not add animation libraries.** The 1971 original had no animations. Typewriter effects, if desired, should use a simple `setInterval` in a custom hook, not a third-party animation library.

# Reece DeAlmeida Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, evidence-first aerospace engineering portfolio that is easy to edit and ready for Vercel deployment and a GoDaddy-managed domain.

**Architecture:** Use the Next.js App Router with statically generated routes, typed content records, and reusable editorial components. Keep all personal content and asset state in `src/content/portfolio.ts`; pages compose that data without embedding claims or links in presentation code.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules/global CSS, Vitest, React Testing Library, Playwright, pnpm

**Spec:** `docs/superpowers/specs/2026-08-18-portfolio-site-design.md`

## Global Constraints

- The approved homepage headline is “Engineering through building, testing, and iteration.”
- Use the approved “Orbital Editorial” direction: warm off-white, deep aerospace navy, restrained burnt-orange, editorial serif display type, and technical sans-serif body type.
- State only claims supported by the supplied brief; do not invent measurements, outcomes, titles, affiliations, contact details, or asset URLs.
- University team and research pages remain absent until the affiliation, title, and personal contribution are verified.
- Missing personal assets use explicit, polished states and must never produce broken links or images.
- Core content and navigation remain usable without client-side JavaScript.
- Motion respects `prefers-reduced-motion`.
- The project must build with pnpm and deploy to Vercel without custom infrastructure.
- Keep application files focused; no page or component should become a second content store.

## Planned file structure

```text
src/
  app/
    about/page.tsx                 About narrative and chronology
    contact/page.tsx               Contact and résumé states
    experience/page.tsx            Alphalete, theatre, outreach, awards
    projects/[slug]/page.tsx       Static case-study routes
    projects/page.tsx              Project index
    globals.css                    Design tokens, reset, utilities, shared motion
    icon.svg                       Monogram favicon
    layout.tsx                     Fonts, global metadata, header/footer
    manifest.ts                    Web manifest
    not-found.tsx                  Editorial 404 state
    opengraph-image.tsx            Generated social card
    page.tsx                       Homepage composition
    robots.ts                      Crawl policy
    sitemap.ts                     Static route map
  components/
    diagrams/
      alphalete-flow.tsx           Sanitized old-to-new workflow visual
      flight-computer.tsx          Sensors-to-compute flight-system visual
      orbital-hero.tsx             Decorative accessible hero visual
    about-preview.tsx              Homepage profile summary
    case-study.tsx                 Case-study section renderer
    contact-cta.tsx                Shared contact callout
    evidence-frame.tsx             Missing/available media state
    experience-card.tsx            Experience entry treatment
    project-card.tsx               Project summary link
    project-grid.tsx               Featured/index project layout
    reveal.tsx                     Optional progressive scroll reveal
    site-footer.tsx                Footer and social links
    site-header.tsx                Desktop/mobile navigation
    skip-link.tsx                  Keyboard skip navigation
  content/
    portfolio.test.ts              Schema and content invariant tests
    portfolio.ts                   Typed single source of personal content
  lib/
    portfolio.test.ts              Route and optional-link helper tests
    portfolio.ts                   Content lookup and derived route helpers
e2e/
  portfolio.spec.ts                Navigation, route, and missing-asset checks
public/
  evidence/.gitkeep                Replacement location for project media
  resume/.gitkeep                  Replacement location for résumé PDF
README.md                          Editing, local development, and deployment guide
playwright.config.ts               Browser test configuration
vitest.config.ts                   Unit/component test configuration
vitest.setup.ts                    DOM matcher setup
```

---

### Task 1: Scaffold the typed Next.js foundation

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `src/content/portfolio.ts`
- Create: `src/content/portfolio.test.ts`
- Create: `src/lib/portfolio.ts`
- Create: `src/lib/portfolio.test.ts`
- Create: `public/evidence/.gitkeep`
- Create: `public/resume/.gitkeep`

**Interfaces:**
- Consumes: Approved design spec and Word-brief facts.
- Produces: `portfolio: PortfolioContent`, `getProject(slug: string): Project | undefined`, `getProjectSlugs(): string[]`, and `visibleSocialLinks(): SocialLink[]`.

- [ ] **Step 1: Scaffold the application and test tooling**

Run:

```powershell
pnpm create next-app@latest . --ts --eslint --app --src-dir --no-tailwind --import-alias "@/*" --use-pnpm
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @playwright/test
```

Keep the existing `docs/` directory and `.gitignore`. Add these scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

- [ ] **Step 2: Write failing content-invariant tests**

Create `src/content/portfolio.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { portfolio } from "./portfolio";

describe("portfolio content", () => {
  it("uses the approved evidence-first headline", () => {
    expect(portfolio.home.headline).toBe(
      "Engineering through building, testing, and iteration.",
    );
  });

  it("uses unique project slugs and marks missing evidence explicitly", () => {
    const slugs = portfolio.projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(
      portfolio.projects.flatMap((project) => project.evidence).every(
        (item) => item.state === "available" || item.state === "needed",
      ),
    ).toBe(true);
  });

  it("does not publish unverified university or research work", () => {
    expect(portfolio.projects.map((project) => project.slug)).not.toContain(
      "university-research",
    );
    expect(portfolio.projects.map((project) => project.slug)).not.toContain(
      "space-cowboys",
    );
    expect(portfolio.projects.map((project) => project.slug)).not.toContain(
      "cubesat",
    );
  });
});
```

Create `src/lib/portfolio.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { getProject, getProjectSlugs, visibleSocialLinks } from "./portfolio";

describe("portfolio helpers", () => {
  it("finds projects and returns undefined for unknown slugs", () => {
    expect(getProject("systemsgo-tsiolkovsky")?.title).toContain("Tsiolkovsky");
    expect(getProject("unknown")).toBeUndefined();
  });

  it("returns only configured social links", () => {
    expect(visibleSocialLinks().every((item) => item.href.length > 0)).toBe(true);
  });

  it("returns one route slug per project", () => {
    expect(getProjectSlugs()).toEqual([
      "systemsgo-tsiolkovsky",
      "systemsgo-oberth",
      "alphalete-systems-migration",
      "containerized-infrastructure",
    ]);
  });
});
```

- [ ] **Step 3: Run the tests and verify the foundation is missing**

Run: `pnpm test`

Expected: FAIL because `portfolio.ts` and helper exports do not exist.

- [ ] **Step 4: Implement the typed content model and verified initial content**

Create types in `src/content/portfolio.ts` with these exact shapes:

```ts
export type EvidenceItem = {
  title: string;
  kind: "photo" | "diagram" | "data" | "video" | "document";
  state: "available" | "needed";
  src?: string;
  alt?: string;
  request: string;
};

export type CaseStudySection = {
  id: "context" | "constraints" | "ownership" | "process" | "implementation" |
    "testing" | "iteration" | "result" | "reflection";
  label: string;
  body: string[];
  verificationNote?: string;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  category: string;
  timeframe: string;
  featured: boolean;
  tags: string[];
  sections: CaseStudySection[];
  evidence: EvidenceItem[];
  diagram?: "flight-computer" | "alphalete-flow";
};

export type SocialLink = {
  label: "Email" | "LinkedIn" | "GitHub";
  href: string;
};

export type PortfolioContent = {
  person: { name: string; title: string; school: string; honors: string };
  site: { url: string; description: string };
  social: SocialLink[];
  resume: { state: "available" | "needed"; href: string; request: string };
  home: { eyebrow: string; headline: string; introduction: string };
  about: { paragraphs: string[]; focusAreas: string[]; timeline: { year: string; title: string; detail: string }[] };
  projects: Project[];
  experience: { title: string; organization: string; summary: string; details: string[] }[];
  theatre: { summary: string; highlights: string[] };
  outreach: { summary: string; details: string[] };
  awards: string[];
};
```

Populate `portfolio` with:

- Reece DeAlmeida; Aerospace Engineering Student; Mississippi State University; Shackouls Honors College.
- An empty `site.url`, empty social `href` values, and `resume.state: "needed"`.
- The approved headline and the brief's evidence-first supporting language.
- Four full projects with the exact slugs in the helper test.
- Tsiolkovsky sections covering the Raspberry Pi, Python, data acquisition/telemetry approach, onboard video, packaging, integration, testing, and verification gaps.
- Oberth sections covering the Mach 1 and sub-13,000-foot constraint, competing performance/safety concerns, design tradeoffs, and verification gaps.
- Alphalete sections covering product-data consolidation, migration support, 20 desktop deployments, more than 21,000 items, and 125 brand ambassadors without claiming migration leadership.
- Infrastructure sections covering Linux, Docker, CI/CD, deployments, monitoring, networking, and runtime debugging without naming or linking the private alias.
- About, theatre, outreach, and awards content from the approved spec.

Implement `src/lib/portfolio.ts`:

```ts
import { portfolio, type Project, type SocialLink } from "@/content/portfolio";

export function getProject(slug: string): Project | undefined {
  return portfolio.projects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return portfolio.projects.map((project) => project.slug);
}

export function visibleSocialLinks(): SocialLink[] {
  return portfolio.social.filter((item) => item.href.trim().length > 0);
}
```

- [ ] **Step 5: Configure Vitest and verify content tests pass**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", setupFiles: ["./vitest.setup.ts"] },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
```

Create `vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Run: `pnpm test`

Expected: all content and helper tests PASS.

- [ ] **Step 6: Verify and commit the foundation**

Run:

```powershell
pnpm typecheck
pnpm lint
git add package.json pnpm-lock.yaml next.config.ts tsconfig.json eslint.config.mjs vitest.config.ts vitest.setup.ts src/content src/lib public
git commit -m "feat: establish typed portfolio content foundation"
```

Expected: typecheck and lint PASS; commit contains the scaffold, content model, helpers, and tests.

---

### Task 2: Build the Orbital Editorial shell and design system

**Files:**
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/components/skip-link.tsx`
- Create: `src/components/site-header.tsx`
- Create: `src/components/site-footer.tsx`
- Create: `src/components/reveal.tsx`
- Test: `src/components/site-header.test.tsx`

**Interfaces:**
- Consumes: `portfolio.person` and `visibleSocialLinks()` from Task 1.
- Produces: `SiteHeader`, `SiteFooter`, `SkipLink`, and `Reveal` components plus global tokens/classes used by every page.

- [ ] **Step 1: Write the failing navigation test**

Create `src/components/site-header.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  it("exposes all primary routes as links without JavaScript", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute("href", "/experience");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
  });
});
```

- [ ] **Step 2: Run the component test and verify it fails**

Run: `pnpm test -- src/components/site-header.test.tsx`

Expected: FAIL because `SiteHeader` does not exist.

- [ ] **Step 3: Implement global tokens and layout primitives**

In `src/app/globals.css`, define these tokens and build responsive primitives around them:

```css
:root {
  --paper: #f4f0e8;
  --paper-raised: #fbf9f4;
  --ink: #102a43;
  --ink-soft: #526478;
  --line: #d7d0c4;
  --accent: #d85f35;
  --accent-dark: #a94020;
  --max-width: 80rem;
  --page-pad: clamp(1.25rem, 4vw, 4.5rem);
  --section-space: clamp(5rem, 10vw, 9rem);
}

html { scroll-behavior: smooth; }
body { margin: 0; background: var(--paper); color: var(--ink); }
main { min-height: 70vh; }
.shell { width: min(calc(100% - (2 * var(--page-pad))), var(--max-width)); margin-inline: auto; }
.eyebrow { text-transform: uppercase; letter-spacing: .16em; font-size: .75rem; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
```

Add a reset, accessible focus styles, editorial typography classes, buttons, tags, grids, section spacing, visually-hidden text, and mobile breakpoints. Do not introduce a dark theme in this version.

- [ ] **Step 4: Implement the semantic shell**

Use `next/font/google` in `src/app/layout.tsx` with `DM_Sans` for body copy and `Cormorant_Garamond` for display type. Export base metadata and render:

```tsx
<html lang="en">
  <body className={`${sans.variable} ${display.variable}`}>
    <SkipLink />
    <SiteHeader />
    <main id="main-content">{children}</main>
    <SiteFooter />
  </body>
</html>
```

Implement navigation as real Next.js links. On mobile, use a CSS-wrapped link row rather than a JavaScript-only hidden menu, preserving full navigation when scripts are unavailable.

Implement `Reveal` as a small client component that uses `IntersectionObserver`, applies an enhancement class, and immediately renders children visibly before hydration.

- [ ] **Step 5: Run the tests and static checks**

Run:

```powershell
pnpm test -- src/components/site-header.test.tsx
pnpm typecheck
pnpm lint
```

Expected: all commands PASS.

- [ ] **Step 6: Commit the shell**

```powershell
git add src/app/globals.css src/app/layout.tsx src/components
git commit -m "feat: build orbital editorial site shell"
```

---

### Task 3: Build the homepage and signature visuals

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/components/diagrams/orbital-hero.tsx`
- Create: `src/components/project-card.tsx`
- Create: `src/components/project-grid.tsx`
- Create: `src/components/about-preview.tsx`
- Create: `src/components/contact-cta.tsx`
- Test: `src/app/page.test.tsx`

**Interfaces:**
- Consumes: `portfolio.home`, `portfolio.projects`, `portfolio.about`, and shared shell primitives.
- Produces: Recruiter-focused homepage, reusable `ProjectCard`, `ProjectGrid`, `AboutPreview`, `ContactCta`, and decorative `OrbitalHero`.

- [ ] **Step 1: Write the failing homepage test**

Create `src/app/page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage", () => {
  it("leads with the approved headline and strongest work", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Engineering through building, testing, and iteration.",
    );
    expect(screen.getByRole("link", { name: /Tsiolkovsky/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Oberth/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Verify the homepage test fails**

Run: `pnpm test -- src/app/page.test.tsx`

Expected: FAIL because the generated starter homepage does not contain the approved content.

- [ ] **Step 3: Implement the decorative orbital hero**

Create `OrbitalHero` as an `aria-hidden="true"` SVG with three fine elliptical paths, a restrained orange trajectory mark, coordinate ticks, and a small “BUILD / TEST / ITERATE” label. Use CSS animations only for slow transform/offset changes, and stop them in the global reduced-motion media query.

The root signature is:

```tsx
export function OrbitalHero(): React.JSX.Element;
```

- [ ] **Step 4: Implement project and call-to-action components**

`ProjectCard` must accept:

```ts
type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};
```

Render the number, category, title, summary, tags, and a visible “View case study” affordance inside one semantic link. Use `ProjectGrid` to render only `featured` projects on the homepage and all projects on the index route.

`ContactCta` links to `/contact`; it never renders a guessed email address.

- [ ] **Step 5: Compose the homepage**

Build sections in this order:

1. Hero with eyebrow, approved headline, introduction, selected-work link, résumé/contact state, and orbital visual.
2. Featured work with Tsiolkovsky, Oberth, Alphalete, and technical theatre teaser treatment.
3. About preview connecting existing technical experience to current aerospace study.
4. Evidence principles strip: constraints, ownership, testing, iteration.
5. Contact call to action.

Use a single `h1`; section titles use `h2`. Ensure all essential content remains visible without `Reveal` behavior.

- [ ] **Step 6: Verify and commit the homepage**

Run:

```powershell
pnpm test -- src/app/page.test.tsx
pnpm typecheck
pnpm lint
git add src/app/page.tsx src/components
git commit -m "feat: create evidence-first portfolio homepage"
```

Expected: tests and static checks PASS.

---

### Task 4: Build project index and reusable case studies

**Files:**
- Create: `src/app/projects/page.tsx`
- Create: `src/app/projects/[slug]/page.tsx`
- Create: `src/components/case-study.tsx`
- Create: `src/components/evidence-frame.tsx`
- Create: `src/components/diagrams/flight-computer.tsx`
- Create: `src/components/diagrams/alphalete-flow.tsx`
- Test: `src/components/evidence-frame.test.tsx`
- Test: `src/app/projects/project-pages.test.tsx`

**Interfaces:**
- Consumes: `Project`, `getProject`, `getProjectSlugs`, and `ProjectGrid`.
- Produces: `/projects`, four static `/projects/[slug]` routes, `EvidenceFrame`, and technical diagrams.

- [ ] **Step 1: Write failing evidence-state and route tests**

Create `src/components/evidence-frame.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EvidenceFrame } from "./evidence-frame";

describe("EvidenceFrame", () => {
  it("explains a missing asset without rendering a broken image", () => {
    render(<EvidenceFrame item={{ title: "Wiring and packaging", kind: "photo", state: "needed", request: "Add a verified avionics integration photo." }} />);
    expect(screen.getByText("Evidence to add")).toBeInTheDocument();
    expect(screen.getByText("Add a verified avionics integration photo.")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
```

Create `src/app/projects/project-pages.test.tsx` to call `generateStaticParams()` and assert all four slugs are returned.

- [ ] **Step 2: Run tests and verify they fail**

Run: `pnpm test -- src/components/evidence-frame.test.tsx src/app/projects/project-pages.test.tsx`

Expected: FAIL because routes and evidence components do not exist.

- [ ] **Step 3: Implement project routing and metadata**

In `[slug]/page.tsx`:

```ts
export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}
```

Implement `generateMetadata` from the matching project's title and summary. Await App Router route parameters, call `notFound()` for unknown projects, and render `CaseStudy` for known projects.

- [ ] **Step 4: Implement the case-study renderer and evidence state**

`CaseStudy` renders a project header, compact metadata, section index, all structured sections in order, diagram when configured, evidence grid, next-project navigation, and contact CTA.

`EvidenceFrame` behavior:

```tsx
if (item.state === "needed") {
  return <aside className="evidence-needed"><span>Evidence to add</span><h3>{item.title}</h3><p>{item.request}</p></aside>;
}
return <figure><Image src={item.src!} alt={item.alt!} fill sizes="(max-width: 48rem) 100vw, 50vw" /><figcaption>{item.title}</figcaption></figure>;
```

Validate in the content tests that every `available` item has `src` and `alt` before using non-null assertions.

- [ ] **Step 5: Implement diagrams as real HTML/SVG evidence**

`FlightComputerDiagram` shows labeled flow:

```text
Sensors → Raspberry Pi / Python → Storage / Telemetry / Video
                         ↑
                       Power
```

`AlphaleteFlowDiagram` shows distributed product information flowing through validation/mapping into a centralized product-management workflow. Include concise accessible names and do not reveal proprietary fields or systems.

- [ ] **Step 6: Verify and commit projects**

Run:

```powershell
pnpm test -- src/components/evidence-frame.test.tsx src/app/projects/project-pages.test.tsx
pnpm typecheck
pnpm lint
git add src/app/projects src/components src/content/portfolio.test.ts
git commit -m "feat: add engineering project case studies"
```

Expected: project tests and static checks PASS.

---

### Task 5: Add About and Experience narratives

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/app/experience/page.tsx`
- Create: `src/components/experience-card.tsx`
- Test: `src/app/about/about.test.tsx`
- Test: `src/app/experience/experience.test.tsx`

**Interfaces:**
- Consumes: `portfolio.about`, `portfolio.experience`, `portfolio.theatre`, `portfolio.outreach`, and `portfolio.awards`.
- Produces: `/about`, `/experience`, and `ExperienceCard`.

- [ ] **Step 1: Write failing narrative-boundary tests**

Create tests that render both pages and assert:

```tsx
expect(screen.getByText(/Shackouls Honors College/i)).toBeInTheDocument();
expect(screen.queryByText(/NASA employee/i)).not.toBeInTheDocument();
expect(screen.queryByText(/MSU research assistant/i)).not.toBeInTheDocument();
expect(screen.getByText(/20 desktop systems/i)).toBeInTheDocument();
expect(screen.getByText(/21,000 items/i)).toBeInTheDocument();
expect(screen.getByText(/14,000-seat/i)).toBeInTheDocument();
```

- [ ] **Step 2: Run the tests and verify they fail**

Run: `pnpm test -- src/app/about/about.test.tsx src/app/experience/experience.test.tsx`

Expected: FAIL because the pages do not exist.

- [ ] **Step 3: Implement About**

Render:

- Editorial page intro
- Two short narrative paragraphs
- Focus-area list
- Four-entry chronology: high-powered rocketry, technical theatre operations, Alphalete systems work, and current aerospace study/mentoring
- Contact CTA

Do not add university team or research entries.

- [ ] **Step 4: Implement Experience**

Render:

- Alphalete entry with verified migration-support wording and deployment scale
- Technical theatre section at roughly 15–20% of page weight
- Outreach and mentoring
- Selective awards list
- Link to the Alphalete project case study

- [ ] **Step 5: Verify and commit the narratives**

Run:

```powershell
pnpm test -- src/app/about/about.test.tsx src/app/experience/experience.test.tsx
pnpm typecheck
pnpm lint
git add src/app/about src/app/experience src/components/experience-card.tsx
git commit -m "feat: add about and experience narratives"
```

---

### Task 6: Add contact, résumé, metadata, and edge states

**Files:**
- Create: `src/app/contact/page.tsx`
- Create: `src/app/not-found.tsx`
- Create: `src/app/icon.svg`
- Create: `src/app/manifest.ts`
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`
- Create: `src/app/opengraph-image.tsx`
- Test: `src/app/contact/contact.test.tsx`
- Test: `src/app/metadata.test.ts`

**Interfaces:**
- Consumes: `portfolio.resume`, `portfolio.social`, `portfolio.site`, and `getProjectSlugs()`.
- Produces: `/contact`, 404, manifest, robots, sitemap, social card, and resilient missing-link states.

- [ ] **Step 1: Write failing contact and metadata tests**

Create `src/app/contact/contact.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContactPage from "./page";

describe("ContactPage", () => {
  it("shows setup guidance instead of broken personal links", () => {
    render(<ContactPage />);
    expect(screen.getByText(/Contact details are ready to add/i)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /download résumé/i })).not.toBeInTheDocument();
  });
});
```

Create `src/app/metadata.test.ts` to assert sitemap output includes `/`, `/about`, `/experience`, `/projects`, `/contact`, and every project route.

- [ ] **Step 2: Run tests and verify they fail**

Run: `pnpm test -- src/app/contact/contact.test.tsx src/app/metadata.test.ts`

Expected: FAIL because contact and metadata modules do not exist.

- [ ] **Step 3: Implement contact and résumé states**

If no social links are configured, render one compact editorial note:

```text
Contact details are ready to add.
Update the email and LinkedIn values in src/content/portfolio.ts before publishing.
```

If `resume.state === "needed"`, render its `request` text without an anchor. Once available, render a real download link using `resume.href`.

- [ ] **Step 4: Implement metadata routes and generated artwork**

- `sitemap.ts`: combine static routes and project slugs; use `portfolio.site.url || "https://example.com"` only during local generation and document that production deployment requires the real URL.
- `robots.ts`: allow `/` and point to `/sitemap.xml`.
- `manifest.ts`: set name, short name, theme color `#f4f0e8`, and background color `#f4f0e8`.
- `opengraph-image.tsx`: render name, approved headline, and a minimal orbital motif with `ImageResponse`.
- `icon.svg`: use an `RD` monogram and orbital arc in the approved palette.
- `not-found.tsx`: include links to Home and Projects.

- [ ] **Step 5: Verify and commit edge states**

Run:

```powershell
pnpm test -- src/app/contact/contact.test.tsx src/app/metadata.test.ts
pnpm typecheck
pnpm lint
git add src/app/contact src/app/not-found.tsx src/app/icon.svg src/app/manifest.ts src/app/robots.ts src/app/sitemap.ts src/app/opengraph-image.tsx
git commit -m "feat: add resilient contact and metadata states"
```

---

### Task 7: Add end-to-end coverage and deployment documentation

**Files:**
- Create: `playwright.config.ts`
- Create: `e2e/portfolio.spec.ts`
- Modify: `README.md`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: All application routes and content/editing conventions.
- Produces: Browser smoke coverage and complete maintenance/deployment handoff.

- [ ] **Step 1: Write the failing browser smoke tests**

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  webServer: { command: "pnpm dev", url: "http://127.0.0.1:3000", reuseExistingServer: true },
  use: { baseURL: "http://127.0.0.1:3000", trace: "on-first-retry" },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chromium", use: { ...devices["Pixel 7"] } },
  ],
});
```

Create `e2e/portfolio.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("recruiter can reach the two primary case studies", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Engineering through building");
  await page.getByRole("link", { name: /Tsiolkovsky/i }).first().click();
  await expect(page).toHaveURL(/systemsgo-tsiolkovsky/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Tsiolkovsky");
  await page.getByRole("link", { name: "Work" }).click();
  await page.getByRole("link", { name: /Oberth/i }).first().click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Oberth");
});

test("missing assets are explicit and never broken", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByText(/Contact details are ready to add/i)).toBeVisible();
  await page.goto("/projects/systemsgo-tsiolkovsky");
  await expect(page.getByText("Evidence to add").first()).toBeVisible();
  await expect(page.locator("img[src='']")).toHaveCount(0);
});
```

- [ ] **Step 2: Run browser tests and verify the required browser is missing or tests expose defects**

Run: `pnpm test:e2e`

Expected before browser setup: Playwright reports that Chromium is not installed, or a smoke assertion exposes an implementation issue.

- [ ] **Step 3: Install Chromium and make smoke tests pass**

Run:

```powershell
pnpm exec playwright install chromium
pnpm test:e2e
```

Expected: desktop and mobile Chromium projects PASS.

- [ ] **Step 4: Write the complete editing and deployment guide**

Replace the starter README with these sections and exact actions:

1. **Local development** — `pnpm install`, `pnpm dev`, `pnpm test`, `pnpm test:e2e`, `pnpm build`.
2. **Edit personal content** — point to `src/content/portfolio.ts` and list identity, links, résumé, projects, experience, and awards.
3. **Replace evidence** — copy files into `public/evidence`, update the matching item to `state: "available"`, add `src` and meaningful `alt`.
4. **Add the résumé** — copy the PDF to `public/resume/reece-dealmeida-resume.pdf`, set state to `available`, and set `href` to `/resume/reece-dealmeida-resume.pdf`.
5. **Add a project** — duplicate one typed project record, choose a unique slug/number, provide all case-study sections, and add verified evidence state.
6. **Pre-publish checklist** — configure site URL, email, LinkedIn, résumé, images, and verified measurements; run all checks.
7. **Deploy to Vercel** — import the Git repository, accept Next.js defaults, deploy, and set the production URL in content before the final production deployment.
8. **Connect GoDaddy DNS** — add the domain in Vercel first; copy the exact A/CNAME records Vercel displays into GoDaddy; remove only conflicting records for the selected host; choose apex or `www` as canonical in Vercel; wait for DNS and SSL verification.
9. **Safety note** — retain any existing mail-related MX/TXT records and do not copy example DNS values when Vercel provides current required values.

- [ ] **Step 5: Run the full verification suite**

Run:

```powershell
pnpm test
pnpm typecheck
pnpm lint
pnpm build
pnpm test:e2e
git diff --check
```

Expected: every command PASS and no whitespace errors.

- [ ] **Step 6: Commit verification and handoff documentation**

```powershell
git add playwright.config.ts e2e README.md .gitignore
git commit -m "test: verify portfolio and document deployment"
```

---

### Task 8: Perform final visual and content QA

**Files:**
- Modify: only files associated with defects found during QA

**Interfaces:**
- Consumes: Completed application and all automated verification.
- Produces: Visually reviewed, accessibility-checked, production-ready site.

- [ ] **Step 1: Review production pages at desktop width**

Run `pnpm dev`, then inspect Home, About, Projects, all four project pages, Experience, Contact, and the 404 page at 1440×1000. Check hierarchy, clipping, orbital illustration, evidence states, long project copy, focus indicators, and footer consistency.

- [ ] **Step 2: Review production pages at mobile width**

Inspect the same routes at 390×844. Confirm navigation wraps cleanly, no horizontal overflow exists, headings do not orphan awkwardly, diagrams remain legible, and touch targets are at least 44 CSS pixels where practical.

- [ ] **Step 3: Review accessibility and reduced motion**

Navigate the whole site using only the keyboard, activate the skip link, verify focus order, emulate `prefers-reduced-motion: reduce`, and confirm content remains readable with animations disabled.

- [ ] **Step 4: Audit all public claims against the approved source**

Search for `NASA`, `Stennis`, `CubeSat`, `Space Cowboys`, `Student Engineer`, `led the migration`, and the private software alias. Expected: none appear as claims. Confirm every number shown is one of: Mach 1, 13,000 feet, 20 desktop systems, more than 21,000 items, 125 brand ambassadors, or 14,000-seat venue.

- [ ] **Step 5: Fix identified defects with focused regression checks**

For each defect, add or adjust the narrowest relevant test, reproduce the failure, patch the responsible component or CSS rule, and rerun that test plus `pnpm typecheck` and `pnpm lint`.

- [ ] **Step 6: Run final verification and commit QA fixes**

```powershell
pnpm test
pnpm typecheck
pnpm lint
pnpm build
pnpm test:e2e
git diff --check
git status --short
```

Expected: all checks PASS; only intentional uncommitted user files, if any, remain.

If QA required code changes:

```powershell
git add src e2e public README.md
git commit -m "fix: polish portfolio visual and content details"
```

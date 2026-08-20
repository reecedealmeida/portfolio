# Thumbnail-Led Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the existing portfolio around large technical project thumbnails, stronger case-study storytelling, and centrally configurable professional links.

**Architecture:** Preserve the typed `portfolio` content object and statically generated App Router project routes. Add a project-visual data contract and one reusable SVG component, then consume it from project previews and case-study heroes. Keep global design tokens and responsive layout rules in the existing root stylesheet so all server-rendered pages remain usable without client-side JavaScript.

**Tech Stack:** Next.js 16 App Router, React 19 server components, TypeScript 5.9, global CSS, Vitest and Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-08-20-thumbnail-led-portfolio-redesign.md`

## Global Constraints

- Do not invent LinkedIn, GitHub, email, resume, project metrics, affiliations, or outcomes.
- Keep missing external destinations as empty strings in `src/content/portfolio.ts` and render useful internal fallbacks.
- Use local code-native SVG/CSS artwork; do not add stock photography, remote image dependencies, or photorealistic generated evidence.
- Preserve static generation for every `/projects/[slug]` route and `notFound()` behavior for unknown slugs.
- Keep all essential navigation and project content usable without client-side JavaScript.
- Preserve visible keyboard focus, 44 CSS-pixel touch targets, reduced-motion support, and no document-level horizontal overflow.
- Before changing Next.js code, follow the repository `AGENTS.md` and reread the relevant files under `node_modules/next/dist/docs/01-app/`.

---

## File Map

- `src/content/portfolio.ts` — owns the project visual configuration and editable professional destinations.
- `src/components/project-visual.tsx` — renders one reusable, accessible SVG frame for all project visual variants.
- `src/components/project-card.tsx` — renders one thumbnail-led project preview row.
- `src/components/project-grid.tsx` — selects projects and assigns alternating row orientation.
- `src/components/case-study.tsx` — composes the large case-study hero visual, narrative, evidence, and next-project preview.
- `src/components/site-header.tsx` — renders primary navigation and configured professional utility links.
- `src/components/contact-cta.tsx` — closes pages with configured destinations or a contact fallback.
- `src/app/page.tsx` and `src/app/projects/page.tsx` — provide the redesigned homepage and project index hierarchy.
- `src/app/globals.css` — defines the shared editorial visual system and responsive behavior.
- `README.md` — documents the single configuration block for links, resume, and future project images.
- Unit tests beside the affected modules — lock down content, accessibility, links, and route structure.
- `e2e/portfolio.spec.ts` — verifies real navigation, responsive layout, focus, and overflow in the built application.

---

### Task 1: Add the project visual and professional-link contracts

**Files:**
- Modify: `src/content/portfolio.ts`
- Modify: `src/content/portfolio.test.ts`
- Modify: `src/lib/portfolio.ts`
- Modify: `src/lib/portfolio.test.ts`

**Interfaces:**
- Produces: `ProjectVisualVariant = "tsiolkovsky" | "oberth" | "alphalete" | "infrastructure"`
- Produces: `ProjectVisual = { variant: ProjectVisualVariant; alt: string }`
- Produces: `Project.visual: ProjectVisual`
- Produces: `getSocialLink(label: SocialLink["label"]): SocialLink | undefined`
- Consumes: the existing `portfolio.projects`, `portfolio.social`, and `visibleSocialLinks()` data.

- [ ] **Step 1: Write the failing content and helper tests**

Add these assertions:

```ts
// src/content/portfolio.test.ts
it("assigns a distinct configured visual to every project", () => {
  expect(portfolio.projects.map((project) => project.visual.variant)).toEqual([
    "tsiolkovsky",
    "oberth",
    "alphalete",
    "infrastructure",
  ]);
  expect(
    portfolio.projects.every((project) => project.visual.alt.trim().length > 0),
  ).toBe(true);
});

// src/lib/portfolio.test.ts
it("finds a professional destination by label without exposing empty values", () => {
  const originalSocial = portfolio.social;
  portfolio.social = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/configure-me" },
    { label: "GitHub", href: "" },
  ];

  try {
    expect(getSocialLink("LinkedIn")?.href).toContain("linkedin.com");
    expect(getSocialLink("GitHub")).toBeUndefined();
  } finally {
    portfolio.social = originalSocial;
  }
});
```

Update the import in `src/lib/portfolio.test.ts` to include `portfolio` and `getSocialLink`.

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `pnpm test src/content/portfolio.test.ts src/lib/portfolio.test.ts`

Expected: FAIL because `Project.visual` and `getSocialLink` do not exist.

- [ ] **Step 3: Add the typed contract and configured records**

Add the types before `Project`, then insert `visual: ProjectVisual;` immediately after the existing `diagram` field inside `Project`:

```ts
export type ProjectVisualVariant =
  | "tsiolkovsky"
  | "oberth"
  | "alphalete"
  | "infrastructure";

export type ProjectVisual = {
  variant: ProjectVisualVariant;
  alt: string;
};
```

Add these values to the matching project records:

```ts
visual: {
  variant: "tsiolkovsky",
  alt: "Technical illustration of a high-powered rocket, onboard flight computer, and telemetry path.",
},

visual: {
  variant: "oberth",
  alt: "Technical illustration of a constrained rocket airframe with a Mach marker and trajectory grid.",
},

visual: {
  variant: "alphalete",
  alt: "Technical illustration of product records moving through a centralized data workflow.",
},

visual: {
  variant: "infrastructure",
  alt: "Technical illustration of containerized services, network paths, and monitoring signals.",
},
```

Add the helper:

```ts
export function getSocialLink(label: SocialLink["label"]): SocialLink | undefined {
  return visibleSocialLinks().find((item) => item.label === label);
}
```

Keep the editable professional destinations together near the top of `portfolio` with empty `href` values and a short comment identifying them as the configuration block.

- [ ] **Step 4: Run the focused tests and verify GREEN**

Run: `pnpm test src/content/portfolio.test.ts src/lib/portfolio.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit the content contract**

```powershell
git add src/content/portfolio.ts src/content/portfolio.test.ts src/lib/portfolio.ts src/lib/portfolio.test.ts
git commit -m "feat: configure portfolio project visuals"
```

---

### Task 2: Build the reusable technical project visual

**Files:**
- Create: `src/components/project-visual.tsx`
- Create: `src/components/project-visual.test.tsx`

**Interfaces:**
- Consumes: `ProjectVisual` from `src/content/portfolio.ts`.
- Produces: `ProjectVisual({ visual, decorative?, className? })` with `decorative?: boolean` defaulting to `false`.
- Produces: `.project-visual`, `.project-visual__svg`, and `data-visual-variant` hooks for Task 6 styling and browser checks.

- [ ] **Step 1: Write failing accessibility and variant tests**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectVisual } from "./project-visual";

const visual = {
  variant: "tsiolkovsky" as const,
  alt: "Rocket, flight computer, and telemetry illustration.",
};

describe("ProjectVisual", () => {
  it("exposes the configured label when the visual carries meaning", () => {
    render(<ProjectVisual visual={visual} />);
    expect(screen.getByRole("img", { name: visual.alt })).toHaveAttribute(
      "data-visual-variant",
      "tsiolkovsky",
    );
  });

  it("hides a repeated visual from assistive technology", () => {
    render(<ProjectVisual decorative visual={visual} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(document.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
```

- [ ] **Step 2: Run the component test and verify RED**

Run: `pnpm test src/components/project-visual.test.tsx`

Expected: FAIL because `project-visual.tsx` does not exist.

- [ ] **Step 3: Implement the accessible SVG frame and four compositions**

Use a shared grid and variant-specific marks:

```tsx
import type { ProjectVisual as ProjectVisualData } from "@/content/portfolio";

type ProjectVisualProps = {
  visual: ProjectVisualData;
  decorative?: boolean;
  className?: string;
};

function VariantMarks({ variant }: Pick<ProjectVisualData, "variant">) {
  if (variant === "tsiolkovsky") {
    return (
      <g className="project-visual__marks project-visual__marks--tsiolkovsky">
        <path d="M230 405 260 180 290 405 260 385Z" />
        <rect x="430" y="210" width="205" height="150" rx="8" />
        <circle cx="482" cy="258" r="20" />
        <path d="M290 290C350 245 385 245 430 280M635 280C720 280 760 230 835 170" />
      </g>
    );
  }

  if (variant === "oberth") {
    return (
      <g className="project-visual__marks project-visual__marks--oberth">
        <path d="M175 335 520 255 730 280 520 305Z" />
        <path d="M400 280 500 170 545 270M390 290 485 390 535 300" />
        <circle cx="775" cy="280" r="58" />
        <path d="M120 420C330 430 595 420 865 345" />
      </g>
    );
  }

  if (variant === "alphalete") {
    return (
      <g className="project-visual__marks project-visual__marks--alphalete">
        <rect x="135" y="170" width="190" height="86" rx="8" />
        <rect x="135" y="315" width="190" height="86" rx="8" />
        <circle cx="505" cy="285" r="92" />
        <rect x="690" y="210" width="185" height="150" rx="8" />
        <path d="M325 213H410M325 358H410M597 285H690" />
      </g>
    );
  }

  return (
    <g className="project-visual__marks project-visual__marks--infrastructure">
      <rect x="140" y="195" width="185" height="220" rx="8" />
      <rect x="410" y="150" width="185" height="120" rx="8" />
      <rect x="410" y="335" width="185" height="120" rx="8" />
      <circle cx="780" cy="300" r="92" />
      <path d="M325 300H365C390 300 390 210 410 210M365 300C390 300 390 395 410 395M595 210C680 210 665 270 692 285M595 395C680 395 665 330 692 315" />
    </g>
  );
}

export function ProjectVisual({
  visual,
  decorative = false,
  className = "",
}: ProjectVisualProps) {
  const titleId = `project-visual-${visual.variant}-title`;

  return (
    <figure className={`project-visual ${className}`.trim()}>
      <svg
        aria-hidden={decorative ? "true" : undefined}
        aria-labelledby={decorative ? undefined : titleId}
        className="project-visual__svg"
        data-visual-variant={visual.variant}
        role={decorative ? undefined : "img"}
        viewBox="0 0 1000 600"
      >
        {decorative ? null : <title id={titleId}>{visual.alt}</title>}
        <defs>
          <pattern id={`grid-${visual.variant}`} height="50" width="50" patternUnits="userSpaceOnUse">
            <path className="project-visual__grid" d="M50 0H0V50" />
          </pattern>
        </defs>
        <rect className="project-visual__field" height="600" width="1000" />
        <rect fill={`url(#grid-${visual.variant})`} height="600" width="1000" />
        <VariantMarks variant={visual.variant} />
      </svg>
    </figure>
  );
}
```

- [ ] **Step 4: Run the component test and verify GREEN**

Run: `pnpm test src/components/project-visual.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the visual component**

```powershell
git add src/components/project-visual.tsx src/components/project-visual.test.tsx
git commit -m "feat: add technical project visuals"
```

---

### Task 3: Replace project cards with alternating thumbnail-led rows

**Files:**
- Modify: `src/components/project-card.tsx`
- Modify: `src/components/project-grid.tsx`
- Create: `src/components/project-card.test.tsx`

**Interfaces:**
- Consumes: `Project.visual` and `ProjectVisual({ decorative: true })` from Tasks 1–2.
- Produces: `ProjectCard({ project, index })`, where odd indices add `project-card--reverse`.
- Preserves: `/projects/${project.slug}` link behavior and `ProjectGrid({ projects, featuredOnly? })`.

- [ ] **Step 1: Write the failing project-preview test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { portfolio } from "@/content/portfolio";
import { ProjectCard } from "./project-card";

describe("ProjectCard", () => {
  it("renders a thumbnail-led case-study link", () => {
    const project = portfolio.projects[0];
    render(<ProjectCard index={0} project={project} />);

    expect(screen.getByRole("link", { name: project.title })).toHaveAttribute(
      "href",
      `/projects/${project.slug}`,
    );
    expect(document.querySelector("[data-visual-variant='tsiolkovsky']")).toBeInTheDocument();
    expect(screen.getByText("View case study")).toBeInTheDocument();
  });

  it("alternates the visual order for odd rows", () => {
    render(<ProjectCard index={1} project={portfolio.projects[1]} />);
    expect(screen.getByRole("link", { name: portfolio.projects[1].title })).toHaveClass(
      "project-card--reverse",
    );
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `pnpm test src/components/project-card.test.tsx`

Expected: FAIL because `ProjectCard` has no `index` prop or project visual.

- [ ] **Step 3: Implement the new row structure**

Replace the current card markup with:

```tsx
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      aria-label={project.title}
      className={`project-card${index % 2 === 1 ? " project-card--reverse" : ""}`}
      href={`/projects/${project.slug}`}
    >
      <ProjectVisual decorative visual={project.visual} />
      <article className="project-card__content">
        <div className="project-card__meta">
          <span className="project-card__number">{project.number}</span>
          <span>{project.category}</span>
        </div>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__summary">{project.summary}</p>
        <ul aria-label="Technologies and disciplines" className="tag-list">
          {project.tags.slice(0, 4).map((tag) => (
            <li className="tag" key={tag}>{tag}</li>
          ))}
        </ul>
        <span className="project-card__affordance">
          View case study <span aria-hidden="true">↗</span>
        </span>
      </article>
    </Link>
  );
}
```

Update `ProjectGrid` to pass `index={index}` and remove the obsolete `priority` prop.

- [ ] **Step 4: Run component and homepage tests**

Run: `pnpm test src/components/project-card.test.tsx src/app/page.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the preview structure**

```powershell
git add src/components/project-card.tsx src/components/project-grid.tsx src/components/project-card.test.tsx
git commit -m "feat: make project previews thumbnail led"
```

---

### Task 4: Simplify the homepage and expose configurable professional links

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/page.test.tsx`
- Modify: `src/app/projects/page.tsx`
- Modify: `src/components/site-header.tsx`
- Modify: `src/components/site-header.test.tsx`
- Modify: `src/components/contact-cta.tsx`
- Create: `src/components/contact-cta.test.tsx`
- Modify: `README.md`

**Interfaces:**
- Consumes: `getSocialLink()` and the existing `portfolio.resume` configuration.
- Consumes: the redesigned `ProjectGrid` from Task 3.
- Produces: a direct LinkedIn header link only when configured and a resume link that falls back to `/contact#resume`.
- Removes: homepage `OrbitalHero` and working-principles section; the underlying content remains available for future editing.

- [ ] **Step 1: Update tests to state the new homepage and link contract**

Replace the homepage principle test with:

```tsx
it("prioritizes visual selected work over abstract principles", () => {
  render(<HomePage />);
  expect(document.querySelectorAll(".project-visual").length).toBeGreaterThanOrEqual(2);
  expect(screen.queryByText("Working principles")).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Technical theatre systems and leadership/i }))
    .toHaveAttribute("href", "/experience#technical-theatre");
});
```

Add to the header test:

```tsx
it("shows LinkedIn as a direct utility link only when configured", () => {
  const originalSocial = portfolio.social;
  portfolio.social = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/configure-me" },
  ];

  try {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/configure-me",
    );
  } finally {
    portfolio.social = originalSocial;
  }
});
```

Create a CTA test:

```tsx
it("keeps the contact page available when professional links are unconfigured", () => {
  render(<ContactCta />);
  expect(screen.getByRole("link", { name: "Start a conversation" })).toHaveAttribute(
    "href",
    "/contact",
  );
});
```

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `pnpm test src/app/page.test.tsx src/components/site-header.test.tsx src/components/contact-cta.test.tsx`

Expected: FAIL because the old orbital hero/principles remain and the header does not render configured LinkedIn.

- [ ] **Step 3: Implement the simpler editorial hierarchy**

In `src/app/page.tsx`:

- Remove the `OrbitalHero` import and visual column.
- Change the hero to a concise introduction with the existing headline, school context, selected-work action, and configured/fallback resume action.
- Keep `ProjectGrid featuredOnly`, the technical-theatre link, `AboutPreview`, and `ContactCta`.
- Remove the working-principles section.

The resulting top-level composition should follow this exact order:

```tsx
export default function HomePage() {
  const resumeIsAvailable =
    portfolio.resume.state === "available" && portfolio.resume.href.trim().length > 0;

  return (
    <>
      <section className="home-hero section">
        <div className="shell home-hero__copy">
          <p className="eyebrow">{portfolio.home.eyebrow}</p>
          <h1 className="display-title">{portfolio.home.headline}</h1>
          <p className="lede">{portfolio.home.introduction}</p>
          <div className="home-hero__actions">
            <Link className="button" href="#selected-work">Explore selected work</Link>
            <Link
              className="button button--secondary"
              href={resumeIsAvailable ? portfolio.resume.href : "/contact#resume"}
            >
              Résumé
            </Link>
          </div>
        </div>
      </section>

      <Reveal>
        <section className="featured-work section section--line" id="selected-work">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Selected work / 01—03</p>
                <h2 className="section-title">Projects built through constraints and testing.</h2>
              </div>
              <Link className="text-link" href="/projects">View all projects ↗</Link>
            </div>
            <ProjectGrid featuredOnly projects={portfolio.projects} />
            <Link
              aria-label="Technical theatre systems and leadership"
              className="theatre-feature"
              href="/experience#technical-theatre"
            >
              <article className="theatre-feature__layout">
                <div className="theatre-feature__meta">
                  <span>04</span>
                  <span>Technical operations</span>
                </div>
                <div>
                  <h3>Technical theatre systems &amp; leadership</h3>
                  <p>{portfolio.theatre.summary}</p>
                </div>
                <span className="theatre-feature__affordance">View experience ↗</span>
              </article>
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal><AboutPreview /></Reveal>
      <Reveal><ContactCta /></Reveal>
    </>
  );
}
```

In `src/app/projects/page.tsx`, keep the title and `ProjectGrid`, but update the introduction to: `Selected engineering work across rocketry, avionics, data systems, and infrastructure. Each project opens into the constraints, contribution, implementation, testing, and evidence behind it.`

In `src/components/site-header.tsx`, derive the optional utility link:

```tsx
const linkedIn = getSocialLink("LinkedIn");
const resumeHref =
  portfolio.resume.state === "available" && portfolio.resume.href.trim()
    ? portfolio.resume.href
    : "/contact#resume";
```

Render Work, About, Experience, Resume, and Contact as primary links, then append LinkedIn only when `linkedIn` exists. Add `rel="noreferrer"` to configured external links.

Keep `ContactCta` centered on the internal contact page so it works before destinations are configured. If social links exist, add them as secondary text links below the primary action.

- [ ] **Step 4: Document the configuration block**

Update `README.md` with this exact example while retaining empty strings in production content:

```ts
social: [
  { label: "Email", href: "mailto:you@example.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/your-profile" },
  { label: "GitHub", href: "https://github.com/your-profile" },
],
resume: {
  state: "available",
  href: "/resume/reece-dealmeida-resume.pdf",
  request: "Add a current one-page engineering resume PDF before publishing.",
},
```

Explain that the resume PDF belongs at `public/resume/reece-dealmeida-resume.pdf` and that empty social values are omitted automatically.

- [ ] **Step 5: Run the focused tests and verify GREEN**

Run: `pnpm test src/app/page.test.tsx src/components/site-header.test.tsx src/components/contact-cta.test.tsx src/components/site-footer.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit the page hierarchy and configuration guide**

```powershell
git add src/app/page.tsx src/app/page.test.tsx src/app/projects/page.tsx src/components/site-header.tsx src/components/site-header.test.tsx src/components/contact-cta.tsx src/components/contact-cta.test.tsx README.md
git commit -m "feat: simplify portfolio homepage and links"
```

---

### Task 5: Give each case study a visual hero and next-project preview

**Files:**
- Modify: `src/components/case-study.tsx`
- Create: `src/components/case-study.test.tsx`
- Verify: `src/app/projects/project-pages.test.tsx`

**Interfaces:**
- Consumes: `ProjectVisual` and `Project.visual` from Tasks 1–2.
- Produces: `.case-study__hero-visual` containing one meaningful visual.
- Produces: `.next-project__visual` containing the decorative visual for the computed next project.
- Preserves: section anchors, diagram scroller, evidence frames, contact CTA, and circular next-project ordering.

- [ ] **Step 1: Write the failing case-study composition test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { portfolio } from "@/content/portfolio";
import { CaseStudy } from "./case-study";

describe("CaseStudy", () => {
  it("pairs the technical narrative with a project visual and next-project preview", () => {
    const project = portfolio.projects[0];
    const nextProject = portfolio.projects[1];
    render(<CaseStudy project={project} />);

    expect(screen.getByRole("img", { name: project.visual.alt })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Case study sections" }))
      .toBeInTheDocument();
    expect(screen.getByRole("link", { name: new RegExp(nextProject.shortTitle, "i") }))
      .toHaveAttribute("href", `/projects/${nextProject.slug}`);
    expect(document.querySelectorAll(`[data-visual-variant='${nextProject.visual.variant}']`))
      .toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `pnpm test src/components/case-study.test.tsx`

Expected: FAIL because the case study has no project visual.

- [ ] **Step 3: Add the visual hero and visual next-project link**

Place this immediately after the case-study heading/meta block:

```tsx
<div className="shell case-study__hero-visual">
  <ProjectVisual visual={project.visual} />
</div>
```

Replace the next-project link contents with:

```tsx
<Link
  aria-label={`Next project: ${nextProject.shortTitle}`}
  className="shell next-project__link"
  href={`/projects/${nextProject.slug}`}
>
  <span className="next-project__copy">
    <span className="eyebrow">Next project</span>
    <strong>{nextProject.shortTitle}</strong>
    <span>View case study ↗</span>
  </span>
  <ProjectVisual
    className="next-project__visual"
    decorative
    visual={nextProject.visual}
  />
</Link>
```

Do not change section ids, evidence copy, or diagram behavior.

- [ ] **Step 4: Run case-study and route tests and verify GREEN**

Run: `pnpm test src/components/case-study.test.tsx src/app/projects/project-pages.test.tsx src/components/diagram-scroller.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the case-study composition**

```powershell
git add src/components/case-study.tsx src/components/case-study.test.tsx
git commit -m "feat: add visual case study storytelling"
```

---

### Task 6: Apply the editorial visual system and verify responsive behavior

**Files:**
- Modify: `src/app/globals.css`
- Modify: `e2e/portfolio.spec.ts`

**Interfaces:**
- Styles all class hooks produced by Tasks 2–5.
- Preserves existing `.technical-diagram-scroll`, `.case-study__index`, focus, and reduced-motion behavior checked by Playwright.
- Produces a 16:10 `.project-visual` frame and alternating desktop `.project-card` rows that stack visual-first on mobile.

- [ ] **Step 1: Add failing browser assertions for the redesigned work flow**

Add this test:

```ts
test("project work is visual, alternating on desktop, and stacked without overflow on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  const desktopRows = page.locator(".project-card");
  await expect(desktopRows).toHaveCount(3);
  await expect(desktopRows.nth(1)).toHaveClass(/project-card--reverse/);
  await expect(desktopRows.first().locator(".project-visual")).toBeVisible();

  const visualRatio = await desktopRows.first().locator(".project-visual").evaluate((element) => {
    const box = element.getBoundingClientRect();
    return box.width / box.height;
  });
  expect(visualRatio).toBeGreaterThan(1.5);
  expect(visualRatio).toBeLessThan(1.7);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  const mobileMetrics = await desktopRows.first().evaluate((element) => {
    const visual = element.querySelector(".project-visual")!;
    const content = element.querySelector(".project-card__content")!;
    return {
      visualTop: visual.getBoundingClientRect().top,
      contentTop: content.getBoundingClientRect().top,
      pageClientWidth: document.documentElement.clientWidth,
      pageScrollWidth: document.documentElement.scrollWidth,
    };
  });

  expect(mobileMetrics.visualTop).toBeLessThan(mobileMetrics.contentTop);
  expect(mobileMetrics.pageScrollWidth).toBe(mobileMetrics.pageClientWidth);
});
```

Update the expected desktop homepage card count if the canonical `featured` configuration changes during implementation; it must equal `portfolio.projects.filter((project) => project.featured).length`, which is three in the approved content.

- [ ] **Step 2: Run the new browser test and verify RED**

Run: `pnpm test:e2e --grep "project work is visual"`

Expected: FAIL because the new layout hooks are not styled as 16:10 alternating rows.

- [ ] **Step 3: Replace obsolete hero/card rules with the editorial layout**

In `src/app/globals.css`:

- Keep the current variables, reset, typography, shell, skip-link, focus, diagram, evidence, experience, and reduced-motion rules.
- Remove obsolete `.home-hero::before`, `.home-hero__visual`, orbital hero animation, three-column card-grid, and four-column working-principles rules.
- Set the header to `position: sticky; top: 0; z-index: 20;` with a translucent paper background and `backdrop-filter` enhancement.
- Constrain the hero copy to approximately `60rem`, reduce `.display-title` to `clamp(3rem, 7vw, 6.25rem)`, and use generous but shorter vertical spacing.
- Style `.project-grid` as a single column with `gap: clamp(4rem, 9vw, 8rem)`.
- Style `.project-card` as a two-column grid, `grid-template-columns: minmax(0, 1.15fr) minmax(18rem, 0.85fr)`, with aligned content, no filled card background, and no outer card border.
- Set `.project-card--reverse .project-visual { order: 2; }` and `.project-card--reverse .project-card__content { order: 1; }` only above the mobile breakpoint.
- Set `.project-visual { aspect-ratio: 16 / 10; overflow: hidden; margin: 0; background: var(--ink); }`.
- Use CSS variables on `[data-visual-variant]` to give each project a restrained, distinct field color while keeping shared ink/accent marks.
- Make `.project-visual__svg` fill the frame and style the grid, field, and marks with consistent strokes.
- Add a subtle `transform: scale(1.015)` visual hover on project links and disable it under reduced motion.
- Style `.case-study__hero-visual` as a wide framed band and `.next-project__link` as a two-column copy/visual layout.
- At `max-width: 42rem`, stack `.project-card`, force both normal and reverse cards to visual-first source order, stack the case-study hero/meta and next-project layout, and preserve at least 44px navigation targets.

Implement the core layout with these exact rules, then retain and adapt the existing typography, case-study, diagram, and evidence rules around them:

```css
.site-header {
  position: sticky;
  z-index: 20;
  top: 0;
  border-bottom: 1px solid color-mix(in srgb, var(--line) 78%, transparent);
  background: color-mix(in srgb, var(--paper) 92%, transparent);
  backdrop-filter: blur(16px);
}

.home-hero__copy {
  max-width: 60rem;
}

.display-title {
  font-size: clamp(3rem, 7vw, 6.25rem);
}

.project-grid {
  display: grid;
  gap: clamp(4rem, 9vw, 8rem);
}

.project-card {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(18rem, 0.85fr);
  align-items: center;
  gap: clamp(2rem, 5vw, 5rem);
  color: inherit;
  text-decoration: none;
}

.project-card--reverse .project-visual {
  order: 2;
}

.project-card--reverse .project-card__content {
  order: 1;
}

.project-visual {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  margin: 0;
  background: var(--ink);
}

.project-visual__svg {
  width: 100%;
  height: 100%;
  transition: transform 240ms ease;
}

.project-visual__field {
  fill: #173b59;
}

[data-visual-variant="oberth"] .project-visual__field {
  fill: #a94020;
}

[data-visual-variant="alphalete"] .project-visual__field {
  fill: #3f5c52;
}

[data-visual-variant="infrastructure"] .project-visual__field {
  fill: #282f3f;
}

.project-visual__grid {
  fill: none;
  stroke: rgba(255, 255, 255, 0.12);
  stroke-width: 1;
}

.project-visual__marks {
  fill: none;
  stroke: #f4f0e8;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 8;
}

.project-card:hover .project-visual__svg,
.project-card:focus-visible .project-visual__svg {
  transform: scale(1.015);
}

.case-study__hero-visual {
  margin-bottom: clamp(3rem, 7vw, 6rem);
}

.next-project__link {
  display: grid;
  grid-template-columns: minmax(0, 0.7fr) minmax(20rem, 1fr);
  align-items: center;
  gap: clamp(2rem, 6vw, 6rem);
  text-decoration: none;
}

@media (max-width: 42rem) {
  .project-card,
  .next-project__link {
    grid-template-columns: 1fr;
  }

  .project-card .project-visual,
  .project-card--reverse .project-visual {
    order: 1;
  }

  .project-card .project-card__content,
  .project-card--reverse .project-card__content {
    order: 2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-visual__svg {
    transition: none;
  }

  .project-card:hover .project-visual__svg,
  .project-card:focus-visible .project-visual__svg {
    transform: none;
  }
}
```

- [ ] **Step 4: Run the focused browser test and verify GREEN**

Run: `pnpm test:e2e --grep "project work is visual"`

Expected: PASS.

- [ ] **Step 5: Run all automated verification**

Run in this order:

```powershell
pnpm test
pnpm typecheck
pnpm lint
pnpm build
pnpm test:e2e
```

Expected: every command exits with code 0 and no unexpected warnings.

- [ ] **Step 6: Perform browser-based visual and accessibility review**

Review `/`, `/projects`, `/projects/systemsgo-tsiolkovsky`, `/projects/systemsgo-oberth`, and `/contact` at 390×844, 768×1024, and 1280×900. Confirm:

- No clipped text or document-level horizontal scrolling.
- Thumbnails remain legible and clearly different from one another.
- Every project preview opens the correct dedicated page.
- Header and case-study section index remain useful around fragment navigation.
- Keyboard focus is visible on the brand, navigation, project rows, section index, CTA, and footer links.
- Reduced-motion mode removes translation and scale animation.
- Unconfigured external destinations never produce empty or fake links.

- [ ] **Step 7: Commit the completed redesign**

```powershell
git add src/app/globals.css e2e/portfolio.spec.ts
git commit -m "feat: finish editorial portfolio redesign"
```

---

## Completion Gate

Before reporting completion, invoke `superpowers:verification-before-completion`, rerun the full verification commands from Task 6 Step 5, inspect `git status --short`, and summarize any intentionally unconfigured external destinations. Do not describe the redesign as finished until those fresh results are available.

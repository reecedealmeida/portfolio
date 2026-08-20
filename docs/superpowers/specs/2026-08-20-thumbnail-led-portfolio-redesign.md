# Thumbnail-Led Portfolio Redesign

## Purpose

Evolve the existing portfolio from an abstract, card-based presentation into a visual engineering portfolio inspired by Davis Ryan, Katie Heinemann, and Ramit Krishnan. The redesign should let a recruiter scan Reece DeAlmeida's projects through strong thumbnails, then open a dedicated page for the full technical story.

This specification extends the existing evidence-first content and routing model. It does not replace verified copy with invented claims, create external accounts, or publish guessed profile URLs.

## Success Criteria

- The homepage communicates Reece's aerospace focus and strongest work within one viewport.
- Every featured project has a prominent visual thumbnail and a clear link to its case study.
- Project pages feel intentionally designed as individual technical narratives rather than long text dumps.
- LinkedIn, GitHub, email, and resume destinations are visible in useful locations and editable from one content file.
- The initial redesign looks complete without requiring project photography.
- Existing accessibility, metadata, static generation, and no-JavaScript navigation continue to work.

## Chosen Direction

Use an editorial engineering direction that combines:

- Davis Ryan's immediate aerospace identity and image-first project browsing.
- Ramit Krishnan's simple project-to-detail flow.
- Katie Heinemann's substantive project narratives and direct professional links.

The result should remain recognizably Reece's site. It will preserve the warm neutral paper, deep navy ink, and burnt-orange accent while reducing ornamental framing and giving project visuals much more space.

## Information Architecture

### Global Header

- Keep Reece's name as the home link.
- Use a compact navigation: Work, About, Experience, Resume, and Contact.
- Add LinkedIn as a direct utility link when configured.
- When a destination is still a placeholder, route to the contact page's clearly labeled configuration state rather than an invented external URL.
- Keep mobile navigation readable through wrapping or a compact layout; no JavaScript-only menu is required.

### Homepage

1. **Introduction** — Reece's name, aerospace focus, current school context, short positioning statement, and direct actions for selected work and resume.
2. **Selected projects** — one large project row per featured project. Each row contains a 16:10 technical thumbnail, project number/category, title, short summary, select disciplines, and a case-study affordance. Image and copy placement alternate on wide screens and stack consistently on mobile.
3. **Technical theatre feature** — retain the link to experience, but present it as a compact supporting discipline rather than a project-equivalent card.
4. **Short profile** — retain a concise about preview.
5. **Contact** — close with email, LinkedIn, GitHub, and resume destinations when configured.

The existing working-principles grid and large orbital hero illustration will be removed from the homepage. Their space will be reassigned to concrete work.

### Projects Index

- Reuse the same visual project-row language in a denser form.
- Show all projects without interaction or filtering.
- Preserve direct links to statically generated `/projects/[slug]` routes.

### Project Case Studies

Each case study will contain:

1. Project number, category, title, and concise summary.
2. A wide project visual immediately below the heading.
3. A compact facts rail for timeframe and focus areas.
4. Existing structured narrative sections: context, constraints, responsibilities, implementation, testing, and reflection.
5. Existing system diagram where available.
6. Existing evidence records and explicit verification states.
7. A prominent next-project link with a visual preview.

The desktop section index remains sticky where space allows. Mobile keeps a normal document flow. No content is hidden behind tabs or hover states.

## Project Thumbnail System

The repository currently contains no project photography. The first version will therefore use local, code-native engineering artwork instead of stock imagery or fabricated photographs.

Each project receives a `visual` configuration in the central content model. It selects one of a small number of reusable SVG/CSS compositions and supplies a concise accessible label. Initial variants will visually reference:

- Tsiolkovsky: rocket silhouette, flight-computer board, telemetry path, and orbital plotting.
- Oberth: airframe geometry, Mach marker, constraints, and trajectory/grid lines.
- Alphalete: product-data migration nodes and desktop deployment flow.
- Infrastructure: containers, services, network paths, and monitoring signals.

Visuals use shared colors and line weights but different compositions so projects are recognizable at a glance. They are decorative when adjacent text already names the project; otherwise the provided label is exposed to assistive technology.

Future project photos can replace a visual by changing the content record, without modifying the project-card or case-study components.

## Content and Placeholder Configuration

All editable identity destinations remain in `src/content/portfolio.ts` under clearly named fields:

- `portfolio.social` for Email, LinkedIn, and GitHub.
- `portfolio.resume` for availability state, public path, and fallback message.
- Project records for titles, summaries, sections, evidence, and visual configuration.

Placeholder destinations will use empty strings rather than fake URLs. Components omit unavailable external links or route users to a helpful contact/resume state. The resume PDF will eventually live under `public/resume/`, with its path set once the file is supplied.

The README will identify the exact block to edit and give short examples for each destination.

## Visual System

- Retain the warm off-white canvas, dark navy text, and restrained orange-red accent.
- Shift the balance toward neutral surfaces and project imagery; the accent should mark navigation, numbering, or interaction rather than fill large areas.
- Use the existing editorial serif for major headings and technical sans-serif for body copy and metadata.
- Reduce the maximum headline size slightly so the hero reads as an introduction rather than a poster.
- Increase thumbnail scale, use consistent aspect ratios, and allow images to touch their visual frame.
- Use hairline rules, small technical labels, and restrained corner radii.
- Motion is limited to small reveal and thumbnail-hover transitions and respects reduced-motion preferences.

## Responsive Behavior

- Wide screens: two-column hero; alternating two-column project rows; sticky case-study index.
- Tablet: balanced single- or two-column sections depending on available width; project visuals remain dominant.
- Mobile: text first in the hero, then project rows stack with the thumbnail before the copy; navigation wraps cleanly; metadata and tags do not cause horizontal scrolling.
- Thumbnail artwork scales with its view box and never contains essential small text.

## Accessibility and Interaction

- Semantic headings and links remain the basis of navigation.
- Entire project previews are understandable without hover.
- Focus states remain high contrast and visible.
- Meaningful images receive concise alternative text; decorative code-native visuals are hidden from assistive technology.
- Touch targets remain at least 44 CSS pixels in the header and calls to action.
- Reduced-motion preferences disable reveal translation and nonessential visual movement.
- The site remains fully browseable without client-side JavaScript.

## Error and Edge States

- Missing social destination: omit the external link and preserve a clear contact path.
- Missing resume: show the existing configuration message rather than a broken download.
- Unknown project visual variant: render a neutral technical fallback artwork.
- Unknown project slug: continue to use Next.js `notFound()` behavior.
- Missing evidence: keep the existing explicit evidence-needed panel.

## Testing and Verification

- Unit tests will cover configured and unconfigured social/resume destinations, project visual selection, project preview links, and case-study navigation.
- Existing page, metadata, content-helper, and diagram tests must remain green or be intentionally updated to the new design contract.
- Playwright checks will verify the homepage-to-case-study path, all project routes, direct professional links when configured, and mobile overflow.
- Run formatting/lint, TypeScript, unit tests, production build, and browser-based desktop/mobile visual review.
- Review keyboard navigation, focus visibility, reduced motion, and missing-content states manually.

## Out of Scope

- Inventing LinkedIn, GitHub, email, or resume destinations.
- Adding a CMS, analytics, contact-form backend, or external image service.
- Writing new unverified project claims or outcomes.
- Replacing project artwork with generated photorealistic evidence.
- Deploying the site or changing DNS.


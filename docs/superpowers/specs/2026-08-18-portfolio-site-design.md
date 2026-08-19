# Reece DeAlmeida Portfolio Website Design

## Purpose

Build a polished, evidence-first engineering portfolio for internship recruiting. The site should present Reece DeAlmeida as an early-career aerospace engineering student with meaningful pre-college experience in rocketry, avionics, embedded systems, software infrastructure, technical operations, and mentoring without inflating titles, affiliations, or ownership.

The experience should feel premium and memorable while remaining conservative enough for technical recruiters. It must be straightforward to edit, deploy through Vercel, and connect to a GoDaddy-managed domain.

## Success criteria

- A recruiter understands Reece's focus and strongest technical work within 30–60 seconds.
- The homepage prioritizes specific work and evidence rather than generic claims or skill ratings.
- Tsiolkovsky and Oberth appear as separate, substantial engineering case studies.
- Unverified university-team and research affiliations are not presented publicly.
- Missing photos, résumé files, links, and measurements use explicit, polished placeholders rather than invented facts.
- Content can be updated without editing layout components.
- The production build is fast, responsive, accessible, SEO-ready, and directly deployable to Vercel.

## Technical approach

Use Next.js with the App Router, TypeScript, and statically generated content. This approach provides first-class Vercel support, strong metadata and routing primitives, and room for future interactive features without introducing a CMS or database.

Personal content will live in a central, typed content module. Components will receive content as data and remain responsible only for presentation and interaction. Project pages will be produced from structured project records and reusable case-study sections rather than duplicated page implementations.

The initial site has no external runtime data dependencies. Fonts may use Next.js font optimization. Visual diagrams and decorative imagery will be local CSS/SVG assets so the first version remains complete without unlicensed stock photography.

## Information architecture

### Global navigation

- Work
- About
- Experience
- Résumé
- Contact

Navigation remains compact and sticky on larger screens, with an accessible disclosure menu on small screens.

### Home

- Aerospace-focused introduction
- Approved headline: “Engineering through building, testing, and iteration.”
- Brief supporting statement covering rocketry, avionics, embedded systems, and technical operations
- Primary links to selected work and résumé
- Featured work: Tsiolkovsky, Oberth, Alphalete systems migration, and curated technical theatre
- Short evidence-based profile summary
- Contact call to action

### About

- Two concise paragraphs connecting Reece's technical foundation to his current aerospace education
- Current status: Aerospace Engineering at Mississippi State University and Shackouls Honors College
- Focus areas presented as text, not arbitrary proficiency bars
- A short chronology of building, testing, operations, and mentoring experience

### Projects index

- Tsiolkovsky flight computer and high-powered rocket
- Oberth Mach 1 constrained rocket design
- Containerized server infrastructure and software systems
- Compact embedded-systems gallery
- Filters or category labels may improve scanning, but all work remains visible without interaction

### Project case studies

Tsiolkovsky and Oberth each receive a dedicated route. The template supports:

- Context
- Constraints
- Reece's specific contribution
- Design process and tradeoffs
- Implementation
- Testing and validation
- Failure or iteration
- Result
- Reflection
- Evidence and media

Only claims supported by the supplied brief will be stated as facts. Measurements, launch outcomes, team sizes, and detailed ownership not included in the brief will be marked for later completion.

### Experience

- Alphalete Athletics systems-migration case study
- IT deployment and operational scale
- Sanitized, non-proprietary workflow diagram
- Technical theatre systems and leadership
- Outreach and ongoing rocketry mentoring
- Selective awards and recognition

### Résumé and contact

- Résumé download control with a clear missing-file state until the PDF is supplied
- Professional email, LinkedIn, and optional GitHub values sourced from central content
- No contact form or external email service in the initial version; a mail link avoids unnecessary infrastructure and privacy concerns

## Visual system

Use the approved “Orbital Editorial” direction:

- Warm off-white background
- Deep aerospace navy for text and high-emphasis surfaces
- Restrained burnt-orange accent
- Editorial serif display face paired with a technical sans-serif body face
- Generous whitespace and clear typographic hierarchy
- Fine rules, coordinate labels, project numbers, and restrained technical metadata
- Responsive spacing and typography through shared design tokens

The design should feel authored rather than templated. It will avoid generic gradient-heavy startup styling, excessive glass effects, animated backgrounds, skill bars, and oversized self-promotional claims.

## Signature interactions and visuals

- A lightweight orbital-line hero illustration built with semantic HTML and SVG
- Restrained entrance and scroll-reveal transitions
- Project-card hover states that expose technical metadata without hiding essential content
- A case-study progress or section index on larger screens where it improves navigation
- CSS/SVG technical diagrams for the Tsiolkovsky flight-computer architecture and the Alphalete old-to-new workflow
- Motion disabled or simplified when the user requests reduced motion

Visual effects must not delay reading, trap keyboard focus, or make content dependent on JavaScript.

## Content model and editing

The central content module will contain:

- Site identity and SEO details
- Navigation labels
- Social and contact links
- Homepage copy
- About copy and focus areas
- Project metadata and case-study sections
- Experience entries
- Theatre, outreach, and award summaries
- Asset paths and placeholder status

The content schema will distinguish confirmed content from missing values. Components will render a purposeful placeholder or omit an optional element rather than displaying broken links or empty panels.

An editing guide will explain how to:

- Update contact and social links
- Add or replace the résumé PDF
- Replace project placeholders with photos, diagrams, measurements, and results
- Add a project to the index and generate its case-study route
- Update current university involvement once contribution and titles are verified
- Add research only after the institution, sponsor relationship, title, and personal contribution are confirmed

## Responsive and accessibility design

- Semantic landmarks, headings, lists, links, and buttons
- Keyboard-operable navigation and controls
- Visible focus indicators
- Sufficient color contrast
- Descriptive alternative text for meaningful imagery
- Decorative SVG hidden from assistive technology
- Touch targets sized for mobile use
- Layouts verified at narrow mobile, tablet, standard desktop, and wide desktop widths
- No essential information available only on hover
- Reduced-motion support

## Error and edge-state behavior

- Missing résumé: render a disabled or explanatory control rather than a broken download
- Missing social link: omit it cleanly
- Missing project media: show an editorial evidence placeholder identifying the asset needed
- Missing measurement or result: render a “details to be added after verification” note only where the absence matters
- Unknown project slug: use the framework's not-found page
- JavaScript unavailable: core content, navigation links, and project browsing remain usable

## SEO and sharing

- Per-page titles and descriptions
- Canonical metadata derived from a configurable production URL
- Open Graph and social-card metadata
- Sitemap and robots configuration
- Structured person and project data where accurate and useful
- Favicon and simple monogram mark

Placeholder URLs must not be published as real identities or affiliations.

## Verification

- TypeScript checks
- Lint checks
- Production Next.js build
- Automated unit coverage for content helpers and important conditional states where valuable
- Automated browser checks for primary navigation and project routes
- Manual visual review on desktop and mobile widths
- Keyboard and focus-state review
- Reduced-motion review
- Missing-content and broken-link review
- Lighthouse-oriented review for performance, accessibility, SEO, and best practices

## Deployment and domain handoff

The repository will be ready to import into Vercel without custom build infrastructure. Documentation will cover:

1. Importing the Git repository into Vercel.
2. Confirming the Next.js framework settings and production deployment.
3. Adding the desired domain in Vercel.
4. Copying the exact DNS records Vercel provides into GoDaddy DNS management.
5. Choosing the preferred apex or `www` canonical domain and configuring the redirect in Vercel.
6. Waiting for DNS and SSL verification before removing any previous hosting records.

The implementation will not modify Vercel, GoDaddy, DNS, or external accounts.

## Deferred scope

- CMS integration
- Contact-form backend
- Analytics or tracking
- Blog
- Verified university team page
- Research page
- Private or aliased infrastructure identity links
- Invented project metrics, titles, outcomes, or affiliations

These additions can be made later without restructuring the initial site.

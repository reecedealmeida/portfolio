# Reece DeAlmeida Portfolio

## Local development

Install dependencies and use the following commands while developing:

```powershell
pnpm install
pnpm dev
pnpm test
pnpm test:e2e
pnpm build
```

## Edit personal content

Edit [src/content/portfolio.ts](src/content/portfolio.ts) for all portfolio content. It contains the identity, links, résumé, projects, experience, and awards shown throughout the site. Keep the records typed and update the source of truth there instead of hard-coding personal values in pages or components.

## Replace evidence

Copy verified evidence files into `public/evidence`. For the matching evidence item in `src/content/portfolio.ts`, set `state` to `"available"`, add its `src`, and provide meaningful `alt` text that explains what the image shows. Keep items as `"needed"` until their files and descriptions are ready, so the site communicates the missing evidence explicitly.

## Add the résumé

Copy the PDF to `public/resume/reece-dealmeida-resume.pdf`. In `src/content/portfolio.ts`, set the résumé `state` to `"available"` and set its `href` to `/resume/reece-dealmeida-resume.pdf`.

## Add a project

Duplicate one typed project record in `src/content/portfolio.ts`, choose a unique slug and number, and provide every case-study section. Add a verified evidence state for each supporting item before publishing the project.

## Pre-publish checklist

Before publishing, configure the site URL, email, LinkedIn, résumé, images, and verified measurements. Then run all local checks:

```powershell
pnpm test
pnpm typecheck
pnpm lint
pnpm build
pnpm test:e2e
```

## Deploy to Vercel

Import the Git repository into Vercel, accept the Next.js defaults, and deploy. Set the production URL in `src/content/portfolio.ts` before the final production deployment so the site metadata resolves to the canonical address.

## Connect GoDaddy DNS

Add the domain in Vercel first. Copy the exact current A and CNAME records Vercel displays into GoDaddy; do not rely on copied example DNS values. Remove only records that conflict with the selected apex or `www` host, choose apex or `www` as the canonical host in Vercel, then wait for DNS and SSL verification.

## Safety note

Retain any existing mail-related MX and TXT records. Do not copy example DNS values when Vercel provides the current required values.

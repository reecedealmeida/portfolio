import { expect, test } from "@playwright/test";

const projectRoutes = [
  "/projects/systemsgo-tsiolkovsky",
  "/projects/systemsgo-oberth",
  "/projects/alphalete-systems-migration",
  "/projects/containerized-infrastructure",
];

test("every indexable route emits its own canonical URL", async ({ page }) => {
  const routes = ["/", "/about", "/experience", "/projects", "/contact", ...projectRoutes];

  for (const route of routes) {
    await page.goto(route);
    const href = await page.locator("link[rel='canonical']").getAttribute("href");
    expect(href).not.toBeNull();
    const canonical = new URL(href!);
    expect(canonical.origin).toBe("http://localhost:3000");
    expect(canonical.pathname).toBe(route);
  }
});

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

  const [standardRow, reverseRow] = await desktopRows.evaluateAll((rows) =>
    rows.slice(0, 2).map((row) => {
      const visual = row.querySelector(".project-visual")!.getBoundingClientRect();
      const content = row.querySelector(".project-card__content")!.getBoundingClientRect();
      return {
        visualLeft: visual.left,
        visualRight: visual.right,
        contentLeft: content.left,
        contentRight: content.right,
      };
    }),
  );
  expect(standardRow.visualRight).toBeLessThan(standardRow.contentLeft);
  expect(reverseRow.contentRight).toBeLessThan(reverseRow.visualLeft);

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

test("reduced motion removes project thumbnail scale and transition", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const projectCard = page.locator(".project-card").first();
  await projectCard.hover();
  const motion = await projectCard.locator(".project-visual__svg").evaluate((visual) => {
    const style = getComputedStyle(visual);
    return {
      transform: style.transform,
      transitionDuration: style.transitionDuration,
    };
  });

  expect(motion.transform).toBe("none");
  expect(motion.transitionDuration).toBe("0s");
});

test("missing assets are explicit and never broken", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByText(/Contact details are ready to add/i)).toBeVisible();
  await page.goto("/projects/systemsgo-tsiolkovsky");
  await expect(page.getByText("Evidence to add").first()).toBeVisible();
  await expect(page.locator("img[src='']")).toHaveCount(0);
});

test("dark contact CTA has a distinct keyboard focus state", async ({ page }) => {
  await page.goto("/");
  const contactCta = page.getByRole("link", { name: "Start a conversation" });

  await contactCta.focus();

  await expect(contactCta).toHaveCSS("background-color", "rgb(239, 154, 114)");
  await expect(contactCta).toHaveCSS("border-color", "rgb(239, 154, 114)");
});

test("practical mobile navigation targets are at least 44 CSS pixels tall", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const primaryTargets = await page
    .locator(".site-brand, .primary-nav a, .text-link")
    .evaluateAll((elements) =>
      elements.map((element) => ({
        height: element.getBoundingClientRect().height,
        text: element.textContent?.trim(),
      })),
    );

  expect(primaryTargets).not.toEqual([]);
  expect(primaryTargets.every((target) => target.height >= 44)).toBe(true);

  await page.goto("/projects/systemsgo-tsiolkovsky");
  const caseStudyTargets = await page
    .locator(".case-study__index a")
    .evaluateAll((elements) =>
      elements.map((element) => element.getBoundingClientRect().height),
    );

  expect(caseStudyTargets).not.toEqual([]);
  expect(caseStudyTargets.every((height) => height >= 44)).toBe(true);
});

test("mobile workflow diagrams stay legible without overflowing the page", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/projects/systemsgo-tsiolkovsky");

  await expect(
    page.getByText("Scroll horizontally to view the complete diagram."),
  ).toBeVisible();

  const diagramMetrics = await page
    .locator(".technical-diagram-scroll")
    .evaluate((element) => {
      const diagram = element.querySelector(".technical-diagram");
      return {
        containerWidth: element.clientWidth,
        diagramWidth: diagram?.getBoundingClientRect().width ?? 0,
        pageClientWidth: document.documentElement.clientWidth,
        pageScrollWidth: document.documentElement.scrollWidth,
        scrollWidth: element.scrollWidth,
      };
    });

  expect(diagramMetrics.diagramWidth).toBeGreaterThanOrEqual(720);
  expect(diagramMetrics.scrollWidth).toBeGreaterThan(diagramMetrics.containerWidth);
  expect(diagramMetrics.pageScrollWidth).toBe(diagramMetrics.pageClientWidth);
});

test("tablet workflow diagrams keep readable labels inside a contained scroller", async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/projects/systemsgo-tsiolkovsky");

  const metrics = await page.locator(".technical-diagram-scroll").evaluate((element) => {
    const label = element.querySelector(".technical-diagram__node text");
    return {
      labelSize: label ? Number.parseFloat(getComputedStyle(label).fontSize) : 0,
      documentClientWidth: document.documentElement.clientWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
      containerWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
    };
  });

  expect(metrics.labelSize).toBeGreaterThanOrEqual(16);
  expect(metrics.scrollWidth).toBeGreaterThan(metrics.containerWidth);
  expect(metrics.documentScrollWidth).toBe(metrics.documentClientWidth);
});

test("desktop header and case-study index stay useful around fragment navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/projects/systemsgo-tsiolkovsky");

  await expect(page.locator(".site-header")).toHaveCSS("position", "sticky");
  await expect(page.locator(".case-study__index")).toHaveCSS("position", "sticky");
  await page.getByRole("link", { name: "Testing & verification" }).click();

  const offsets = await page.locator("#testing").evaluate((target) => {
    const header = document.querySelector(".site-header");
    return {
      headerBottom: header?.getBoundingClientRect().bottom ?? 0,
      targetTop: target.getBoundingClientRect().top,
    };
  });
  expect(offsets.targetTop).toBeGreaterThanOrEqual(offsets.headerBottom);

  await page.goto("/");
  const theatreFeature = page.getByRole("link", {
    name: "Technical theatre systems and leadership",
  });
  await expect(theatreFeature).toHaveAttribute("href", "/experience#technical-theatre");
  await theatreFeature.click();
  await expect(page).toHaveURL(/\/experience#technical-theatre$/);
  await expect(page.locator("#technical-theatre")).toBeVisible();
});

test("diagram regions are focusable only when horizontal scrolling is available", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/projects/systemsgo-tsiolkovsky");
  await expect(page.locator(".technical-diagram-scroll")).not.toHaveAttribute("tabindex");
  await expect(
    page.getByText("Scroll horizontally to view the complete diagram."),
  ).toHaveCount(0);

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator(".technical-diagram-scroll")).toHaveAttribute("tabindex", "0");
  await expect(
    page.getByText("Scroll horizontally to view the complete diagram."),
  ).toBeVisible();
});

test("configured footer social-link styling provides a practical target", async ({ page }) => {
  await page.goto("/");
  const height = await page.locator(".site-footer").evaluate((footer) => {
    const nav = document.createElement("nav");
    nav.className = "site-footer__links";
    const link = document.createElement("a");
    link.className = "site-footer__link";
    link.href = "https://example.test/profile";
    link.textContent = "Profile";
    nav.append(link);
    footer.append(nav);
    return link.getBoundingClientRect().height;
  });

  expect(height).toBeGreaterThanOrEqual(44);
});

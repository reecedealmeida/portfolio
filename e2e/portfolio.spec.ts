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

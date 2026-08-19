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

import { describe, expect, it } from "vitest";
import { portfolio } from "./portfolio";

describe("portfolio content", () => {
  it("uses the approved name-led headline", () => {
    expect(portfolio.home.headline).toBe("Reece DeAlmeida.");
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

  it("provides non-empty image data for every available evidence item", () => {
    expect(
      portfolio.projects
        .flatMap((project) => project.evidence)
        .filter((item) => item.state === "available")
        .every((item) => item.src?.trim() && item.alt?.trim()),
    ).toBe(true);
  });

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

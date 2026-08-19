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

  it("provides non-empty image data for every available evidence item", () => {
    expect(
      portfolio.projects
        .flatMap((project) => project.evidence)
        .filter((item) => item.state === "available")
        .every((item) => item.src?.trim() && item.alt?.trim()),
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

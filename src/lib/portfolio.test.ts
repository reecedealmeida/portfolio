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

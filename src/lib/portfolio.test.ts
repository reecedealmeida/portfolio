import { describe, expect, it } from "vitest";
import {
  getProject,
  getProjectSlugs,
  getSocialLink,
  visibleSocialLinks,
} from "./portfolio";
import { portfolio } from "@/content/portfolio";

describe("portfolio helpers", () => {
  it("finds projects and returns undefined for unknown slugs", () => {
    expect(getProject("systemsgo-tsiolkovsky")?.title).toContain("Tsiolkovsky");
    expect(getProject("unknown")).toBeUndefined();
  });

  it("returns only configured social links", () => {
    expect(visibleSocialLinks().every((item) => item.href.length > 0)).toBe(true);
  });

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

  it("returns one route slug per project", () => {
    expect(getProjectSlugs()).toEqual([
      "systemsgo-tsiolkovsky",
      "systemsgo-oberth",
      "alphalete-systems-migration",
      "containerized-infrastructure",
    ]);
  });
});

import { describe, expect, it, vi } from "vitest";
import ProjectPage, { generateStaticParams } from "./[slug]/page";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

describe("project pages", () => {
  it("generates a static route for every project", () => {
    expect(generateStaticParams()).toEqual([
      { slug: "systemsgo-tsiolkovsky" },
      { slug: "systemsgo-oberth" },
      { slug: "alphalete-systems-migration" },
      { slug: "containerized-infrastructure" },
    ]);
  });

  it("rejects an unknown project slug", async () => {
    await expect(
      ProjectPage({ params: Promise.resolve({ slug: "unknown-project" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });
});

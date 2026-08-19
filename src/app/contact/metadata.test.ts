import { afterEach, describe, expect, it, vi } from "vitest";

describe("contact metadata", () => {
  afterEach(() => {
    vi.doUnmock("@/content/portfolio");
    vi.resetModules();
  });

  it("derives the description from the configured portfolio identity", async () => {
    vi.doMock("@/content/portfolio", async (importOriginal) => {
      const actual = await importOriginal<
        typeof import("@/content/portfolio")
      >();

      return {
        portfolio: {
          ...actual.portfolio,
          person: { ...actual.portfolio.person, name: "Configured Person" },
        },
      };
    });

    const { metadata } = await import("./page");

    expect(metadata.description).toBe(
      "Current professional contact details for Configured Person.",
    );
  });
});

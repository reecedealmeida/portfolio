import { describe, expect, it } from "vitest";
import { createRobots } from "./robots";
import sitemap from "./sitemap";
import { getProjectSlugs } from "@/lib/portfolio";
import { createSiteMetadata, socialImageMetadataForSite } from "@/lib/site-metadata";
import { resolveSiteUrl } from "@/lib/site-url";

describe("sitemap", () => {
  it("includes each static page and project route", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toEqual(
      expect.arrayContaining([
        "http://localhost:3000/",
        "http://localhost:3000/about",
        "http://localhost:3000/experience",
        "http://localhost:3000/projects",
        "http://localhost:3000/contact",
        ...getProjectSlugs().map((slug) => `http://localhost:3000/projects/${slug}`),
      ]),
    );
  });
});

describe("createRobots", () => {
  it("disallows crawling when a production identity URL is unavailable", () => {
    expect(createRobots(undefined)).toEqual({
      rules: { userAgent: "*", disallow: "/" },
    });
  });

  it("allows crawling and exposes the sitemap when a site URL is configured", () => {
    expect(createRobots("https://portfolio.example.test")).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://portfolio.example.test/sitemap.xml",
    });
  });
});

describe("createSiteMetadata", () => {
  it("omits automatic social-image metadata when production has no configured URL", () => {
    const metadata = createSiteMetadata(undefined);

    expect(metadata.openGraph?.images).toEqual([]);
    expect(metadata.twitter?.images).toEqual([]);
  });

  it("lets each leaf route suppress automatic social images without a URL", () => {
    const metadata = socialImageMetadataForSite(undefined);

    expect(metadata.openGraph?.images).toEqual([]);
    expect(metadata.twitter?.images).toEqual([]);
  });
});

describe("resolveSiteUrl", () => {
  it("does not produce a placeholder hostname in production when deployment configuration is absent", () => {
    expect(resolveSiteUrl({ NODE_ENV: "production" })).toBeUndefined();
  });

  it("uses the configured public URL before Vercel's production URL", () => {
    expect(
      resolveSiteUrl({
        NODE_ENV: "production",
        NEXT_PUBLIC_SITE_URL: "https://portfolio.example.test/",
        VERCEL_PROJECT_PRODUCTION_URL: "deployment.example.test",
      }),
    ).toBe("https://portfolio.example.test");
  });
});

describe("sitemap", () => {
  it("uses the Vercel production hostname when the public URL is not configured", () => {
    expect(
      resolveSiteUrl({
        NODE_ENV: "production",
        VERCEL_PROJECT_PRODUCTION_URL: "portfolio.vercel.app",
      }),
    ).toBe("https://portfolio.vercel.app");
  });
});

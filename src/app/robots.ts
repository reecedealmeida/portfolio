import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/lib/site-url";

export function createRobots(siteUrl: string | undefined): MetadataRoute.Robots {
  if (!siteUrl) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}

export default function robots(): MetadataRoute.Robots {
  return createRobots(resolveSiteUrl());
}

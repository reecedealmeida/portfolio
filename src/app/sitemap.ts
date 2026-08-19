import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/portfolio";
import { resolveSiteUrl } from "@/lib/site-url";

const staticRoutes = ["/", "/about", "/experience", "/projects", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = resolveSiteUrl();

  if (!siteUrl) {
    return [];
  }

  const routes = [...staticRoutes, ...getProjectSlugs().map((slug) => `/projects/${slug}`)];

  return routes.map((route) => ({ url: new URL(route, siteUrl).toString() }));
}

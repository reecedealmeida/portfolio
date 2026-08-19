import type { Metadata } from "next";
import { portfolio } from "@/content/portfolio";

export function socialImageMetadataForSite(siteUrl: string | undefined): Pick<
  Metadata,
  "openGraph" | "twitter"
> {
  return siteUrl ? {} : { openGraph: { images: [] }, twitter: { images: [] } };
}

export function canonicalMetadataForPath(
  siteUrl: string | undefined,
  path: string,
): Pick<Metadata, "alternates"> {
  if (!siteUrl) {
    return {};
  }

  return {
    alternates: {
      canonical: new URL(path, siteUrl).toString(),
    },
  };
}

export function createSiteMetadata(siteUrl: string | undefined): Metadata {
  return {
    title: {
      default: `${portfolio.person.name} — ${portfolio.person.title}`,
      template: `%s — ${portfolio.person.name}`,
    },
    description: portfolio.site.description,
    ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
    ...socialImageMetadataForSite(siteUrl),
  };
}

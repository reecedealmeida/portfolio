import Link from "next/link";
import { socialImageMetadataForSite } from "@/lib/site-metadata";
import { resolveSiteUrl } from "@/lib/site-url";

export const metadata = socialImageMetadataForSite(resolveSiteUrl());

export default function NotFound() {
  return (
    <section className="section not-found-page">
      <div className="shell">
        <p className="eyebrow">404 / route unavailable</p>
        <h1 className="display-title">This orbit doesn&apos;t connect to a page.</h1>
        <p className="lede">The route may have moved, or it may not be part of this portfolio.</p>
        <div className="not-found-page__actions">
          <Link className="button" href="/">
            Home
          </Link>
          <Link className="button button--secondary" href="/projects">
            Projects
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { AboutPreview } from "@/components/about-preview";
import { ContactCta } from "@/components/contact-cta";
import { ProjectGrid } from "@/components/project-grid";
import { Reveal } from "@/components/reveal";
import { portfolio } from "@/content/portfolio";
import {
  canonicalMetadataForPath,
  socialImageMetadataForSite,
} from "@/lib/site-metadata";
import { resolveSiteUrl } from "@/lib/site-url";

const siteUrl = resolveSiteUrl();

export const metadata = {
  ...canonicalMetadataForPath(siteUrl, "/"),
  ...socialImageMetadataForSite(siteUrl),
};

export default function HomePage() {
  const resumeIsAvailable =
    portfolio.resume.state === "available" && portfolio.resume.href.trim().length > 0;

  return (
    <>
      <section className="home-hero section">
        <div className="shell home-hero__copy">
          <p className="eyebrow">{portfolio.home.eyebrow}</p>
          <h1 className="display-title">{portfolio.home.headline}</h1>
          <p className="lede">{portfolio.home.introduction}</p>
          <div className="home-hero__actions">
            <Link className="button" href="#selected-work">
              Explore selected work
            </Link>
            <Link
              className="button button--secondary"
              href={resumeIsAvailable ? portfolio.resume.href : "/contact#resume"}
            >
              Résumé
            </Link>
          </div>
        </div>
      </section>

      <Reveal>
        <section className="featured-work section section--line" id="selected-work">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Selected work / 01—03</p>
                <h2 className="section-title">Projects</h2>
              </div>
              <Link className="text-link" href="/projects">
                View all projects ↗
              </Link>
            </div>

            <ProjectGrid featuredOnly projects={portfolio.projects} />

            <Link
              aria-label="Technical theatre systems and leadership"
              className="theatre-feature"
              href="/experience#technical-theatre"
            >
              <article className="theatre-feature__layout">
                <div className="theatre-feature__meta">
                  <span>04</span>
                  <span>Technical operations</span>
                </div>
                <div>
                  <h3>Technical theatre systems &amp; leadership</h3>
                  <p>{portfolio.theatre.summary}</p>
                </div>
                <span className="theatre-feature__affordance">View experience ↗</span>
              </article>
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <AboutPreview />
      </Reveal>
      <Reveal>
        <ContactCta />
      </Reveal>
    </>
  );
}

import Link from "next/link";
import { AboutPreview } from "@/components/about-preview";
import { ContactCta } from "@/components/contact-cta";
import { OrbitalHero } from "@/components/diagrams/orbital-hero";
import { ProjectGrid } from "@/components/project-grid";
import { Reveal } from "@/components/reveal";
import { portfolio } from "@/content/portfolio";

const evidencePrinciples = [
  {
    number: "01",
    title: "Constraints",
    detail: "Define the flight envelope and competing requirements.",
  },
  {
    number: "02",
    title: "Ownership",
    detail: "Separate confirmed contribution from team context.",
  },
  {
    number: "03",
    title: "Testing",
    detail: "Connect decisions to checks, data, and acceptance criteria.",
  },
  {
    number: "04",
    title: "Iteration",
    detail: "Record what changed and what the next build should improve.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="home-hero section">
        <div className="shell home-hero__layout">
          <div className="home-hero__copy">
            <p className="eyebrow">{portfolio.home.eyebrow}</p>
            <h1 className="display-title">{portfolio.home.headline}</h1>
            <p className="lede">{portfolio.home.introduction}</p>
            <div className="home-hero__actions">
              <Link className="button" href="/projects">
                Explore selected work
              </Link>
              <Link className="button button--secondary" href="/contact">
                Contact
              </Link>
            </div>
            <p className="home-hero__status">
              <span>Résumé</span>
              {portfolio.resume.state === "available"
                ? "Current PDF available"
                : "Current PDF requested before publishing"}
            </p>
          </div>
          <div className="home-hero__visual">
            <OrbitalHero />
          </div>
        </div>
      </section>

      <Reveal>
        <section className="featured-work section section--line" id="selected-work">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Selected work / 01—04</p>
                <h2 className="section-title">Evidence before adjectives.</h2>
              </div>
              <Link className="text-link" href="/projects">
                View all projects <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <ProjectGrid featuredOnly projects={portfolio.projects} />

            <Link
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
                <span className="theatre-feature__affordance">
                  View experience <span aria-hidden="true">↗</span>
                </span>
              </article>
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <AboutPreview />
      </Reveal>

      <section className="principles section section--line" aria-labelledby="principles-title">
        <div className="shell">
          <div className="principles__heading">
            <p className="eyebrow">Working principles</p>
            <h2 className="visually-hidden" id="principles-title">
              Evidence principles
            </h2>
          </div>
          <ol className="principles__list">
            {evidencePrinciples.map((principle) => (
              <li key={principle.number}>
                <span className="principles__number">{principle.number}</span>
                <strong>{principle.title}</strong>
                <p>{principle.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Reveal>
        <ContactCta />
      </Reveal>
    </>
  );
}

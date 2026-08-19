import type { Metadata } from "next";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { ExperienceCard } from "@/components/experience-card";
import { portfolio } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Experience",
  description: portfolio.experience[0].summary,
};

export default function ExperiencePage() {
  const { awards, experience, outreach, theatre } = portfolio;

  return (
    <>
      <section className="section">
        <div className="shell">
          <p className="eyebrow">Experience / contribution</p>
          <h1 className="display-title">Work grounded in useful systems support.</h1>
          <p className="lede">
            A focused record of professional operations, live technical work, and
            mentorship—each described at the level supported by the available evidence.
          </p>
        </div>
      </section>

      <section aria-labelledby="professional-title" className="section section--line">
        <div className="shell">
          <p className="eyebrow">Professional experience</p>
          <h2 className="section-title" id="professional-title">
            Product data and systems support at operational scale.
          </h2>
          <div className="experience-list">
            {experience.map((entry) => (
              <ExperienceCard entry={entry} key={`${entry.organization}-${entry.title}`} />
            ))}
          </div>
          <Link className="text-link" href="/projects/alphalete-systems-migration">
            Read the Alphalete case study <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section aria-labelledby="outreach-title" className="section section--line">
        <div className="shell grid grid--two">
          <div>
            <p className="eyebrow">Outreach and mentoring</p>
            <h2 className="section-title" id="outreach-title">
              Occasional support for the next round of builders.
            </h2>
          </div>
          <div>
            <p className="lede">{outreach.summary}</p>
            <ul>
              {outreach.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <aside aria-labelledby="theatre-title" className="theatre-support">
        <div className="shell theatre-support__inner">
          <div>
            <p className="eyebrow">Supporting technical record</p>
            <h2 id="theatre-title">Live operations under pressure.</h2>
          </div>
          <div className="theatre-support__content">
            <p>{theatre.summary}</p>
            <ul className="theatre-support__highlights">
              {theatre.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <p className="eyebrow">Selected recognition</p>
            <ul className="tag-list" aria-label="Technical theatre recognition">
              {awards.map((award) => (
                <li className="tag" key={award}>
                  {award}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
      <ContactCta />
    </>
  );
}

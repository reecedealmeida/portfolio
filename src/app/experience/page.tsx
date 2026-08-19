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

      <section aria-labelledby="theatre-title" className="section section--line">
        <div className="shell grid grid--two">
          <div>
            <p className="eyebrow">Technical theatre</p>
            <h2 className="section-title" id="theatre-title">
              Live operations under pressure.
            </h2>
          </div>
          <div>
            <p className="lede">{theatre.summary}</p>
            <ul>
              {theatre.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
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

      <section aria-labelledby="awards-title" className="section section--line">
        <div className="shell">
          <p className="eyebrow">Selective recognition</p>
          <h2 className="section-title" id="awards-title">
            Awards in technical theatre.
          </h2>
          <ul className="tag-list" aria-label="Awards">
            {awards.map((award) => (
              <li className="tag" key={award}>
                {award}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ContactCta />
    </>
  );
}

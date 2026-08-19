import type { Metadata } from "next";
import { ContactCta } from "@/components/contact-cta";
import { portfolio } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "About",
  description: portfolio.about.paragraphs[0],
};

export default function AboutPage() {
  const { about } = portfolio;

  return (
    <>
      <section className="section">
        <div className="shell">
          <p className="eyebrow">About / technical foundation</p>
          <h1 className="display-title">Built through systems, tests, and iteration.</h1>
          <div className="about-page__narrative lede">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="focus-title" className="section section--line">
        <div className="shell grid grid--two">
          <div>
            <p className="eyebrow">Focus areas</p>
            <h2 className="section-title" id="focus-title">
              The systems I want to understand more deeply.
            </h2>
          </div>
          <ul className="tag-list" aria-label="Engineering focus areas">
            {about.focusAreas.map((focusArea) => (
              <li className="tag" key={focusArea}>
                {focusArea}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="timeline-title" className="section section--line">
        <div className="shell">
          <p className="eyebrow">Chronology</p>
          <h2 className="section-title" id="timeline-title">
            A path shaped by hands-on technical work.
          </h2>
          <ol className="about-timeline">
            {about.timeline.map((entry) => (
              <li key={entry.year}>
                <p className="eyebrow">{entry.year}</p>
                <h3>{entry.title}</h3>
                <p>{entry.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <ContactCta />
    </>
  );
}

import type { Metadata } from "next";
import { portfolio } from "@/content/portfolio";
import { visibleSocialLinks } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Contact",
  description: `Current professional contact details for ${portfolio.person.name}.`,
};

export default function ContactPage() {
  const socialLinks = visibleSocialLinks();
  const { resume } = portfolio;

  return (
    <section className="section contact-page">
      <div className="shell contact-page__layout">
        <div>
          <p className="eyebrow">Contact / professional details</p>
          <h1 className="display-title">Let&apos;s compare notes on the work.</h1>
          {socialLinks.length === 0 ? (
            <p className="lede">
              Contact details are ready to add. Update the email and LinkedIn values in
              src/content/portfolio.ts before publishing.
            </p>
          ) : (
            <nav aria-label="Professional contact links" className="contact-page__links">
              {socialLinks.map((link) => (
                <a className="button button--secondary" href={link.href} key={link.label}>
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>

        <aside aria-labelledby="resume-title" className="contact-page__resume">
          <p className="eyebrow">Résumé</p>
          <h2 className="section-title" id="resume-title">
            Current engineering résumé
          </h2>
          {resume.state === "available" && resume.href.trim() ? (
            <a className="button" href={resume.href}>
              Download résumé
            </a>
          ) : (
            <p>{resume.request}</p>
          )}
        </aside>
      </div>
    </section>
  );
}

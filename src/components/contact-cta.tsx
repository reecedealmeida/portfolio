import Link from "next/link";
import { visibleSocialLinks } from "@/lib/portfolio";

export function ContactCta() {
  const socialLinks = visibleSocialLinks();

  return (
    <section className="contact-cta section">
      <div className="shell contact-cta__inner">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="section-title">Get in touch</h2>
        </div>
        <div className="contact-cta__action">
          <Link className="button" href="/contact">
            Start a conversation
          </Link>
          {socialLinks.length > 0 ? (
            <nav aria-label="Professional links" className="contact-cta__links">
              {socialLinks.map((link) => (
                <a className="text-link" href={link.href} key={link.label} rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </nav>
          ) : null}
        </div>
      </div>
    </section>
  );
}

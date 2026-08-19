import Link from "next/link";

export function ContactCta() {
  return (
    <section className="contact-cta section">
      <div className="shell contact-cta__inner">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="section-title">Interested in the work behind the evidence?</h2>
        </div>
        <div className="contact-cta__action">
          <p>
            Explore the case studies, then use the contact page for current professional
            details.
          </p>
          <Link className="button" href="/contact">
            Start a conversation
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { portfolio } from "@/content/portfolio";

export function AboutPreview() {
  return (
    <section className="about-preview section section--line">
      <div className="shell about-preview__layout">
        <div>
          <p className="eyebrow">Technical foundation / current study</p>
          <h2 className="section-title">About</h2>
        </div>
        <div className="about-preview__copy">
          {portfolio.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Link className="text-link" href="/about">
            More about the path <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

import type { PortfolioContent } from "@/content/portfolio";

type ExperienceCardProps = {
  entry: PortfolioContent["experience"][number];
};

export function ExperienceCard({ entry }: ExperienceCardProps) {
  return (
    <article className="experience-card">
      <p className="eyebrow">{entry.organization}</p>
      <h2 className="section-title">{entry.title}</h2>
      <p className="lede">{entry.summary}</p>
      <ul>
        {entry.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
    </article>
  );
}

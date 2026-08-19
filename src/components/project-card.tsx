import Link from "next/link";
import type { Project } from "@/content/portfolio";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <Link
      className={`project-card${priority ? " project-card--priority" : ""}`}
      href={`/projects/${project.slug}`}
    >
      <article>
        <div className="project-card__meta">
          <span className="project-card__number">{project.number}</span>
          <span>{project.category}</span>
        </div>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__summary">{project.summary}</p>
        <ul aria-label="Technologies and disciplines" className="tag-list">
          {project.tags.map((tag) => (
            <li className="tag" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
        <span className="project-card__affordance">
          View case study <span aria-hidden="true">↗</span>
        </span>
      </article>
    </Link>
  );
}

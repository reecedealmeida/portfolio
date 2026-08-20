import Link from "next/link";
import type { Project } from "@/content/portfolio";
import { ProjectVisual } from "./project-visual";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      aria-label={project.title}
      className={`project-card${index % 2 === 1 ? " project-card--reverse" : ""}`}
      href={`/projects/${project.slug}`}
    >
      <ProjectVisual decorative visual={project.visual} />
      <article className="project-card__content">
        <div className="project-card__meta">
          <span className="project-card__number">{project.number}</span>
          <span>{project.category}</span>
        </div>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__summary">{project.summary}</p>
        <ul aria-label="Technologies and disciplines" className="tag-list">
          {project.tags.slice(0, 4).map((tag) => (
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

import type { Project } from "@/content/portfolio";
import { ProjectCard } from "@/components/project-card";

type ProjectGridProps = {
  projects: Project[];
  featuredOnly?: boolean;
};

export function ProjectGrid({ projects, featuredOnly = false }: ProjectGridProps) {
  const visibleProjects = featuredOnly
    ? projects.filter((project) => project.featured)
    : projects;

  return (
    <div className="project-grid">
      {visibleProjects.map((project, index) => (
        <ProjectCard index={index} key={project.slug} project={project} />
      ))}
    </div>
  );
}

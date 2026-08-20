import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { portfolio } from "@/content/portfolio";
import { ProjectCard } from "./project-card";

describe("ProjectCard", () => {
  it("renders a thumbnail-led case-study link", () => {
    const project = portfolio.projects[0];
    render(<ProjectCard index={0} project={project} />);

    expect(screen.getByRole("link", { name: project.title })).toHaveAttribute(
      "href",
      `/projects/${project.slug}`,
    );
    expect(document.querySelector("[data-visual-variant='tsiolkovsky']")).toBeInTheDocument();
    expect(screen.getByText("View case study")).toBeInTheDocument();
  });

  it("alternates the visual order for odd rows", () => {
    render(<ProjectCard index={1} project={portfolio.projects[1]} />);
    expect(screen.getByRole("link", { name: portfolio.projects[1].title })).toHaveClass(
      "project-card--reverse",
    );
  });
});

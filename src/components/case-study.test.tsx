import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { portfolio } from "@/content/portfolio";
import { CaseStudy } from "./case-study";

describe("CaseStudy", () => {
  it("pairs the technical narrative with a project visual and next-project preview", () => {
    const project = portfolio.projects[0];
    const nextProject = portfolio.projects[1];
    render(<CaseStudy project={project} />);

    expect(screen.getByRole("img", { name: project.visual.alt })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Case study sections" }))
      .toBeInTheDocument();
    expect(screen.getByRole("link", { name: new RegExp(nextProject.shortTitle, "i") }))
      .toHaveAttribute("href", `/projects/${nextProject.slug}`);
    expect(document.querySelectorAll(`[data-visual-variant='${nextProject.visual.variant}']`))
      .toHaveLength(1);
  });
});

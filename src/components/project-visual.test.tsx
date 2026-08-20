import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ProjectVisual } from "./project-visual";

afterEach(cleanup);

const visual = {
  variant: "tsiolkovsky" as const,
  alt: "Rocket, flight computer, and telemetry illustration.",
};

describe("ProjectVisual", () => {
  it("exposes the configured label when the visual carries meaning", () => {
    render(<ProjectVisual visual={visual} />);
    expect(screen.getByRole("img", { name: visual.alt })).toHaveAttribute(
      "data-visual-variant",
      "tsiolkovsky",
    );
  });

  it("hides a repeated visual from assistive technology", () => {
    render(<ProjectVisual decorative visual={visual} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(document.querySelector("figure")).toHaveAttribute("aria-hidden", "true");
    expect(document.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("keeps IDs unique across repeated meaningful instances", () => {
    render(
      <>
        <ProjectVisual visual={visual} />
        <ProjectVisual visual={visual} />
      </>,
    );

    const svgs = screen.getAllByRole("img", { name: visual.alt });
    const labelledBy = svgs.map((svg) => svg.getAttribute("aria-labelledby"));
    const titles = svgs.map((svg) =>
      svg.querySelector("title")?.getAttribute("id"),
    );
    const patternIds = svgs.map((svg) => svg.querySelector("pattern")?.id);

    expect(new Set(labelledBy).size).toBe(2);
    expect(new Set(titles).size).toBe(2);
    expect(new Set(patternIds).size).toBe(2);
    labelledBy.forEach((id, index) => {
      expect(id).toBe(titles[index]);
      expect(document.getElementById(id!)).toBe(
        svgs[index].querySelector("title"),
      );
    });
  });
});

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
    expect(document.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});

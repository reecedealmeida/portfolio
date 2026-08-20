import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectsPage from "./page";

describe("ProjectsPage", () => {
  it("identifies the project index directly", () => {
    render(<ProjectsPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Projects" }))
      .toBeInTheDocument();
  });
});

import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ExperiencePage from "./page";

describe("ExperiencePage", () => {
  it("keeps experience claims within the approved scale and technical-theatre record", () => {
    render(<ExperiencePage />);

    expect(screen.getByText(/20 desktop systems/i)).toBeInTheDocument();
    expect(screen.getByText(/21,000 items/i)).toBeInTheDocument();
    expect(screen.getByText(/14,000-seat/i)).toBeInTheDocument();
    expect(screen.queryByText(/NASA employee/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/MSU research assistant/i)).not.toBeInTheDocument();
  });

  it("keeps theatre recognition compact while preserving professional and mentoring sections", () => {
    const { container } = render(<ExperiencePage />);
    const page = within(container);

    expect(
      page.getByText(/Tommy Tune Awards — Outstanding Sound Design Finalist/i),
    ).toBeInTheDocument();
    expect(
      page.queryByRole("heading", { name: /Awards in technical theatre/i }),
    ).not.toBeInTheDocument();
    expect(
      page.getByRole("heading", { level: 1, name: "Experience" }),
    ).toBeInTheDocument();
    expect(
      page.getByRole("heading", { level: 2, name: "Alphalete Athletics" }),
    ).toBeInTheDocument();
    expect(
      page.getByRole("heading", { level: 2, name: "SystemsGo mentoring" }),
    ).toBeInTheDocument();
    expect(container.querySelector("#technical-theatre")).toContainElement(
      page.getByRole("heading", { level: 2, name: "Technical theatre" }),
    );
  });
});

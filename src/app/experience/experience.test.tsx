import { render, screen } from "@testing-library/react";
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
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage", () => {
  it("leads with the approved headline and strongest work", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Engineering through building, testing, and iteration.",
    );
    expect(screen.getByRole("link", { name: /Tsiolkovsky/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Oberth/i })).toBeInTheDocument();
  });
});

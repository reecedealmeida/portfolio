import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { portfolio } from "@/content/portfolio";
import HomePage from "./page";

afterEach(cleanup);

describe("HomePage", () => {
  it("leads with Reece's name and strongest work", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Reece DeAlmeida.",
    );
    expect(screen.getByRole("link", { name: /Tsiolkovsky/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Oberth/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Explore selected work" }),
    ).toHaveAttribute("href", "#selected-work");
  });

  it("prioritizes visual selected work over abstract principles", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 2, name: "Projects" }))
      .toBeInTheDocument();
    expect(document.querySelectorAll(".project-visual").length).toBeGreaterThanOrEqual(2);
    expect(screen.queryByText("Working principles")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Technical theatre systems and leadership/i }))
      .toHaveAttribute("href", "/experience#technical-theatre");
  });

  it("links directly to the configured résumé PDF only when it is available", () => {
    const originalResume = portfolio.resume;
    portfolio.resume = {
      state: "available",
      href: "/resume/reece-dealmeida-resume.pdf",
      request: originalResume.request,
    };

    try {
      render(<HomePage />);
      expect(screen.getByRole("link", { name: "Résumé" })).toHaveAttribute(
        "href",
        "/resume/reece-dealmeida-resume.pdf",
      );
    } finally {
      portfolio.resume = originalResume;
    }
  });
});

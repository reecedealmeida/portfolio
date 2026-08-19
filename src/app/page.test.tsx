import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { portfolio } from "@/content/portfolio";
import HomePage from "./page";

describe("HomePage", () => {
  it("leads with the approved headline and strongest work", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Engineering through building, testing, and iteration.",
    );
    expect(screen.getByRole("link", { name: /Tsiolkovsky/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Oberth/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Explore selected work" }),
    ).toHaveAttribute("href", "#selected-work");
  });

  it("renders evidence principles from the canonical portfolio content", () => {
    const originalPrinciples = portfolio.home.evidencePrinciples;
    portfolio.home.evidencePrinciples = [
      {
        number: "01",
        title: "Configured principle",
        detail: "This copy came from the canonical content source.",
      },
    ];

    try {
      render(<HomePage />);
      expect(
        screen.getByText("Configured principle", { selector: "strong" }),
      ).toBeInTheDocument();
      expect(
        screen.getByText("This copy came from the canonical content source."),
      ).toBeInTheDocument();
    } finally {
      portfolio.home.evidencePrinciples = originalPrinciples;
    }
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
      expect(screen.getByRole("link", { name: "Download résumé" })).toHaveAttribute(
        "href",
        "/resume/reece-dealmeida-resume.pdf",
      );
    } finally {
      portfolio.resume = originalResume;
    }
  });
});

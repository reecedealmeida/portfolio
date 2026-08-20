import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { portfolio } from "@/content/portfolio";
import ContactPage from "./page";

describe("ContactPage", () => {
  it("identifies the page directly", () => {
    render(<ContactPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Contact" }))
      .toBeInTheDocument();
  });

  it("shows setup guidance instead of broken personal links", () => {
    const originalSocial = portfolio.social;
    portfolio.social = originalSocial.map((link) => ({ ...link, href: "" }));

    try {
      const { container } = render(<ContactPage />);

      expect(screen.getByText(/Contact details are ready to add/i)).toBeInTheDocument();
      expect(screen.queryByRole("link", { name: /download résumé/i })).not.toBeInTheDocument();
      expect(container.querySelector("#resume")).toBeInTheDocument();
    } finally {
      portfolio.social = originalSocial;
    }
  });
});

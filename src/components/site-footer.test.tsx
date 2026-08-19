import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { portfolio } from "@/content/portfolio";
import { SiteFooter } from "./site-footer";

describe("SiteFooter", () => {
  it("renders configured social destinations as practical link targets", () => {
    const originalSocial = portfolio.social;
    portfolio.social = [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/reece" },
    ];

    try {
      render(<SiteFooter />);
      expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveClass(
        "site-footer__link",
      );
    } finally {
      portfolio.social = originalSocial;
    }
  });
});

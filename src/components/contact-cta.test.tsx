import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { portfolio } from "@/content/portfolio";
import { ContactCta } from "./contact-cta";

describe("ContactCta", () => {
  it("keeps the contact page available when professional links are unconfigured", () => {
    render(<ContactCta />);
    expect(screen.getByRole("link", { name: "Start a conversation" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("groups configured professional links in the CTA navigation", () => {
    const originalSocial = portfolio.social;
    portfolio.social = [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/reece" },
      { label: "GitHub", href: "https://github.com/reece" },
    ];

    try {
      render(<ContactCta />);
      const navigation = screen.getByRole("navigation", { name: "Professional links" });
      expect(navigation).toHaveClass("contact-cta__links");
      expect(within(navigation).getByRole("link", { name: "LinkedIn" })).toHaveClass(
        "text-link",
      );
      expect(within(navigation).getByRole("link", { name: "GitHub" })).toHaveClass(
        "text-link",
      );
    } finally {
      portfolio.social = originalSocial;
    }
  });
});

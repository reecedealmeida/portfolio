import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  it("exposes all primary routes as links without JavaScript", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute(
      "href",
      "/experience",
    );
    expect(screen.getByRole("link", { name: "Résumé" })).toHaveAttribute(
      "href",
      "/contact#resume",
    );
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});

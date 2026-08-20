import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactCta } from "./contact-cta";

describe("ContactCta", () => {
  it("keeps the contact page available when professional links are unconfigured", () => {
    render(<ContactCta />);
    expect(screen.getByRole("link", { name: "Start a conversation" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});

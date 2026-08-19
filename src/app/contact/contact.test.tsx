import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContactPage from "./page";

describe("ContactPage", () => {
  it("shows setup guidance instead of broken personal links", () => {
    render(<ContactPage />);

    expect(screen.getByText(/Contact details are ready to add/i)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /download résumé/i })).not.toBeInTheDocument();
  });
});

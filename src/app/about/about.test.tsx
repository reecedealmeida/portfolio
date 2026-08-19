import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "./page";

describe("AboutPage", () => {
  it("presents the approved academic narrative without unsupported affiliations", () => {
    render(<AboutPage />);

    expect(screen.getByText(/Shackouls Honors College/i)).toBeInTheDocument();
    expect(screen.queryByText(/NASA employee/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/MSU research assistant/i)).not.toBeInTheDocument();
  });
});

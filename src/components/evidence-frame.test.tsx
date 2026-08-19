import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EvidenceFrame } from "./evidence-frame";

describe("EvidenceFrame", () => {
  it("explains a missing asset without rendering a broken image", () => {
    render(
      <EvidenceFrame
        item={{
          title: "Wiring and packaging",
          kind: "photo",
          state: "needed",
          request: "Add a verified avionics integration photo.",
        }}
      />,
    );

    expect(screen.getByText("Evidence to add")).toBeInTheDocument();
    expect(
      screen.getByText("Add a verified avionics integration photo."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});

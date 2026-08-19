import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Reveal } from "./reveal";

describe("Reveal", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("keeps its children visible when intersection enhancement is unavailable", () => {
    vi.stubGlobal("IntersectionObserver", undefined);

    render(
      <Reveal>
        <p>Available without JavaScript enhancement</p>
      </Reveal>,
    );

    expect(
      screen.getByText("Available without JavaScript enhancement"),
    ).toBeVisible();
  });
});

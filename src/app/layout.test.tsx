import { within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Cormorant_Garamond: () => ({ variable: "--font-display" }),
  DM_Sans: () => ({ variable: "--font-sans" }),
}));

import RootLayout from "./layout";
import HomePage from "./page";

function renderShell() {
  const container = document.createElement("div");
  container.innerHTML = renderToStaticMarkup(
    <RootLayout>
      <HomePage />
    </RootLayout>,
  );

  return { container, screen: within(container) };
}

describe("RootLayout", () => {
  it("exposes one main landmark with the baseline homepage", () => {
    const { screen } = renderShell();

    expect(screen.getAllByRole("main")).toHaveLength(1);
  });

  it("makes the skip-link target programmatically focusable", () => {
    const { container, screen } = renderShell();

    expect(
      screen.getByRole("link", { name: "Skip to main content" }),
    ).toHaveAttribute("href", "#main-content");
    expect(container.querySelector("#main-content")).toHaveAttribute(
      "tabindex",
      "-1",
    );
  });
});

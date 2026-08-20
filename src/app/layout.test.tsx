import { within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Cormorant_Garamond: () => ({ variable: "--font-old-display" }),
  DM_Sans: () => ({ variable: "--font-old-sans" }),
  Inter: () => ({ variable: "--font-sans" }),
  Manrope: () => ({ variable: "--font-display" }),
}));

import RootLayout from "./layout";
import HomePage from "./page";

function renderShell() {
  const container = document.createElement("div");
  const markup = renderToStaticMarkup(
    <RootLayout>
      <HomePage />
    </RootLayout>,
  );
  container.innerHTML = markup;

  return { container, markup, screen: within(container) };
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

  it("applies the clean sans-serif display and body font variables", () => {
    const { markup } = renderShell();

    expect(markup).toContain('class="--font-sans --font-display"');
    expect(markup).not.toContain("--font-old-");
  });
});

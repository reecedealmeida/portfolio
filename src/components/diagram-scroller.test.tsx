import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DiagramScroller } from "./diagram-scroller";

const originalClientWidth = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  "clientWidth",
);
const originalScrollWidth = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  "scrollWidth",
);

function setElementWidths(clientWidth: number, scrollWidth: number) {
  Object.defineProperty(HTMLElement.prototype, "clientWidth", {
    configurable: true,
    get: () => clientWidth,
  });
  Object.defineProperty(HTMLElement.prototype, "scrollWidth", {
    configurable: true,
    get: () => scrollWidth,
  });
}

afterEach(() => {
  cleanup();
  if (originalClientWidth) {
    Object.defineProperty(HTMLElement.prototype, "clientWidth", originalClientWidth);
  } else {
    Reflect.deleteProperty(HTMLElement.prototype, "clientWidth");
  }
  if (originalScrollWidth) {
    Object.defineProperty(HTMLElement.prototype, "scrollWidth", originalScrollWidth);
  } else {
    Reflect.deleteProperty(HTMLElement.prototype, "scrollWidth");
  }
});

describe("DiagramScroller", () => {
  it("is keyboard focusable and described when the diagram overflows", async () => {
    setElementWidths(320, 720);
    render(
      <DiagramScroller>
        <svg aria-label="Test diagram" />
      </DiagramScroller>,
    );

    const region = screen.getByRole("region", { name: "Scrollable system diagram" });
    await waitFor(() => expect(region).toHaveAttribute("tabindex", "0"));
    expect(region).toHaveAccessibleDescription(
      "Scroll horizontally to view the complete diagram.",
    );
  });

  it("does not create a tab stop or scroll description without overflow", async () => {
    setElementWidths(800, 800);
    render(
      <DiagramScroller>
        <svg aria-label="Test diagram" />
      </DiagramScroller>,
    );

    const region = screen.getByRole("region", { name: "System diagram" });
    await waitFor(() => expect(region).not.toHaveAttribute("tabindex"));
    expect(region).not.toHaveAttribute("aria-describedby");
    expect(
      screen.queryByText("Scroll horizontally to view the complete diagram."),
    ).not.toBeInTheDocument();
  });
});

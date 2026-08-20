import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/og", () => ({
  ImageResponse: class {
    element: ReactNode;

    constructor(element: ReactNode) {
      this.element = element;
    }
  },
}));

import OpenGraphImage from "./opengraph-image";

describe("OpenGraphImage", () => {
  it("presents Reece's role above the name without repeating the name", () => {
    const response = OpenGraphImage() as unknown as { element: ReactNode };
    const markup = renderToStaticMarkup(response.element);

    expect(markup).toContain("Aerospace Engineering Student · Mississippi State University");
    expect(markup.match(/Reece DeAlmeida/g)).toHaveLength(1);
  });
});

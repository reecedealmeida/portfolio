"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

type DiagramScrollerProps = {
  children: ReactNode;
};

export function DiagramScroller({ children }: DiagramScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hintId = useId();
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const measureOverflow = () => {
      setIsOverflowing(container.scrollWidth > container.clientWidth + 1);
    };

    measureOverflow();
    window.addEventListener("resize", measureOverflow);

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? undefined
        : new ResizeObserver(measureOverflow);
    resizeObserver?.observe(container);

    return () => {
      window.removeEventListener("resize", measureOverflow);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <>
      {isOverflowing ? (
        <p className="technical-diagram-hint" id={hintId}>
          Scroll horizontally to view the complete diagram.
        </p>
      ) : null}
      <div
        aria-describedby={isOverflowing ? hintId : undefined}
        aria-label={isOverflowing ? "Scrollable system diagram" : "System diagram"}
        className="technical-diagram-scroll"
        ref={containerRef}
        role="region"
        tabIndex={isOverflowing ? 0 : undefined}
      >
        {children}
      </div>
    </>
  );
}

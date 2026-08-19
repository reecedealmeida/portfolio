"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export function Reveal({ children, className }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setIsRevealed(true);
        observer.disconnect();
      }
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
      setIsEnhanced(true);
    }

    return () => observer.disconnect();
  }, []);

  const classes = [
    "reveal",
    isEnhanced ? "reveal--enhanced" : "",
    isRevealed ? "is-revealed" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} ref={elementRef}>
      {children}
    </div>
  );
}

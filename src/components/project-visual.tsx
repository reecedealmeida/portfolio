import type { ProjectVisual as ProjectVisualData } from "@/content/portfolio";

type ProjectVisualProps = {
  visual: ProjectVisualData;
  decorative?: boolean;
  className?: string;
};

function VariantMarks({ variant }: Pick<ProjectVisualData, "variant">) {
  if (variant === "tsiolkovsky") {
    return (
      <g className="project-visual__marks project-visual__marks--tsiolkovsky">
        <path d="M230 405 260 180 290 405 260 385Z" />
        <rect x="430" y="210" width="205" height="150" rx="8" />
        <circle cx="482" cy="258" r="20" />
        <path d="M290 290C350 245 385 245 430 280M635 280C720 280 760 230 835 170" />
      </g>
    );
  }

  if (variant === "oberth") {
    return (
      <g className="project-visual__marks project-visual__marks--oberth">
        <path d="M175 335 520 255 730 280 520 305Z" />
        <path d="M400 280 500 170 545 270M390 290 485 390 535 300" />
        <circle cx="775" cy="280" r="58" />
        <path d="M120 420C330 430 595 420 865 345" />
      </g>
    );
  }

  if (variant === "alphalete") {
    return (
      <g className="project-visual__marks project-visual__marks--alphalete">
        <rect x="135" y="170" width="190" height="86" rx="8" />
        <rect x="135" y="315" width="190" height="86" rx="8" />
        <circle cx="505" cy="285" r="92" />
        <rect x="690" y="210" width="185" height="150" rx="8" />
        <path d="M325 213H410M325 358H410M597 285H690" />
      </g>
    );
  }

  return (
    <g className="project-visual__marks project-visual__marks--infrastructure">
      <rect x="140" y="195" width="185" height="220" rx="8" />
      <rect x="410" y="150" width="185" height="120" rx="8" />
      <rect x="410" y="335" width="185" height="120" rx="8" />
      <circle cx="780" cy="300" r="92" />
      <path d="M325 300H365C390 300 390 210 410 210M365 300C390 300 390 395 410 395M595 210C680 210 665 270 692 285M595 395C680 395 665 330 692 315" />
    </g>
  );
}

export function ProjectVisual({
  visual,
  decorative = false,
  className = "",
}: ProjectVisualProps) {
  const titleId = `project-visual-${visual.variant}-title`;

  return (
    <figure className={`project-visual ${className}`.trim()}>
      <svg
        aria-hidden={decorative ? "true" : undefined}
        aria-labelledby={decorative ? undefined : titleId}
        className="project-visual__svg"
        data-visual-variant={visual.variant}
        role={decorative ? undefined : "img"}
        viewBox="0 0 1000 600"
      >
        {decorative ? null : <title id={titleId}>{visual.alt}</title>}
        <defs>
          <pattern id={`grid-${visual.variant}`} height="50" width="50" patternUnits="userSpaceOnUse">
            <path className="project-visual__grid" d="M50 0H0V50" />
          </pattern>
        </defs>
        <rect className="project-visual__field" height="600" width="1000" />
        <rect fill={`url(#grid-${visual.variant})`} height="600" width="1000" />
        <VariantMarks variant={visual.variant} />
      </svg>
    </figure>
  );
}

export function AlphaleteFlowDiagram() {
  return (
    <svg
      aria-labelledby="alphalete-flow-title"
      className="technical-diagram"
      role="img"
      viewBox="0 0 960 360"
    >
      <title id="alphalete-flow-title">Product information workflow</title>
      <defs>
        <marker
          id="workflow-arrow"
          markerHeight="8"
          markerWidth="8"
          orient="auto"
          refX="7"
          refY="4"
        >
          <path d="M0 0 8 4 0 8Z" />
        </marker>
      </defs>

      <g className="technical-diagram__connections">
        <path d="M280 180H365" markerEnd="url(#workflow-arrow)" />
        <path d="M595 180H680" markerEnd="url(#workflow-arrow)" />
      </g>

      <g className="technical-diagram__node">
        <rect height="160" rx="4" width="240" x="40" y="100" />
        <text textAnchor="middle" x="160" y="165">Distributed product</text>
        <text textAnchor="middle" x="160" y="202">information</text>
      </g>
      <g className="technical-diagram__node technical-diagram__node--primary">
        <rect height="160" rx="4" width="230" x="365" y="100" />
        <text textAnchor="middle" x="480" y="165">Validation</text>
        <text textAnchor="middle" x="480" y="202">and mapping</text>
      </g>
      <g className="technical-diagram__node technical-diagram__node--accent">
        <rect height="160" rx="4" width="240" x="680" y="100" />
        <text textAnchor="middle" x="800" y="146">Centralized</text>
        <text textAnchor="middle" x="800" y="183">product-management</text>
        <text textAnchor="middle" x="800" y="220">workflow</text>
      </g>
    </svg>
  );
}

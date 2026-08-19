export function FlightComputerDiagram() {
  return (
    <svg
      aria-labelledby="flight-computer-title"
      className="technical-diagram"
      role="img"
      viewBox="0 0 900 360"
    >
      <title id="flight-computer-title">Flight computer system flow</title>
      <defs>
        <marker
          id="flight-arrow"
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
        <path d="M220 150H330" markerEnd="url(#flight-arrow)" />
        <path d="M570 150H680" markerEnd="url(#flight-arrow)" />
        <path d="M450 285V215" markerEnd="url(#flight-arrow)" />
      </g>

      <g className="technical-diagram__node">
        <rect height="110" rx="4" width="180" x="40" y="95" />
        <text textAnchor="middle" x="130" y="158">Sensors</text>
      </g>
      <g className="technical-diagram__node technical-diagram__node--primary">
        <rect height="130" rx="4" width="240" x="330" y="85" />
        <text textAnchor="middle" x="450" y="140">Raspberry Pi</text>
        <text className="technical-diagram__subline" textAnchor="middle" x="450" y="174">Python</text>
      </g>
      <g className="technical-diagram__node">
        <rect height="170" rx="4" width="180" x="680" y="65" />
        <text textAnchor="middle" x="770" y="120">Storage</text>
        <text textAnchor="middle" x="770" y="158">Telemetry</text>
        <text textAnchor="middle" x="770" y="196">Video</text>
      </g>
      <g className="technical-diagram__node technical-diagram__node--accent">
        <rect height="58" rx="29" width="150" x="375" y="285" />
        <text textAnchor="middle" x="450" y="320">Power</text>
      </g>
    </svg>
  );
}

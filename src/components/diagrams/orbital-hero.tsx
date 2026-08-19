export function OrbitalHero(): React.JSX.Element {
  return (
    <svg
      aria-hidden="true"
      className="orbital-hero"
      focusable="false"
      role="img"
      viewBox="0 0 720 560"
    >
      <g className="orbital-hero__grid">
        <path d="M84 280H636" />
        <path d="M360 66V494" />
        <path d="M110 256v48M162 268v24M214 268v24M266 268v24M318 256v48M402 256v48M454 268v24M506 268v24M558 268v24M610 256v48" />
        <path d="M336 92h48M348 144h24M348 196h24M336 238h48M336 322h48M348 364h24M348 416h24M336 468h48" />
      </g>

      <g className="orbital-hero__orbits">
        <path
          className="orbital-hero__orbit orbital-hero__orbit--one"
          d="M112 324C138 176 285 91 448 124c163 33 232 164 154 262-78 98-276 122-410 49-81-44-99-91-80-111Z"
        />
        <path
          className="orbital-hero__orbit orbital-hero__orbit--two"
          d="M133 200c87-102 286-116 397-27 111 89 72 213-52 274-124 61-311 17-362-85-28-56-20-119 17-162Z"
        />
        <path
          className="orbital-hero__orbit orbital-hero__orbit--three"
          d="M181 119c105-37 269 47 349 165 80 117 45 207-62 203-107-4-251-101-309-208-43-79-34-140 22-160Z"
        />
      </g>

      <circle className="orbital-hero__body" cx="360" cy="280" r="11" />
      <circle className="orbital-hero__body-ring" cx="360" cy="280" r="21" />
      <path
        className="orbital-hero__trajectory"
        d="M127 382c103-47 201-72 294-75 75-2 136 8 184 31"
      />
      <circle className="orbital-hero__marker" cx="537" cy="320" r="6" />

      <g className="orbital-hero__labels">
        <text x="86" y="266">−03</text>
        <text x="346" y="50">Y / 02</text>
        <text x="576" y="265">+03</text>
        <text className="orbital-hero__sequence" x="78" y="510">
          BUILD / TEST / ITERATE
        </text>
      </g>
    </svg>
  );
}

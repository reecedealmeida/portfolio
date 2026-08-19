export type EvidenceItem = {
  title: string;
  kind: "photo" | "diagram" | "data" | "video" | "document";
  state: "available" | "needed";
  src?: string;
  alt?: string;
  request: string;
};

export type CaseStudySection = {
  id:
    | "context"
    | "constraints"
    | "ownership"
    | "process"
    | "implementation"
    | "testing"
    | "iteration"
    | "result"
    | "reflection";
  label: string;
  body: string[];
  verificationNote?: string;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  category: string;
  timeframe: string;
  featured: boolean;
  tags: string[];
  sections: CaseStudySection[];
  evidence: EvidenceItem[];
  diagram?: "flight-computer" | "alphalete-flow";
};

export type SocialLink = {
  label: "Email" | "LinkedIn" | "GitHub";
  href: string;
};

export type PortfolioContent = {
  person: { name: string; title: string; school: string; honors: string };
  site: { url: string; description: string };
  social: SocialLink[];
  resume: { state: "available" | "needed"; href: string; request: string };
  home: { eyebrow: string; headline: string; introduction: string };
  about: {
    paragraphs: string[];
    focusAreas: string[];
    timeline: { year: string; title: string; detail: string }[];
  };
  projects: Project[];
  experience: {
    title: string;
    organization: string;
    summary: string;
    details: string[];
  }[];
  theatre: { summary: string; highlights: string[] };
  outreach: { summary: string; details: string[] };
  awards: string[];
};

export const portfolio: PortfolioContent = {
  person: {
    name: "Reece DeAlmeida",
    title: "Aerospace Engineering Student",
    school: "Mississippi State University",
    honors: "Shackouls Honors College",
  },
  site: {
    url: "",
    description:
      "Evidence-first aerospace engineering portfolio focused on rocketry, avionics, embedded systems, and technical operations.",
  },
  social: [
    { label: "Email", href: "" },
    { label: "LinkedIn", href: "" },
    { label: "GitHub", href: "" },
  ],
  resume: {
    state: "needed",
    href: "",
    request: "Add a current one-page engineering résumé PDF before publishing.",
  },
  home: {
    eyebrow: "Aerospace Engineering · Mississippi State University",
    headline: "Engineering through building, testing, and iteration.",
    introduction:
      "An early-career aerospace engineering student with a technical foundation in high-powered rocketry, avionics, embedded systems, software infrastructure, and live technical operations. This portfolio prioritizes specific work, constraints, testing, and evidence over unsupported claims.",
  },
  about: {
    paragraphs: [
      "I am an Aerospace Engineering student at Mississippi State University and a member of the Shackouls Honors College. My interests include astronautics, spacecraft systems, avionics, embedded systems, systems integration, and engineering test.",
      "My technical foundation includes two high-powered SystemsGo rocketry challenges, a custom Raspberry Pi flight computer programmed in Python, software and infrastructure work centered on reliability and debugging, and technical theatre operations that demanded live troubleshooting and coordination. I continue to support younger high-school rocketry teams in a smaller mentoring capacity.",
    ],
    focusAreas: [
      "Astronautics",
      "Spacecraft systems",
      "Avionics",
      "Embedded systems",
      "Systems integration",
      "Engineering test",
    ],
    timeline: [
      {
        year: "SystemsGo",
        title: "High-powered rocketry",
        detail:
          "Built through two distinct design challenges: avionics-focused Tsiolkovsky and constrained supersonic Oberth.",
      },
      {
        year: "Technical theatre",
        title: "Live systems operations",
        detail:
          "Applied lighting, sound, cue execution, troubleshooting, and crew coordination under production deadlines.",
      },
      {
        year: "Alphalete Athletics",
        title: "Product data and IT systems support",
        detail:
          "Contributed to product-data consolidation and supported desktop deployment and operational workflows.",
      },
      {
        year: "Current",
        title: "Aerospace study and mentoring",
        detail:
          "Building university-level aerospace experience while continuing occasional rocketry support and STEM outreach.",
      },
    ],
  },
  projects: [
    {
      slug: "systemsgo-tsiolkovsky",
      number: "01",
      title: "SystemsGo Tsiolkovsky Challenge — High-Powered Rocket & Flight Computer",
      shortTitle: "Tsiolkovsky flight computer",
      summary:
        "A high-powered rocketry project centered on a custom Raspberry Pi flight computer programmed in Python, with data acquisition, telemetry, onboard video, and airframe integration still documented through verified evidence as it becomes available.",
      category: "Rocketry & avionics",
      timeframe: "SystemsGo high-school design challenge",
      featured: true,
      tags: [
        "Python",
        "Raspberry Pi",
        "Embedded systems",
        "Avionics",
        "Data acquisition",
        "Systems integration",
        "Rocketry",
      ],
      diagram: "flight-computer",
      sections: [
        {
          id: "context",
          label: "Context",
          body: [
            "Tsiolkovsky was a SystemsGo high-powered rocketry challenge combining vehicle work with an avionics and software problem.",
            "The project is presented as an early hardware-software integration case study, not as a substitute for later university project ownership.",
          ],
        },
        {
          id: "ownership",
          label: "Confirmed contribution",
          body: [
            "Confirmed work includes a custom Raspberry Pi flight computer programmed in Python and the approach for data acquisition, telemetry, and onboard video.",
            "The final page will distinguish exact chassis, structural, wiring, and integration responsibilities once team records and project evidence are gathered.",
          ],
          verificationNote:
            "Add the verified team size and a clear task-by-task ownership record before publishing detailed responsibility claims.",
        },
        {
          id: "process",
          label: "System approach",
          body: [
            "The flight-computer concept connects sensors to a Raspberry Pi running Python, then routes information to storage, telemetry, and video while accounting for power and airframe interfaces.",
            "Packaging had to make the computing, sensing, power, and video elements practical to install and inspect within the rocket.",
          ],
        },
        {
          id: "implementation",
          label: "Implementation & integration",
          body: [
            "The custom computer combined Raspberry Pi hardware and Python with a data-acquisition and telemetry approach plus an onboard video system.",
            "Integration work included the need to document wiring, mounting, packaging, power, sensor placement, and the interface with the airframe.",
          ],
        },
        {
          id: "testing",
          label: "Testing & verification",
          body: [
            "Ground-test and launch-preparation evidence will establish how each subsystem was checked before flight and what acceptance criteria were used.",
            "The current record intentionally avoids inventing sampling rates, power draw, dimensions, budgets, flight data, or launch outcomes.",
          ],
          verificationNote:
            "Add verified ground-test procedures, launch preparation notes, and flight data or result documentation.",
        },
        {
          id: "iteration",
          label: "Iteration",
          body: [
            "Failures, near-failures, and redesign decisions belong in the evidence record once they can be tied to test notes, photos, or flight data.",
          ],
          verificationNote:
            "Document what changed after testing and what would be redesigned today.",
        },
      ],
      evidence: [
        {
          title: "Flight-computer architecture",
          kind: "diagram",
          state: "needed",
          request:
            "Add a verified block diagram showing sensors, Raspberry Pi, storage, telemetry, video, and power.",
        },
        {
          title: "Avionics wiring and packaging",
          kind: "photo",
          state: "needed",
          request:
            "Add verified photos of wiring, mounting, power, sensor placement, and the integrated airframe package.",
        },
        {
          title: "Ground-test or flight data",
          kind: "data",
          state: "needed",
          request:
            "Add verified test results, telemetry, or flight data with the conditions and date recorded.",
        },
      ],
    },
    {
      slug: "systemsgo-oberth",
      number: "02",
      title: "SystemsGo Oberth Challenge — Mach 1 Rocket Design",
      shortTitle: "Oberth constrained rocket design",
      summary:
        "A separate SystemsGo design problem: exceed Mach 1 while remaining below 13,000 feet, balancing performance against stability, structural integrity, recovery, and safety.",
      category: "Rocketry & constrained design",
      timeframe: "SystemsGo high-school design challenge",
      featured: true,
      tags: [
        "Rocketry",
        "Aerospace engineering",
        "Aerodynamics",
        "Engineering design",
        "Systems engineering",
        "Testing",
        "Technical problem solving",
      ],
      sections: [
        {
          id: "context",
          label: "Context",
          body: [
            "Oberth was a constrained supersonic rocket-design challenge, intentionally separate from the avionics-centered Tsiolkovsky work.",
            "The challenge required a rocket to exceed Mach 1 while remaining below 13,000 feet.",
          ],
        },
        {
          id: "constraints",
          label: "Competing constraints",
          body: [
            "Velocity, altitude, stability, structural integrity, recovery, and safety had to be considered together inside a limited flight envelope.",
            "Maximizing one performance metric was not enough; the vehicle also had to satisfy the challenge boundary and operational safety concerns.",
          ],
        },
        {
          id: "ownership",
          label: "Contribution record",
          body: [
            "The project record will identify verified work in design, fabrication, integration, testing, or analysis as source material is gathered.",
            "It does not assign unverified individual ownership or use a generic title in place of a documented contribution.",
          ],
          verificationNote:
            "Add a verified account of the specific design, fabrication, integration, testing, or analysis work completed.",
        },
        {
          id: "process",
          label: "Design tradeoffs",
          body: [
            "The design process focused on tradeoffs between speed and altitude while preserving stability, structural integrity, recovery, and safety.",
            "Lessons from the earlier Tsiolkovsky project can be documented once they are connected to records from the actual design and test cycle.",
          ],
        },
        {
          id: "testing",
          label: "Testing & verification",
          body: [
            "CAD, simulation, calculations, drawings, construction media, or test evidence should establish how the design was evaluated.",
            "The current content does not claim a launch result or test result without a verified record.",
          ],
          verificationNote:
            "Add verified analysis, test conditions, launch result, and lessons learned from the design/test cycle.",
        },
        {
          id: "reflection",
          label: "Reflection",
          body: [
            "The project demonstrates why constrained engineering is more credible than a single peak metric: design choices must work together in the real flight envelope.",
          ],
        },
      ],
      evidence: [
        {
          title: "Oberth design evidence",
          kind: "diagram",
          state: "needed",
          request:
            "Add verified CAD, simulation, design calculations, or drawings that show the Mach 1 and altitude tradeoff.",
        },
        {
          title: "Construction and test record",
          kind: "photo",
          state: "needed",
          request:
            "Add verified construction photos, test media, or flight documentation with dates and conditions.",
        },
      ],
    },
    {
      slug: "alphalete-systems-migration",
      number: "03",
      title: "Product Data & Systems Migration — Alphalete Athletics",
      shortTitle: "Alphalete systems migration",
      summary:
        "Supported the consolidation of distributed product information into a more consistent shared workflow while also helping deploy desktop systems and support operations at scale.",
      category: "Professional systems & operations",
      timeframe: "Alphalete Athletics internship",
      featured: true,
      tags: [
        "Product data",
        "Systems migration",
        "Data validation",
        "IT deployment",
        "Operations",
        "Technical support",
      ],
      diagram: "alphalete-flow",
      sections: [
        {
          id: "context",
          label: "Context",
          body: [
            "Alphalete Athletics work combined high-volume apparel and product operations with product-data organization, systems migration support, and IT/logistics work.",
            "Product information tracked items, available colors, and the way product and color variants sold across the business.",
          ],
        },
        {
          id: "constraints",
          label: "Operational scale",
          body: [
            "The operational context included more than 21,000 items and 125 brand ambassadors, making consistent records and shared workflows valuable.",
            "Any public artifact must explain the information flow without exposing proprietary records, fields, or systems.",
          ],
        },
        {
          id: "ownership",
          label: "Contribution",
          body: [
            "Contributed to the migration toward a centralized digital product-management system by helping move previously distributed product information into a more consistent shared workflow.",
            "The work can be described as organizing existing data, validating records, mapping information, and supporting adoption where accurate; it does not claim migration leadership.",
          ],
        },
        {
          id: "implementation",
          label: "Systems support",
          body: [
            "Helped configure and deploy 20 desktop systems across three company divisions, including hardware and software setup, asset tracking, and basic network-related support.",
            "The technical story connects physical product operations, digital product data, and the supporting systems needed for a consistent workflow.",
          ],
        },
        {
          id: "testing",
          label: "Validation",
          body: [
            "Record organization, validation, mapping, deployment, and adoption support provide the structure for a future non-proprietary verification narrative.",
          ],
          verificationNote:
            "Add a sanitized old-to-new workflow diagram and confirmed quality checks without exposing proprietary information.",
        },
        {
          id: "result",
          label: "Result",
          body: [
            "The verified outcome is a contribution to a more consistent shared product-information workflow and support for desktop deployment across three divisions.",
          ],
        },
      ],
      evidence: [
        {
          title: "Sanitized product-data workflow",
          kind: "diagram",
          state: "needed",
          request:
            "Add a non-proprietary diagram showing distributed information, validation and mapping, and the centralized workflow.",
        },
        {
          title: "Deployment documentation",
          kind: "document",
          state: "needed",
          request:
            "Add a sanitized deployment or asset-tracking artifact that does not expose internal company information.",
        },
      ],
    },
    {
      slug: "containerized-infrastructure",
      number: "04",
      title: "Containerized Infrastructure & Software Systems",
      shortTitle: "Containerized infrastructure",
      summary:
        "Independent technical systems work focused on Linux, Docker, CI/CD, deployments, monitoring, networking, runtime debugging, and reliable operations without linking a private alias.",
      category: "Software infrastructure",
      timeframe: "Independent technical systems work",
      featured: false,
      tags: [
        "Linux",
        "Docker",
        "CI/CD",
        "Deployments",
        "Monitoring",
        "Networking",
        "Runtime debugging",
      ],
      sections: [
        {
          id: "context",
          label: "Context",
          body: [
            "This independent systems project is supporting evidence of systems thinking, reliability work, debugging, and automation; it is not intended to dominate the aerospace portfolio.",
            "The public write-up remains under the real-name portfolio without linking a private project alias or account.",
          ],
        },
        {
          id: "constraints",
          label: "Operating constraints",
          body: [
            "Real services require consistent deployments, failure response, configuration management, monitoring, networking, and runtime diagnosis.",
            "Public evidence must be sanitized so that service identities, credentials, private configuration, and unrelated community context remain private.",
          ],
        },
        {
          id: "ownership",
          label: "Responsibilities",
          body: [
            "The project covers maintaining services, responding to failures, managing consistent deployments, and improving reliability through operational practice.",
          ],
        },
        {
          id: "implementation",
          label: "Technical implementation",
          body: [
            "Work is framed through Linux, Docker, CI/CD, automated deployments, configuration management, monitoring, networking, runtime debugging, and software or plugin development where relevant.",
          ],
        },
        {
          id: "testing",
          label: "Operational verification",
          body: [
            "Deployment-flow diagrams, sanitized metrics, screenshots, and representative code can show how changes were evaluated without relying on a public identity link.",
          ],
          verificationNote:
            "Add sanitized architecture, deployment, monitoring, and incident-debugging evidence before claiming specific reliability improvements.",
        },
        {
          id: "reflection",
          label: "Reflection",
          body: [
            "The systems perspective transfers to engineering work: dependable behavior comes from interfaces, observability, repeatable deployment, and disciplined debugging.",
          ],
        },
      ],
      evidence: [
        {
          title: "Sanitized infrastructure architecture",
          kind: "diagram",
          state: "needed",
          request:
            "Add a sanitized architecture diagram that omits private service names, credentials, and aliases.",
        },
        {
          title: "Deployment and monitoring evidence",
          kind: "data",
          state: "needed",
          request:
            "Add sanitized deployment-flow, monitoring, or runtime-debugging evidence with private identifiers removed.",
        },
      ],
    },
  ],
  experience: [
    {
      title: "Product Data & Systems Migration Support",
      organization: "Alphalete Athletics",
      summary:
        "Contributed to product-data consolidation, systems migration support, and IT deployment work in a high-volume apparel operation.",
      details: [
        "Helped organize and manage product information covering items, colors, and product/color variant sales.",
        "Contributed to a centralized digital product-management workflow without claiming migration leadership.",
        "Helped configure and deploy 20 desktop systems across three company divisions.",
      ],
    },
  ],
  theatre: {
    summary:
      "Technical theatre is curated as evidence of live technical operations, troubleshooting, coordination, leadership, and systems work under pressure.",
    highlights: [
      "Head Technician work across lighting, sound, cue execution, troubleshooting, and crew leadership.",
      "Student Assistant Director coordination, scheduling, communication, and work under hard deadlines.",
      "Texas Thespians All-State lighting design and operator work in a 14,000-seat professional venue.",
      "Tommy Tune Awards sound-design finalist recognition and selective state theatrical-design placements.",
    ],
  },
  outreach: {
    summary:
      "Ongoing rocketry support is presented as occasional mentoring rather than formal employment, alongside elementary STEM outreach involving rockets and aerodynamics.",
    details: [
      "Support younger high-school teams with design review, avionics guidance, debugging, fabrication, or launch preparation where appropriate.",
      "Use elementary STEM outreach to communicate rocketry and aerodynamics concepts.",
      "Use student photos only when appropriate permission is available.",
    ],
  },
  awards: [
    "Tommy Tune Awards — Outstanding Sound Design Finalist",
    "Texas Thespians — All-State Lighting Designer / Operator",
    "UIL State theatrical-design placements",
    "UIL One Act Play — Best Technician",
  ],
};

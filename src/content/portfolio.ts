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

export type ProjectVisualVariant =
  | "tsiolkovsky"
  | "oberth"
  | "alphalete"
  | "infrastructure";

export type ProjectVisual = {
  variant: ProjectVisualVariant;
  alt: string;
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
  visual: ProjectVisual;
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
  home: {
    eyebrow: string;
    headline: string;
    introduction: string;
  };
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
      "Portfolio of Reece DeAlmeida, an Aerospace Engineering student at Mississippi State University.",
  },
  // Configuration block: add professional destinations before publishing.
  social: [
    { label: "Email", href: "mailto:reece.dealmeida@yahoo.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/reece-dealmeida-5b3359325" },
    { label: "GitHub", href: "https://github.com/reecedealmeida" },
  ],
  resume: {
    state: "needed",
    href: "",
    request: "Add a current one-page engineering résumé PDF before publishing.",
  },
  home: {
    eyebrow: "Aerospace Engineering · Mississippi State University",
    headline: "Reece DeAlmeida.",
    introduction:
      "Aerospace Engineering student at Mississippi State University working across high-powered rocketry, avionics, embedded systems, software infrastructure, and live technical operations.",
  },
  about: {
    paragraphs: [
      "I am an Aerospace Engineering student at Mississippi State University and a member of the Shackouls Honors College. My interests include astronautics, spacecraft systems, avionics, embedded systems, systems integration, and engineering test.",
      "My work includes two high-powered SystemsGo rocketry challenges, a custom Raspberry Pi flight computer programmed in Python, software infrastructure, and technical theatre operations spanning live troubleshooting and coordination. I continue to mentor younger high-school rocketry teams on an occasional basis.",
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
          "Completed two distinct design challenges: avionics-focused Tsiolkovsky and constrained supersonic Oberth.",
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
          "Studying Aerospace Engineering at Mississippi State University while continuing occasional rocketry mentoring and STEM outreach.",
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
        "A high-powered rocketry project centered on a custom Raspberry Pi flight computer programmed in Python for data acquisition, telemetry, and onboard video.",
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
      visual: {
        variant: "tsiolkovsky",
        alt: "Technical illustration of a high-powered rocket, onboard flight computer, and telemetry path.",
      },
      sections: [
        {
          id: "context",
          label: "Context",
          body: [
            "Tsiolkovsky was a SystemsGo high-powered rocketry challenge combining vehicle work with an avionics and software problem.",
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
          ],
          verificationNote:
            "Add verified ground-test procedures, launch preparation notes, and flight data or result documentation.",
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
      visual: {
        variant: "oberth",
        alt: "Technical illustration of a constrained rocket airframe with a Mach marker and trajectory grid.",
      },
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
          ],
          verificationNote:
            "Add a verified account of the specific design, fabrication, integration, testing, or analysis work completed.",
        },
        {
          id: "process",
          label: "Design tradeoffs",
          body: [
            "The design process focused on tradeoffs between speed and altitude while preserving stability, structural integrity, recovery, and safety.",
          ],
        },
        {
          id: "testing",
          label: "Testing & verification",
          body: [
            "CAD, simulation, calculations, drawings, construction media, or test evidence should establish how the design was evaluated.",
          ],
          verificationNote:
            "Add verified analysis, test conditions, launch result, and lessons learned from the design/test cycle.",
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
        "Organized product information covering more than 21,000 items and helped configure and deploy 20 desktop systems across three divisions.",
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
      visual: {
        variant: "alphalete",
        alt: "Technical illustration of product records moving through a centralized data workflow.",
      },
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
            "Work included organizing existing data, validating records, mapping information, and supporting adoption.",
          ],
        },
        {
          id: "implementation",
          label: "Systems support",
          body: [
            "Helped configure and deploy 20 desktop systems across three company divisions, including hardware and software setup, asset tracking, and basic network-related support.",
            "This work connected physical product operations, digital product data, and the desktop systems used across the company.",
          ],
        },
        {
          id: "result",
          label: "Result",
          body: [
            "The migration moved distributed product information toward a consistent shared workflow and supported desktop deployment across three divisions.",
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
        "Independent work maintaining private services with Linux, Docker, CI/CD, deployments, monitoring, networking, and runtime debugging.",
      category: "Software infrastructure",
      timeframe: "Independent technical systems work",
      featured: false,
      visual: {
        variant: "infrastructure",
        alt: "Technical illustration of containerized services, network paths, and monitoring signals.",
      },
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
            "The public write-up remains under the real-name portfolio without linking a private project alias or account.",
          ],
        },
        {
          id: "constraints",
          label: "Operating constraints",
          body: [
            "Public evidence must be sanitized so that service identities, credentials, private configuration, and unrelated community context remain private.",
          ],
        },
        {
          id: "ownership",
          label: "Responsibilities",
          body: [
            "Responsibilities included maintaining services, responding to failures, and managing deployments.",
          ],
        },
        {
          id: "implementation",
          label: "Technical implementation",
          body: [
            "The stack includes Linux, Docker, CI/CD, automated deployments, configuration management, monitoring, networking, runtime debugging, and software or plugin development.",
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
        "Product-data consolidation and desktop deployment work for Alphalete Athletics.",
      details: [
        "Helped organize and manage product information covering more than 21,000 items, colors, and product/color variant sales.",
        "Contributed to a centralized digital product-management workflow.",
        "Helped configure and deploy 20 desktop systems across three company divisions.",
      ],
    },
  ],
  theatre: {
    summary:
      "Head Technician and Student Assistant Director work spanning lighting, sound, cue execution, troubleshooting, crew leadership, and production coordination.",
    highlights: [
      "Head Technician work across lighting, sound, cue execution, troubleshooting, and crew leadership.",
      "Student Assistant Director coordination, scheduling, communication, and work under hard deadlines.",
      "Texas Thespians All-State lighting design and operator work in a 14,000-seat professional venue.",
      "Tommy Tune Awards sound-design finalist recognition and selective state theatrical-design placements.",
    ],
  },
  outreach: {
    summary:
      "Occasional mentoring for younger SystemsGo rocketry teams, plus elementary STEM outreach focused on rockets and aerodynamics.",
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

import type { Metadata } from "next";
import { ContactCta } from "@/components/contact-cta";
import { ProjectGrid } from "@/components/project-grid";
import { portfolio } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering case studies covering rocketry, avionics, systems migration, and software infrastructure.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="projects-index section">
        <div className="shell">
          <p className="eyebrow">Projects / 01—04</p>
          <h1 className="display-title">Engineering work, with the evidence visible.</h1>
          <p className="lede">
            Four case studies organized around context, constraints, contribution,
            implementation, testing, and the records still needed to support each claim.
          </p>
        </div>
      </section>
      <section aria-labelledby="project-list-title" className="section section--line">
        <div className="shell">
          <h2 className="visually-hidden" id="project-list-title">
            All projects
          </h2>
          <ProjectGrid projects={portfolio.projects} />
        </div>
      </section>
      <ContactCta />
    </>
  );
}

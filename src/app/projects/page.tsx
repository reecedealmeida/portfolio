import type { Metadata } from "next";
import { ContactCta } from "@/components/contact-cta";
import { ProjectGrid } from "@/components/project-grid";
import { portfolio } from "@/content/portfolio";
import { canonicalMetadataForPath } from "@/lib/site-metadata";
import { resolveSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering case studies covering rocketry, avionics, systems migration, and software infrastructure.",
  ...canonicalMetadataForPath(resolveSiteUrl(), "/projects"),
};

export default function ProjectsPage() {
  return (
    <>
      <section className="projects-index section">
        <div className="shell">
          <p className="eyebrow">Projects / 01—04</p>
          <h1 className="display-title">Engineering work, with the evidence visible.</h1>
          <p className="lede">
            Selected engineering work across rocketry, avionics, data systems, and
            infrastructure. Each project opens into the constraints, contribution,
            implementation, testing, and evidence behind it.
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

import type { Metadata } from "next";
import { ContactCta } from "@/components/contact-cta";
import { ProjectGrid } from "@/components/project-grid";
import { portfolio } from "@/content/portfolio";
import { canonicalMetadataForPath } from "@/lib/site-metadata";
import { resolveSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Reece DeAlmeida's work in high-powered rocketry, avionics, product-data systems, and software infrastructure.",
  ...canonicalMetadataForPath(resolveSiteUrl(), "/projects"),
};

export default function ProjectsPage() {
  return (
    <>
      <section className="projects-index section">
        <div className="shell">
          <p className="eyebrow">Projects / 01—04</p>
          <h1 className="display-title">Projects</h1>
          <p className="lede">
            High-powered rocketry, avionics, product-data systems, and software
            infrastructure.
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

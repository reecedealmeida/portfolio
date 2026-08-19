import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { DiagramScroller } from "@/components/diagram-scroller";
import { AlphaleteFlowDiagram } from "@/components/diagrams/alphalete-flow";
import { FlightComputerDiagram } from "@/components/diagrams/flight-computer";
import { EvidenceFrame } from "@/components/evidence-frame";
import { portfolio, type Project } from "@/content/portfolio";

type CaseStudyProps = {
  project: Project;
};

function ProjectDiagram({ diagram }: Pick<Project, "diagram">) {
  if (diagram === "flight-computer") {
    return <FlightComputerDiagram />;
  }

  if (diagram === "alphalete-flow") {
    return <AlphaleteFlowDiagram />;
  }

  return null;
}

export function CaseStudy({ project }: CaseStudyProps) {
  const projectIndex = portfolio.projects.findIndex(
    (item) => item.slug === project.slug,
  );
  const nextProject =
    portfolio.projects[(projectIndex + 1) % portfolio.projects.length];

  return (
    <>
      <article className="case-study">
        <header className="case-study__hero section">
          <div className="shell case-study__hero-layout">
            <div>
              <p className="eyebrow">Project {project.number}</p>
              <h1 className="display-title">{project.title}</h1>
              <p className="lede">{project.summary}</p>
            </div>
            <dl className="case-study__meta">
              <div>
                <dt>Category</dt>
                <dd>{project.category}</dd>
              </div>
              <div>
                <dt>Timeframe</dt>
                <dd>{project.timeframe}</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>{project.tags.join(" · ")}</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="shell case-study__body">
          <nav aria-label="Case study sections" className="case-study__index">
            <p className="eyebrow">On this page</p>
            <ol>
              {project.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
              {project.diagram ? (
                <li>
                  <a href="#system-view">System view</a>
                </li>
              ) : null}
              <li>
                <a href="#evidence">Evidence</a>
              </li>
            </ol>
          </nav>

          <div className="case-study__content">
            {project.sections.map((section, index) => (
              <section
                aria-labelledby={`${section.id}-title`}
                className="case-study__section"
                id={section.id}
                key={section.id}
              >
                <p className="case-study__section-number">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h2 id={`${section.id}-title`}>{section.label}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.verificationNote ? (
                    <aside className="verification-note">
                      <strong>Verification needed</strong>
                      <p>{section.verificationNote}</p>
                    </aside>
                  ) : null}
                </div>
              </section>
            ))}

            {project.diagram ? (
              <section
                aria-labelledby="system-view-title"
                className="case-study__visual"
                id="system-view"
              >
                <p className="eyebrow">System view</p>
                <h2 id="system-view-title">A concise view of the workflow.</h2>
                <DiagramScroller>
                  <ProjectDiagram diagram={project.diagram} />
                </DiagramScroller>
              </section>
            ) : null}

            <section
              aria-labelledby="evidence-title"
              className="case-study__evidence"
              id="evidence"
            >
              <p className="eyebrow">Evidence record</p>
              <h2 id="evidence-title">What supports this case study.</h2>
              <div className="evidence-grid">
                {project.evidence.map((item) => (
                  <EvidenceFrame item={item} key={item.title} />
                ))}
              </div>
            </section>
          </div>
        </div>

        <nav aria-label="Next project" className="next-project section section--line">
          <Link className="shell next-project__link" href={`/projects/${nextProject.slug}`}>
            <span>
              <span className="eyebrow">Next project</span>
              <strong>{nextProject.shortTitle}</strong>
            </span>
            <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </article>
      <ContactCta />
    </>
  );
}

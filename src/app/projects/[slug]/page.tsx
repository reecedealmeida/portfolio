import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/case-study";
import { getProject, getProjectSlugs } from "@/lib/portfolio";
import { canonicalMetadataForPath } from "@/lib/site-metadata";
import { resolveSiteUrl } from "@/lib/site-url";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return {
    title: project.title,
    description: project.summary,
    ...canonicalMetadataForPath(resolveSiteUrl(), `/projects/${project.slug}`),
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return <CaseStudy project={project} />;
}

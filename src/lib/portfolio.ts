import { portfolio, type Project, type SocialLink } from "@/content/portfolio";

export function getProject(slug: string): Project | undefined {
  return portfolio.projects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return portfolio.projects.map((project) => project.slug);
}

export function visibleSocialLinks(): SocialLink[] {
  return portfolio.social.filter((item) => item.href.trim().length > 0);
}

export function getSocialLink(label: SocialLink["label"]): SocialLink | undefined {
  return visibleSocialLinks().find((item) => item.label === label);
}

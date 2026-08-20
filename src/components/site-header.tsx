import Link from "next/link";
import { portfolio } from "@/content/portfolio";
import { getSocialLink } from "@/lib/portfolio";

const primaryRoutes = [
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
] as const;

export function SiteHeader() {
  const identity = portfolio.person;
  const linkedIn = getSocialLink("LinkedIn");
  const resumeHref =
    portfolio.resume.state === "available" && portfolio.resume.href.trim()
      ? portfolio.resume.href
      : "/contact#resume";

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link className="site-brand" href="/">
          <span className="site-brand__name">{identity.name}</span>
          <span className="site-brand__title">{identity.title}</span>
        </Link>
        <nav aria-label="Primary navigation" className="primary-nav">
          {primaryRoutes.map((route) => (
            <Link href={route.href} key={route.href}>
              {route.label}
            </Link>
          ))}
          <Link href={resumeHref}>Résumé</Link>
          <Link href="/contact">Contact</Link>
          {linkedIn ? (
            <a href={linkedIn.href} rel="noreferrer">
              LinkedIn
            </a>
          ) : null}
        </nav>
      </div>
    </header>
  );
}

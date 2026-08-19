import Link from "next/link";
import { portfolio } from "@/content/portfolio";

const primaryRoutes = [
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/contact#resume", label: "Résumé" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const identity = portfolio.person;

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
        </nav>
      </div>
    </header>
  );
}

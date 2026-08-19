import { portfolio } from "@/content/portfolio";
import { visibleSocialLinks } from "@/lib/portfolio";

export function SiteFooter() {
  const identity = portfolio.person;
  const socialLinks = visibleSocialLinks();

  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <p className="site-footer__identity">
          © {new Date().getFullYear()} {identity.name}
        </p>
        {socialLinks.length > 0 ? (
          <nav aria-label="Social links" className="site-footer__links">
            {socialLinks.map((link) => (
              <a href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </nav>
        ) : null}
      </div>
    </footer>
  );
}

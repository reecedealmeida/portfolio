type SiteUrlEnvironment = Partial<
  Pick<NodeJS.ProcessEnv, "NEXT_PUBLIC_SITE_URL" | "NODE_ENV" | "VERCEL_PROJECT_PRODUCTION_URL">
>;

const localSiteUrl = "http://localhost:3000";

function normalizeSiteUrl(url: string): string {
  const withProtocol = /^https?:\/\//.test(url) ? url : `https://${url}`;

  return new URL(withProtocol).origin;
}

export function resolveSiteUrl(environment: SiteUrlEnvironment = process.env): string | undefined {
  const configuredUrl =
    environment.NEXT_PUBLIC_SITE_URL?.trim() || environment.VERCEL_PROJECT_PRODUCTION_URL?.trim();

  if (configuredUrl) {
    return normalizeSiteUrl(configuredUrl);
  }

  return environment.NODE_ENV === "production" ? undefined : localSiteUrl;
}

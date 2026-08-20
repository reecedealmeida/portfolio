import type { MetadataRoute } from "next";
import { portfolio } from "@/content/portfolio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${portfolio.person.name} — ${portfolio.person.title}`,
    short_name: portfolio.person.name,
    description: portfolio.site.description,
    display: "standalone",
    theme_color: "#f7f7f4",
    background_color: "#f7f7f4",
  };
}

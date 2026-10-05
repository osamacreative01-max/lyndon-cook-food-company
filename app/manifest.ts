import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description:
      "Wholesale supply of rice, spices, seasonal fruit and canned foods across the UK.",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F2EA",
    theme_color: "#084B50",
    lang: SITE.language,
    dir: "ltr",
    categories: ["food", "business"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}

import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

/**
 * Search engines are welcome; the enquiry API and the confirmation page are
 * not, and neither are query-string permutations of the catalogue.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/thank-you"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}

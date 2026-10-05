import type { MetadataRoute } from "next";

import { CATEGORIES } from "@/lib/categories";
import { ACTIVE_PRODUCTS } from "@/lib/products";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * Every indexable route. `/thank-you/` is intentionally excluded: it is a
 * confirmation page, marked noindex in its own metadata.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { path: "/", priority: 1, changeFrequency: "monthly" },
      { path: "/products/", priority: 0.9, changeFrequency: "monthly" },
      { path: "/how-we-supply/", priority: 0.8, changeFrequency: "yearly" },
      { path: "/about/", priority: 0.7, changeFrequency: "yearly" },
      { path: "/company-profile/", priority: 0.6, changeFrequency: "yearly" },
      { path: "/enquire/", priority: 0.9, changeFrequency: "yearly" },
      { path: "/privacy/", priority: 0.2, changeFrequency: "yearly" },
      { path: "/cookies/", priority: 0.2, changeFrequency: "yearly" },
      { path: "/accessibility/", priority: 0.2, changeFrequency: "yearly" },
    ] as const
  ).map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((category) => ({
    url: absoluteUrl(`/products/${category.slug}/`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const productRoutes: MetadataRoute.Sitemap = ACTIVE_PRODUCTS.map((product) => ({
    url: absoluteUrl(`/products/${product.category}/${product.slug}/`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}

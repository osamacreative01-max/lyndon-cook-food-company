/**
 * Metadata and structured-data helpers.
 *
 * Every helper produces truthful data only. No prices, offers, ratings,
 * availability or stock claims are emitted anywhere (master build brief §43).
 */

import type { Metadata } from "next";

import { SITE } from "@/lib/site";
import type { Product } from "@/lib/products";
import type { Category } from "@/lib/categories";

export const DEFAULT_TITLE = `${SITE.name} | UK Food Supply`;

export const DEFAULT_DESCRIPTION =
  "Explore rice, spices, seasonal fruit, canned foods and pasta. Discuss product specifications, volumes and planned supply with The Lyndon Cook Food Company.";

export function absoluteUrl(path = "/"): string {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${normalised}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/products/rice/". */
  path: string;
};

/**
 * Page-level metadata with a canonical URL and consistent Open Graph / Twitter
 * cards.
 *
 * Every page shares the single brand share card. Per-page imagery exists in
 * `lib/images.ts` and is used in page content, but a share card built from a
 * stock photograph would advertise placeholder imagery to third parties, and
 * the remote photos are not 1200x630, so declaring those dimensions would be a
 * lie that some scrapers crop against.
 *
 * Titles are used verbatim: callers supply a complete title, so there is no
 * template appending the company name twice.
 */
export function pageMetadata({
  title,
  description,
  path,
}: PageMetaInput): Metadata {
  const ogImage = SITE.ogImage;
  const ogImageUrl = absoluteUrl(ogImage.src);
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: SITE.name,
      url,
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: ogImage.width,
          height: ogImage.height,
          alt: ogImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export function categoryMetadata(category: Category): Metadata {
  return pageMetadata({
    title: category.seoTitle,
    description: category.seoDescription,
    path: `/products/${category.slug}/`,
  });
}

export function productMetadata(product: Product): Metadata {
  return pageMetadata({
    title: product.seoTitle,
    description: product.seoDescription,
    path: `/products/${product.category}/${product.slug}/`,
  });
}

/* -------------------------------------------------------------------------- */
/* Structured data                                                             */
/* -------------------------------------------------------------------------- */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(SITE.logo.src),
      width: SITE.logo.width,
      height: SITE.logo.height,
    },
    image: absoluteUrl(SITE.ogImage.src),
    description:
      "Wholesale food supply of rice, spices, seasonal fruit, canned foods and pasta, supplied around agreed specifications and planned purchasing requirements.",
    email: SITE.email,
    telephone: SITE.phoneHref,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.town,
      postalCode: SITE.address.postcode,
      addressCountry: SITE.address.countryCode,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.email,
        telephone: SITE.phoneHref,
        availableLanguage: ["en-GB"],
        areaServed: "GB",
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    inLanguage: "en-GB",
    publisher: { "@id": `${SITE.url}/#organization` },
  };
}

export type Crumb = { name: string; href?: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      ...(crumb.href ? { item: absoluteUrl(crumb.href) } : {}),
    })),
  };
}

/**
 * Product structured data limited to confirmed, visible facts. No offers,
 * prices, ratings or stock information are included because none are published.
 */
export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seoDescription,
    category: product.subgroupName,
    image: [product.image.src],
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    manufacturer: { "@id": `${SITE.url}/#organization` },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function itemListSchema(
  name: string,
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.href),
    })),
  };
}

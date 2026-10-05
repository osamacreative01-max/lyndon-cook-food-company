/**
 * Single source of truth for company identity, contact details and navigation.
 *
 * Content rules (see the master build brief):
 *  - The public company name is "The Lyndon Cook".
 *  - NORN is a product brand, never a replacement for the company name.
 *  - No legal suffix ("Ltd", "Limited", ...) is published, because the legal
 *    entity has not been confirmed. See TODO below.
 *  - No employee email addresses and no non-UK office addresses are published.
 */

import { CATEGORIES } from "@/lib/categories";

export const SITE = {
  name: "The Lyndon Cook",
  shortName: "Lyndon Cook",
  /** Product brand presented within the company. */
  productBrand: "NORN",
  brandLine: "A brand from The Lyndon Cook",
  domain: "www.tlcfc.co.uk",
  url: "https://www.tlcfc.co.uk",
  locale: "en_GB",
  language: "en-GB",

  email: "info@tlcfc.co.uk",
  phone: "+44 (0)7563 031295",
  phoneHref: "+447563031295",

  address: {
    street: "79 London Road",
    town: "Biggleswade",
    postcode: "SG18 8EE",
    country: "United Kingdom",
    countryCode: "GB",
    formatted: "79 London Road, Biggleswade, SG18 8EE, United Kingdom",
    lines: ["79 London Road", "Biggleswade", "SG18 8EE", "United Kingdom"],
  },

  /**
   * Approved lockup artwork (source: `public/Asset 1@4x.png`, 6098x1122).
   *
   * Two flattened variants of the same artwork are published so every surface
   * carries the identical lockup: the teal wordmark on cream, the cream wordmark
   * on teal panels. See `components/Logo.tsx`.
   */
  logo: {
    src: "/logo/lyndon-cook-lockup.png",
    onDarkSrc: "/logo/lyndon-cook-lockup-light.png",
    width: 1600,
    height: 294,
    alt: "The Lyndon Cook",
  },

  ogImage: {
    src: "/images/og.jpg",
    width: 1200,
    height: 630,
    alt: "The Lyndon Cook — rice, spices, seasonal fruit and NORN canned foods",
  },

  profileDownload: {
    href: "/downloads/company-profile.pdf",
    label: "Download company profile",
    sizeLabel: "PDF",
  },

  /**
   * TODO(launch): confirm with the company owner before publication. These
   * values are intentionally not invented anywhere else in the site.
   */
  pendingConfirmations: {
    legalEntitySuffix: null,
    companyNumber: null,
    registeredOffice: null,
  },
} as const;

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  /** Renders a menu of the product ranges under this item. */
  menu?: boolean;
};

/** Ranges offered from the "Our Products" menu in the primary navigation. */
export const PRODUCT_MENU_LINKS: NavLink[] = [
  { label: "All products", href: "/products/" },
  ...CATEGORIES.map((category) => ({
    label: category.navLabel,
    href: `/products/${category.slug}/`,
  })),
];

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about/" },
  { label: "Our Products", href: "/products/", menu: true },
  { label: "How we supply", href: "/how-we-supply/" },
];

export const FOOTER_LINKS: NavLink[] = [
  { label: "About Us", href: "/about/" },
  { label: "Our Products", href: "/products/", menu: true },
  { label: "How we supply", href: "/how-we-supply/" },
  { label: "Enquire", href: "/enquire/" },
  { label: "Company profile", href: "/company-profile/" },
];

export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Cookies", href: "/cookies/" },
  { label: "Accessibility", href: "/accessibility/" },
];

/** Approved analytics events. No personal data may be sent with these. */
export const ANALYTICS_EVENTS = [
  "enquiry_started",
  "enquiry_submitted",
  "product_enquiry_clicked",
  "profile_downloaded",
  "email_clicked",
  "phone_clicked",
] as const;

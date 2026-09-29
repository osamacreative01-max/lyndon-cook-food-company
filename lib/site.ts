/**
 * Single source of truth for company identity, contact details and navigation.
 *
 * Content rules (see the master build brief):
 *  - The public company name is "The Lyndon Cook Food Company".
 *  - NORM is a product brand, never a replacement for the company name.
 *  - No legal suffix ("Ltd", "Limited", ...) is published, because the legal
 *    entity has not been confirmed. See TODO below.
 *  - No employee email addresses and no non-UK office addresses are published.
 */

export const SITE = {
  name: "The Lyndon Cook Food Company",
  shortName: "Lyndon Cook",
  /** Product brand presented within the company. */
  productBrand: "NORM",
  brandLine: "A brand from The Lyndon Cook Food Company",
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
   * TODO(launch): replace with the approved logo artwork. The current file is a
   * clearly-marked typographic placeholder that mirrors the approved composition
   * (teal emblem, serif wordmark, copper rule, "FOOD COMPANY" line). Dropping the
   * approved SVG over `public/logo/lyndon-cook.svg` replaces it site-wide.
   */
  logo: {
    src: "/logo/WhatsApp Image 2026-09-28 at 9.25.12 AM.jpeg",
    width: 1600,
    height: 534,
    alt: "The Lyndon Cook Food Company",
  },

  ogImage: {
    src: "/images/og.jpg",
    width: 1200,
    height: 630,
    alt: "The Lyndon Cook Food Company — rice, spices, seasonal fruit and NORM canned foods",
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
};

export const NAV_LINKS: NavLink[] = [
  { label: "Our range", href: "/products/" },
  { label: "NORM", href: "/norm/" },
  { label: "How we supply", href: "/how-we-supply/" },
  { label: "About", href: "/about/" },
];

export const FOOTER_LINKS: NavLink[] = [
  { label: "Our range", href: "/products/" },
  { label: "NORM", href: "/norm/" },
  { label: "How we supply", href: "/how-we-supply/" },
  { label: "About", href: "/about/" },
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

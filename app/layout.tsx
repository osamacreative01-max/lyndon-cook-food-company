import type { Metadata, Viewport } from "next";
import { Cinzel, Poppins } from "next/font/google";
import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, organizationSchema, websiteSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";

import "./globals.css";

/* Poppins carries every description and UI label. */
const sans = Poppins({
  variable: "--font-sans-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/* Cinzel carries headings, buttons and every other display line. */
const serif = Cinzel({
  variable: "--font-serif-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: DEFAULT_TITLE,
    template: "%s",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE.name,
  keywords: [
    "wholesale food supply UK",
    "rice supplier UK",
    "basmati rice wholesale",
    "spices wholesale UK",
    "seasonal fruit supplier",
    "canned food supplier UK",
    "Canned foods",
    "pasta wholesale UK",
    "food supply Biggleswade",
    "B2B food supply",
    "The Lyndon Cook Food Company",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  referrer: "strict-origin-when-cross-origin",
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: SITE.ogImage.src,
        width: SITE.ogImage.width,
        height: SITE.ogImage.height,
        alt: SITE.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [SITE.ogImage.src],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: `${SITE.url}/` },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
  category: "Food & Drink Wholesale",
};

export const viewport: Viewport = {
  themeColor: "#084B50",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${sans.variable} ${serif.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        {/*
          Marks the document as script-enabled before first paint so scroll
          reveals start hidden only when JavaScript can reveal them again.
          Content stays fully visible if scripting is unavailable.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.classList.add("js");',
          }}
        />
      </head>
      <body
        className="flex min-h-screen flex-col bg-ivory font-sans text-body"
        suppressHydrationWarning
      >
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          // Static, developer-authored JSON with no user input.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema(), websiteSchema()]),
          }}
        />
      </body>
    </html>
  );
}

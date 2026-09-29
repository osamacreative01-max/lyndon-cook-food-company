import type { Metadata } from "next";

import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/Container";
import { PageHero } from "@/components/Hero";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

const TITLE = "Accessibility Statement | The Lyndon Cook Food Company";
const DESCRIPTION =
  "The accessibility approach for www.tlcfc.co.uk, including the standard targeted, the measures taken and how to report a barrier.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/accessibility/",
});

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Accessibility"
        description="We want this website to be usable by everyone, including people who browse with a keyboard, a screen reader or reduced motion settings."
        breadcrumbs={
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Accessibility" }]}
          />
        }
      />

      <section className="bg-ivory">
        <Container className="py-14 sm:py-16">
          <div className="max-w-3xl">
            <h2 className="text-[1.5rem] leading-snug sm:text-[1.75rem]">
              Our target
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted">
              This website is built to target{" "}
              <strong className="font-semibold text-teal-800">
                WCAG 2.2 Level AA
              </strong>
              . The measures below are what the site actually implements, rather
              than a claim of full conformance we have not independently audited.
            </p>

            <h2 className="mt-12 text-[1.5rem] leading-snug sm:text-[1.75rem]">
              What we have implemented
            </h2>
            <ul className="mt-5 space-y-4 text-[1.0625rem] leading-[1.7] text-muted">
              {[
                "A skip link is the first focusable element, so keyboard users can jump straight to the main content.",
                "The page structure uses semantic elements and a single, clearly-ordered H1 on every page, with headings that reflect the visual hierarchy.",
                "Every navigation region is labelled, and the breadcrumb trail is keyboard navigable and backed by BreadcrumbList structured data.",
                "Focus is always visible and is never removed. Focus outlines are drawn in a colour that meets contrast requirements on both light and dark panels.",
                "The mobile menu is a labelled dialog with a real toggle button. It closes on Escape, returns focus to the button that opened it, traps Tab while open, and locks background scrolling.",
                "The FAQ accordion uses real buttons with aria-expanded and aria-controls, and each panel is a labelled region. It is fully operable from the keyboard.",
                "The enquiry form has a persistent visible label on every field, marks required fields in text as well as colour, links hints and error messages to their inputs with aria-describedby, and announces errors through an alert region.",
                "Form errors are shown inline next to the field they relate to, and no entered data is cleared when a submission fails.",
                "Interactive targets are at least 44 by 44 pixels on touch layouts.",
                "Body text and headings meet at least a 4.5:1 contrast ratio, and large text at least 3:1. No important information is conveyed by colour alone.",
                "All images carry descriptive alternative text, and images that are purely decorative are hidden from assistive technology.",
                "The layout reflows without horizontal scrolling from 320 pixels upwards, and text scales with browser zoom up to 200% without loss of content.",
                "Motion is limited to short fades and small translations, and all of it is disabled when the operating system requests prefers-reduced-motion.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper-600"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-[1.5rem] leading-snug sm:text-[1.75rem]">
              Known limitations
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted">
              We have not yet commissioned an independent accessibility audit. The
              downloadable company profile is a PDF, and PDFs are not fully
              accessible to every screen reader; if you need the same information in
              an alternative format, ask us and we will provide it.
            </p>

            <h2 className="mt-12 text-[1.5rem] leading-snug sm:text-[1.75rem]">
              Tell us if something is wrong
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted">
              If you hit a barrier on this website, please email{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="link-underline link-underline-hover font-medium text-teal-800"
              >
                {SITE.email}
              </a>{" "}
              or call {SITE.phone}, telling us which page you were on and what
              happened. We treat accessibility feedback as a priority and will look
              into it.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";

import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/Container";
import { PageHero } from "@/components/Hero";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

const TITLE = "Cookies | The Lyndon Cook";
const DESCRIPTION =
  "This website uses no advertising cookies and no cross-site tracking. This page explains the minimal storage used by www.tlcfc.co.uk.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/cookies/",
});

export default function CookiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Cookies"
        description="This website keeps tracking to a minimum. Here is exactly what is used and why."
        breadcrumbs={
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Cookies" }]}
          />
        }
      />

      <section className="bg-ivory">
        <Container className="py-14 sm:py-16">
          <div className="max-w-3xl">
            <h2 className="text-[1.5rem] leading-snug sm:text-[1.75rem]">
              The short version
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted">
              This website sets no advertising cookies, no cross-site tracking
              pixels and no third-party marketing widgets. There is no cookie
              banner, because there is nothing to consent to.
            </p>

            <h2 className="mt-12 text-[1.5rem] leading-snug sm:text-[1.75rem]">
              What the site does use
            </h2>
            <ul className="mt-5 space-y-5 text-[1.0625rem] leading-[1.7] text-muted">
              <li>
                <strong className="font-semibold text-teal-800">
                  Server request logs.
                </strong>{" "}
                Our hosting provider records technical request data such as IP
                address, user agent and requested URL. These are server logs, not
                cookies, and are used to keep the site available and to investigate
                abuse. They are not used to build a profile of you.
              </li>
              <li>
                <strong className="font-semibold text-teal-800">
                  Rate limiting for the enquiry form.
                </strong>{" "}
                When you submit an enquiry, a short-lived rate-limit counter is kept
                in the application&rsquo;s memory for the length of the current
                window. It is not a browser cookie and is cleared automatically. It
                does not contain anything you typed.
              </li>
              <li>
                <strong className="font-semibold text-teal-800">
                  A hidden form field.
                </strong>{" "}
                The enquiry form includes a hidden field that only automated
                submissions fill in, plus a timestamp, as spam protection. These are
                not stored beyond the handling of your request.
              </li>
            </ul>

            <h2 className="mt-12 text-[1.5rem] leading-snug sm:text-[1.75rem]">
              Analytics
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted">
              No analytics or advertising script is currently installed on this
              website. If analytics is added later, it will be configured so that it
              cannot receive names, email addresses, phone numbers or the text of
              your enquiry, and this page will be updated before it goes live.
            </p>

            <h2 className="mt-12 text-[1.5rem] leading-snug sm:text-[1.75rem]">
              How to clear storage in your browser
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted">
              Your browser has its own controls for cookies and site data. Clearing
              them will not break this website, because nothing here depends on
              stored data to work. If you have questions, contact us at{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="link-underline link-underline-hover font-medium text-teal-800"
              >
                {SITE.email}
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

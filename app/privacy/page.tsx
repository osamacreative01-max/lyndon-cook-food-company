import type { Metadata } from "next";

import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/Container";
import { PageHero } from "@/components/Hero";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

const TITLE = "Privacy Notice | The Lyndon Cook Food Company";
const DESCRIPTION =
  "How The Lyndon Cook Food Company handles enquiry data submitted through this website, including what we collect, why, how long we keep it and your rights.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy notice"
        description="This notice explains what this website does with the information you send us. It is written to match what the site actually does, not a generic template."
        breadcrumbs={
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Privacy" }]}
          />
        }
      />

      <section className="bg-ivory">
        <Container className="py-14 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-sm text-muted">
              Last reviewed: <time dateTime="2026-01-01">1 January 2026</time>
            </p>

            <h2 className="mt-10 text-[1.5rem] leading-snug sm:text-[1.75rem]">
              1. Who we are
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted">
              This website is operated by {SITE.name}, of{" "}
              {SITE.address.formatted}.
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
              You can contact us about this notice, or about any information held
              about you, using{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="link-underline link-underline-hover font-medium text-teal-800"
              >
                {SITE.email}
              </a>{" "}
              or {SITE.phone}.
            </p>

            <div className="mt-6 rounded-[4px] border border-copper-600/40 bg-copper-100/40 p-5">
              <h3 className="font-serif text-[1.125rem] text-teal-800">
                Confirmation needed before launch
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                The legal entity name, company registration number and registered
                office have not yet been confirmed. Those details will be added here
                before the site goes live. Nothing on this page should be read as
                legal advice, and this notice has not yet been reviewed by a
                solicitor.
              </p>
            </div>

            <h2 className="mt-12 text-[1.5rem] leading-snug sm:text-[1.75rem]">
              2. What we collect
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted">
              The only data this website collects is what you type into the enquiry
              form:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[1.0625rem] leading-[1.7] text-muted">
              <li>Name</li>
              <li>Organisation</li>
              <li>Email address</li>
              <li>Telephone number (optional)</li>
              <li>Buyer type</li>
              <li>Product or category</li>
              <li>Quantity and unit (optional)</li>
              <li>Delivery destination (optional)</li>
              <li>Delivery schedule (optional)</li>
              <li>
                Specification or message (optional), including anything you choose
                to include in free text
              </li>
            </ul>
            <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted">
              Our hosting provider records standard technical request logs
              (such as IP address, user agent and requested URL) to keep the site
              secure and available. This website sets no advertising cookies and no
              cross-site tracking cookies. See the{" "}
              <a href="/cookies/" className="link-underline link-underline-hover">
                cookies page
              </a>{" "}
              for detail.
            </p>

            <h2 className="mt-12 text-[1.5rem] leading-snug sm:text-[1.75rem]">
              3. Why we use it, and the lawful basis
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted">
              We use enquiry details to review your requirements, prepare and send a
              quotation, and communicate with you about the resulting supply
              programme. The lawful basis is our legitimate interests in responding
              to a business enquiry and managing a commercial relationship, together
              with steps taken at your request prior to entering a contract.
            </p>

            <h2 className="mt-12 text-[1.5rem] leading-snug sm:text-[1.75rem]">
              4. Who receives it
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted">
              Enquiry emails are delivered through a transactional email provider
              acting as a processor on our instructions, so that the enquiry reaches
              our business inbox. Enquiry data is not sold or shared for marketing.
            </p>
            <div className="mt-4 rounded-[4px] border border-dashed border-teal-200 bg-white p-5">
              <p className="text-[0.9375rem] leading-relaxed text-muted">
                <strong className="font-semibold text-teal-800">
                  Configuration placeholder.
                </strong>{" "}
                Before launch this notice will name our email provider, hosting
                provider and any CRM or webhook recipient. Those suppliers are not
                listed here because they have not been confirmed, and naming a
                supplier that is not actually used would be inaccurate.
              </p>
            </div>

            <h2 className="mt-12 text-[1.5rem] leading-snug sm:text-[1.75rem]">
              5. How long we keep it
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted">
              Enquiries that do not lead to a supply programme are deleted or
              anonymised within 12 months. Where an enquiry leads to an ongoing
              programme, the records are kept for as long as needed to manage that
              relationship and to meet our accounting and tax obligations.
            </p>

            <h2 className="mt-12 text-[1.5rem] leading-snug sm:text-[1.75rem]">
              6. International transfers
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted">
              Our hosting and email providers may process data outside the United
              Kingdom. Where they do, transfers are covered by the provider&rsquo;s
              standard contractual clauses or an equivalent safeguard.
            </p>

            <h2 className="mt-12 text-[1.5rem] leading-snug sm:text-[1.75rem]">
              7. Your rights
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted">
              You can ask us for a copy of the personal data we hold about you, ask
              us to correct it, ask us to delete it, or object to how we are using
              it. Email{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="link-underline link-underline-hover font-medium text-teal-800"
              >
                {SITE.email}
              </a>{" "}
              and we will deal with the request. If you are not satisfied with our
              response you can complain to the Information Commissioner&rsquo;s
              Office (ICO) at ico.org.uk.
            </p>

            <h2 className="mt-12 text-[1.5rem] leading-snug sm:text-[1.75rem]">
              8. Security
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted">
              The site is served over HTTPS. Enquiry submissions are validated on
              the server, rate limited, and protected with a honeypot field. Email
              credentials are stored only in server-side environment variables and
              are never included in code sent to your browser.
            </p>

            <h2 className="mt-12 text-[1.5rem] leading-snug sm:text-[1.75rem]">
              9. Changes
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted">
              If this notice changes, the review date at the top of the page will be
              updated.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

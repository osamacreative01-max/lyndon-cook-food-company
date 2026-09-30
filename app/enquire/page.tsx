import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/Container";
import EnquiryForm from "@/components/EnquiryForm";
import { PageHero } from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { ACTIVE_PRODUCTS } from "@/lib/products";

const TITLE = "Enquire | Discuss Your Requirements | The Lyndon Cook Food Company";
const DESCRIPTION =
  "Send an enquiry about rice, spices, seasonal fruit or NORM canned foods. Tell us the product, specification, pack format, volume, destination and delivery schedule.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/enquire/",
});

type SearchParams = Promise<{ product?: string | string[] }>;

const WHAT_TO_INCLUDE = [
  {
    title: "Product",
    body: "The product or category you are interested in, and the variety if you have one in mind.",
  },
  {
    title: "Specification",
    body: "The quality parameters, pack sizes or label details that matter to your operation.",
  },
  {
    title: "Pack format",
    body: "How you want the product packed and presented. NORM uses a 400 ml can format.",
  },
  {
    title: "Volume",
    body: "The quantity you have in mind, in the unit that suits you. We do not convert between units.",
  },
  {
    title: "Delivery destination",
    body: "Postcode or full delivery address.",
  },
  {
    title: "Delivery schedule",
    body: "Whether this is a one-off, a weekly or fortnightly programme, or seasonal.",
  },
];

export default async function EnquirePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const requested = Array.isArray(params.product) ? params.product[0] : params.product;
  // Only accept slugs that exist in the catalogue.
  const initialProductSlug = ACTIVE_PRODUCTS.some(
    (product) => product.slug === requested
  )
    ? requested
    : undefined;
  const selectedProduct = initialProductSlug
    ? ACTIVE_PRODUCTS.find((product) => product.slug === initialProductSlug)
    : undefined;

  return (
    <>
      <PageHero
        eyebrow="Enquire"
        title="Let's talk food."
        description="Your requirements. Our next conversation."
        breadcrumbs={
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Enquire" }]} />
        }
      />

      <section className="bg-ivory">
        <Container className="py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* ------------------------------------------------------ The form */}
            <div className="lg:col-span-7">
              {selectedProduct ? (
                <div className="mb-6 rounded-[4px] border border-copper-600/40 bg-copper-100/40 p-5">
                  <p className="eyebrow text-copper-700">Pre-selected product</p>
                  <p className="mt-2 font-serif text-[1.25rem] text-teal-800">
                    {selectedProduct.name}
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                    {selectedProduct.subgroupName} &middot; {selectedProduct.summary}
                  </p>
                  <p className="mt-3 text-sm text-muted">
                    Not what you meant?{" "}
                    <Link
                      href="/enquire/"
                      className="link-underline link-underline-hover font-medium text-teal-800"
                    >
                      Clear the selection
                    </Link>
                    .
                  </p>
                </div>
              ) : null}

              <EnquiryForm
                products={ACTIVE_PRODUCTS}
                initialProductSlug={initialProductSlug}
              />
            </div>

            {/* --------------------------------------------------- Side guidance */}
            <aside className="lg:col-span-5">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper-700">
                  Before you send
                </p>
                <h2 className="mt-2 text-[1.375rem] leading-snug sm:text-[1.5rem]">
                  What to include
                </h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                  The more of this you can share, the more useful our first reply
                  will be. An enquiry is not an order &mdash; it starts a commercial
                  conversation, and product, specification, quantity, delivery and
                  terms are confirmed separately.
                </p>
                <dl className="mt-6 space-y-3">
                  {WHAT_TO_INCLUDE.map((item, index) => (
                    <div
                      key={item.title}
                      className="flex gap-4 rounded-[6px] border border-teal-100 bg-white p-4"
                    >
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-50 font-serif text-[0.8125rem] font-semibold text-teal-800">
                        {index + 1}
                      </span>
                      <div>
                        <dt className="font-semibold text-teal-800">{item.title}</dt>
                        <dd className="mt-1 text-[0.875rem] leading-relaxed text-muted">
                          {item.body}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={100}>
                <div className="mt-8 rounded-[6px] border border-teal-100 bg-white p-6 shadow-[0_1px_3px_rgba(8,75,80,0.04)]">
                  <h2 className="font-serif text-[1.1875rem] text-teal-800">
                    Prefer to talk it through?
                  </h2>
                  <address className="mt-4 not-italic text-[0.9375rem] leading-relaxed text-muted">
                    <span className="flex gap-2.5">
                      <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-copper-600" />
                      <a
                        href={`mailto:${SITE.email}`}
                        className="link-underline link-underline-hover"
                      >
                        {SITE.email}
                      </a>
                    </span>
                    <a
                      href={`tel:${SITE.phoneHref}`}
                      className="link-underline link-underline-hover flex min-h-11 items-center gap-2.5"
                    >
                      <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-copper-600" />
                      {SITE.phone}
                    </a>
                    <span className="mt-2 flex gap-2.5">
                      <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-copper-600" />
                      <span>{SITE.address.formatted}</span>
                    </span>
                  </address>
                </div>
              </Reveal>

              <Reveal delay={160}>
                <div className="mt-4 rounded-[6px] border border-copper-600/30 bg-copper-100/30 p-6">
                  <h2 className="font-serif text-[1.1875rem] text-teal-800">
                    A note on lead times
                  </h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                    Lead times are confirmed for each programme rather than published
                    in advance. We will set out timing and delivery terms with your
                    quotation.
                  </p>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

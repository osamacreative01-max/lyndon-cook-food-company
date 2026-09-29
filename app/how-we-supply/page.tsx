import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/Container";
import EnquiryCTA from "@/components/EnquiryCTA";
import Faq, { type FaqItem } from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import SupplyProcess, { DEFAULT_SUPPLY_STEPS } from "@/components/SupplyProcess";
import { PageHero } from "@/components/Hero";
import { IMAGE_SIZES, IMAGES } from "@/lib/images";
import { faqSchema, pageMetadata } from "@/lib/seo";

const TITLE =   "How We Supply | Full-Load Food Supply | The Lyndon Cook Food Company";
const DESCRIPTION =
  "How supply works at The Lyndon Cook Food Company: share your brief, agree specifications, plan supply, confirm delivery. Full-load B2B supply, planned around your purchasing programme.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/how-we-supply/",
});

const FAQS: FaqItem[] = [
  {
    question: "Does an enquiry place an order?",
    answer:
      "No. An enquiry starts a commercial conversation. Final product, specification, quantity, delivery and terms are confirmed separately.",
  },
  {
    question: "Do you focus on full-load supply?",
    answer:
      "The launch model focuses on planned full-load B2B supply. A typical initial delivery is approximately 24\u201325 pallets, subject to product weight, pallet format and vehicle capacity. Final load configuration and delivery terms are confirmed with your quotation.",
  },
  {
    question: "Can products be mixed?",
    answer:
      "Mixed products may be considered subject to load configuration and operational confirmation.",
  },
  {
    question: "What are the lead times?",
    answer: "Lead times are confirmed for each programme.",
  },
  {
    question: "Is fruit always available?",
    answer:
      "Fresh fruit availability depends on crop and shipping conditions. Variety, size, maturity, grade, origin and packing are confirmed per programme or order.",
  },
];

export default function HowWeSupplyPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />

      <PageHero
        eyebrow="How we supply"
        title="Straightforward supply, planned around the customer."
        description="Four stages, agreed in writing, with nothing promised that we have not confirmed. Tell us the products, quantities and delivery schedule you have in mind, and we will review a programme around your requirements."
        image={IMAGES.warehouse}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "How we supply" },
            ]}
          />
        }
      />

      {/* --------------------------------------------------------- Full-load focus */}
      <section className="on-dark bg-white" aria-labelledby="full-load-heading">
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow">Full-load supply</p>
                <h2
                  id="full-load-heading"
                  className="mt-4 text-[1.875rem] leading-[1.15] sm:text-[2.25rem]"
                >
                  We focus on planned full-load supply.
                </h2>
                <p className="mt-5 text-[1.0625rem] leading-[1.7] text-muted">
                  Tell us the products, quantities and delivery schedule you have in
                  mind, and we will review a programme around your requirements. A
                  typical initial delivery is approximately 24&ndash;25 pallets,
                  subject to product weight, pallet format and vehicle capacity.
                </p>
                <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted">
                  Final load configuration and delivery terms are confirmed with
                  your quotation. Lead times are confirmed for each programme
                  rather than published here.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/enquire/"
                    className="inline-flex min-h-12 items-center rounded-[3px] bg-teal-800 px-7 py-3 text-base font-semibold text-ivory transition-colors hover:bg-teal-700"
                  >
                    Discuss your requirements
                  </Link>
                  <Link
                    href="/company-profile/"
                    className="inline-flex min-h-12 items-center rounded-[3px] border border-teal-800 px-7 py-3 text-base font-semibold text-teal-800 transition-colors hover:bg-teal-800 hover:text-ivory"
                  >
                    Company profile
                  </Link>
                </div>
              </Reveal>
            </div>
            <Reveal delay={120} className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px] border border-teal-100 bg-ivory-dark">
                <Image
                  src={IMAGES.riceSacks.src}
                  alt={IMAGES.riceSacks.alt}
                  fill
                  loading="lazy"
                  sizes={IMAGE_SIZES.band}
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <SupplyProcess
        steps={DEFAULT_SUPPLY_STEPS}
        heading="A straightforward way to supply"
        description="Each stage is confirmed before the next begins, so the specification, the load and the delivery terms are all settled in writing."
      />

      {/* --------------------------------------------------------- What we agree */}
      <section className="on-dark border-t border-teal-100 bg-white" aria-labelledby="agree-heading">
        <Container className="py-16 sm:py-20">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Agreed in writing</p>
            <h2
              id="agree-heading"
              className="mt-4 text-[1.875rem] leading-[1.15] sm:text-[2.25rem]"
            >
              What gets agreed, and when.
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-[1.7] text-muted">
              Nothing on this website is a technical specification. The following
              are confirmed during the conversation, not published in advance.
            </p>
          </Reveal>

          <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                term: "Product and variety",
                detail:
                  "The exact product and variety, including grain variety, spice form or fruit variety.",
              },
              {
                term: "Quality parameters",
                detail:
                  "The parameters that matter to your kitchen, agreed as a product standard.",
              },
              {
                term: "Pack format",
                detail:
                  "Packing format agreed to suit handling, storage and service. NORM uses a 400 ml can format.",
              },
              {
                term: "Quantity and units",
                detail:
                  "Volumes expressed in the unit that suits you. We do not convert cases to pallets without approved conversion data.",
              },
              {
                term: "Load configuration",
                detail:
                  "Final pallet and load configuration, confirmed with the quotation.",
              },
              {
                term: "Delivery terms and timing",
                detail:
                  "Destination, schedule and delivery terms, confirmed for the programme.",
              },
            ].map((item) => (
              <Reveal key={item.term} as="div" delay={70}>
                <dt className="border-t-2 border-copper-600 pt-4 font-serif text-[1.1875rem] text-teal-800">
                  {item.term}
                </dt>
                <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                  {item.detail}
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <Faq
        items={FAQS}
        heading="Questions we are asked"
        description="If your question is not answered here, send it with your requirements and we will answer it directly."
      />

      <EnquiryCTA
        heading="Let's talk food."
        copy="Share your requirements and we will review the products, specification, quantity, pack format and delivery schedule with you."
        secondaryLabel="See the range"
        secondaryHref="/products/"
      />
    </>
  );
}

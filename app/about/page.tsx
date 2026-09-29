import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Container from "@/components/Container";
import EnquiryCTA from "@/components/EnquiryCTA";
import Pillars from "@/components/Pillars";
import Reveal from "@/components/Reveal";
import { PageHero } from "@/components/Hero";
import { CATEGORIES } from "@/lib/categories";
import { IMAGE_SIZES, IMAGES } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { CATALOGUE_COUNTS } from "@/lib/products";

const TITLE = "About | The Lyndon Cook Food Company";
const DESCRIPTION =
  "The Lyndon Cook Food Company brings a practical approach to food supply: well-chosen products, clear specifications and orders planned around the customer.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Selected with care. Supplied with purpose."
        description="The Lyndon Cook Food Company brings a practical approach to food supply: well-chosen products, clear specifications and orders planned around the customer."
        image={IMAGES.kitchen}
        breadcrumbs={
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
        }
      />

      {/* ------------------------------------------------------------- Introduction */}
      <section className="on-dark bg-white" aria-labelledby="intro-heading">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow">Who we are</p>
                <h2
                  id="intro-heading"
                  className="mt-4 text-[1.875rem] leading-[1.15] sm:text-[2.25rem]"
                >
                  A food supply company built around clarity.
                </h2>
                <div className="mt-6 space-y-4 text-[1.0625rem] leading-[1.7] text-muted">
                  <p>
                    We supply rice, everyday ingredients, spices, seasonal fruit and
                    NORM canned foods to businesses that buy food to cook, serve or
                    resell. The work is not complicated: match the right product to
                    the right use, agree a clear specification, and plan the orders
                    so deliveries land when the kitchen expects them.
                  </p>
                  <p>
                    We are a B2B supplier. We do not sell directly to the public
                    and we do not publish prices online. Instead, we ask what you
                    need, in what format, in what volume and on what schedule, then
                    come back with the supply options.
                  </p>
                  <p>
                    Where a detail is not confirmed, we say so. Fruit availability
                    depends on crop and shipping conditions. Product specifications
                    and pack formats are agreed per order. Lead times are confirmed
                    for each programme.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={120} className="lg:col-span-5">
              <div className="rounded-[4px] border border-teal-100 bg-ivory p-7">
                <h3 className="font-serif text-[1.25rem] text-teal-800">
                  {SITE.name}
                </h3>
                <address className="mt-4 not-italic text-[0.9375rem] leading-relaxed text-muted">
                  <span className="flex gap-2.5">
                    <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-copper-600" />
                    <span>
                      {SITE.address.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  </span>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="link-underline link-underline-hover mt-4 flex min-h-11 items-center gap-2.5"
                  >
                    <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-copper-600" />
                    {SITE.email}
                  </a>
                  <a
                    href={`tel:${SITE.phoneHref}`}
                    className="link-underline link-underline-hover flex min-h-11 items-center gap-2.5"
                  >
                    <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-copper-600" />
                    {SITE.phone}
                  </a>
                </address>
                <div className="mt-4 border-t border-teal-100 pt-4">
                  <Button href="/enquire/">Start an enquiry</Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------------- Pillars */}
      <section className="on-dark bg-teal-800" aria-labelledby="approach-heading">
        <Container className="py-16 sm:py-20">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-copper-400">Our approach</p>
            <h2
              id="approach-heading"
              className="mt-4 text-[1.875rem] leading-[1.15] sm:text-[2.25rem]"
            >
              Three things we hold to.
            </h2>
          </Reveal>
          <Pillars className="mt-12" onDark />
        </Container>
      </section>

      {/* ----------------------------------------------------------------- Range */}
      <section className="bg-ivory" aria-labelledby="focus-heading">
        <Container className="py-16 sm:py-20">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">What we focus on</p>
            <h2
              id="focus-heading"
              className="mt-4 text-[1.875rem] leading-[1.15] sm:text-[2.25rem]"
            >
              Rice, everyday ingredients, spices, seasonal fruit and NORM canned
              foods.
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-[1.7] text-muted">
              {CATALOGUE_COUNTS.total} products across four categories. Each one has
              its own page, its own confirmed facts and its own supply note, so you
              can see exactly what is settled and what still needs agreeing.
            </p>
          </Reveal>

          <ul className="mt-10 border-t border-teal-100">
            {CATEGORIES.map((category, index) => (
              <Reveal key={category.id} as="li" delay={index * 60}>
                <Link
                  href={`/products/${category.slug}/`}
                  className="group flex flex-col gap-2 border-b border-teal-100 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
                >
                  <span className="min-w-0">
                    <span className="block font-serif text-[1.375rem] leading-snug text-teal-800">
                      {category.name}
                    </span>
                    <span className="mt-1.5 block max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
                      {category.summary}
                    </span>
                  </span>
                  <span className="inline-flex min-h-11 shrink-0 items-center gap-2 text-[0.9375rem] font-semibold text-teal-800">
                    {category.ctaLabel}
                    <span
                      aria-hidden="true"
                      className="text-copper-600 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------------------- NORM block */}
      <section className="on-dark bg-white" aria-labelledby="norm-about-heading">
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal delay={100} className="order-2 lg:order-1 lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px] border border-teal-100 bg-ivory-dark">
                <Image
                  src={IMAGES.spiceBowls.src}
                  alt={IMAGES.spiceBowls.alt}
                  fill
                  loading="lazy"
                  sizes={IMAGE_SIZES.band}
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal className="order-1 lg:order-2 lg:col-span-7">
              <p className="eyebrow">Our product brand</p>
              <h2
                id="norm-about-heading"
                className="mt-4 text-[1.875rem] leading-[1.15] sm:text-[2.25rem]"
              >
                NORM, a brand from The Lyndon Cook Food Company.
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-[1.7] text-muted">
                NORM is our canned-food brand: fourteen choices across beans and
                pulses, vegetables and tomatoes, in a 400 ml easy-open can format.
                400 ml refers to the can format, not net weight. Final net
                contents, drained weights and label details are confirmed by
                product specification.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/norm/">About NORM</Button>
                <Button href="/products/canned-food/" variant="secondary">
                  Explore NORM products
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------- Positioning */}
      <section className="bg-ivory" aria-labelledby="honest-heading">
        <Container className="py-16 sm:py-20">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">How we communicate</p>
            <h2
              id="honest-heading"
              className="mt-4 text-[1.875rem] leading-[1.15] sm:text-[2.25rem]"
            >
              What this site deliberately does not tell you.
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-[1.7] text-muted">
              We would rather leave a gap than fill it with a guess. That is why
              you will not find prices, stock levels, delivery guarantees, fixed
              fruit seasons or technical datasheets on this site.
            </p>
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {[
              "No public prices or online checkout \u2014 we quote against a requirement.",
              "No stock availability claims \u2014 volumes are planned per programme.",
              "No fixed lead times \u2014 timings are confirmed for each programme.",
              "No fixed fruit seasons \u2014 availability depends on crop and shipping conditions.",
              "No invented specifications \u2014 pack formats and drained weights are per product.",
              "No unsupported credentials \u2014 certifications are published only when confirmed.",
            ].map((item) => (
              <Reveal key={item} as="li" delay={60}>
                <p className="border-t border-teal-100 pt-4 text-[0.9375rem] leading-relaxed text-body">
                  {item}
                </p>
              </Reveal>
            ))}
          </ul>
          <div className="mt-10">
            <Button href="/company-profile/" variant="secondary">
              Company profile
            </Button>
          </div>
        </Container>
      </section>

      <EnquiryCTA
        heading="Tell us what you need."
        copy="Share your product requirements, volumes and delivery plans. Our team will review the details and come back with the appropriate supply options."
        secondaryLabel="How we supply"
        secondaryHref="/how-we-supply/"
      />
    </>
  );
}

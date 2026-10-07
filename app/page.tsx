import Link from "next/link";
import { ArrowRight } from "lucide-react";

import CategoryCard from "@/components/CategoryCard";
import Container from "@/components/Container";
import Hero, { HeroStrip } from "@/components/Hero";
import ImageBand from "@/components/ImageBand";
import Pillars from "@/components/Pillars";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SupplyProcess from "@/components/SupplyProcess";
import { CATEGORIES } from "@/lib/categories";
import { HOME_BANNERS, PRODUCT_PAGE_BANNERS } from "@/lib/images";
import { itemListSchema, DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { ACTIVE_PRODUCTS } from "@/lib/products";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={itemListSchema(
          `${SITE.name} product range`,
          CATEGORIES.map((category) => ({
            name: category.name,
            href: `/products/${category.slug}/`,
          }))
        )}
      />

      {/* ---------------------------------------------------------------- Hero */}
      <Hero
        eyebrow="UK food supply, planned around you"
        title={
          <>
            Good food.
            <br className="hidden sm:block" /> Straightforward supply.
          </>
        }
        description="Rice, spices, seasonal fruit and canned foods, supplied around clear specifications and planned purchasing requirements."
        primary={{
          label: "Discuss your requirements",
          href: "/enquire/",
          className: "text-white!",
        }}
        secondary={{ label: "Explore our range", href: "/products/" }}
        slides={HOME_BANNERS}
      />

      <HeroStrip
        items={[
          `${ACTIVE_PRODUCTS.length} products across ${CATEGORIES.length} categories`,
          "Planned full-load B2B supply",
          "Specification agreed per order",
        ]}
      />

      {/* ------------------------------------------------------- Category grid */}
      <section
        className="relative overflow-hidden bg-ivory"
        aria-labelledby="range-heading"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-copper-100/60 blur-3xl"
        />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="range-heading"
              eyebrow="What we supply"
              title="Our Products"
              description={`${CATEGORIES.length} ranges, one supply conversation. Tell us what you need and we will review the options.`}
            />
            <Link
              href="/products/"
              className="group inline-flex w-fit shrink-0 items-center gap-2.5 rounded-full border border-teal-800/20 bg-white px-6 py-3 text-sm font-semibold text-teal-800 shadow-[0_2px_10px_rgba(8,75,80,0.06)] transition-all duration-300 hover:border-teal-800 hover:bg-teal-800 hover:text-ivory focus-visible:outline-offset-4 sm:self-end"
            >
              See all {ACTIVE_PRODUCTS.length} products
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 text-copper-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-copper-400"
              />
            </Link>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-6 xl:gap-7">
            {CATEGORIES.map((category, index) => (
              <li
                key={category.id}
                className={`h-full lg:col-span-2 ${
                  index === 3
                    ? "lg:col-start-2"
                    : index === 4
                      ? "lg:col-start-4"
                      : ""
                }`}
              >
                <CategoryCard category={category} delay={index * 90} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------------------- Pillars */}
      <section className="on-dark bg-teal-800" aria-labelledby="pillars-heading">
        <Container className="py-16 sm:py-20 lg:py-24">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-copper-400">Why work with us</p>
            <span className="rule-copper mt-4" aria-hidden="true" />
            <h2
              id="pillars-heading"
              className="mt-5 text-[1.9rem] leading-[1.1] sm:text-[2.375rem] lg:text-[2.75rem]"
            >
              Selected with care. Supplied with purpose.
            </h2>
            <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.75] text-ivory sm:text-[1.1875rem]">
              A practical approach to food supply: well-chosen products, clear
              specifications and orders planned around the customer.
            </p>
          </Reveal>
          <Pillars className="mt-12" onDark />
        </Container>
      </section>

      {/* --------------------------------------------------------- Editorial band */}
      <ImageBand
        images={PRODUCT_PAGE_BANNERS}
        eyebrow="Planned around you"
        statement="Tell us what you need, in what format and when, and we will review the supply options with you."
        linkLabel="Start a conversation"
        linkHref="/enquire/"
      />

      {/* ------------------------------------------------------- Supply process */}
      <SupplyProcess />
    </>
  );
}

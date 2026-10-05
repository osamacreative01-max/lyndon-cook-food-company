import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import Button from "@/components/Button";
import CategoryCard from "@/components/CategoryCard";
import Container from "@/components/Container";
import EnquiryCTA from "@/components/EnquiryCTA";
import Hero, { HeroStrip } from "@/components/Hero";
import ImageBand from "@/components/ImageBand";
import Pillars from "@/components/Pillars";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SupplyProcess from "@/components/SupplyProcess";
import { CATEGORIES } from "@/lib/categories";
import { HOME_BANNERS, IMAGE_SIZES, IMAGES } from "@/lib/images";
import { itemListSchema, DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { ACTIVE_PRODUCTS, getProductsByCategory } from "@/lib/products";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const nornHighlights = getProductsByCategory("canned-food").slice(0, 4);
  const featuredRice = getProductsByCategory("rice").slice(0, 3);
  const featuredSpices = getProductsByCategory("spices").slice(0, 3);

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
        description="Rice, spices, seasonal fruit and NORN canned foods, supplied around clear specifications and planned purchasing requirements."
        primary={{ label: "Discuss your requirements", href: "/enquire/" }}
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
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="range-heading"
              eyebrow="What we supply"
              title="Our products"
              description={`${CATEGORIES.length} ranges, one supply conversation. Tell us what you need and we will review the options.`}
            />
            <Link
              href="/products/"
              className="group inline-flex items-center gap-2.5 rounded-full border border-teal-800/20 bg-white px-6 py-3 text-sm font-semibold text-teal-800 shadow-[0_2px_10px_rgba(8,75,80,0.06)] transition-all duration-300 hover:border-teal-800 hover:bg-teal-800 hover:text-ivory focus-visible:outline-offset-4"
            >
              See all {ACTIVE_PRODUCTS.length} products
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 text-copper-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-copper-400"
              />
            </Link>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:gap-7">
            {CATEGORIES.map((category, index) => (
              <li key={category.id} className="h-full">
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

      {/* ---------------------------------------------------------- NORN block */}
      <section className="bg-ivory" aria-labelledby="norn-heading">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-20">
            {/* Brand introduction */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  id="norn-heading"
                  eyebrow="Our canned-food brand"
                  title="Everyday food. Well considered."
                  description={
                    <>
                      NORN is the canned-food brand from The Lyndon Cook.
                      Fourteen choices in a 400 ml easy-open can format.
                    </>
                  }
                />

                <ul className="mt-7 flex flex-wrap gap-2">
                  {["Beans", "Pulses", "Vegetables", "Tomatoes"].map((label) => (
                    <li
                      key={label}
                      className="rounded-full border border-sand bg-white px-3.5 py-1.5 text-[0.8125rem] font-medium leading-none text-teal-800"
                    >
                      {label}
                    </li>
                  ))}
                  <li className="rounded-full border border-copper-600/40 bg-copper-100/70 px-3.5 py-1.5 text-[0.8125rem] font-medium leading-none text-copper-700">
                    400 ml can format
                  </li>
                  <li className="rounded-full border border-copper-600/40 bg-copper-100/70 px-3.5 py-1.5 text-[0.8125rem] font-medium leading-none text-copper-700">
                    Easy-open ring-pull
                  </li>
                </ul>

                <p className="mt-6 max-w-lg text-[0.875rem] leading-relaxed text-muted">
                  400 ml refers to the can format. Final net contents, drained weights
                  and label details are confirmed by product specification.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/products/canned-food/" size="lg">
                    Explore NORN
                  </Button>
                </div>
              </div>
            </div>

            {/* Product showcase */}
            <div className="lg:col-span-7">
              <ul className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:gap-5 lg:gap-6">
                {nornHighlights.map((product, index) => (
                  <li key={product.id} className="h-full">
                    <Reveal delay={index * 80} className="h-full">
                      <Link
                        href={`/products/${product.category}/${product.slug}/`}
                        className="group flex h-full flex-col overflow-hidden rounded-[8px] border border-sand bg-white shadow-[0_1px_2px_rgba(35,68,70,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-sand-600/60 hover:shadow-[0_14px_30px_rgba(8,75,80,0.10)]"
                      >
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory-dark">
                          <Image
                            src={product.image.src}
                            alt={product.image.alt}
                            fill
                            loading="lazy"
                            sizes={IMAGE_SIZES.grid}
                            className={
                              product.image.src.startsWith("/Png/")
                                ? "object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.05] sm:p-5"
                                : "object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                            }
                          />
                        </div>
                        <div className="flex flex-1 items-center justify-between gap-3 border-t border-sand/70 px-4 py-3.5 sm:px-5">
                          <span className="text-[0.9375rem] font-medium leading-snug text-teal-800">
                            {product.name}
                          </span>
                          <span
                            aria-hidden="true"
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-sand bg-ivory text-teal-800 transition-colors duration-300 group-hover:border-teal-800 group-hover:bg-teal-800 group-hover:text-ivory"
                          >
                            <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </Link>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------- Editorial band */}
      <ImageBand
        image={IMAGES.kitchenTeam}
        eyebrow="Planned around you"
        statement="Tell us what you need, in what format and when, and we will review the supply options with you."
        linkLabel="Start a conversation"
        linkHref="/enquire/"
      />

      {/* ------------------------------------------------------- Supply process */}
      <SupplyProcess />

      {/* --------------------------------------------------- Featured products */}
      <section className="bg-ivory" aria-labelledby="featured-heading">
        <Container className="py-16 sm:py-20 lg:py-24">
          <SectionHeading
            id="featured-heading"
            eyebrow="From the catalogue"
            title="Where most enquiries start"
            description="A few of the products buyers ask about most often. The full catalogue, with filtering and search, is on the Our products page."
          />
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {[...featuredRice, ...featuredSpices].map((product, index) => (
              <li key={product.id} className="h-full">
                <ProductCard product={product} delay={index * 80} />
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href="/products/" variant="secondary" size="lg">
              Explore the full range
            </Button>
            <ul className="flex flex-wrap gap-x-7 gap-y-2 text-[0.9375rem] text-muted">
              {[
                "Specification agreed per order",
                "Planned full-load supply",
                "UK-based team",
              ].map((point) => (
                <li key={point} className="flex items-center gap-2.5">
                  <Check
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-copper-600"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------- Final CTA */}
      <EnquiryCTA
        showFullLoadNote
        secondaryLabel="How we supply"
        secondaryHref="/how-we-supply/"
      />
    </>
  );
}

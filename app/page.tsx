import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import Button from "@/components/Button";
import CategoryCard from "@/components/CategoryCard";
import Container from "@/components/Container";
import EnquiryCTA from "@/components/EnquiryCTA";
import Pillars from "@/components/Pillars";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SupplyProcess from "@/components/SupplyProcess";
import { CATEGORIES } from "@/lib/categories";
import { IMAGE_SIZES, IMAGES } from "@/lib/images";
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

  const heroImage = IMAGES.pantryStack;

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
      <section className="on-dark bg-white">
        <Container className="grid items-center gap-10 py-10 sm:py-12 lg:grid-cols-12 lg:gap-14 lg:py-16">
          <div className="lg:col-span-6">
            <p className="eyebrow">UK food supply, planned around you</p>
            <span className="rule-copper mt-3" aria-hidden="true" />
            <h1 className="mt-5 text-[2.25rem] leading-[1.08] sm:text-[3rem] lg:text-[3.75rem]">
              Good food.<br className="hidden sm:block" /> Straightforward supply.
            </h1>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-muted sm:text-[1.1875rem]">
              Rice, spices, seasonal fruit and NORN canned foods, supplied around
              clear specifications and planned purchasing requirements. Tell us
              what you need, in what format and when, and we will review the supply
              options with you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/enquire/" size="lg">
                Discuss your requirements
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Button>
              <Button href="/products/" variant="secondary" size="lg">
                Explore our range
              </Button>
            </div>
            <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 border-t border-teal-100 pt-8 text-[0.9375rem] text-muted sm:grid-cols-3">
              {[
                `${ACTIVE_PRODUCTS.length} products across ${CATEGORIES.length} categories`,
                "Planned full-load B2B supply",
                "Specification agreed per order",
              ].map((point) => (
                <li key={point} className="flex gap-2.5">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-copper-600"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[6px] border border-teal-100 bg-ivory-dark sm:aspect-[16/11] lg:aspect-[4/3]">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  priority
                  fetchPriority="high"
                  quality={90}
                  sizes={IMAGE_SIZES.hero}
                  className="object-cover"
                />
              </div>

              {/* Floating stat badge */}
              <div className="absolute -bottom-5 left-4 flex items-center gap-4 rounded-[6px] border border-teal-100 bg-white px-5 py-4 shadow-[0_8px_30px_rgba(8,75,80,0.12)] sm:left-6">
                <div className="text-center">
                  <span className="block font-serif text-[1.5rem] leading-none text-teal-800">
                    {ACTIVE_PRODUCTS.length}+
                  </span>
                  <span className="mt-1 block text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted">
                    Products
                  </span>
                </div>
                <span aria-hidden="true" className="h-8 w-px bg-teal-100" />
                <div className="text-center">
                  <span className="block font-serif text-[1.5rem] leading-none text-teal-800">
                    {CATEGORIES.length}
                  </span>
                  <span className="mt-1 block text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted">
                    Ranges
                  </span>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div
                aria-hidden="true"
                className="absolute -top-3 -right-3 hidden h-20 w-20 rounded-[6px] border border-copper-600/50 sm:block"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------- Category grid */}
      <section className="bg-ivory" aria-labelledby="range-heading">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="range-heading"
              eyebrow="What we supply"
              title="Our products"
              description={`${CATEGORIES.length} ranges, one supply conversation. Tell us what you need and we will review the options.`}
            />
            <Link
              href="/products/"
              className="link-underline link-underline-hover inline-flex min-h-11 items-center gap-2 font-semibold text-teal-800"
            >
              See all {ACTIVE_PRODUCTS.length} products
              <ArrowRight aria-hidden="true" className="h-4 w-4 text-copper-600" />
            </Link>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
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
        <Container className="py-16 sm:py-20">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-copper-400">Why work with us</p>
            <h2
              id="pillars-heading"
              className="mt-4 text-[1.875rem] leading-[1.15] sm:text-[2.25rem]"
            >
              Selected with care. Supplied with purpose.
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-[1.7] text-teal-100">
              A practical approach to food supply: well-chosen products, clear
              specifications and orders planned around the customer.
            </p>
          </Reveal>
          <Pillars className="mt-12" onDark />
        </Container>
      </section>

      {/* ---------------------------------------------------------- NORN block */}
      <section className="on-dark bg-white" aria-labelledby="norn-heading">
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
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
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {["Beans", "Pulses", "Vegetables", "Tomatoes"].map((label) => (
                  <li
                    key={label}
                    className="rounded-full border border-teal-200 bg-ivory px-4 py-2 text-sm font-medium text-teal-800 transition-colors hover:border-teal-400"
                  >
                    {label}
                  </li>
                ))}
                <li className="rounded-full border border-copper-600/50 bg-copper-100/50 px-4 py-2 text-sm font-medium text-copper-700">
                  400 ml can format
                </li>
                <li className="rounded-full border border-copper-600/50 bg-copper-100/50 px-4 py-2 text-sm font-medium text-copper-700">
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
                <Button href="/norn/" variant="secondary" size="lg">
                  About the NORN brand
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <ul className="grid grid-cols-2 gap-4">
                {nornHighlights.map((product, index) => (
                  <li
                    key={product.id}
                    className={`overflow-hidden rounded-[6px] border border-teal-100 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(8,75,80,0.08)] ${
                      index === 0 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <Link
                      href={`/products/${product.category}/${product.slug}/`}
                      className="group block"
                    >
                      <div
                        className={`relative w-full overflow-hidden bg-ivory-dark ${
                          index === 0 ? "aspect-[16/7]" : "aspect-[4/3]"
                        }`}
                      >
                        <Image
                          src={product.image.src}
                          alt={product.image.alt}
                          fill
                          loading="lazy"
                          sizes={IMAGE_SIZES.card}
                          className={`transition-transform duration-500 group-hover:scale-[1.04] ${
                            product.image.src.startsWith("/Png/")
                              ? "object-contain p-3 sm:p-4"
                              : "object-cover"
                          }`}
                        />
                      </div>
                      <p className="flex items-center justify-between gap-2 px-4 py-3 text-sm font-medium text-teal-800">
                        {product.name}
                        <ArrowRight
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-copper-600"
                        />
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------- Featured products */}
      <section className="bg-ivory" aria-labelledby="featured-heading">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            id="featured-heading"
            eyebrow="From the catalogue"
            title="Where most enquiries start"
            description="A few of the products buyers ask about most often. The full catalogue, with filtering and search, is on the Our products page."
          />
          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {[...featuredRice, ...featuredSpices].map((product, index) => (
              <li key={product.id} className="h-full">
                <ProductCard product={product} delay={index * 80} />
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button href="/products/" variant="secondary" size="lg">
              Explore the full range
            </Button>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------- Supply process */}
      <SupplyProcess />

      {/* ------------------------------------------------------------- Final CTA */}
      <EnquiryCTA
        showFullLoadNote
        secondaryLabel="How we supply"
        secondaryHref="/how-we-supply/"
      />
    </>
  );
}

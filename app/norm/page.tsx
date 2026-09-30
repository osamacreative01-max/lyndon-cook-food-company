import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Button from "@/components/Button";
import Container from "@/components/Container";
import EnquiryCTA from "@/components/EnquiryCTA";
import JsonLd from "@/components/JsonLd";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { PageHero } from "@/components/Hero";
import { getCategory } from "@/lib/categories";
import { IMAGE_SIZES, IMAGES } from "@/lib/images";
import { enquiryHref } from "@/lib/enquiry";
import { itemListSchema, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { getProductsByCategory, getProductsBySubgroup } from "@/lib/products";

const TITLE = "NORM Canned Foods | The Lyndon Cook Food Company";
const DESCRIPTION =
  "NORM is the canned-food brand from The Lyndon Cook Food Company: fourteen choices in a 400 ml easy-open can format, across beans and pulses, vegetables and tomatoes.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/norm/",
});

const cannedCategory = getCategory("canned-food")!;

const GROUPS = [
  {
    id: "beans-pulses",
    name: "Beans & pulses",
    blurb:
      "Baked beans, black beans, broad beans, chickpeas, pinto beans and both kidney beans.",
  },
  {
    id: "vegetables",
    name: "Vegetables",
    blurb:
      "Green peas, sweetcorn, creamed corn, mixed vegetables and peas & carrots.",
  },
  {
    id: "tomatoes",
    name: "Tomatoes",
    blurb: "Whole peeled tomatoes and San Marzano tomatoes.",
  },
] as const;

export default function NormPage() {
  const allProducts = getProductsByCategory("canned-food");

  return (
    <>
      <JsonLd
        data={itemListSchema(
          "NORM canned foods",
          allProducts.map((product) => ({
            name: product.name,
            href: `/products/${product.category}/${product.slug}/`,
          }))
        )}
      />

      <PageHero
        eyebrow={SITE.brandLine}
        title="Everyday food. Well considered."
        description="Good things. In easy reach."
        image={IMAGES.cannedShelf}
        breadcrumbs={
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[0.8125rem] text-muted">
              <li>
                <Link href="/" className="link-underline link-underline-hover">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-teal-400">
                /
              </li>
              <li>
                <span aria-current="page" className="text-teal-800">
                  NORM
                </span>
              </li>
            </ol>
          </nav>
        }
      />

      {/* ---------------------------------------------------------- Brand intro */}
      <section className="on-dark bg-white" aria-labelledby="norm-intro">
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow">A brand from {SITE.name}</p>
                <h2
                  id="norm-intro"
                  className="mt-4 text-[1.875rem] leading-[1.15] sm:text-[2.25rem]"
                >
                  A small, deliberate range of everyday canned food.
                </h2>
                <div className="mt-6 space-y-4 text-[1.0625rem] leading-[1.7] text-muted">
                  <p>
                    NORM is the canned-food brand of The Lyndon Cook Food Company.
                    The range is deliberately focused: beans and pulses, vegetables
                    and tomatoes, in one consistent can format, so kitchens and
                    buyers can plan around it.
                  </p>
                  <p>
                    Every product comes in a 400 ml easy-open can. 400 ml refers to
                    the can format, not net weight. Final net contents, drained
                    weights and label details are confirmed by product
                    specification.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/products/canned-food/" size="lg">
                    Explore NORM products
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Button>
                  <Button href={enquiryHref()} variant="secondary" size="lg">
                    Discuss your requirements
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={120} className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[4px] border border-teal-100 bg-ivory-dark sm:aspect-[4/3]">
                <Image
                  src={IMAGES.palletCans.src}
                  alt={IMAGES.palletCans.alt}
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

      {/* ------------------------------------------------------------- Highlights */}
      <section className="on-dark bg-teal-800" aria-labelledby="norm-highlights">
        <Container className="py-14 sm:py-16">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-copper-400">At a glance</p>
            <h2
              id="norm-highlights"
              className="mt-4 text-[1.75rem] leading-[1.15] sm:text-[2rem]"
            >
              Fourteen choices, one format.
            </h2>
          </Reveal>
          <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { term: "14", detail: "Choices across the range" },
              { term: "400 ml", detail: "Can format" },
              { term: "Ring-pull", detail: "Easy-open on every can" },
              { term: "3", detail: "Groups: pulses, vegetables, tomatoes" },
            ].map((item) => (
              <Reveal key={item.term} as="div" delay={60}>
                <dt className="font-serif text-[2.25rem] leading-none text-copper-400">
                  {item.term}
                </dt>
                <dd className="mt-3 text-[0.9375rem] leading-relaxed text-teal-100">
                  {item.detail}
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* ------------------------------------------------------------- Product groups */}
      {GROUPS.map((group) => {
        const groupProducts = getProductsBySubgroup("canned-food", group.id);
        return (
          <section
            key={group.id}
            className="bg-ivory"
            aria-labelledby={`norm-${group.id}`}
          >
            <Container className="py-14 sm:py-16">
              <Reveal className="flex flex-wrap items-end justify-between gap-4">
                <div className="max-w-2xl">
                  <p className="eyebrow">{group.blurb}</p>
                  <h2
                    id={`norm-${group.id}`}
                    className="mt-3 text-[1.625rem] leading-snug sm:text-[1.875rem]"
                  >
                    {group.name}
                  </h2>
                </div>
                <p className="text-sm text-muted">
                  {groupProducts.length}{" "}
                  {groupProducts.length === 1 ? "product" : "products"}
                </p>
              </Reveal>
              <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {groupProducts.map((product, index) => (
                  <li key={product.id} className="h-full">
                    <ProductCard product={product} compact delay={index * 60} />
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        );
      })}

      {/* ------------------------------------------------------- NORM Rice 1lb */}
      <section className="bg-ivory" aria-labelledby="norm-rice-heading">
        <Container className="py-14 sm:py-16">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="eyebrow">NORM Rice in 1 lb packs</p>
              <h2
                id="norm-rice-heading"
                className="mt-3 text-[1.625rem] leading-snug sm:text-[1.875rem]"
              >
                NORM Rice 1lb
              </h2>
            </div>
            <p className="text-sm text-muted">
              {getProductsByCategory("norm-rice-1lb").length} products
            </p>
          </Reveal>
          <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {getProductsByCategory("norm-rice-1lb").map((product, index) => (
              <li key={product.id} className="h-full">
                <ProductCard product={product} compact delay={index * 60} />
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              href="/products/norm-rice-1lb/"
              className="link-underline link-underline-hover inline-flex min-h-11 items-center gap-2 font-semibold text-teal-800"
            >
              View all NORM Rice
              <ArrowRight aria-hidden="true" className="h-4 w-4 text-copper-600" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------- Pasta */}
      <section className="bg-ivory" aria-labelledby="norm-pasta-heading">
        <Container className="py-14 sm:py-16">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="eyebrow">NORM Pasta range</p>
              <h2
                id="norm-pasta-heading"
                className="mt-3 text-[1.625rem] leading-snug sm:text-[1.875rem]"
              >
                Pasta
              </h2>
            </div>
            <p className="text-sm text-muted">
              {getProductsByCategory("pasta").length} products
            </p>
          </Reveal>
          <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {getProductsByCategory("pasta").map((product, index) => (
              <li key={product.id} className="h-full">
                <ProductCard product={product} compact delay={index * 60} />
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              href="/products/pasta/"
              className="link-underline link-underline-hover inline-flex min-h-11 items-center gap-2 font-semibold text-teal-800"
            >
              View all pasta
              <ArrowRight aria-hidden="true" className="h-4 w-4 text-copper-600" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------- Packaging note */}
      <section className="on-dark border-t border-teal-100 bg-white">
        <Container className="py-12 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <h2 className="text-[1.375rem] leading-snug sm:text-[1.5rem]">
                How to read the NORM range
              </h2>
              <ul className="mt-5 space-y-3 text-[0.9375rem] leading-relaxed text-muted">
                <li>
                  <strong className="font-semibold text-teal-800">
                    400 ml is the can format.
                  </strong>{" "}
                  It is not a net weight and not a drained weight.
                </li>
                <li>
                  <strong className="font-semibold text-teal-800">
                    Specifications are per product.
                  </strong>{" "}
                  Final net contents, drained weights, ingredients, allergens,
                  storage and label details are confirmed by product specification.
                </li>
                <li>
                  <strong className="font-semibold text-teal-800">
                    Packaging shown is illustrative.
                  </strong>{" "}
                  Final artwork and label details are agreed per order.
                </li>
              </ul>
            </div>
            <div className="lg:col-span-6">
              <h2 className="text-[1.375rem] leading-snug sm:text-[1.5rem]">
                Italian sourcing
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
                NORM San Marzano Tomatoes are a product of Italy, presented in a
                400 ml easy-open can with British English and Italian pack wording
                and a small Italian tricolour. That origin and packaging language
                applies to San Marzano only, and is not a claim about the rest of
                the range.
              </p>
              <div className="mt-6">
                <Link
                  href="/products/canned-food/san-marzano-tomatoes/"
                  className="link-underline link-underline-hover inline-flex min-h-11 items-center gap-2 font-semibold text-teal-800"
                >
                  View San Marzano Tomatoes
                  <ArrowRight aria-hidden="true" className="h-4 w-4 text-copper-600" />
                </Link>
              </div>
            </div>
          </div>
          <p className="mt-8 text-[0.875rem] text-muted">
            {cannedCategory.summary}{" "}
            <Link
              href="/products/canned-food/"
              className="link-underline link-underline-hover font-medium text-teal-800"
            >
              View the full NORM range
            </Link>
            .
          </p>
        </Container>
      </section>

      <EnquiryCTA
        heading="Tell us what you need from NORM."
        copy="Share the products, volumes, destination and delivery schedule you have in mind, and we will review the supply options with you."
        secondaryLabel="Explore NORM products"
        secondaryHref="/products/canned-food/"
      />
    </>
  );
}

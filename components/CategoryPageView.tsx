import Link from "next/link";
import { ArrowRight, Download, Info } from "lucide-react";

import Container from "@/components/Container";
import EnquiryCTA from "@/components/EnquiryCTA";
import JsonLd from "@/components/JsonLd";
import ProductCard from "@/components/ProductCard";
import { PageHero } from "@/components/Hero";
import type { Category } from "@/lib/categories";
import { itemListSchema } from "@/lib/seo";
import { getProductsByCategory } from "@/lib/products";
import { CATEGORY_BANNERS, WEBSITE_BANNERS } from "@/lib/images";
import { enquiryHref } from "@/lib/enquiry";

const CANNED_PACKAGING_NOTE =
  "400 ml refers to the can format. Final net contents, drained weights and label details are confirmed by product specification.";

/**
 * Shared category page body, used by every /products/<category>/ route so the
 * rice, spices, seasonal-fruit and canned-food pages cannot drift apart.
 */
export default function CategoryPageView({ category }: { category: Category }) {
  const products = getProductsByCategory(category.id);
  const isCanned = category.id === "canned-food";

  return (
    <>
      <JsonLd
        data={itemListSchema(
          category.name,
          products.map((product) => ({
            name: product.name,
            href: `/products/${product.category}/${product.slug}/`,
          }))
        )}
      />

      <PageHero
        eyebrow={isCanned ? "Product brand" : "Category"}
        title={category.name}
        description={category.description}
        banners={CATEGORY_BANNERS[category.id] ?? WEBSITE_BANNERS}
      />

      {isCanned ? (
        <section className="on-dark bg-teal-800">
          <Container className="py-10">
            <dl className="grid gap-6 sm:grid-cols-3">
              {[
                { label: "Choices", value: "14" },
                { label: "Can format", value: "400 ml" },
                { label: "Opening", value: "Easy-open ring-pull" },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-copper-400">
                    {item.label}
                  </dt>
                  <dd className="mt-2 font-serif text-2xl text-ivory">{item.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 max-w-3xl text-[0.875rem] leading-relaxed text-ivory/75">
              {CANNED_PACKAGING_NOTE}
            </p>
          </Container>
        </section>
      ) : null}

      {category.pdf ? (
        <section className="on-dark bg-teal-800">
          <Container className="py-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow text-copper-400">Product datasheet</p>
                <h2 className="mt-3 text-[1.75rem] leading-[1.15] text-ivory sm:text-[2.125rem]">
                  Download the full specification
                </h2>
                <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ivory/75">
                  Get the complete product datasheet with specifications, pack
                  formats and other details.
                </p>
              </div>
              <a
                href={category.pdf.href}
                download
                className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-[3px] bg-copper-600 px-6 py-3 text-[0.9375rem] font-semibold text-ivory transition-colors hover:bg-copper-700"
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                Download PDF
              </a>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="bg-ivory" aria-label={`${category.shortName} products`}>
        <Container className="py-14 sm:py-16 lg:py-20">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {products.map((product, index) => (
              <li key={product.id} className="h-full">
                <ProductCard product={product} delay={index * 70} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="on-dark border-t border-sand bg-ivory">
        <Container className="py-12 sm:py-14">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <Info
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-copper-600"
              />
              <div className="max-w-2xl">
                <h2 className="text-[1.25rem] leading-snug">
                  Specifications are agreed per order
                </h2>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                  Photography on this site is illustrative. Final artwork, packing
                  format and product specification are agreed per order, and lead
                  times are confirmed for each programme.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href={enquiryHref(products[0]?.slug)}
                className="inline-flex min-h-11 items-center gap-2 rounded-[3px] bg-teal-800 px-5 py-2.5 text-[0.9375rem] font-semibold text-ivory"
              >
                Discuss a product
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="/products/"
                className="inline-flex min-h-11 items-center rounded-[3px] border border-teal-800 px-5 py-2.5 text-[0.9375rem] font-semibold text-teal-800"
              >
                Back to the full range
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <EnquiryCTA
        heading={`Tell us what you need from ${category.shortName.toLowerCase()}.`}
        copy="Share the products, specification, quantity, pack format and delivery schedule you have in mind, and we will review the supply options with you."
        secondaryLabel="Explore all products"
        secondaryHref="/products/"
      />
    </>
  );
}

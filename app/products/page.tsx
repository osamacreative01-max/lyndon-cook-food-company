import type { Metadata } from "next";
import Image from "next/image";

import Container from "@/components/Container";
import JsonLd from "@/components/JsonLd";
import ProductFilters from "@/components/ProductFilters";
import { PageHero } from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { CATEGORIES } from "@/lib/categories";
import { CATEGORY_IMAGES, PRODUCT_PAGE_BANNERS } from "@/lib/images";
import { itemListSchema, pageMetadata } from "@/lib/seo";
import { ACTIVE_PRODUCTS } from "@/lib/products";

const TITLE =   "Rice, Spices, Fruit & Canned Food | The Lyndon Cook";
const DESCRIPTION =
  "Browse the full catalogue from The Lyndon Cook: rice, spices and seasonings, seasonal fruit, canned foods and pasta. Filter by category or search the catalogue, then send an enquiry.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/products/",
});

const subgroupMap = Object.fromEntries(
  CATEGORIES.map((category) => [
    category.id,
    category.groups.map((group) => ({ id: group.id, name: group.name })),
  ])
) as Record<string, { id: string; name: string }[]>;

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={itemListSchema(
          "The Lyndon Cook catalogue",
          ACTIVE_PRODUCTS.map((product) => ({
            name: product.name,
            href: `/products/${product.category}/${product.slug}/`,
          }))
        )}
      />

      <PageHero
        eyebrow="Our Products"
        title="Rice, spices, seasonal fruit and canned foods."
        description="Everything we currently supply, in one place. Use the filters to narrow the catalogue by category, or search by product name. Specifications and pack formats are agreed per order, so tell us what you need and we will review the supply options."
        banners={PRODUCT_PAGE_BANNERS}
      />

      <section className="bg-ivory">
        <Container className="py-14 sm:py-16 lg:py-20">
          <ProductFilters
            products={ACTIVE_PRODUCTS}
            categories={CATEGORIES.map((category) => ({
              id: category.id,
              name: category.shortName,
            }))}
            subgroups={subgroupMap}
            showRangeFilter={false}
          />
        </Container>
      </section>

      <section className="border-t border-sand bg-ivory">
        <Container className="py-14 sm:py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper-700">
              Quick links
            </p>
            <h2 className="mt-2 text-[1.75rem] leading-[1.15] sm:text-[2.125rem]">
              Looking for a specific product?
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              If a product is not listed, or you need a specification we do not
              publish online, send us the details and we will review what can be
              supplied. Photography is illustrative and final packaging is confirmed
              per order.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category) => (
              <Reveal key={category.id}>
                <a
                  href={`/products/${category.slug}/`}
                  className="group flex items-center gap-4 rounded-[6px] border border-sand bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-copper-400 hover:shadow-[0_8px_24px_rgba(8,75,80,0.08)]"
                >
                  <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-[4px] bg-ivory-dark">
                    <Image
                      src={CATEGORY_IMAGES[category.id].src}
                      alt=""
                      aria-hidden="true"
                      fill
                      loading="lazy"
                      sizes="56px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-[1.0625rem] leading-snug text-teal-800">
                      {category.shortName}
                    </span>
                    <span className="block text-sm text-muted">
                      {category.ctaLabel}
                    </span>
                  </span>
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-copper-600 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";

import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/Container";
import EnquiryCTA from "@/components/EnquiryCTA";
import JsonLd from "@/components/JsonLd";
import ProductFilters from "@/components/ProductFilters";
import { PageHero } from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { CATEGORIES } from "@/lib/categories";
import { CATEGORY_IMAGES } from "@/lib/images";
import { itemListSchema, pageMetadata } from "@/lib/seo";
import { ACTIVE_PRODUCTS, CATALOGUE_COUNTS } from "@/lib/products";

const TITLE =   "Rice, Spices, Fruit & Canned Food | The Lyndon Cook Food Company";
const DESCRIPTION =
  "Browse the full The Lyndon Cook Food Company catalogue: rice, spices and seasonings, seasonal fruit and NORM canned foods. Filter by range or search the catalogue, then send an enquiry.";

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
          "The Lyndon Cook Food Company catalogue",
          ACTIVE_PRODUCTS.map((product) => ({
            name: product.name,
            href: `/products/${product.category}/${product.slug}/`,
          }))
        )}
      />

      <PageHero
        eyebrow="Our range"
        title="Rice, spices, seasonal fruit and NORM canned foods."
        description="Everything we currently supply, in one place. Use the filters to narrow the catalogue by range, or search by product name. Specifications and pack formats are agreed per order, so tell us what you need and we will review the supply options."
        breadcrumbs={
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Our range" }]} />
        }
      />

      <section className="bg-ivory" aria-labelledby="catalogue-heading">
        <Container className="py-14 sm:py-16">
          <Reveal className="max-w-2xl">
            <h2 id="catalogue-heading" className="text-[1.625rem] leading-snug">
              The catalogue
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              {CATALOGUE_COUNTS.total} products: {CATALOGUE_COUNTS.rice} rice,{" "}
              {CATALOGUE_COUNTS.spices} spices and seasonings,{" "}
              {CATALOGUE_COUNTS.fruit} seasonal fruit and {CATALOGUE_COUNTS.canned}{" "}
              NORM canned foods.
            </p>
          </Reveal>

          <div className="mt-8">
            <ProductFilters
              products={ACTIVE_PRODUCTS}
              categories={CATEGORIES.map((category) => ({
                id: category.id,
                name: category.shortName,
              }))}
              subgroups={subgroupMap}
            />
          </div>
        </Container>
      </section>

      <section className="on-dark border-t border-teal-100 bg-white">
        <Container className="py-14 sm:py-16">
          <h2 className="text-[1.5rem] leading-snug sm:text-[1.75rem]">
            Looking for a specific product?
          </h2>
          <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
            If a product is not listed, or you need a specification we do not
            publish online, send us the details and we will review what can be
            supplied. Photography is illustrative and final packaging is confirmed
            per order.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((category) => (
              <Reveal key={category.id}>
                <a
                  href={`/products/${category.slug}/`}
                  className="group flex items-center gap-4 rounded-[4px] border border-teal-100 bg-white p-4 transition-colors hover:border-teal-200"
                >
                  <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-[3px] bg-ivory-dark">
                    <Image
                      src={CATEGORY_IMAGES[category.id].src}
                      alt=""
                      aria-hidden="true"
                      fill
                      loading="lazy"
                      sizes="56px"
                      className="object-cover"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-serif text-[1.0625rem] leading-snug text-teal-800">
                      {category.shortName}
                    </span>
                    <span className="block text-sm text-muted">
                      {category.ctaLabel}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <EnquiryCTA
        heading="Tell us what you need."
        copy="Share the products, specification, quantity, pack format and delivery schedule you have in mind, and we will review the supply options with you."
        secondaryLabel="How we supply"
        secondaryHref="/how-we-supply/"
      />
    </>
  );
}

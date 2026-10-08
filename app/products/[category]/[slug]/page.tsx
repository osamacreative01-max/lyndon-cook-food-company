import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Info, PackageCheck } from "lucide-react";

import Button from "@/components/Button";
import Container from "@/components/Container";
import EnquiryCTA from "@/components/EnquiryCTA";
import JsonLd from "@/components/JsonLd";
import ProductFacts from "@/components/ProductFacts";
import ProductHero from "@/components/ProductHero";
import RelatedProducts from "@/components/RelatedProducts";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { enquiryHref } from "@/lib/enquiry";
import { productMetadata, productSchema } from "@/lib/seo";
import {
  ACTIVE_PRODUCTS,
  getProductBySlug,
  getRelatedProducts,
  type Product,
} from "@/lib/products";

type Params = { params: Promise<{ category: string; slug: string }> };

export function generateStaticParams() {
  return ACTIVE_PRODUCTS.map((product) => ({
    category: product.category,
    slug: product.slug,
  }));
}

/**
 * Only the category/slug pairings in the catalogue exist. Anything else — an
 * unknown slug, or a known slug under the wrong category — is a 404 at the
 * routing layer rather than an on-demand render.
 */
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category: categorySlug, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || product.category !== categorySlug) return {};
  return productMetadata(product);
}

function renderProduct(product: Product) {
  const category = getCategory(product.category)!;
  const related = getRelatedProducts(product);
  const isCanned = product.category === "canned-food";

  const badge = isCanned ? (
    <span className="absolute left-4 top-4 rounded-[3px] bg-teal-800 px-3 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ivory">
      Canned Foods
    </span>
  ) : (
    <span className="absolute left-4 top-4 rounded-[3px] bg-white/95 px-3 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-teal-800 shadow-sm">
      {product.subgroupName}
    </span>
  );

  return (
    <>
      <JsonLd data={[productSchema(product)]} />

      <section className="on-dark bg-teal-800">
        <Container className="py-14 sm:py-16 lg:py-20">
          <ProductHero
            image={product.image}
            variants={product.variants}
            badge={badge}
            ariaLabel={`${product.name} categories`}
            title={product.name}
            summary={product.summary}
            description={product.description}
            cta={
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={enquiryHref(product.slug)} variant="onDark" size="lg">
                  Discuss this product
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Button>
                <Button
                  href={`/products/${category.slug}/`}
                  variant="outlineDark"
                  size="lg"
                >
                  All {category.shortName.toLowerCase()}
                </Button>
              </div>
            }
          >
            <p className="eyebrow text-copper-400">
              {category.name} &middot; {product.subgroupName}
            </p>
          </ProductHero>
        </Container>
      </section>

      {/* -------------------------------------------------------- Key facts */}
      <section className="bg-ivory" aria-labelledby="facts-heading">
        <Container className="py-14 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper-700">
                Specification
              </p>
              <h2
                id="facts-heading"
                className="mt-2 text-[1.75rem] leading-[1.15] sm:text-[2.125rem]"
              >
                Key facts
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                Only confirmed details are listed. Anything not shown here is
                agreed with you before supply.
              </p>
              <ProductFacts facts={product.facts} className="mt-6" />
            </div>

            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper-700">
                Applications
              </p>
              <h2 className="mt-2 text-[1.75rem] leading-[1.15] sm:text-[2.125rem]">
                Suggested uses
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {product.uses.map((use) => (
                  <li
                    key={use}
                    className="rounded-full border border-sand-600 bg-white px-4 py-2 text-sm font-medium text-teal-800 transition-colors hover:border-copper-600 hover:bg-ivory"
                  >
                    {use}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-[6px] border border-sand bg-white p-6 shadow-[0_1px_3px_rgba(8,75,80,0.04)]">
                <div className="flex gap-3">
                  <PackageCheck
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-copper-600"
                  />
                  <div>
                    <h3 className="font-serif text-[1.125rem] text-teal-800">
                      Supply
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                      {product.supplyNote}
                    </p>
                  </div>
                </div>
                <div className="mt-5 border-t border-sand pt-5">
                  <Button href={enquiryHref(product.slug)} className="w-full sm:w-auto">
                    Discuss this product
                  </Button>
                </div>
              </div>

              {isCanned ? (
                <p className="mt-6 flex gap-3 text-[0.875rem] leading-relaxed text-muted">
                  <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-copper-600" />
                  400 ml refers to the can format, not net weight. Final net
                  contents, drained weights and label details are confirmed by
                  product specification.
                </p>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <RelatedProducts
        products={related}
        description={`More from ${category.name.toLowerCase()} in the current range.`}
      />

      <EnquiryCTA
        primaryLabel="Discuss your requirements"
        primaryHref={enquiryHref(product.slug)}
        secondaryLabel={`All ${category.shortName.toLowerCase()}`}
        secondaryHref={`/products/${category.slug}/`}
      />
    </>
  );
}

export default async function ProductPage({ params }: Params) {
  const { category: categorySlug, slug } = await params;

  const product = getProductBySlug(slug);
  if (!product) notFound();
  // The category segment must match the record, otherwise 404.
  if (product.category !== categorySlug) notFound();
  if (!CATEGORIES.some((category) => category.slug === categorySlug)) notFound();

  return renderProduct(product);
}

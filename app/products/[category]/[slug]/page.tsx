import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Info, PackageCheck } from "lucide-react";

import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Container from "@/components/Container";
import EnquiryCTA from "@/components/EnquiryCTA";
import JsonLd from "@/components/JsonLd";
import ProductFacts from "@/components/ProductFacts";
import RelatedProducts from "@/components/RelatedProducts";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { IMAGE_SIZES } from "@/lib/images";
import { enquiryHref } from "@/lib/enquiry";
import { productMetadata, productSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";
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
  const isNorm = product.brand === "NORM";

  return (
    <>
      <JsonLd data={[productSchema(product)]} />

      <section className="on-dark border-b border-teal-100 bg-white">
        <Container className="py-8 sm:py-10">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Our range", href: "/products/" },
              { name: category.name, href: `/products/${category.slug}/` },
              { name: product.name },
            ]}
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px] border border-teal-100 bg-ivory-dark">
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  fill
                  priority
                  sizes={IMAGE_SIZES.detail}
                  className="object-cover"
                />
                {isNorm ? (
                  <p className="absolute left-4 top-4 rounded-[2px] bg-teal-800 px-3 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ivory">
                    NORM
                  </p>
                ) : null}
              </div>
              <p className="mt-3 text-[0.8125rem] text-muted">
                Packaging shown is illustrative; final artwork and specifications
                are agreed per order.
              </p>
            </div>

            <div className="lg:col-span-6">
              <p className="eyebrow">
                {category.name} &middot; {product.subgroupName}
              </p>
              <h1 className="mt-4 text-[2rem] leading-[1.1] sm:text-[2.5rem]">
                {product.name}
              </h1>
              <p className="mt-5 text-[1.0625rem] leading-[1.7] text-muted">
                {product.summary}
              </p>
              <p className="mt-4 text-[0.9375rem] leading-[1.7] text-body">
                {product.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={enquiryHref(product.slug)} size="lg">
                  Discuss this product
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Button>
                <Button href={`/products/${category.slug}/`} variant="secondary" size="lg">
                  All {category.shortName.toLowerCase()}
                </Button>
              </div>

              <p className="mt-6 text-sm text-muted">
                {SITE.name} &middot;{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="link-underline link-underline-hover"
                >
                  {SITE.email}
                </a>{" "}
                &middot;{" "}
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="link-underline link-underline-hover"
                >
                  {SITE.phone}
                </a>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------- Key facts */}
      <section className="bg-ivory" aria-labelledby="facts-heading">
        <Container className="py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <h2
                id="facts-heading"
                className="text-[1.5rem] leading-snug sm:text-[1.75rem]"
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
              <h2 className="text-[1.5rem] leading-snug sm:text-[1.75rem]">
                Suggested uses
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {product.uses.map((use) => (
                  <li
                    key={use}
                    className="rounded-[2px] border border-teal-200 bg-white px-3.5 py-1.5 text-sm font-medium text-teal-800"
                  >
                    {use}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-[4px] border border-teal-100 bg-white p-6">
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
                <div className="mt-5 border-t border-teal-100 pt-5">
                  <Button href={enquiryHref(product.slug)} className="w-full sm:w-auto">
                    Discuss this product
                  </Button>
                </div>
              </div>

              {isNorm ? (
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
        heading={`Planning to buy ${product.name.toLowerCase()}?`}
        copy="Tell us the quantity, pack format, destination and delivery schedule you have in mind, and we will review the supply options with you."
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

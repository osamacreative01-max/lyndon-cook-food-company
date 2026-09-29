import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CategoryPageView from "@/components/CategoryPageView";
import { CATEGORIES, isCategorySlug } from "@/lib/categories";
import { categoryMetadata } from "@/lib/seo";

type Params = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.slug }));
}

/**
 * Unknown category segments are a 404 at the routing layer, not an
 * on-demand render that has to decide. Without this, an unknown category is
 * server-rendered on demand and can return a 200 with an empty page.
 */
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category: slug } = await params;
  if (!isCategorySlug(slug)) return {};
  return categoryMetadata(
    CATEGORIES.find((category) => category.slug === slug) as (typeof CATEGORIES)[number]
  );
}

/**
 * Category URLs. The four categories each also have a dedicated static route
 * (`/products/rice/`, `/products/spices/`, `/products/seasonal-fruit/`,
 * `/products/canned-food/`) that renders the same view, so this route is the
 * single source of the category body. With `dynamicParams = false`, any other
 * category segment is a genuine 404.
 */
export default async function CategoryPage({ params }: Params) {
  const { category: slug } = await params;

  const category = CATEGORIES.find((item) => item.slug === slug);
  if (!category) notFound();

  return <CategoryPageView category={category} />;
}

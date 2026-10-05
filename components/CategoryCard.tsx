import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Reveal from "@/components/Reveal";
import { IMAGE_SIZES } from "@/lib/images";
import type { Category } from "@/lib/categories";
import { CATALOGUE_COUNTS, getProductHref } from "@/lib/products";

const COUNT_BY_CATEGORY = {
  rice: CATALOGUE_COUNTS.rice,
  spices: CATALOGUE_COUNTS.spices,
  "seasonal-fruit": CATALOGUE_COUNTS.fruit,
  "canned-food": CATALOGUE_COUNTS.canned,
  "pasta": CATALOGUE_COUNTS.pasta,
} as const;

/** Category tile linking to a real category page. */
export default function CategoryCard({
  category,
  delay = 0,
}: {
  category: Category;
  delay?: number;
}) {
  const count = COUNT_BY_CATEGORY[category.id];
  const isCanned = category.id === "canned-food";

  return (
    <Reveal delay={delay} className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[6px] border border-sand bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-copper-400 hover:shadow-[0_18px_44px_rgba(8,75,80,0.14)]">
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 top-0 z-20 h-[3px] origin-left scale-x-0 bg-copper-600 transition-transform duration-500 group-hover:scale-x-100"
        />
        <Link
          href={`/products/${category.slug}/`}
          className="flex h-full flex-col focus-visible:outline-offset-[-3px]"
          aria-label={`${category.name} — ${category.ctaLabel}`}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-ivory-dark">
            <Image
              src={category.image.src}
              alt={category.image.alt}
              fill
              loading="lazy"
              sizes={IMAGE_SIZES.card}
              quality={85}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-teal-900/40 via-teal-900/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <span
              className={`absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 ${
                isCanned
                  ? "bg-teal-800 text-ivory"
                  : "bg-white/95 text-teal-800"
              }`}
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-copper-600"
              />
              {isCanned
                ? `· ${count} products`
                : `${count} ${count === 1 ? "product" : "products"}`}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <h3 className="font-serif text-[1.375rem] leading-snug text-teal-800 transition-colors group-hover:text-teal-700 sm:text-[1.5rem]">
              {category.name}
            </h3>
            <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">
              {category.summary}
            </p>
            <div className="mt-6 flex items-center justify-between gap-4 border-t border-sand pt-5">
              <span className="text-[0.9375rem] font-semibold text-teal-800">
                {category.ctaLabel}
              </span>
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sand bg-ivory text-teal-800 transition-all duration-300 group-hover:border-teal-800 group-hover:bg-teal-800 group-hover:text-ivory">
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </div>
        </Link>
      </article>
    </Reveal>
  );
}

/** Compact, text-first category link used in dense lists. */
export function CategoryRow({ category }: { category: Category }) {
  return (
    <Link
      href={`/products/${category.slug}/`}
      className="group flex min-h-14 items-center justify-between gap-4 border-b border-sand py-3 text-teal-800 transition-colors hover:text-teal-900"
    >
      <span className="font-serif text-lg">{category.name}</span>
      <span className="flex items-center gap-2 text-sm text-muted">
        {COUNT_BY_CATEGORY[category.id]} products
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 text-copper-600 transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}

/** Link to a single product, used where a full card would be too heavy. */
export function ProductLinkRow({
  name,
  category,
  slug,
  meta,
}: {
  name: string;
  category: string;
  slug: string;
  meta?: string;
}) {
  return (
    <li>
      <Link
        href={getProductHref({ category, slug } as never)}
        className="group flex min-h-14 items-center justify-between gap-4 border-b border-sand py-3"
      >
        <span className="flex min-w-0 flex-col">
          <span className="font-medium text-teal-800 group-hover:text-teal-900">
            {name}
          </span>
          {meta ? <span className="text-sm text-muted">{meta}</span> : null}
        </span>
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-copper-600 transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </li>
  );
}

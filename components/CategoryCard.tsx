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
  "norm-rice-1lb": 0,
  "pasta": 0,
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
  const isNorm = category.id === "canned-food";

  return (
    <Reveal
      delay={delay}
      className="h-full"
    >
      <article className="group flex h-full flex-col overflow-hidden rounded-[4px] border border-teal-100 bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-[0_12px_32px_rgba(8,75,80,0.10)]">
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
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            {isNorm ? (
              <p className="absolute left-3 top-3 rounded-[2px] bg-teal-800 px-2.5 py-1 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ivory">
                NORM
              </p>
            ) : null}
          </div>

          <div className="flex flex-1 flex-col p-6">
            <h3 className="font-serif text-[1.375rem] leading-snug text-teal-800">
              {category.name}
            </h3>
            <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">
              {category.summary}
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-teal-100 pt-4">
              <span className="text-sm text-muted">
                {count} {count === 1 ? "product" : "products"}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-teal-800">
                {category.ctaLabel}
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 text-copper-600 transition-transform duration-300 group-hover:translate-x-1"
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
      className="group flex min-h-14 items-center justify-between gap-4 border-b border-teal-100 py-3 text-teal-800 transition-colors hover:text-teal-900"
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
        className="group flex min-h-14 items-center justify-between gap-4 border-b border-teal-100 py-3"
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

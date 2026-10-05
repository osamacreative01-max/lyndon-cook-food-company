import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Reveal from "@/components/Reveal";
import { IMAGE_SIZES } from "@/lib/images";
import { getProductHref, type Product } from "@/lib/products";

type Props = {
  product: Product;
  /** Hide the summary where the grid is already dense (e.g. filtered results). */
  compact?: boolean;
  priority?: boolean;
  delay?: number;
};

/** Catalogue card. Always links to a real product URL - never a modal. */
export default function ProductCard({
  product,
  compact = false,
  priority = false,
  delay = 0,
}: Props) {
  const isCanned = product.category === "canned-food";
  const isPackShot = product.image.src.startsWith("/Png/");

  return (
    <Reveal delay={delay} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-[6px] border border-sand bg-white transition-all duration-300 hover:-translate-y-1 hover:border-copper-400 hover:shadow-[0_16px_40px_rgba(8,75,80,0.12)]">
        <Link
          href={getProductHref(product)}
          className="flex h-full flex-col focus-visible:outline-offset-[-3px]"
          aria-label={`${product.name} — View details`}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory-dark">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              priority={priority}
              loading={priority ? undefined : "lazy"}
              sizes={IMAGE_SIZES.grid}
              quality={85}
              className={
                isPackShot
                  ? "object-contain p-4 sm:p-5"
                  : "object-cover transition-transform duration-500 group-hover:scale-105"
              }
            />
            {/* Gradient overlay on hover */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-teal-900/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            {/* Category badge */}
            <span
              className={`absolute left-4 top-4 rounded-[3px] px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] ${
                isCanned
                  ? "bg-teal-800 text-ivory"
                  : "bg-white/95 text-teal-800 shadow-sm"
              }`}
            >
              {isCanned ? "Canned Foods" : product.subgroupName}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-6">
            {!isCanned ? (
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-copper-700">
                {product.category.charAt(0).toUpperCase() +
                  product.category.slice(1).replace("-", " ")}
              </p>
            ) : (
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-copper-700">
                {product.subgroupName}
              </p>
            )}

            <h3 className="mt-2 font-serif text-[1.3125rem] leading-snug text-teal-800 transition-colors group-hover:text-teal-700">
              {product.name}
            </h3>

            {!compact ? (
              <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                {product.summary}
              </p>
            ) : (
              <div className="flex-1" />
            )}

            <div className="mt-5 flex items-center justify-between border-t border-sand pt-5">
              <span className="inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-teal-800">
                View details
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 text-copper-600 transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </span>
            </div>
          </div>
        </Link>
      </article>
    </Reveal>
  );
}

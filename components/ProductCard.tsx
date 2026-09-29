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
  const isNorm = product.brand === "NORM";

  return (
    <Reveal delay={delay} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-[4px] border border-teal-100 bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-[0_12px_30px_rgba(8,75,80,0.10)]">
        <Link
          href={getProductHref(product)}
          className="flex h-full flex-col focus-visible:outline-offset-[-3px]"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-ivory-dark">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              priority={priority}
              loading={priority ? undefined : "lazy"}
              sizes={IMAGE_SIZES.grid}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            {isNorm ? (
              <p className="absolute left-3 top-3 rounded-[2px] bg-teal-800 px-2.5 py-1 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ivory">
                NORM
              </p>
            ) : null}
          </div>

          <div className="flex flex-1 flex-col p-5">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-copper-700">
              {product.subgroupName}
            </p>
            <h3 className="mt-2 font-serif text-[1.1875rem] leading-snug text-teal-800">
              {product.name}
            </h3>
            {!compact ? (
              <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                {product.summary}
              </p>
            ) : null}
            <div className="mt-5 flex items-center gap-1.5 border-t border-teal-100 pt-4 text-[0.9375rem] font-semibold text-teal-800">
              View details
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 text-copper-600 transition-transform duration-300 group-hover:translate-x-1"
              />
              <span className="sr-only-focusable absolute">— {product.name}</span>
            </div>
          </div>
        </Link>
      </article>
    </Reveal>
  );
}

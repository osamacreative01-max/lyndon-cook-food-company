"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

import { IMAGE_SIZES } from "@/lib/images";

type Variant = {
  label: string;
  image: { src: string; alt: string };
  name?: string;
  summary?: string;
  description?: string;
};

/**
 * Product opening spread: photograph on the left, the detail copy on the
 * right, and — when the product has sub-categories — a pill row beneath the
 * copy that swaps the photograph and the title, summary and description in
 * place.
 */
export default function ProductHero({
  image,
  variants,
  badge,
  ariaLabel = "Product categories",
  title,
  summary,
  description,
  children,
  cta,
}: {
  image: { src: string; alt: string };
  variants?: Variant[];
  badge?: ReactNode;
  ariaLabel?: string;
  /** Product-level headline, summary and detail copy. */
  title: string;
  summary: string;
  description: string;
  /** Right-hand column copy (the eyebrow); the category pills render under it. */
  children: ReactNode;
  /** Buttons rendered beneath the category pills. */
  cta?: ReactNode;
}) {
  // Opens on the variant that matches the card photograph.
  const [active, setActive] = useState(() => {
    if (!variants?.length) return 0;
    const match = variants.findIndex((variant) => variant.image.src === image.src);
    return match >= 0 ? match : 0;
  });
  const current = variants?.length ? variants[active].image : image;
  const activeVariant = variants?.length ? variants[active] : undefined;
  const isPack =
    current.src.startsWith("/Png/") && !/\.jpe?g$/i.test(current.src);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Product image */}
      <div className="lg:col-span-6">
        <div className="relative w-full overflow-hidden rounded-[6px] border border-white/10 bg-teal-900 aspect-[4/3]">
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            priority
            sizes={IMAGE_SIZES.detail}
            quality={90}
            className={isPack ? "object-contain" : "object-cover"}
          />
          {badge}
        </div>
      </div>

      {/* Product info */}
      <div className="lg:col-span-6">
        {children}

        <h1 className="mt-4 text-[2.125rem] leading-[1.08] sm:text-[2.75rem] lg:text-[3.25rem]">
          {activeVariant?.name ?? title}
        </h1>
        <p className="mt-5 text-[1.0625rem] leading-[1.7] text-ivory/80">
          {activeVariant?.summary ?? summary}
        </p>
        <p className="mt-4 text-[0.9375rem] leading-[1.7] text-ivory/75">
          {activeVariant?.description ?? description}
        </p>

        {variants?.length ? (
          <div
            className="mt-7 flex flex-wrap gap-2.5"
            role="group"
            aria-label={ariaLabel}
          >
            {variants.map((variant, index) => {
              const selected = index === active;
              return (
                <button
                  key={variant.label}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActive(index)}
                  className={`inline-flex min-h-11 items-center rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                    selected
                      ? "border-ivory bg-ivory text-teal-800"
                      : "border-white/40 bg-white/5 text-ivory hover:border-copper-400 hover:bg-white/10"
                  }`}
                >
                  {variant.label}
                </button>
              );
            })}
          </div>
        ) : null}

        {cta}
      </div>
    </div>
  );
}

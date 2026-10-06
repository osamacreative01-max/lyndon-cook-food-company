"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type Slide = { src: string; alt: string };

/** Pack shots sit on the tile; grain photographs fill it. */
const fitFor = (src: string) =>
  src.toLowerCase().endsWith(".png")
    ? "object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04] sm:p-4"
    : "object-cover transition-transform duration-500 group-hover:scale-105";

const buttonClass =
  "flex h-9 w-9 items-center justify-center rounded-full border border-teal-800/10 bg-white/90 text-teal-800 shadow-sm transition-colors duration-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800";

/**
 * Cross-fading image slider used inside the catalogue card tile.
 *
 * The card itself is a stretched link, so these controls render above it
 * (z-20) as real buttons rather than nesting interactive elements inside the
 * anchor. Autoplay is skipped when the visitor prefers reduced motion, which
 * leaves the leading frame on screen.
 */
export default function ProductImageSlider({
  slides,
  sizes,
  priority = false,
  interval = 4000,
}: {
  slides: Slide[];
  sizes: string;
  priority?: boolean;
  interval?: number;
}) {
  const count = slides.length;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((current) => (current + 1) % count),
      interval,
    );
    return () => window.clearInterval(id);
    /* Restarting on `active` gives a full interval after a manual change. */
  }, [count, interval, active]);

  const step = (delta: number) =>
    setActive((current) => (current + delta + count) % count);

  return (
    <div className="absolute inset-0">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          aria-hidden={index !== active}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes={sizes}
            priority={priority && index === 0}
            loading={priority && index === 0 ? undefined : "lazy"}
            quality={85}
            className={fitFor(slide.src)}
          />
        </div>
      ))}

      {count > 1 ? (
        <>
          <div className="absolute inset-y-0 left-0 z-20 flex w-10 items-center justify-center sm:w-11">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className={buttonClass}
            >
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>

          <div className="absolute inset-y-0 right-0 z-20 flex w-10 items-center justify-center sm:w-11">
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className={buttonClass}
            >
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-2.5 z-20 flex items-center justify-center gap-1.5">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show image ${index + 1}`}
                aria-current={index === active ? "true" : undefined}
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 ${
                  index === active
                    ? "bg-teal-800"
                    : "bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

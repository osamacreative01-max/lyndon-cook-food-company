"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type HeroSlide = { src: string; alt: string };

type Props = {
  slides: HeroSlide[];
  /** Milliseconds between automatic advances. */
  interval?: number;
  /** Positioned by the caller (e.g. `absolute inset-0`); the photographs are
   *  laid out against the nearest positioned ancestor. */
  className?: string;
  /** `object-position` utilities. Defaults suit the panoramic website banners;
   *  the homepage passes a left-biased position for its 1920x800 pair. */
  position?: string;
};

/**
 * Homepage hero background slider — advances on its own.
 *
 * Owns two things: the cross-fading photographs and the scrim that keeps the
 * overlaid headline legible. Everything is layered inside the caller's
 * positioned box so the hero's height stays driven by the copy — the
 * photographs are `object-cover`, never a fixed aspect ratio, so a short or
 * tall viewport never squeezes the headline.
 *
 * No visible controls and no progress bar: the slider simply runs, and
 * autoplay is skipped entirely when the visitor prefers reduced motion.
 */
export default function HeroSlider({
  slides,
  interval = 3000,
  className = "",
  position = "object-[70%_center] sm:object-center",
}: Props) {
  const count = slides.length;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (count < 2) return;
    // Respect the visitor's reduced-motion preference.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((current) => (current + 1) % count),
      interval,
    );
    return () => window.clearInterval(id);
  }, [count, interval]);

  if (count === 0) return null;

  return (
    <div
      className={`pointer-events-none overflow-hidden ${className}`}
      aria-roledescription="carousel"
      aria-label="The Lyndon Cook product range"
    >
      {slides.map((slide, index) => {
        const isActive = index === active;
        return (
          <div
            key={slide.src}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-[500ms] ease-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={isActive ? slide.alt : ""}
              fill
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              loading={index === 0 ? undefined : "lazy"}
              sizes="100vw"
              quality={85}
              className={`object-cover ${position}`}
            />
          </div>
        );
      })}

      {/* Scrims: horizontal keeps the left-hand copy readable, vertical lifts
          the bottom edge off the photograph, and the flat wash carries small
          screens where the panoramic crop puts products behind the copy. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-teal-950/95 via-teal-950/75 to-teal-950/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-teal-950/45 sm:bg-teal-950/30 lg:bg-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-teal-950/85 to-transparent"
      />
    </div>
  );
}

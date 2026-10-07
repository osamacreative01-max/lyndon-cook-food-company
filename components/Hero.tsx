import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import Button from "@/components/Button";
import Container from "@/components/Container";
import HeroSlider, { type HeroSlide } from "@/components/HeroSlider";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  primary: { label: string; href: string; className?: string };
  secondary?: { label: string; href: string };
  /** Background banners shown behind the copy as an auto-advancing slider. */
  slides?: HeroSlide[];
  /** Supporting facts rendered as a deep teal band beneath the hero. */
  points?: string[];
};

/**
 * Homepage opening spread.
 *
 * The two homepage banners run edge to edge as a cross-fading slider with the
 * headline, description and calls to action overlaid on the empty left-hand
 * third of the photograph. The copy sets the height of the section and the
 * images are `object-cover`, so the packaging is never letterboxed and the
 * headline never lands on the bright product side of the frame.
 *
 * The slider (images and scrim) sits on `z-0`; this copy sits above it with
 * `pointer-events-none`, re-enabled only on the buttons, so the calls to
 * action stay clickable.
 */
export default function Hero({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  slides,
  points,
}: Props) {
  return (
    <section className="relative isolate flex min-h-[32rem] items-center overflow-hidden bg-teal-900 sm:min-h-[44rem]">
      {slides?.length ? (
        <HeroSlider
          slides={slides}
          position="object-right sm:object-[10%_center]"
          className="absolute inset-0 z-0"
        />
      ) : null}

      <div className="pointer-events-none relative z-10 w-full">
        <Container className="py-14 sm:py-16 lg:py-20">
          <div className="max-w-[36rem]">
            <p className="eyebrow text-copper-400">{eyebrow}</p>
            <span className="rule-copper mt-4" aria-hidden="true" />
            <h1 className="display-headline mt-6 text-ivory">{title}</h1>

            <p className="mt-7 text-[1.0625rem] leading-[1.75] text-ivory/85 sm:text-[1.125rem]">
              {description}
            </p>

            <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
              <Button
                href={primary.href}
                size="lg"
                variant="onDark"
                className={primary.className}
              >
                {primary.label}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Button>
              {secondary ? (
                <Button href={secondary.href} size="lg" variant="quiet">
                  {secondary.label}
                </Button>
              ) : null}
            </div>

            {points?.length ? (
              <ul className="pointer-events-auto mt-9 grid gap-x-8 gap-y-3 border-t border-ivory/25 pt-6 text-[0.9375rem] text-ivory/80 sm:grid-cols-2">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper-400"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Container>
      </div>
    </section>
  );
}

/** Deep teal band that closes a hero with a row of supporting facts. */
export function HeroStrip({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <section className="on-dark bg-teal-800">
      <Container className="py-7 sm:py-8">
        <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-14">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3.5 text-[1.0625rem] font-semibold leading-snug text-ivory sm:text-[1.125rem]"
            >
              <span
                aria-hidden="true"
                className="mt-2 h-2 w-2 shrink-0 bg-copper-600"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/**
 * Compact hero for secondary pages.
 *
 * The four website banners run behind the copy as the same auto-advancing
 * slider the homepage uses, so every inner page opens on the range
 * photography instead of a flat teal panel. The banners are panoramic with an
 * empty left third, so the headline, description and breadcrumbs always land
 * on clear ground while the products stay on the right of the frame.
 *
 * The slider keeps `on-dark` legibility rules intact: it sits on `z-0` and is
 * `pointer-events-none`, the copy sits above it on `z-10`.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  banners,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: ReactNode;
  /** Background banners shown behind the copy as an auto-advancing slider. */
  banners?: { src: string; alt: string }[];
  /** Kept for callers; the panel is always deep teal. */
  onDark?: boolean;
}) {
  return (
    <section className="on-dark relative isolate flex min-h-[34rem] items-center overflow-hidden bg-teal-900 sm:min-h-[30rem]">
      {banners?.length ? (
        <HeroSlider slides={banners} className="absolute inset-0 z-0" />
      ) : null}

      <Container className="relative z-10 py-14 sm:py-16 lg:py-[4.5rem]">
        <div className="max-w-[36rem]">
          {breadcrumbs ? <div className="mb-7">{breadcrumbs}</div> : null}
          <p className="eyebrow text-copper-400">{eyebrow}</p>
          <span className="rule-copper mt-4" aria-hidden="true" />
          <h1 className="display-headline mt-6 text-ivory">{title}</h1>
          {description ? (
            <p className="mt-6 text-[1.0625rem] leading-[1.75] text-ivory/85 sm:text-[1.125rem]">
              {description}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

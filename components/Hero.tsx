import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Button from "@/components/Button";
import Container from "@/components/Container";
import { IMAGE_SIZES, IMAGES } from "@/lib/images";
import { SITE } from "@/lib/site";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  image?: { src: string; alt: string };
  imageSide?: "right" | "left";
  /** Supporting facts rendered as a short list beneath the buttons. */
  points?: string[];
};

/**
 * Editorial page hero. The image is preloaded (`priority`) because it is the
 * largest contentful paint element, and is never lazy-loaded.
 */
export default function Hero({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  image = IMAGES.palletCans,
  imageSide = "right",
  points,
}: Props) {
  const textFirst = imageSide === "left";

  const copy = (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <span className="rule-copper mt-3" aria-hidden="true" />
      <h1 className="mt-5 text-[2.125rem] leading-[1.1] sm:text-[2.75rem] lg:text-[3.5rem]">
        {title}
      </h1>
      <p className="mt-6 text-[1.0625rem] leading-[1.7] text-muted sm:text-[1.1875rem]">
        {description}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href={primary.href} size="lg">
          {primary.label}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Button>
        {secondary ? (
          <Button href={secondary.href} variant="secondary" size="lg">
            {secondary.label}
          </Button>
        ) : null}
      </div>
      {points?.length ? (
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] text-muted">
          {points.map((point) => (
            <li key={point} className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-copper-600" />
              {point}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );

  const picture = (
    <div className="relative">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[4px] border border-teal-100 bg-ivory-dark sm:aspect-[16/11] lg:aspect-[4/5]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          fetchPriority="high"
          quality={90}
          sizes={IMAGE_SIZES.hero}
          className="object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute -bottom-4 -left-4 hidden h-24 w-24 rounded-[4px] border border-copper-600/60 sm:block"
      />
    </div>
  );

  return (
    <section className="on-dark bg-white">
      <Container className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:gap-14 lg:py-24">
        <div className={`lg:col-span-6 ${textFirst ? "lg:order-1" : "lg:order-2"}`}>
          {copy}
        </div>
        <div className={`lg:col-span-6 ${textFirst ? "lg:order-2" : "lg:order-1"}`}>
          {picture}
        </div>
      </Container>
    </section>
  );
}

/** Compact hero for secondary pages, with an optional breadcrumb trail. */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  image,
  onDark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumbs?: React.ReactNode;
  image?: { src: string; alt: string };
  onDark?: boolean;
}) {
  return (
    <section
      className={`on-dark ${onDark ? "bg-teal-800" : "border-b border-teal-100 bg-white"}`}
    >
      <Container className="py-12 sm:py-16">
        {breadcrumbs ? <div className="mb-8">{breadcrumbs}</div> : null}
        <div
          className={
            image
              ? "grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
              : "max-w-3xl"
          }
        >
          <div className={image ? "lg:col-span-7" : ""}>
            <p className={`eyebrow ${onDark ? "text-copper-400" : ""}`}>{eyebrow}</p>
            <span className="rule-copper mt-3" aria-hidden="true" />
            <h1 className="mt-5 text-[2rem] leading-[1.12] sm:text-[2.5rem] lg:text-[3rem]">
              {title}
            </h1>
            {description ? (
              <p
                className={`mt-5 max-w-2xl text-[1.0625rem] leading-[1.7] sm:text-[1.125rem] ${
                  onDark ? "text-teal-100" : "text-muted"
                }`}
              >
                {description}
              </p>
            ) : null}
            {onDark ? null : (
              <p className="mt-6 text-sm text-muted">
                <Link
                  href="/enquire/"
                  className="link-underline link-underline-hover font-medium text-teal-800"
                >
                  Discuss your requirements
                </Link>{" "}
                or email{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="link-underline link-underline-hover"
                >
                  {SITE.email}
                </a>
                .
              </p>
            )}
          </div>
          {image ? (
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px] border border-teal-100">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  quality={90}
                  sizes={IMAGE_SIZES.band}
                  className="object-cover"
                />
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

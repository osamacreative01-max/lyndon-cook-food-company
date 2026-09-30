import Image from "next/image";
import Link from "next/link";

import { SITE } from "@/lib/site";

type Props = {
  /** Renders the inverted (light) lockup for dark panels. */
  onDark?: boolean;
  /** Overrides the intrinsic ratio when a tighter lockup is needed. */
  width?: number;
  className?: string;
  priority?: boolean;
};

/**
 * Company lockup.
 *
 * Light backgrounds use the JPEG. Dark backgrounds use the SVG (which has a
 * transparent background) with a CSS filter that renders it pure white.
 */
export default function Logo({ onDark, width, className = "", priority }: Props) {
  const renderedWidth = width ?? 200;

  // The SVG has its own viewBox ratio (232:96); the JPEG uses SITE.logo dimensions.
  const isSvg = Boolean(onDark);
  const ratio = isSvg
    ? 96 / 232
    : SITE.logo.height / SITE.logo.width;
  const height = Math.round(renderedWidth * ratio);

  const src = isSvg ? "/logo/lyndon-cook.svg" : SITE.logo.src;

  return (
    <Link
      href="/"
      className="inline-flex items-center rounded-[2px] focus-visible:outline-3"
      aria-label={`${SITE.name} — home`}
    >
      <Image
        src={src}
        alt={SITE.logo.alt}
        width={renderedWidth}
        height={height}
        priority={priority}
        className={`h-auto select-none ${className}`}
        style={{
          width: renderedWidth,
          ...(isSvg ? { filter: "brightness(0) invert(1)" } : {}),
        }}
      />
    </Link>
  );
}

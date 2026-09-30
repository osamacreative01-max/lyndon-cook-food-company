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
 * Uses the JPEG for light backgrounds, and the transparent SVG for dark backgrounds
 * so it can be coloured via CSS without a rectangular backdrop.
 */
export default function Logo({ onDark, width, className = "", priority }: Props) {
  const renderedWidth = width ?? 200;
  const height = Math.round((renderedWidth / SITE.logo.width) * SITE.logo.height);

  const src = onDark ? "/logo/lyndon-cook.svg" : SITE.logo.src;
  const alt = SITE.logo.alt;

  return (
    <Link
      href="/"
      className="inline-flex items-center rounded-[2px] focus-visible:outline-3"
      aria-label={`${SITE.name} — home`}
    >
      <Image
        src={src}
        alt={alt}
        width={renderedWidth}
        height={height}
        priority={priority}
        className={`h-auto select-none ${onDark ? "text-ivory" : ""} ${className}`}
        style={{ width: renderedWidth, ...(onDark ? { filter: "brightness(0) invert(1)" } : {}) }}
      />
    </Link>
  );
}

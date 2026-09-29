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
 * The component is a thin wrapper around the asset at `SITE.logo.src`, so the
 * approved logo can be dropped in by replacing that single file — no component
 * changes required. The current file is a clearly-marked placeholder
 * reproducing the approved composition (teal emblem, serif wordmark, copper
 * rule, "FOOD COMPANY" line).
 */
export default function Logo({ onDark, width, className = "", priority }: Props) {
  const renderedWidth = width ?? 168;
  const height = Math.round((renderedWidth / SITE.logo.width) * SITE.logo.height);

  return (
    <Link
      href="/"
      className="inline-flex items-center rounded-[2px] focus-visible:outline-3"
      aria-label={`${SITE.name} — home`}
    >
      <Image
        src={SITE.logo.src}
        alt={SITE.logo.alt}
        width={renderedWidth}
        height={height}
        priority={priority}
        className={`h-auto w-auto select-none ${className}`}
        style={{ filter: onDark ? "brightness(0) invert(1)" : undefined }}
      />
    </Link>
  );
}

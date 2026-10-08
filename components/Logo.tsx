import Image from "next/image";
import Link from "next/link";

import { SITE } from "@/lib/site";

type Props = {
  /** Renders the cream-on-teal variant of the lockup for dark panels. */
  onDark?: boolean;
  /** Overrides the intrinsic width when a tighter lockup is needed. */
  width?: number;
  className?: string;
  priority?: boolean;
  /** Lets the lockup shrink to its column instead of overflowing it. */
  fluid?: boolean;
};

/**
 * Company lockup — the approved artwork (`Asset 1@4x`) used site-wide.
 *
 * The artwork is exported twice from the same source so the mark is identical
 * everywhere: `SITE.logo.src` carries the teal wordmark for cream surfaces and
 * `SITE.logo.onDarkSrc` carries the cream wordmark for teal panels. Both are
 * transparent PNGs, so no blend mode and no CSS filter — flattening the lockup
 * with `brightness(0) invert(1)` collapses the emblem into a solid disc.
 *
 * The lockup is deliberately prominent: it scales down on narrow viewports via
 * `max-width` so it never crowds the header out of a phone screen.
 */
export default function Logo({
  onDark,
  width,
  className = "",
  priority,
  fluid,
}: Props) {
  const renderedWidth = width ?? 280;
  const ratio = SITE.logo.height / SITE.logo.width;
  const height = Math.round(renderedWidth * ratio);
  /* A caller that passes its own max-w (e.g. the footer lockup) replaces the
     viewport default instead of racing it — two competing max-w utilities have
     no guaranteed winner. */
  const hasMaxWidth = className.includes("max-w");

  return (
    <Link
      href="/"
      className="inline-flex items-center rounded-[2px] focus-visible:outline-3"
      aria-label={`${SITE.name} — home`}
    >
      <Image
        src={onDark ? SITE.logo.onDarkSrc : SITE.logo.src}
        alt={SITE.logo.alt}
        width={renderedWidth}
        height={height}
        priority={priority}
        className={`h-auto ${hasMaxWidth ? "select-none" : "max-w-[58vw] select-none sm:max-w-none lg:max-w-[11rem] xl:max-w-none"} ${className}`}
        style={fluid ? { width: renderedWidth, maxWidth: "100%" } : { width: renderedWidth }}
      />
    </Link>
  );
}

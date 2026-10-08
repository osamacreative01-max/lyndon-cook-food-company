import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/Container";
import HeroSlider from "@/components/HeroSlider";
import Reveal from "@/components/Reveal";

type Props = {
  images: { src: string; alt: string }[];
  eyebrow?: string;
  statement: string;
  linkLabel?: string;
  linkHref?: string;
  /** Object-position tweak for images whose subject sits off-centre. */
  position?: string;
};

/**
 * Full-bleed photographic band with an overlaid statement.
 *
 * The banners run edge to edge as the same auto-advancing slider the heroes
 * use. The copy sits in normal flow above the slider with section padding, so
 * the band grows with the statement instead of clipping it on narrow phones;
 * the min-height keeps the band's presence on wide screens. The slider
 * supplies the left-weighted teal scrims that keep the ivory type readable.
 */
export default function ImageBand({
  images,
  eyebrow,
  statement,
  linkLabel,
  linkHref,
  position,
}: Props) {
  return (
    <section className="relative isolate flex min-h-[22rem] items-center overflow-hidden bg-teal-950 sm:min-h-[30rem]">
      <HeroSlider
        slides={images}
        position={position}
        className="absolute inset-0 z-0"
      />
      <div className="relative z-10 w-full py-14 sm:py-16 lg:py-20">
        <Container>
          <Reveal>
            {eyebrow ? (
              <p className="eyebrow text-copper-400">{eyebrow}</p>
            ) : null}
            <span className="rule-copper mt-4" aria-hidden="true" />
            <p className="display-headline mt-6 max-w-3xl text-ivory">
              {statement}
            </p>
            {linkLabel && linkHref ? (
              <Link
                href={linkHref}
                className="link-underline link-underline-hover mt-8 inline-flex min-h-12 items-center gap-2.5 text-[1.0625rem] font-semibold text-ivory"
              >
                {linkLabel}
                <ArrowRight aria-hidden="true" className="h-4 w-4 text-copper-400" />
              </Link>
            ) : null}
          </Reveal>
        </Container>
      </div>
    </section>
  );
}

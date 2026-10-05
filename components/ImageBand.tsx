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
 * use, at a fixed viewport-relative height. The slider supplies the
 * left-weighted teal scrims that keep the ivory type readable, so the
 * statement can sit anywhere over the frame without per-image tuning.
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
    <section className="relative isolate">
      <div className="relative h-[58vh] min-h-[22rem] w-full overflow-hidden bg-teal-950 sm:h-[62vh]">
        <HeroSlider
          slides={images}
          position={position}
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 z-10 flex items-center">
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
      </div>
    </section>
  );
}

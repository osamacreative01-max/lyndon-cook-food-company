import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

type Props = {
  image: { src: string; alt: string };
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
 * The image runs edge to edge at a fixed viewport-relative height and a strong
 * left-weighted teal gradient keeps the ivory type readable regardless of how
 * bright the photograph is.
 */
export default function ImageBand({
  image,
  eyebrow,
  statement,
  linkLabel,
  linkHref,
  position = "object-center",
}: Props) {
  return (
    <section className="relative isolate">
      <div className="relative h-[58vh] min-h-[22rem] w-full overflow-hidden bg-teal-950 sm:h-[62vh]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          loading="lazy"
          sizes="100vw"
          quality={88}
          className={`object-cover ${position}`}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-teal-950/95 via-teal-950/75 to-teal-950/35"
        />
        <div className="absolute inset-0 flex items-center">
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

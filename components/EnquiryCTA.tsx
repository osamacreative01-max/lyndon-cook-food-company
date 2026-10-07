import Image from "next/image";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { IMAGE_SIZES, IMAGES } from "@/lib/images";

type Props = {
  heading?: string;
  copy?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Adds the "full-load supply" note, used on the homepage. */
  showFullLoadNote?: boolean;
  /** Photograph beside the copy; defaults to the About band's range shot. */
  image?: { src: string; alt: string };
};

/** The closing conversion band, reused at the foot of every commercial page. */
export default function EnquiryCTA({
  heading = "Tell us what you need.",
  copy = "Share your product requirements, volumes and delivery plans. Our team will review the details and come back with the appropriate supply options.",
  primaryLabel = "Start an enquiry",
  primaryHref = "/enquire/",
  secondaryLabel,
  secondaryHref,
  showFullLoadNote = false,
  image,
}: Props) {
  const photo = image ?? IMAGES.nornRange;
  return (
    <section className="on-dark bg-teal-800" aria-labelledby="enquiry-cta-heading">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-copper-400">Next step</p>
            <span className="rule-copper mt-4" aria-hidden="true" />
            <h2
              id="enquiry-cta-heading"
              className="mt-5 text-[1.9rem] leading-[1.1] sm:text-[2.375rem] lg:text-[2.75rem]"
            >
              {heading}
            </h2>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.7] text-ivory/80 sm:text-[1.125rem]">
              {copy}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={primaryHref} variant="onDark" size="lg">
                {primaryLabel}
              </Button>
              {secondaryLabel && secondaryHref ? (
                <Button
                  href={secondaryHref}
                  variant="outlineDark"
                  size="lg"
                >
                  {secondaryLabel}
                </Button>
              ) : null}
            </div>
            {showFullLoadNote ? (
              <div className="mt-8 max-w-2xl border-l-2 border-copper-400 pl-5 text-[0.9375rem] leading-relaxed text-ivory">
                <p>
                  We focus on planned full-load supply. Tell us the products,
                  quantities and delivery schedule you have in mind, and we will
                  review a programme around your requirements.
                </p>
                <p className="mt-3">
                  A typical initial delivery is approximately 24&ndash;25 pallets,
                  subject to product weight, pallet format and vehicle capacity.
                  Final load configuration and delivery terms are confirmed with
                  your quotation.
                </p>
              </div>
            ) : null}
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[8px] border border-white/10 bg-teal-900">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading="lazy"
                sizes={IMAGE_SIZES.band}
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

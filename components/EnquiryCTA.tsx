import Image from "next/image";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { IMAGE_SIZES, IMAGES } from "@/lib/images";
import { SITE } from "@/lib/site";

type Props = {
  heading?: string;
  copy?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Adds the "full-load supply" note, used on the homepage. */
  showFullLoadNote?: boolean;
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
}: Props) {
  return (
    <section className="on-dark bg-teal-800" aria-labelledby="enquiry-cta-heading">
      <Container className="py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-copper-400">Next step</p>
            <h2
              id="enquiry-cta-heading"
              className="mt-4 text-[1.875rem] leading-[1.15] sm:text-[2.25rem]"
            >
              {heading}
            </h2>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.7] text-teal-100">
              {copy}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={primaryHref} variant="onDark" size="lg">
                {primaryLabel}
              </Button>
              {secondaryLabel && secondaryHref ? (
                <Button
                  href={secondaryHref}
                  size="lg"
                  className="border-teal-400 bg-transparent text-ivory hover:bg-teal-700"
                >
                  {secondaryLabel}
                </Button>
              ) : null}
            </div>
            {showFullLoadNote ? (
              <div className="mt-8 max-w-2xl border-l-2 border-copper-400 pl-5 text-[0.9375rem] leading-relaxed text-teal-100">
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
            <p className="mt-8 text-[0.9375rem] text-teal-200">
              Prefer email or phone?{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="link-underline link-underline-hover text-ivory"
              >
                {SITE.email}
              </a>{" "}
&middot;{" "}
              <a
                href={`tel:${SITE.phoneHref}`}
                className="link-underline link-underline-hover text-ivory"
              >
                {SITE.phone}
              </a>
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px] border border-teal-700">
              <Image
                src={IMAGES.warehouse.src}
                alt={IMAGES.warehouse.alt}
                fill
                loading="lazy"
                sizes={IMAGE_SIZES.band}
                className="object-cover opacity-90"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

import { ArrowRight } from "lucide-react";

import Button from "@/components/Button";
import Container from "@/components/Container";
import HeroSlider, { type HeroSlide } from "@/components/HeroSlider";
import Reveal from "@/components/Reveal";
import { CATEGORY_IMAGES } from "@/lib/images";

type Props = {
  heading?: string;
  copy?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Adds the "full-load supply" note, used on the homepage. */
  showFullLoadNote?: boolean;
  /** Range photographs cross-faded in the framed panel; defaults to the
   *  rice, pasta, canned and spices shots. */
  images?: HeroSlide[];
};

/** Numbered path shown under the buttons: how a first enquiry runs. */
const NEXT_STEPS = ["Share your needs", "We review", "Get supply options"];

/** The five Norn slides the framed panel runs through, in order. */
const DEFAULT_SLIDES: HeroSlide[] = [
  CATEGORY_IMAGES["canned-food"],
  CATEGORY_IMAGES["seasonal-fruit"],
  {
    src: "/Png/Seasonal fruit/Norn-Image-03.png",
    alt: "Mangoes ripening on the tree with blossom and fresh leaves",
  },
  {
    src: "/Png/Pasta/Norn-Image-09.png",
    alt: "Ripe mangoes hanging from the branch with raindrops on the skin",
  },
  CATEGORY_IMAGES.spices,
];

/**
 * The closing conversion band, reused at the foot of every commercial page.
 *
 * Two columns on the deep teal ground: the offer, its two calls to action and
 * the three numbered steps on the left; on the right, a framed slider that
 * cross-fades the rice, pasta, canned and spices photographs behind an offset
 * terracotta outline. The columns stack text-first on small screens and both
 * buttons go full width there.
 */
export default function EnquiryCTA({
  heading = "Tell us what\nyou need.",
  copy = "Share your product requirements, volumes and delivery plans. Our team will review the details and come back with the appropriate supply options.",
  primaryLabel = "Start an enquiry",
  primaryHref = "/enquire/",
  secondaryLabel,
  secondaryHref,
  showFullLoadNote = false,
  images = DEFAULT_SLIDES,
}: Props) {
  return (
    <section className="on-dark bg-teal-800" aria-labelledby="enquiry-cta-heading">
      <Container className="py-14 sm:py-16 lg:py-[4.5rem]">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-[#E3A074]!">Next step</p>
            <span className="rule-copper mt-4" aria-hidden="true" />
            <h2
              id="enquiry-cta-heading"
              className="mt-5 whitespace-pre-line font-serif text-[2.25rem] leading-[1.05] text-ivory sm:text-[3rem] lg:text-[4rem]"
            >
              {heading}
            </h2>

            <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.7] text-[#C9D6D5]! sm:text-[1.125rem]">
              {copy}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                href={primaryHref}
                variant="terracotta"
                size="lg"
                pill
                className="w-full focus-visible:outline-teal-800 sm:w-auto"
              >
                {primaryLabel}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Button>
              {secondaryLabel && secondaryHref ? (
                <Button
                  href={secondaryHref}
                  variant="outlineDark"
                  size="lg"
                  pill
                  className="w-full sm:w-auto"
                >
                  {secondaryLabel}
                </Button>
              ) : null}
            </div>

            <div className="mt-9 border-t border-white/15 pt-7">
              <ol className="grid gap-4 sm:grid-cols-3">
                {NEXT_STEPS.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E3A074] font-sans text-xs font-bold text-teal-800"
                    >
                      {index + 1}
                    </span>
                    <span className="text-[0.9375rem] leading-snug text-[#C9D6D5]">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
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
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -left-3 -top-3 hidden h-full w-full rounded-[20px] border border-[#E3A074] sm:block"
              />
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[20px] border border-white/10 bg-teal-900 shadow-[0_18px_40px_rgba(3,25,28,0.45)]">
                <HeroSlider
                  slides={images}
                  interval={4000}
                  scrim={false}
                  className="absolute inset-0"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

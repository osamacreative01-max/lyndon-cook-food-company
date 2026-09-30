import Reveal from "@/components/Reveal";

export type SupplyStep = {
  number: string;
  title: string;
  body: string;
};

export const DEFAULT_SUPPLY_STEPS: SupplyStep[] = [
  {
    number: "01",
    title: "Share your brief",
    body: "Tell us the products, quantities, specification and delivery requirements you have in mind.",
  },
  {
    number: "02",
    title: "Agree specifications",
    body: "We review product, variety, quality and packing requirements.",
  },
  {
    number: "03",
    title: "Plan supply",
    body: "Orders are planned around the agreed purchasing programme.",
  },
  {
    number: "04",
    title: "Confirm delivery",
    body: "Final load configuration, delivery terms and timing are confirmed with the quotation.",
  },
];

/**
 * The four-stage supply process, rendered as a numbered timeline with
 * connecting lines between steps. Deliberately free of any lead-time promise -
 * timings are confirmed per programme, not advertised here.
 *
 * Desktop: horizontal row with a line running through the step numbers.
 * Mobile: vertical stack with a line running down the left.
 */
export default function SupplyProcess({
  steps = DEFAULT_SUPPLY_STEPS,
  heading,
  description,
  onDark = false,
}: {
  steps?: SupplyStep[];
  heading?: string;
  description?: string;
  onDark?: boolean;
}) {
  return (
    <section
      className={onDark ? "on-dark bg-teal-800" : "bg-ivory"}
      aria-labelledby="supply-process-heading"
    >
      <div className="container-page py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className={`eyebrow ${onDark ? "text-copper-400" : ""}`}>Process</p>
          <h2
            id="supply-process-heading"
            className={`mt-4 text-[1.875rem] leading-[1.15] sm:text-[2.25rem] ${onDark ? "text-ivory" : "text-teal-800"}`}
          >
            {heading ?? "A straightforward way to supply"}
          </h2>
          {description ? (
            <p
              className={`mt-5 text-[1.0625rem] leading-[1.7] ${
                onDark ? "text-teal-100" : "text-muted"
              }`}
            >
              {description}
            </p>
          ) : null}
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 80} className="relative">
              <div
                className={`flex h-full flex-col rounded-[6px] p-6 lg:mr-4 ${
                  onDark
                    ? "border border-teal-700/50 bg-teal-700/30"
                    : "border border-teal-100 bg-white shadow-[0_1px_3px_rgba(8,75,80,0.04)]"
                }`}
              >
                {/* Step number circle */}
                <span
                  aria-hidden="true"
                  className={`flex h-11 w-11 items-center justify-center rounded-full font-serif text-[1.125rem] font-semibold ${
                    onDark
                      ? "bg-copper-600 text-ivory"
                      : "bg-teal-800 text-ivory"
                  }`}
                >
                  {step.number}
                </span>

                {/* Connector line (hidden on mobile, shown between desktop cards) */}
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className={`absolute top-[2.75rem] -right-2 hidden h-px w-4 lg:block ${
                      onDark ? "bg-teal-600" : "bg-teal-300"
                    }`}
                  />
                ) : null}

                <h3
                  className={`mt-5 font-serif text-[1.25rem] leading-snug ${
                    onDark ? "text-ivory" : "text-teal-800"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`mt-3 text-[0.9375rem] leading-relaxed ${
                    onDark ? "text-teal-100" : "text-muted"
                  }`}
                >
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

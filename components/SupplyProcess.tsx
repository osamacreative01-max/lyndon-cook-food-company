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
  onDark = true,
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
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <p className={`eyebrow ${onDark ? "text-copper-400" : ""}`}>Process</p>
          <h2
            id="supply-process-heading"
            className={`mt-5 text-[1.9rem] leading-[1.1] sm:text-[2.375rem] lg:text-[2.75rem] ${onDark ? "text-ivory" : "text-teal-800"}`}
          >
            {heading ?? "A straightforward way to supply"}
          </h2>
          {description ? (
            <p
              className={`mt-5 text-[1.0625rem] leading-[1.7] ${
                onDark ? "text-ivory" : "text-muted"
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
                className={`flex h-full flex-col rounded-[6px] p-7 lg:mr-5 ${
                  onDark
                    ? "border border-teal-700/60 bg-teal-900/60"
                    : "border border-sand bg-white shadow-[0_1px_3px_rgba(8,75,80,0.04)]"
                }`}
              >
                {/* Step number circle */}
                <span
                  aria-hidden="true"
                  className={`flex h-14 w-14 items-center justify-center rounded-full font-serif text-[1.25rem] font-semibold ${
                    onDark
                      ? "bg-copper-600 text-teal-950"
                      : "bg-teal-800 text-ivory"
                  }`}
                >
                  {step.number}
                </span>

                {/* Connector line (hidden on mobile, shown between desktop cards) */}
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className={`absolute top-[3.75rem] -right-2 hidden h-px w-4 lg:block ${
                      onDark ? "bg-teal-600" : "bg-teal-200"
                    }`}
                  />
                ) : null}

                <h3
                  className={`mt-6 font-serif text-[1.4rem] leading-snug ${
                    onDark ? "text-ivory" : "text-teal-800"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`mt-3.5 text-[1rem] leading-relaxed ${
                    onDark ? "text-ivory" : "text-muted"
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

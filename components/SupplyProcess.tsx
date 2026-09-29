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
 * The four-stage supply process. Deliberately free of any lead-time promise -
 * timings are confirmed per programme, not advertised here.
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
      className={`on-dark ${onDark ? "bg-teal-800" : "bg-ivory"}`}
      aria-labelledby="supply-process-heading"
    >
      <div className="container-page py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className={`eyebrow ${onDark ? "text-copper-400" : ""}`}>Process</p>
          <h2
            id="supply-process-heading"
            className="mt-4 text-[1.875rem] leading-[1.15] sm:text-[2.25rem]"
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

        <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.number} className="relative">
              <span
                aria-hidden="true"
                className={`block font-serif text-[2.5rem] leading-none ${
                  onDark ? "text-teal-600" : "text-teal-200"
                }`}
              >
                {step.number}
              </span>
              <h3 className="mt-4 font-serif text-[1.25rem] leading-snug">
                {step.title}
              </h3>
              <p
                className={`mt-3 text-[0.9375rem] leading-relaxed ${
                  onDark ? "text-teal-100" : "text-muted"
                }`}
              >
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

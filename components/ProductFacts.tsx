import type { Product } from "@/lib/products";

/**
 * Confirmed key facts for a product, rendered as a definition list so the
 * label/value relationship is exposed to assistive technology.
 *
 * Visual style: alternating row backgrounds give a clean spec-sheet feel
 * without the heaviness of a bordered table.
 */
export default function ProductFacts({
  facts,
  className = "",
}: {
  facts: Product["facts"];
  className?: string;
}) {
  return (
    <dl className={`overflow-hidden rounded-[6px] border border-sand bg-white ${className}`}>
      {facts.map((fact, index) => (
        <div
          key={fact.label}
          className={`grid grid-cols-1 gap-1 px-5 py-3.5 sm:grid-cols-3 sm:gap-4 ${
            index % 2 === 1 ? "bg-ivory/60" : ""
          } ${index > 0 ? "border-t border-sand" : ""}`}
        >
          <dt className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-muted">
            {fact.label}
          </dt>
          <dd className="text-[0.9375rem] font-medium text-body sm:col-span-2">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

import type { Product } from "@/lib/products";

/**
 * Confirmed key facts for a product, rendered as a definition list so the
 * label/value relationship is exposed to assistive technology.
 */
export default function ProductFacts({
  facts,
  className = "",
}: {
  facts: Product["facts"];
  className?: string;
}) {
  return (
    <dl className={`divide-y divide-teal-100 border-y border-teal-100 ${className}`}>
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4"
        >
          <dt className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
            {fact.label}
          </dt>
          <dd className="text-[0.9375rem] text-body sm:col-span-2">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

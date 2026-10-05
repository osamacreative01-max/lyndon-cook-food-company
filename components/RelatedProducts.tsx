import ProductCard from "@/components/ProductCard";
import { type Product } from "@/lib/products";

/** Related products, resolved from the product's own related-slug list. */
export default function RelatedProducts({
  products,
  title = "Related products",
  description,
}: {
  products: Product[];
  title?: string;
  description?: string;
}) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="bg-ivory">
      <div className="container-page py-14 sm:py-16 lg:py-20">
        <div className="max-w-2xl">
          <h2
            id="related-heading"
            className="text-[1.75rem] leading-[1.15] sm:text-[2.125rem] lg:text-[2.375rem]"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              {description}
            </p>
          ) : null}
        </div>
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {products.map((product) => (
            <li key={product.id} className="h-full">
              <ProductCard product={product} compact />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

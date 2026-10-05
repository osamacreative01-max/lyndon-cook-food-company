"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";

import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

type Props = {
  products: Product[];
  categories: { id: string; name: string }[];
  /** Grouped subgroup options, keyed by category id. */
  subgroups: Record<string, { id: string; name: string }[]>;
  /** Restricts the category list (e.g. to the current category on /products). */
  lockedCategory?: string;
  /** Hides the subgroup (Range) pills, used on the all-products page. */
  showRangeFilter?: boolean;
};

const ALL = "all";

/**
 * Catalogue search, category filter and subgroup filter.
 *
 * Accessibility:
 *  - The search input is a labelled text input, the filters are native radio
 *    groups inside fieldsets, and the result count is announced through a
 *    polite live region.
 *  - The full product list is already in the server-rendered HTML; this
 *    component progressively enhances it, so the catalogue is never hidden
 *    behind a JavaScript-only interaction.
 */
export default function ProductFilters({
  products,
  categories,
  subgroups,
  lockedCategory,
  showRangeFilter = true,
}: Props) {
  const baseId = useId().replace(/:/g, "");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(lockedCategory ?? ALL);
  const [subgroup, setSubgroup] = useState<string>(ALL);
  const [mobileOpen, setMobileOpen] = useState(false);

  const deferredQuery = useDeferredValue(query);

  const availableSubgroups = useMemo(
    () => (category === ALL ? [] : (subgroups[category] ?? [])),
    [category, subgroups]
  );

  const results = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase();
    return products.filter((product) => {
      if (category !== ALL && product.category !== category) return false;
      if (subgroup !== ALL && product.subgroup !== subgroup) return false;
      if (!needle) return true;
      return (
        product.name.toLowerCase().includes(needle) ||
        product.summary.toLowerCase().includes(needle) ||
        product.subgroupName.toLowerCase().includes(needle) ||
        product.category.toLowerCase().includes(needle)
      );
    });
  }, [products, category, subgroup, deferredQuery]);

  const hasFilters =
    query.trim().length > 0 || category !== ALL || subgroup !== ALL;

  const clearAll = () => {
    setQuery("");
    setCategory(lockedCategory ?? ALL);
    setSubgroup(ALL);
  };

  const filterPanel = (
    <div className="space-y-7">
      {/* Category pills */}
      <fieldset>
        <legend className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          Category
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {[{ id: ALL, name: "All" }, ...categories].map((option) => {
            const checked = category === option.id;
            return (
              <label
                key={option.id}
                className={`inline-flex min-h-10 cursor-pointer items-center rounded-full border px-4 text-[0.8125rem] font-medium transition-all duration-200 ${
                  checked
                    ? "border-teal-800 bg-teal-800 text-ivory shadow-[0_2px_8px_rgba(8,75,80,0.2)]"
                    : "border-sand-600 bg-white text-body hover:border-copper-600 hover:bg-ivory"
                }`}
              >
                <input
                  type="radio"
                  name={`${baseId}-category`}
                  value={option.id}
                  checked={checked}
                  disabled={lockedCategory !== undefined && option.id !== lockedCategory}
                  onChange={() => {
                    setCategory(option.id);
                    setSubgroup(ALL);
                  }}
                  className="sr-only"
                />
                {option.name}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Subgroup pills */}
      {showRangeFilter && availableSubgroups.length > 0 ? (
        <fieldset>
          <legend className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Range
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {[{ id: ALL, name: "All" }, ...availableSubgroups].map((option) => {
              const checked = subgroup === option.id;
              return (
                <label
                  key={option.id}
                  className={`inline-flex min-h-10 cursor-pointer items-center rounded-full border px-4 text-[0.8125rem] font-medium transition-all duration-200 ${
                    checked
                      ? "border-copper-600 bg-copper-600 text-ivory shadow-[0_2px_8px_rgba(185,124,76,0.2)]"
                      : "border-sand-600 bg-white text-body hover:border-copper-400 hover:bg-copper-100/30"
                  }`}
                >
                  <input
                    type="radio"
                    name={`${baseId}-subgroup`}
                    value={option.id}
                    checked={checked}
                    onChange={() => setSubgroup(option.id)}
                    className="sr-only"
                  />
                  {option.name}
                </label>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      {/* Search */}
      <div>
        <label
          htmlFor={`${baseId}-search`}
          className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted"
        >
          Search products
        </label>
        <div className="relative mt-3">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-600"
          />
          <input
            id={`${baseId}-search`}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. basmati, cumin, mango"
            className="min-h-11 w-full rounded-[4px] border border-sand-600 bg-white py-2.5 pl-10 pr-10 text-[0.9375rem] text-body transition-colors placeholder:text-muted/60 focus:border-copper-600 focus:outline-none focus:ring-2 focus:ring-copper-100"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-1 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-teal-800 transition-colors hover:bg-ivory"
            >
              <X aria-hidden="true" className="h-4 w-4" />
              <span className="sr-only-focusable absolute">Clear search</span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      {/* Desktop filter rail */}
      <aside className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-28 rounded-[6px] border border-sand bg-white p-6 shadow-[0_1px_3px_rgba(8,75,80,0.04)]">
          <h2 className="flex items-center gap-2 font-serif text-[1.125rem] text-teal-800">
            <SlidersHorizontal aria-hidden="true" className="h-4 w-4 text-copper-600" />
            Filter the range
          </h2>
          <div className="mt-6">{filterPanel}</div>
          {hasFilters ? (
            <button
              type="button"
              onClick={clearAll}
              className="mt-6 inline-flex w-full min-h-10 items-center justify-center gap-2 rounded-[4px] border border-sand-600 text-sm font-semibold text-teal-800 transition-colors hover:border-copper-600 hover:bg-ivory"
            >
              <X aria-hidden="true" className="h-4 w-4" />
              Clear all filters
            </button>
          ) : null}
        </div>
      </aside>

      <div className="lg:col-span-9">
        {/* Mobile controls */}
        <div className="lg:hidden">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <label htmlFor={`${baseId}-search-mobile`} className="sr-only-focusable absolute">
                Search products
              </label>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-600"
              />
              <input
                id={`${baseId}-search-mobile`}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products"
                className="min-h-11 w-full rounded-[4px] border border-sand-600 bg-white py-2.5 pl-10 pr-3 text-[0.9375rem] focus:border-copper-600 focus:outline-none focus:ring-2 focus:ring-copper-100"
              />
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              aria-expanded={mobileOpen}
              aria-controls={`${baseId}-mobile-filters`}
              className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-[4px] border px-4 text-sm font-semibold transition-colors ${
                mobileOpen
                  ? "border-teal-800 bg-teal-800 text-ivory"
                  : "border-sand-600 bg-white text-teal-800 hover:border-copper-600"
              }`}
            >
              <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
              Filter
            </button>
          </div>

          {mobileOpen ? (
            <div
              id={`${baseId}-mobile-filters`}
              className="mt-4 rounded-[6px] border border-sand bg-white p-5 shadow-[0_1px_3px_rgba(8,75,80,0.04)]"
            >
              {filterPanel}
            </div>
          ) : null}
        </div>

        {/* Results header */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-sand pb-4">
          <p
            role="status"
            aria-live="polite"
            className="text-[0.9375rem] text-muted"
          >
            <span className="font-serif text-[1.125rem] font-semibold text-teal-800">
              {results.length}
            </span>{" "}
            {results.length === 1 ? "product" : "products"}
            {category !== ALL ? " in this range" : ""}
            {hasFilters ? " matching your filters" : ""}
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={clearAll}
              className="link-underline link-underline-hover inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-teal-800"
            >
              <X aria-hidden="true" className="h-4 w-4" />
              Clear filters
            </button>
          ) : null}
        </div>

        {/* Product grid */}
        {results.length > 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
            {results.map((product, index) => (
              <li key={product.id} className="h-full">
                <ProductCard product={product} compact delay={index * 50} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-[6px] border border-dashed border-sand-600 bg-white p-8 text-center sm:p-12">
            <h3 className="font-serif text-[1.375rem] text-teal-800">
              No products match those filters
            </h3>
            <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted">
              Try a different search term, choose another range, or clear the
              filters to see the whole catalogue. If you are looking for something
              that is not listed, send us an enquiry and we will check what can be
              supplied.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex min-h-11 items-center gap-2 rounded-[4px] bg-teal-800 px-5 py-2.5 text-[0.9375rem] font-semibold text-ivory transition-colors hover:bg-teal-700"
              >
                Clear filters
              </button>
              <Link
                href="/enquire/"
                className="inline-flex min-h-11 items-center rounded-[4px] border border-teal-800 px-5 py-2.5 text-[0.9375rem] font-semibold text-teal-800 transition-colors hover:bg-ivory"
              >
                Make an enquiry
              </Link>
            </div>
          </div>
        )}

        {results.length > 0 ? (
          <p className="mt-8 text-sm text-muted">
            Cannot see what you need?{" "}
            <Link
              href="/enquire/"
              className="link-underline link-underline-hover font-medium text-teal-800"
            >
              Send an enquiry
            </Link>{" "}
            and we will review what can be supplied.
          </p>
        ) : null}
      </div>
    </div>
  );
}

"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";

import { faqSchema } from "@/lib/seo";

export type FaqItem = { question: string; answer: string };

/**
 * Accessible accordion FAQ.
 *
 * Each item is a heading containing a real button with `aria-expanded` and
 * `aria-controls`; the panel is a labelled region. Keyboard operable by default
 * because no custom key handling is required. Collapsed content is not hidden
 * from in-page find via `hidden`, matching the button's `aria-expanded` state.
 */
export default function Faq({
  items,
  heading,
  description,
  onDark = false,
}: {
  items: FaqItem[];
  heading?: string;
  description?: string;
  onDark?: boolean;
}) {
  const baseId = useId().replace(/:/g, "");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className={`on-dark ${onDark ? "bg-teal-800" : "bg-white"}`}
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p className={`eyebrow ${onDark ? "text-copper-400" : ""}`}>
              Questions
            </p>
            <h2
              id={`${baseId}-heading`}
              className="mt-4 text-[1.875rem] leading-[1.15] sm:text-[2.125rem]"
            >
              {heading ?? "Frequently asked questions"}
            </h2>
            {description ? (
              <p
                className={`mt-5 text-[0.9375rem] leading-relaxed ${
                  onDark ? "text-teal-100" : "text-muted"
                }`}
              >
                {description}
              </p>
            ) : null}
          </div>

          <div className="lg:col-span-8">
            <ul className="border-t border-teal-100">
              {items.map((item, index) => {
                const isOpen = openIndex === index;
                const buttonId = `${baseId}-q${index}`;
                const panelId = `${baseId}-a${index}`;
                return (
                  <li key={item.question} className="border-b border-teal-100">
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className={`flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left font-serif text-[1.125rem] leading-snug transition-colors sm:text-[1.25rem] ${
                          onDark
                            ? "text-ivory hover:text-copper-400"
                            : "text-teal-800 hover:text-teal-900"
                        }`}
                      >
                        <span>{item.question}</span>
                        <span
                          aria-hidden="true"
                          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                            onDark
                              ? "border-teal-600 text-copper-400"
                              : "border-teal-200 text-copper-700"
                          }`}
                        >
                          {isOpen ? (
                            <Minus className="h-4 w-4" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </span>
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      hidden={!isOpen}
                      className="pb-5 pr-12"
                    >
                      <p
                        className={`text-[0.9375rem] leading-relaxed sm:text-base ${
                          onDark ? "text-teal-100" : "text-muted"
                        }`}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(items)) }}
        />
      </div>
    </section>
  );
}

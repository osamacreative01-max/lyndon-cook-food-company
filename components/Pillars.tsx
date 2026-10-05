import { PackageCheck, Scale, Truck } from "lucide-react";

import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export type Pillar = {
  title: string;
  body: string;
  icon: "sourcing" | "specification" | "planned";
};

const ICONS = {
  sourcing: PackageCheck,
  specification: Scale,
  planned: Truck,
} as const;

export const DEFAULT_PILLARS: Pillar[] = [
  {
    title: "Thoughtful sourcing",
    body: "Matching the product to its purpose, from everyday cooking to specialist menus.",
    icon: "sourcing",
  },
  {
    title: "Clear specifications",
    body: "Agreeing the variety, quality parameters and packing requirements before production.",
    icon: "specification",
  },
  {
    title: "Planned supply",
    body: "Co-ordinating orders and deliveries around an agreed purchasing programme.",
    icon: "planned",
  },
];

/** Three-column editorial card row used on the homepage and About page. */
export default function Pillars({
  pillars = DEFAULT_PILLARS,
  onDark = false,
  className = "",
}: {
  pillars?: Pillar[];
  onDark?: boolean;
  className?: string;
}) {
  return (
    <ul className={`grid grid-cols-1 gap-6 sm:grid-cols-3 ${className}`}>
      {pillars.map((pillar, index) => {
        const Icon = ICONS[pillar.icon];
        return (
          <Reveal
            key={pillar.title}
            delay={index * 110}
            as="li"
            className={`h-full rounded-[4px] border p-8 ${
              onDark
                ? "border-teal-700 bg-teal-900/70"
                : "border-sand bg-white"
            }`}
          >
            <span
              aria-hidden="true"
              className={`flex h-14 w-14 items-center justify-center ${
                onDark ? "bg-copper-600" : "bg-teal-800"
              }`}
            >
              <Icon
                aria-hidden="true"
                className={`h-7 w-7 ${onDark ? "text-teal-950" : "text-ivory"}`}
              />
            </span>
            <h3 className="mt-6 font-serif text-[1.4rem] leading-snug">
              {pillar.title}
            </h3>
            <p
              className={`mt-3.5 text-[1rem] leading-relaxed ${
                onDark ? "text-ivory" : "text-muted"
              }`}
            >
              {pillar.body}
            </p>
          </Reveal>
        );
      })}
    </ul>
  );
}

/** Section wrapper that pairs a heading with the pillars list. */
export function PillarsSection({
  eyebrow,
  title,
  description,
  onDark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  onDark?: boolean;
}) {
  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <Reveal className="max-w-2xl">
        <p className={`eyebrow ${onDark ? "text-copper-400" : ""}`}>{eyebrow}</p>
        <h2 className="mt-5 text-[1.9rem] leading-[1.1] sm:text-[2.375rem] lg:text-[2.75rem]">
          {title}
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
      </Reveal>
      <Pillars className="mt-12" onDark={onDark} />
    </Container>
  );
}

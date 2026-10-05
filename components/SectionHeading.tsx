import type { ReactNode } from "react";

import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

type Props = {
  /** Short uppercase label above the heading. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  /** Heading colour treatment for use on dark panels. */
  onDark?: boolean;
};

/** Consistent section heading block: eyebrow, serif heading, supporting copy. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  id,
  className = "",
  onDark = false,
}: Props) {
  const alignment =
    align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-3xl";

  return (
    <Reveal className={className}>
      <div className={alignment}>
        {eyebrow ? (
          <p className={`eyebrow ${onDark ? "text-copper-400" : ""}`}>{eyebrow}</p>
        ) : null}
        {eyebrow ? <span className="rule-copper mt-3" aria-hidden="true" /> : null}
        <Tag
          id={id}
          className={`mt-5 text-[1.875rem] font-bold leading-[1.1] sm:text-[2.375rem] lg:text-[2.875rem] ${
            onDark ? "text-ivory" : ""
          }`}
        >
          {title}
        </Tag>
        {description ? (
          <div
            className={`mt-6 text-[1.0625rem] font-medium leading-[1.75] sm:text-[1.1875rem] ${
              onDark ? "text-ivory" : "text-muted"
            }`}
          >
            {description}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

/** Multi-paragraph supporting copy block. */
export function Lede({
  children,
  className = "",
  onDark = false,
}: {
  children: ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Container className={className}>
      <div
        className={`max-w-3xl text-[1.0625rem] leading-[1.7] sm:text-[1.125rem] ${
          onDark ? "text-ivory" : "text-muted"
        }`}
      >
        {children}
      </div>
    </Container>
  );
}

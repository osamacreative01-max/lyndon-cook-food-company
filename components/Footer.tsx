import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

import Container from "@/components/Container";
import Logo from "@/components/Logo";
import { SITE, FOOTER_LINKS, FOOTER_LEGAL_LINKS } from "@/lib/site";
import { CATEGORIES } from "@/lib/categories";

/** Enquiry lives in the CTA card, so it is kept out of the quick link list. */
const QUICK_LINKS = FOOTER_LINKS.filter((link) => link.href !== "/enquire/");

const HEADING =
  "text-[0.75rem] font-bold uppercase tracking-[0.22em] text-[var(--footer-accent)]";

export default function Footer() {
  return (
    <footer className="site-footer mt-auto bg-[var(--footer-bg)] text-[var(--footer-text)]">
      <Container className="pt-8 sm:pt-10">
        {/* ---------------------------------------------------------- Top row */}
        <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-6 border-b border-[var(--footer-divider)] pb-7">
          <div className="flex max-w-2xl flex-col items-start gap-3">
            <Logo onDark width={360} fluid className="max-w-[75%] sm:max-w-none" />
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-[var(--footer-muted)]">
              Rice, spices, seasonal fruit, canned foods and pasta, supplied
              around clear specifications and planned purchasing requirements.
            </p>
          </div>
          <div className="sm:text-right">
            <Image
              src="/logo/norn-ivory.png"
              alt="Norn"
              width={1649}
              height={954}
              className="h-auto w-28 sm:ml-auto sm:w-32"
            />
            <p className="mt-2 text-[0.8125rem] font-semibold uppercase leading-relaxed tracking-[0.18em] text-[var(--footer-accent)]">
              <span className="block">A brand from</span>
              <span className="block">The Lyndon Cook Food Company</span>
            </p>
          </div>
        </div>

        {/* ------------------------------------------------------ Middle grid */}
        <div className="grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Products">
            <h2 className={HEADING}>Products</h2>
            <ul className="mt-4 space-y-2">
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/products/${category.slug}/`}
                    className="inline-flex min-h-8 items-center text-[0.9375rem] text-[var(--footer-text)] transition-colors hover:text-[var(--footer-accent)]"
                  >
                    {category.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={HEADING}>Company</h2>
            <address className="mt-4 space-y-3 not-italic text-[0.9375rem] leading-relaxed text-[var(--footer-muted)]">
              <span className="block font-semibold text-[var(--footer-text-strong)]">
                {SITE.name}
              </span>
              <a
                href={`mailto:${SITE.email}`}
                className="flex min-h-8 items-center gap-2.5 text-[var(--footer-text)] transition-colors hover:text-[var(--footer-accent)]"
              >
                <Mail
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="h-4 w-4 shrink-0 text-[var(--footer-accent)]"
                />
                {SITE.email}
              </a>
              <a
                href={`tel:${SITE.phoneHref}`}
                className="flex min-h-8 items-center gap-2.5 text-[var(--footer-text)] transition-colors hover:text-[var(--footer-accent)]"
              >
                <Phone
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="h-4 w-4 shrink-0 text-[var(--footer-accent)]"
                />
                {SITE.phone}
              </a>
              <span className="flex min-h-8 items-start gap-2.5 text-[var(--footer-text)]">
                <MapPin
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="mt-1 h-4 w-4 shrink-0 text-[var(--footer-accent)]"
                />
                {SITE.address.formatted}
              </span>
            </address>
          </div>

          <nav aria-label="Quick links">
            <h2 className={HEADING}>Quick links</h2>
            <ul className="mt-4 space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-8 items-center text-[0.9375rem] text-[var(--footer-text)] transition-colors hover:text-[var(--footer-accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="rounded-2xl border border-[var(--footer-divider)] bg-[var(--footer-card-bg)] p-6">
            <h2 className="font-serif text-[1.5rem] font-bold leading-snug text-[var(--footer-text-strong)]">
              Need a supply quote?
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--footer-muted)]">
              Tell us the products, quantities and delivery schedule you have in
              mind and we will review the supply options with you.
            </p>
            <Link
              href="/enquire/"
              className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--footer-accent)] px-7 text-[0.9375rem] font-semibold text-[var(--footer-bg)] transition-colors hover:bg-[#d68c5c]"
            >
              Enquire now
              <ArrowRight aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* ------------------------------------------------------- Bottom bar */}
        <div className="flex min-h-16 flex-col items-center gap-3 border-t border-[var(--footer-divider)] py-5 sm:h-16 sm:flex-row sm:justify-end sm:gap-6 sm:py-0">
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2 text-[0.8125rem]">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-[var(--footer-accent)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

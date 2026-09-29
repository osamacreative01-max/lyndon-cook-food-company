import Link from "next/link";
import { Mail, MapPin, Phone, ChevronRight } from "lucide-react";

import Container from "@/components/Container";
import Logo from "@/components/Logo";
import { SITE, FOOTER_LINKS, FOOTER_LEGAL_LINKS } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark mt-auto border-t-4 border-copper-600 bg-teal-900 text-teal-50">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo onDark width={168} />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-teal-200">
              Rice, spices, seasonal fruit and NORM canned foods, supplied around
              clear specifications and planned purchasing requirements.
            </p>
            <p className="mt-6 border-l-2 border-copper-400 pl-4 font-serif text-lg text-ivory">
              {SITE.productBrand}
              <span className="block font-sans text-sm font-normal text-teal-300">
                {SITE.brandLine}
              </span>
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-copper-400">
              Company
            </h2>
            <address className="mt-4 not-italic text-[0.9375rem] leading-relaxed text-teal-200">
              <span className="block font-semibold text-ivory">{SITE.name}</span>
              <span className="mt-3 flex gap-2.5">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-copper-400" />
                <span>
                  {SITE.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </span>
            </address>
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-copper-400">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-[0.9375rem]">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex min-h-11 items-center gap-2.5 text-teal-200 transition-colors hover:text-ivory"
                >
                  <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-copper-400" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="inline-flex min-h-11 items-center gap-2.5 text-teal-200 transition-colors hover:text-ivory"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-copper-400" />
                  {SITE.phone}
                </a>
              </li>
              <li className="text-teal-300">
                <span className="text-copper-400">Web</span> {SITE.domain}
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-copper-400">
              Quick links
            </h2>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-teal-200 transition-colors hover:text-ivory"
                  >
                    {link.label}
                    <ChevronRight aria-hidden="true" className="h-4 w-4 text-copper-400 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-teal-800 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-teal-300">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-sm text-teal-400">
              &copy; {year} {SITE.name}. All rights reserved.
            </p>
          </div>
          <p className="mt-4 sm:mt-2 max-w-3xl text-sm leading-relaxed text-teal-300/80">
            Product specifications, pack formats and delivery terms are agreed per
            order. Photography on this site is illustrative. 400 ml refers to the
            NORM can format, not net weight.
          </p>
        </div>
      </Container>
    </footer>
  );
}
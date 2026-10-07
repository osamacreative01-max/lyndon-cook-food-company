import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, ChevronRight } from "lucide-react";

import Container from "@/components/Container";
import Logo from "@/components/Logo";
import { SITE, FOOTER_LINKS, FOOTER_LEGAL_LINKS } from "@/lib/site";
import { CATEGORIES } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="on-dark mt-auto border-t-4 border-copper-600 bg-teal-900 text-teal-50">
      <Container className="py-10 sm:py-12 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo onDark width={360} fluid />
            <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-ivory/75">
              Rice, spices, seasonal fruit and canned foods, supplied around
              clear specifications and planned purchasing requirements.
            </p>
            {/* Norn range lockup — mark above its attribution line. */}
            <div className="mt-5 max-w-sm">
              <Image
                src="/logo/norn-ivory.png"
                alt="Norn"
                width={1649}
                height={954}
                className="h-auto w-28 sm:w-32"
              />
              <p className="mt-3 font-serif text-lg leading-snug text-ivory">
                {SITE.brandLine}
              </p>
            </div>
          </div>

          {/* The brand column runs taller than the link columns, so the three
              headings carry a little top margin: the whitespace above them then
              matches the space their shorter content leaves before the divider. */}
          {/* Products */}
          <nav aria-label="Products" className="lg:col-span-2 lg:mt-5">
            <h2 className="font-sans text-base font-semibold uppercase tracking-[0.18em] text-ivory">
              Products
            </h2>
            <ul className="mt-4 space-y-2">
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/products/${category.slug}/`}
                    className="group inline-flex min-h-8 items-center gap-2 text-[0.9375rem] text-ivory/75 transition-colors hover:text-ivory"
                  >
                    {category.shortName}
                    <ChevronRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-copper-400 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <div className="lg:col-span-3 lg:mt-5">
            <h2 className="font-sans text-base font-semibold uppercase tracking-[0.18em] text-ivory">
              Company
            </h2>
            <address className="mt-4 not-italic text-[0.9375rem] leading-relaxed text-ivory">
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
            <ul className="mt-4 space-y-2 text-[0.9375rem]">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex min-h-8 items-center gap-2.5 text-ivory/75 transition-colors hover:text-ivory"
                >
                  <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-copper-400" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="inline-flex min-h-8 items-center gap-2.5 text-ivory/75 transition-colors hover:text-ivory"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-copper-400" />
                  {SITE.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer" className="lg:col-span-3 lg:mt-5">
            <h2 className="font-sans text-base font-semibold uppercase tracking-[0.18em] text-ivory">
              Quick links
            </h2>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex min-h-8 items-center gap-2 text-[0.9375rem] text-ivory/75 transition-colors hover:text-ivory"
                  >
                    {link.label}
                    <ChevronRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-copper-400 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-teal-800 pt-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ivory/75">
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
        </div>
      </Container>
    </footer>
  );
}

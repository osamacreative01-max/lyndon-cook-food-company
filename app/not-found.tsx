import Link from "next/link";

import Button from "@/components/Button";
import Container from "@/components/Container";
import { NAV_LINKS } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="bg-ivory">
      <Container className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-2xl">
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-4 text-[2.25rem] leading-[1.1] sm:text-[3rem]">
            We can&rsquo;t find that page.
          </h1>
          <p className="mt-6 text-[1.0625rem] leading-[1.7] text-muted sm:text-[1.125rem]">
            The page may have moved, or the link may be out of date. Nothing is
            broken on your side. Try the catalogue, or get in touch and we will
            point you to the right page.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/" size="lg">
              Back to home
            </Button>
            <Button href="/products/" variant="secondary" size="lg">
              Browse the range
            </Button>
          </div>

          <nav aria-label="Popular pages" className="mt-12 border-t border-sand pt-6">
            <h2 className="font-serif text-[1.1875rem] text-teal-800">Popular pages</h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline link-underline-hover min-h-11 py-2 text-[0.9375rem]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/enquire/"
                  className="link-underline link-underline-hover min-h-11 py-2 text-[0.9375rem]"
                >
                  Enquire
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}

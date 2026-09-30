"use client";

import { useEffect } from "react";
import Link from "next/link";

import Button from "@/components/Button";
import Container from "@/components/Container";
import { SITE } from "@/lib/site";

/**
 * Route-level error boundary. The message shown to the visitor is fixed; the
 * underlying error is only logged to the browser console, because it can carry
 * server detail that should not be published.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-ivory">
      <Container className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-2xl">
          <p className="eyebrow">Something went wrong</p>
          <h1 className="mt-4 text-[2.25rem] leading-[1.1] sm:text-[3rem]">
            This page didn&rsquo;t load.
          </h1>
          <p className="mt-6 text-[1.0625rem] leading-[1.7] text-muted sm:text-[1.125rem]">
            An unexpected error occurred. Trying again often works. If it keeps
            happening, email{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="link-underline link-underline-hover font-medium text-teal-800"
            >
              {SITE.email}
            </a>{" "}
            and we will help.
          </p>

          {error.digest ? (
            <p className="mt-4 text-sm text-muted">
              Reference for our team:{" "}
              <code className="font-mono text-[0.8125rem] text-teal-800">{error.digest}</code>
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={reset} size="lg">
              Try again
            </Button>
            <Button href="/" variant="secondary" size="lg">
              Back to home
            </Button>
          </div>

          <p className="mt-8 text-[0.9375rem] text-muted">
            Prefer to talk it through? Call{" "}
            <a
              href={`tel:${SITE.phoneHref}`}
              className="link-underline link-underline-hover font-medium text-teal-800"
            >
              {SITE.phone}
            </a>{" "}
            or{" "}
            <Link
              href="/enquire/"
              className="link-underline link-underline-hover font-medium text-teal-800"
            >
              send an enquiry
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}

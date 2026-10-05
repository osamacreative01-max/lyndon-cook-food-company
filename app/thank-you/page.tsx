import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Mail, Phone } from "lucide-react";

import Button from "@/components/Button";
import Container from "@/components/Container";
import { IMAGE_SIZES, IMAGES } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

const TITLE = "Thank You | The Lyndon Cook";
const DESCRIPTION =
  "Your enquiry has been received. The team at The Lyndon Cook will review your requirements and contact you.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: "/thank-you/",
  }),
  // Confirmation page: useful for users, no value in the index.
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <section className="on-dark bg-ivory">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <CheckCircle2 aria-hidden="true" className="h-10 w-10 text-copper-600" />
            <h1 className="mt-6 text-[2rem] leading-[1.12] sm:text-[2.5rem]">
              Thank you. Your enquiry has been received.
            </h1>
            <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-muted sm:text-[1.125rem]">
              Our team will review your requirements and contact you. In the
              meantime, you can continue through the catalogue, or get in touch
              directly if anything is urgent.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/products/" size="lg">
                Explore our range
              </Button>
              <Button href="/" variant="secondary" size="lg">
                Back to home
              </Button>
            </div>

            <div className="mt-10 rounded-[4px] border border-sand bg-ivory p-6">
              <h2 className="font-serif text-[1.1875rem] text-teal-800">
                Need to reach us sooner?
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                Call or email {SITE.name} and quote the product and quantity from
                your enquiry.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-[0.9375rem]">
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="link-underline link-underline-hover inline-flex min-h-11 items-center gap-2"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 text-copper-600" />
                  {SITE.phone}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="link-underline link-underline-hover inline-flex min-h-11 items-center gap-2"
                >
                  <Mail aria-hidden="true" className="h-4 w-4 text-copper-600" />
                  {SITE.email}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px] border border-sand bg-ivory-dark">
              <Image
                src={IMAGES.plating.src}
                alt={IMAGES.plating.alt}
                fill
                priority
                sizes={IMAGE_SIZES.hero}
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-sm text-muted">
              Looking for something specific in the meantime?{" "}
              <Link
                href="/products/"
                className="link-underline link-underline-hover font-medium text-teal-800"
              >
                Browse all {` `}products
              </Link>
              .
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

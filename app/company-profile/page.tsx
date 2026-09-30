import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Container from "@/components/Container";
import ProfileDownload from "@/components/ProfileDownload";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { PageHero } from "@/components/Hero";
import { CATEGORIES } from "@/lib/categories";
import { IMAGES } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { CATALOGUE_COUNTS, getProductsByCategory } from "@/lib/products";

const TITLE = "Company Profile | The Lyndon Cook Food Company";
const DESCRIPTION =
  "A downloadable overview of The Lyndon Cook Food Company: rice, spices, seasonal fruit and NORM canned foods, supplied around agreed specifications and planned purchasing requirements.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/company-profile/",
});

export default function CompanyProfilePage() {
  const normCount = CATALOGUE_COUNTS.canned;

  return (
    <>
      <PageHero
        eyebrow="Company profile"
        title="The Lyndon Cook Food Company, at a glance."
        description="A short, factual overview of what we supply and how supply works. Download the profile to keep, or read it here."
        image={IMAGES.companyProfile}
        breadcrumbs={
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Company profile" }]}
          />
        }
      />

      {/* -------------------------------------------------------------- Download */}
      <section className="on-dark bg-teal-800" aria-labelledby="download-heading">
        <Container className="py-12 sm:py-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-copper-400">PDF</p>
              <h2
                id="download-heading"
                className="mt-3 text-[1.5rem] leading-snug sm:text-[1.875rem]"
              >
                Download company profile
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-teal-100">
                {SITE.name} company profile ({SITE.profileDownload.sizeLabel}),
                including product categories, the NORM range and our supply
                approach.
              </p>
            </div>
            <div className="shrink-0">
              <ProfileDownload variant="onDark" />
            </div>
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------- Introduction */}
      <section className="on-dark bg-white" aria-labelledby="profile-intro">
        <Container className="py-16 sm:py-20">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Introduction</p>
            <h2
              id="profile-intro"
              className="mt-4 text-[1.875rem] leading-[1.15] sm:text-[2.25rem]"
            >
              {SITE.name}
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-[1.7] text-muted">
              The Lyndon Cook Food Company brings a practical approach to food
              supply: well-chosen products, clear specifications and orders planned
              around the customer. We supply businesses that buy food to cook,
              serve or resell, and we plan around an agreed purchasing programme
              rather than selling one-off quantities from a website.
            </p>
          </Reveal>

          <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { term: String(CATALOGUE_COUNTS.total), label: "Products in the range" },
              { term: String(CATEGORIES.length), label: "Supply ranges" },
              { term: String(normCount), label: "NORM canned foods" },
              { term: "400 ml", label: "NORM can format" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-[6px] border border-teal-100 bg-ivory/60 p-5"
              >
                <dt className="font-serif text-[2rem] leading-none text-teal-800">
                  {stat.term}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ------------------------------------------------------------ Categories */}
      <section className="bg-ivory" aria-labelledby="categories-heading">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            id="categories-heading"
            eyebrow="Product categories"
            title="What we supply"
            description={`${CATEGORIES.length} ranges, each with its own product pages, confirmed facts and supply notes.`}
          />
          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {CATEGORIES.map((category, index) => (
              <Reveal key={category.id} as="li" delay={index * 70} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-[6px] border border-teal-100 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(8,75,80,0.08)] sm:flex-row">
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-ivory-dark sm:aspect-auto sm:w-40">
                    <Image
                      src={category.image.src}
                      alt={category.image.alt}
                      fill
                      loading="lazy"
                      sizes="160px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-serif text-[1.1875rem] text-teal-800">
                      {category.name}
                    </h3>
                    <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                      {category.summary}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {category.groups.map((group) => (
                        <li
                          key={group.id}
                          className="rounded-full border border-teal-200 px-2.5 py-1 text-xs font-medium text-muted"
                        >
                          {group.name}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/products/${category.slug}/`}
                      className="link-underline link-underline-hover mt-4 inline-flex min-h-11 items-center text-[0.9375rem] font-semibold text-teal-800"
                    >
                      {category.ctaLabel}
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ----------------------------------------------------------------- NORM */}
      <section className="on-dark bg-white" aria-labelledby="profile-norm">
        <Container className="py-16 sm:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <SectionHeading
                id="profile-norm"
                eyebrow="Product brand"
                title="NORM"
                description={`${SITE.brandLine}. Fourteen choices in a 400 ml easy-open can format, across beans and pulses, vegetables and tomatoes.`}
              />
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted">
                400 ml refers to the can format, not net weight. Final net contents,
                drained weights and label details are confirmed by product
                specification. NORM San Marzano Tomatoes are a product of Italy with
                British English and Italian pack wording; that origin applies to
                San Marzano only.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/norm/">About NORM</Button>
                <Button href="/products/canned-food/" variant="secondary">
                  Explore NORM products
                </Button>
              </div>
            </div>
            <div className="lg:col-span-6">
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {getProductsByCategory("canned-food").map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.category}/${product.slug}/`}
                      className="flex min-h-12 items-center rounded-[3px] border border-teal-100 bg-ivory px-3.5 py-2 text-[0.875rem] font-medium text-teal-800 transition-colors hover:border-teal-800"
                    >
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------- Supply approach */}
      <section className="on-dark bg-teal-800" aria-labelledby="profile-supply">
        <Container className="py-16 sm:py-20">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-copper-400">Supply approach</p>
            <h2
              id="profile-supply"
              className="mt-4 text-[1.875rem] leading-[1.15] sm:text-[2.25rem]"
            >
              Planned full-load supply.
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-[1.7] text-teal-100">
              We focus on planned full-load B2B supply. Tell us the products,
              quantities and delivery schedule you have in mind, and we will review a
              programme around your requirements.
            </p>
          </Reveal>
          <ol className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "01",
                title: "Share your brief",
                body: "Products, quantities, specification and delivery requirements.",
              },
              {
                number: "02",
                title: "Agree specifications",
                body: "We review product, variety, quality and packing requirements.",
              },
              {
                number: "03",
                title: "Plan supply",
                body: "Orders are planned around the agreed purchasing programme.",
              },
              {
                number: "04",
                title: "Confirm delivery",
                body: "Load configuration, delivery terms and timing are confirmed with the quotation.",
              },
            ].map((step) => (
              <li
                key={step.number}
                className="rounded-[6px] border border-teal-700/50 bg-teal-700/30 p-6"
              >
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-copper-600 font-serif text-[1.125rem] font-semibold text-ivory"
                >
                  {step.number}
                </span>
                <h3 className="mt-4 font-serif text-[1.1875rem] text-ivory">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-teal-100">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-3xl border-l-2 border-copper-400 pl-5 text-[0.9375rem] leading-relaxed text-teal-100">
            A typical initial delivery is approximately 24&ndash;25 pallets,
            subject to product weight, pallet format and vehicle capacity. Final
            load configuration and delivery terms are confirmed with your
            quotation.
          </p>
        </Container>
      </section>

      {/* ------------------------------------------------------------ Contact CTA */}
      <section className="on-dark border-t border-teal-100 bg-white" aria-labelledby="profile-contact">
        <Container className="py-14 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <h2 id="profile-contact" className="text-[1.5rem] leading-snug sm:text-[1.75rem]">
                Talk to us about your requirements.
              </h2>
              <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-muted">
                Send the products, specification, quantity, pack format and delivery
                schedule you have in mind, and we will review the supply options
                with you.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/enquire/" size="lg">
                  Discuss your requirements
                </Button>
                <ProfileDownload size="lg" />
              </div>
            </div>
            <div className="lg:col-span-6">
              <address className="not-italic text-[0.9375rem] leading-relaxed text-muted">
                <span className="block font-semibold text-teal-800">{SITE.name}</span>
                <span className="mt-3 flex gap-2.5">
                  <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-copper-600" />
                  <span>
                    {SITE.address.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </span>
                <a
                  href={`mailto:${SITE.email}`}
                  className="link-underline link-underline-hover mt-3 flex min-h-11 items-center gap-2.5"
                >
                  <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-copper-600" />
                  {SITE.email}
                </a>
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="link-underline link-underline-hover flex min-h-11 items-center gap-2.5"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-copper-600" />
                  {SITE.phone}
                </a>
              </address>
              <div className="mt-6">
                <Image
                  src={IMAGES.kitchenTeam.src}
                  alt={IMAGES.kitchenTeam.alt}
                  width={600}
                  height={400}
                  loading="lazy"
                  sizes="600px"
                  className="h-auto w-full rounded-[4px] border border-teal-100 object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

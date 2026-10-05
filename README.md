# The Lyndon Cook — website

B2B food supply website for **The Lyndon Cook** (our canned range is a product
brand within the company, not a replacement for its name).

Built from `F:\web\The_Lyndon_Cook_Food_Company_Master_Website_Prompt.md`, which
is the authoritative brief for content and behaviour.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 ·
Zod + react-hook-form · Nodemailer · Lucide icons

## Getting started

```bash
npm install          # use `npm.cmd` in PowerShell — npm.ps1 is blocked by policy
cp .env.example .env.local
npm run dev          # http://localhost:3000
```

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (also type-checks) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run assets` | Regenerate the OG image and the company profile PDF |

`npm run assets` must be re-run whenever brand colours, the logo composition or
the catalogue changes. Both generators are deterministic and dependency-free (the
PDF writer is hand-rolled; sharp comes with Next.js).

## Routes

| Route | Notes |
| --- | --- |
| `/` | Homepage |
| `/products/` | Searchable, filterable catalogue (all 41 products) |
| `/products/rice/`, `/spices/`, `/seasonal-fruit/`, `/canned-food/` | Category pages |
| `/products/[category]/[slug]/` | Product detail, 41 prerendered pages |
| `/norn/`, `/how-we-supply/`, `/about/`, `/company-profile/` | Editorial pages |
| `/enquire/` | Enquiry form (pre-selects a product via `?product=<slug>`) |
| `/thank-you/` | Confirmation, `noindex` |
| `/privacy/`, `/cookies/`, `/accessibility/` | Legal |
| `/api/enquiry` | `POST` only |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | Generated |

## Enquiry pipeline

`components/EnquiryForm.tsx` → `app/api/enquiry/route.ts` → `lib/email.ts`

The route applies, in order: body-size cap, per-IP rate limit, Zod validation,
honeypot, minimum fill time, header sanitisation, then SMTP delivery. It returns
a **502 rather than a success** when nothing durable accepted the enquiry, so a
misconfigured mail relay can never show a false confirmation to a real customer.

Honeypot and fast-submission rejections return `200 { ok: true }` with no
delivery, so an automated client cannot learn which check it tripped.

## Content rules (enforced, not just documented)

* No prices, offers, discounts, stock levels, lead-time promises or minimum
  order values anywhere — the site is enquiry-driven, not transactional.
* No certifications, supplier claims, ratings, reviews or testimonials.
* No legal suffix on the company name, because the legal entity is unconfirmed.
* `400 ml` is a **can format**, not a net weight.
* Quantities are never converted between units.
* Product photography is licensed placeholder stock.

These are checked by the build-time audits described below and by the content in
`lib/`.

## Before launch

Blocked on client input, tracked as `TODO` in the code:

1. **Approved photography** — replace the Pexels URLs in `lib/images.ts`.
2. **SMTP credentials** — set in `.env.local`/hosting env. Without them the form
   returns 502 by design.
3. **Legal entity name, company number, registered office** — currently `null` in
   `lib/site.ts` and called out on `/privacy/`.
4. **Named email/hosting/webhook suppliers** — `/privacy/` states these
   explicitly rather than naming unconfirmed processors.
6. **Privacy and accessibility pages need review by a solicitor / specialist.**
   They are honest drafts, not legal advice.

## Gotchas worth knowing

* **Never add a root `loading.tsx` alongside a page that can 404 from inside
  render.** The Suspense boundary makes `notFound()` stream *after* the status
  line, producing HTTP 200 with a blank page. Both catalogue routes therefore set
  `dynamicParams = false` so unknown URLs are rejected at the routing layer.
* `next/image` only allows `images.pexels.com`. Local images need no config.
* `lib/seo.ts` uses a single brand share card; the remote photos are not
  1200×630, so declaring those dimensions for them would be wrong.

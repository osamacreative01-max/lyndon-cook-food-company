/**
 * Generates the Open Graph / Twitter share image and the Apple touch icon.
 *
 * Both are produced from vector source so they can be regenerated at any time
 * after a brand change. Rasterisation uses sharp (already present as a Next.js
 * dependency for production image optimisation) — no extra packages.
 *
 *   node scripts/generate-og-image.mjs
 */

import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const TEAL = "#084B50";
const TEAL_DEEP = "#063A3E";
const IVORY = "#F6F2EA";
const COPPER = "#C8813C";
const MUTED = "#B9CBC7";

/* --------------------------------------------------------------- OG (1200x630) */

function openGraphSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="field" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${TEAL}"/>
      <stop offset="100%" stop-color="${TEAL_DEEP}"/>
    </linearGradient>
    <linearGradient id="wash" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="${TEAL_DEEP}" stop-opacity="0.9"/>
      <stop offset="60%" stop-color="${TEAL}" stop-opacity="0.15"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#field)"/>
  <rect width="1200" height="630" fill="url(#wash)"/>

  <!-- emblem -->
  <g transform="translate(96 150)">
    <circle cx="44" cy="44" r="44" fill="none" stroke="${COPPER}" stroke-width="2" opacity="0.85"/>
    <path d="M44 76V14" stroke="${IVORY}" stroke-width="3" stroke-linecap="round"/>
    <path d="M44 27c-6.3-1.7-10.1-5.5-11.7-11.2 6.5-.3 10.4 2.8 11.7 8.4V27Z" fill="${IVORY}"/>
    <path d="M44 27c6.3-1.7 10.1-5.5 11.7-11.2-6.5-.3-10.4 2.8-11.7 8.4V27Z" fill="${IVORY}"/>
    <path d="M44 40c-6.3-1.7-10.1-5.5-11.7-11.2 6.5-.3 10.4 2.8 11.7 8.4V40Z" fill="#C9A227"/>
    <path d="M44 40c6.3-1.7 10.1-5.5 11.7-11.2-6.5-.3-10.4 2.8-11.7 8.4V40Z" fill="#C9A227"/>
    <path d="M44 53c-6.3-1.7-10.1-5.5-11.7-11.2 6.5-.3 10.4 2.8 11.7 8.4V53Z" fill="${IVORY}"/>
    <path d="M44 53c6.3-1.7 10.1-5.5 11.7-11.2-6.5-.3-10.4 2.8-11.7 8.4V53Z" fill="${IVORY}"/>
    <path d="M44 66c-6.3-1.7-10.1-5.5-11.7-11.2 6.5-.3 10.4 2.8 11.7 8.4V66Z" fill="${IVORY}"/>
    <path d="M44 66c6.3-1.7 10.1-5.5 11.7-11.2-6.5-.3-10.4 2.8-11.7 8.4V66Z" fill="${IVORY}"/>
  </g>

  <!-- wordmark -->
  <text x="228" y="190" fill="${IVORY}" font-family="Georgia, 'Times New Roman', serif" font-size="60" font-weight="600" letter-spacing="0.5">The Lyndon Cook</text>
  <text x="230" y="238" fill="${MUTED}" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="24" font-weight="600" letter-spacing="11">FOOD COMPANY</text>
  <line x1="96" y1="278" x2="1104" y2="278" stroke="${COPPER}" stroke-width="3"/>

  <!-- proposition -->
  <text x="96" y="352" fill="${MUTED}" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="30" letter-spacing="1.4">Wholesale food supply to the UK</text>

  <!-- categories -->
  <g font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="34" font-weight="600" fill="${IVORY}">
    <text x="96" y="440">Rice</text>
    <text x="360" y="440">Spices</text>
    <text x="620" y="440">Seasonal Fruit</text>
    <text x="934" y="440">Canned Foods</text>
  </g>
  <g stroke="${COPPER}" stroke-width="2">
    <line x1="96" y1="462" x2="288" y2="462"/>
    <line x1="360" y1="462" x2="530" y2="462"/>
    <line x1="620" y1="462" x2="880" y2="462"/>
    <line x1="934" y1="462" x2="1104" y2="462"/>
  </g>

  <!-- Canned foods -->
  <text x="96" y="546" fill="${COPPER}" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="5">CANNED FOODS</text>
  <text x="196" y="546" fill="${MUTED}" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="24">A brand from The Lyndon Cook</text>

  <text x="1104" y="546" fill="${MUTED}" text-anchor="end" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="24" letter-spacing="0.6">www.tlcfc.co.uk</text>
  <text x="1104" y="586" fill="#8FAAA5" text-anchor="end" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="20">Enquire online — no account required</text>
</svg>`;
}

/* ------------------------------------------------------------ Apple icon (180) */

function appleIconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="0" fill="${TEAL}"/>
  <g transform="translate(90 92) scale(2.1) translate(-16 -16)" fill="none">
    <path d="M16 25V8" stroke="${IVORY}" stroke-width="2" stroke-linecap="round"/>
    <path d="M16 13.2c-3.4-.9-5.4-2.9-6.3-6 3.4-.1 5.5 1.5 6.3 4.5v1.5Z" fill="${IVORY}"/>
    <path d="M16 13.2c3.4-.9 5.4-2.9 6.3-6-3.4-.1-5.5 1.5-6.3 4.5v1.5Z" fill="${IVORY}"/>
    <path d="M16 19.6c-3.4-.9-5.4-2.9-6.3-6 3.4-.1 5.5 1.5 6.3 4.5v1.5Z" fill="#C9A227"/>
    <path d="M16 19.6c3.4-.9 5.4-2.9 6.3-6-3.4-.1-5.5 1.5-6.3 4.5v1.5Z" fill="#C9A227"/>
    <path d="M16 26c-3.4-.9-5.4-2.9-6.3-6 3.4-.1 5.5 1.5 6.3 4.5V26Z" fill="${IVORY}"/>
    <path d="M16 26c3.4-.9 5.4-2.9 6.3-6-3.4-.1-5.5 1.5-6.3 4.5V26Z" fill="${IVORY}"/>
  </g>
</svg>`;
}

/* --------------------------------------------------------------------- write */

async function main() {
  await mkdir(path.join(root, "public", "images"), { recursive: true });

  const ogPath = path.join(root, "public", "images", "og.jpg");
  await sharp(Buffer.from(openGraphSvg()))
    .resize(1200, 630, { fit: "cover" })
    .flatten({ background: TEAL_DEEP })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(ogPath);
  console.log("wrote", path.relative(root, ogPath));

  const applePath = path.join(root, "app", "apple-icon.png");
  await sharp(Buffer.from(appleIconSvg()))
    .resize(180, 180, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .toFile(applePath);
  console.log("wrote", path.relative(root, applePath));

  // Keeps the favicon in app/ byte-identical to the source artwork.
  await copyFile(
    path.join(root, "public", "Favicon.png"),
    path.join(root, "app", "icon.png")
  );
  console.log("wrote app/icon.png");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

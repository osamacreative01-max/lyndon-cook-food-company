/**
 * Generates `public/downloads/company-profile.pdf`.
 *
 * A self-contained PDF writer (no external packages) so the profile can always
 * be regenerated. Content is pulled from the live data modules via Node's
 * native TypeScript type-stripping plus a small alias hook, so the document can
 * never drift from the website catalogue.
 *
 * Editorial rules inherited from the master build brief and enforced here:
 *  - no prices, offers, discounts or minimum order values
 *  - no stock, availability or lead-time promises
 *  - no certifications, accreditations, supplier or origin claims
 *  - no legal suffix, because the legal entity is unconfirmed
 *  - NORN is a brand within the company, never a replacement for its name
 *
 *   node scripts/generate-company-profile-pdf.mjs
 */

import { mkdir, writeFile } from "node:fs/promises";
import { registerHooks } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

/* ----------------------------------------------- data modules (TS, aliased) */

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      const target = path.join(root, specifier.slice(2));
      const withExt = /\.(ts|tsx|js|mjs|json)$/.test(target) ? target : `${target}.ts`;
      return nextResolve(pathToFileURL(withExt).href, context);
    }
    return nextResolve(specifier, context);
  },
});

const { SITE } = await import(pathToFileURL(path.join(root, "lib", "site.ts")).href);
const { CATEGORIES } = await import(
  pathToFileURL(path.join(root, "lib", "categories.ts")).href
);
const { ACTIVE_PRODUCTS } = await import(
  pathToFileURL(path.join(root, "lib", "products.ts")).href
);

/* ------------------------------------------------------------------ colours */

const TEAL = [0.031, 0.294, 0.314];
const TEAL_DEEP = [0.024, 0.227, 0.243];
const COPPER = [0.784, 0.506, 0.235];
const INK = [0.145, 0.149, 0.141];
const MUTED = [0.353, 0.369, 0.353];
const IVORY = [0.965, 0.949, 0.918];
const RULE = [0.855, 0.855, 0.828];

/* ------------------------------------------------------------- font metrics */

const W = {
  Helvetica: [
    278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278,
    556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556,
    1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778,
    667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556,
    333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556,
    556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584,
  ],
  "Helvetica-Bold": [
    278, 333, 474, 556, 556, 889, 722, 238, 333, 333, 389, 584, 278, 333, 278, 278,
    556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 333, 333, 584, 584, 584, 611,
    975, 722, 722, 722, 722, 667, 611, 778, 722, 278, 556, 722, 611, 833, 722, 778,
    667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 333, 278, 333, 584, 556,
    333, 556, 611, 556, 611, 556, 333, 611, 611, 278, 278, 556, 278, 889, 611, 611,
    611, 611, 389, 556, 333, 611, 556, 778, 556, 556, 500, 389, 280, 389, 584,
  ],
  "Times-Roman": [
    250, 333, 408, 500, 500, 833, 778, 180, 333, 333, 500, 564, 250, 333, 250, 278,
    500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 278, 278, 564, 564, 564, 444,
    921, 722, 667, 667, 722, 611, 556, 722, 722, 333, 389, 722, 611, 889, 722, 722,
    556, 722, 667, 556, 611, 722, 722, 944, 722, 722, 611, 333, 278, 333, 469, 500,
    333, 444, 500, 444, 500, 444, 333, 500, 500, 278, 278, 500, 278, 778, 500, 500,
    500, 500, 333, 389, 278, 500, 500, 722, 500, 500, 444, 480, 200, 480, 541,
  ],
  "Times-Bold": [
    250, 333, 555, 500, 500, 1000, 833, 278, 333, 333, 500, 570, 250, 333, 250, 278,
    500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 333, 333, 570, 570, 570, 500,
    930, 722, 667, 722, 722, 667, 611, 778, 778, 389, 500, 778, 667, 944, 722, 778,
    611, 778, 722, 556, 667, 722, 722, 1000, 722, 722, 667, 333, 278, 333, 581, 500,
    333, 500, 556, 444, 556, 444, 333, 500, 556, 278, 333, 556, 278, 833, 556, 500,
    556, 556, 444, 389, 333, 556, 500, 722, 500, 500, 444, 394, 220, 394, 520,
  ],
};

const EXTRA_WIDTHS = {
  0x2014: 1000, // em dash
  0x2013: 556, // en dash
  0x2018: 222,
  0x2019: 222,
  0x201c: 333,
  0x201d: 333,
  0x2022: 350, // bullet
  0x00b7: 278, // middle dot
  0x00a3: 556, // pound
  0x2026: 1000,
};

/* --------------------------------------------------------- WinAnsi encoding */

const WINANSI = {
  0x2014: 0x97,
  0x2013: 0x96,
  0x2018: 0x91,
  0x2019: 0x92,
  0x201c: 0x93,
  0x201d: 0x94,
  0x2022: 0x95,
  0x2026: 0x85,
  0x20ac: 0x80,
};

function toWinAnsi(text) {
  let out = "";
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    if (cp <= 0xff) {
      out += String.fromCharCode(cp);
    } else if (WINANSI[cp] !== undefined) {
      out += String.fromCharCode(WINANSI[cp]);
    } else {
      out += "?";
    }
  }
  return out;
}

function charWidth(code, fontName) {
  const table = W[fontName];
  if (code >= 0x20 && code <= 0x7e) return table[code - 0x20];
  if (EXTRA_WIDTHS[code] !== undefined) return EXTRA_WIDTHS[code];
  return Math.round(table[0] * 2);
}

function measure(text, fontName, size) {
  let total = 0;
  for (const ch of toWinAnsi(text)) total += charWidth(ch.charCodeAt(0), fontName);
  return (total * size) / 1000;
}

function wrap(text, fontName, size, maxWidth) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && measure(candidate, fontName, size) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/* ------------------------------------------------------------- PDF assembler */

const PAGE = { width: 595.28, height: 841.89 };
const M = { top: 56, right: 56, bottom: 62, left: 56 };
const CONTENT_WIDTH = PAGE.width - M.left - M.right;

class Document {
  constructor() {
    this.pages = [];
    this.current = [];
    this.y = PAGE.height - M.top;
    this.pendingFooter = null;
  }

  newPage() {
    this.flush();
    this.current = [];
    this.y = PAGE.height - M.top;
  }

  /**
   * Queues a running footer for whichever page is current when the page is
   * flushed, so continuation pages created mid-flow are numbered too.
   */
  stampFooter(label) {
    this.pendingFooter = label;
  }

  flush() {
    if (this.current.length) {
      // Guard rail: content that ran past the bottom of the page box is a bug,
      // and a broken PDF is worse than a failed build.
      if (this.y < 30) {
        throw new Error(
          `Content overflowed the page box (cursor at y=${this.y.toFixed(1)}). ` +
            `Add a sectionBreak() before the block that does not fit.`
        );
      }
      if (this.pendingFooter) this.runningFooter(this.pendingFooter);
      this.pages.push(this.current.join("\n"));
    }
    this.current = [];
    this.pendingFooter = null;
  }

  fill(color) {
    this.current.push(`${color.map((c) => c.toFixed(3)).join(" ")} rg`);
  }

  strokeColor(color) {
    this.current.push(`${color.map((c) => c.toFixed(3)).join(" ")} RG`);
  }

  rect(x, y, w, h, color) {
    this.fill(color);
    this.current.push(`${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f`);
  }

  line(x1, y1, x2, y2, width = 0.8, color = RULE) {
    this.strokeColor(color);
    this.current.push(
      `${width} w ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`
    );
  }

  text(x, y, value, { size = 10, font = "Helvetica", color = INK } = {}) {
    const safe = toWinAnsi(value)
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)");
    this.fill(color);
    this.current.push(
      `BT /${font} ${size} Tf ${color.map((c) => c.toFixed(3)).join(" ")} rg ` +
        `${x.toFixed(2)} ${y.toFixed(2)} Td (${safe}) Tj ET`
    );
  }

  /* ------------------------------------------------------------- flow items */

  heading(value, { size = 20, color = TEAL, spaceBefore = 0, spaceAfter = 8 } = {}) {
    this.y -= spaceBefore;
    const lines = wrap(value, "Times-Bold", size, CONTENT_WIDTH);
    for (const line of lines) {
      this.y -= size;
      this.text(M.left, this.y, line, { size, font: "Times-Bold", color });
      this.y -= size * 0.34;
    }
    this.y -= spaceAfter;
  }

  para(value, { size = 9.5, color = MUTED, leading = 14.5, spaceAfter = 10 } = {}) {
    const lines = wrap(value, "Helvetica", size, CONTENT_WIDTH);
    for (const line of lines) {
      this.y -= leading;
      this.text(M.left, this.y, line, { size, color });
    }
    this.y -= spaceAfter;
  }

  bullet(value, { size = 9.5, color = MUTED, leading = 13.5, indent = 12 } = {}) {
    const lines = wrap(value, "Helvetica", size, CONTENT_WIDTH - indent);
    lines.forEach((line, index) => {
      this.y -= leading;
      if (index === 0) {
        this.text(M.left + 2, this.y, "\u2022", { size, color: COPPER, font: "Helvetica-Bold" });
      }
      this.text(M.left + indent, this.y, line, { size, color });
    });
    this.y -= 6;
  }

  labelled(label, body, { size = 9.5 } = {}) {
    const labelWidth = measure(`${label} `, "Helvetica-Bold", size);
    const lines = wrap(body, "Helvetica", size, CONTENT_WIDTH - labelWidth);
    lines.forEach((line, index) => {
      this.y -= 13.5;
      if (index === 0) {
        this.text(M.left, this.y, `${label} `, {
          size,
          font: "Helvetica-Bold",
          color: TEAL,
        });
        this.text(M.left + labelWidth, this.y, line, { size, color: INK });
      } else {
        this.text(M.left + labelWidth, this.y, line, { size, color: INK });
      }
    });
    this.y -= 6;
  }

  rule({ spaceBefore = 6, spaceAfter = 12, color = RULE, width = 0.8 } = {}) {
    this.y -= spaceBefore;
    this.line(M.left, this.y, PAGE.width - M.right, this.y, width, color);
    this.y -= spaceAfter;
  }

  gap(amount) {
    this.y -= amount;
  }

  /* Page furniture ------------------------------------------------------- */

  runningFooter(label) {
    const y = M.bottom - 22;
    this.line(M.left, y + 16, PAGE.width - M.right, y + 16, 0.6, RULE);
    this.text(M.left, y, label, { size: 7.5, color: MUTED });
    this.text(PAGE.width - M.right, y, `${this.pages.length + 1}`, {
      size: 7.5,
      color: MUTED,
    });
    this.text(PAGE.width / 2, y, SITE.domain, { size: 7.5, color: COPPER });
  }
}

/* ------------------------------------------------------------------ content */

/** Starts a fresh page and re-arms the running footer for continuation pages. */
function sectionBreak(doc) {
  doc.newPage();
  doc.stampFooter("Company profile");
}

function pageCover(doc) {
  const { width, height } = PAGE;

  doc.rect(0, height - 300, width, 300, TEAL);
  doc.rect(0, height - 306, width, 6, COPPER);
  doc.rect(0, 0, width, 84, TEAL_DEEP);

  // Emblem, drawn with primitives so the PDF needs no embedded images.
  const cx = 92;
  const cy = height - 132;
  const ring = [];
  ring.push(`${cx + 34} ${cy} m`);
  for (let step = 1; step <= 48; step += 1) {
    const angle = (Math.PI * 2 * step) / 48;
    ring.push(`${(cx + 34 * Math.cos(angle)).toFixed(2)} ${(cy + 34 * Math.sin(angle)).toFixed(2)} l`);
  }
  doc.strokeColor(COPPER);
  doc.current.push("1.2 w");
  doc.current.push(`${ring.join(" ")} S`);
  doc.text(cx - 4, cy + 4, "L", { size: 34, font: "Times-Bold", color: IVORY });
  // No founding year here: the brief lists "Years in business" as a fact that
  // must not be invented, and no year is confirmed by the client.

  doc.text(158, cy + 22, "The Lyndon Cook", { size: 30, font: "Times-Bold", color: IVORY });
  doc.text(158, cy - 12, "F O O D   C O M P A N Y", {
    size: 10,
    font: "Helvetica-Bold",
    color: IVORY,
  });
  doc.line(158, cy - 34, width - 84, cy - 34, 2, COPPER);
  doc.text(158, cy - 56, "WHOLESALE FOOD SUPPLY", {
    size: 9,
    font: "Helvetica-Bold",
    color: MUTED,
  });

  doc.text(84, height - 340, "Company profile", { size: 34, font: "Times-Bold", color: TEAL });
  doc.line(84, height - 356, 84 + 96, height - 356, 2.5, COPPER);
  doc.text(84, height - 384, "Rice \u00b7 Spices \u00b7 Seasonal fruit \u00b7 Canned foods", {
    size: 13,
    color: INK,
  });

  const intro =
    `${SITE.name} supplies food businesses across the UK across four categories: rice, ` +
    `spices and seasonings, seasonal fruit, and the ${SITE.productBrand} range of canned foods. ` +
    `Supply is planned around each customer's requirements, with product, specification, ` +
    `quantity, delivery and commercial terms confirmed for every programme.`;
  let y = height - 420;
  for (const line of wrap(intro, "Helvetica", 10.5, CONTENT_WIDTH - 56)) {
    y -= 16;
    doc.text(84, y, line, { size: 10.5, color: MUTED });
  }

  // Contact block
  const blockTop = y - 46;
  doc.rect(84, blockTop - 96, PAGE.width - 168, 96, IVORY);
  doc.text(100, blockTop - 26, "GET IN TOUCH", { size: 8, font: "Helvetica-Bold", color: COPPER });
  const contact = [
    ["Email", SITE.email],
    ["Telephone", SITE.phone],
    ["Address", SITE.address.formatted],
    ["Online", `https://${SITE.domain}/enquire/`],
  ];
  let cyLine = blockTop - 46;
  for (const [label, value] of contact) {
    doc.text(100, cyLine, label, { size: 9, font: "Helvetica-Bold", color: TEAL });
    doc.text(168, cyLine, value, { size: 9, color: INK });
    cyLine -= 14;
  }

  doc.text(84, 44, SITE.brandLine.toUpperCase(), {
    size: 8,
    font: "Helvetica-Bold",
    color: MUTED,
  });
  doc.text(PAGE.width - 84, 44, SITE.domain, { size: 8, font: "Helvetica-Bold", color: COPPER });
  doc.newPage();
}

function pageOverview(doc) {
  doc.stampFooter("Company profile");
  doc.heading("Company overview");

  doc.para(
    `${SITE.name} is a UK food supply business working with food manufacturers, ` +
      `wholesalers, caterers, retailers and food service operators. The catalogue is ` +
      `organised into four categories, and every enquiry is handled as a commercial ` +
      `conversation rather than a transaction.`
  );

  doc.para(
    `The business does not publish prices, stock levels or fixed lead times online. ` +
      `Product specification, pack format, volume, delivery schedule and price are ` +
      `agreed in writing for each supply programme, which is why an enquiry usually ` +
      `needs a little more detail than a shopping basket would.`
  );

  doc.heading("What we supply", { size: 15, spaceBefore: 6, spaceAfter: 8 });

  for (const category of CATEGORIES) {
    if (doc.y < 220) sectionBreak(doc);
    const count = ACTIVE_PRODUCTS.filter((p) => p.category === category.slug).length;
    doc.text(M.left, doc.y - 13, category.name, {
      size: 12,
      font: "Times-Bold",
      color: TEAL,
    });
    doc.text(M.left, doc.y - 13, `${count} product${count === 1 ? "" : "s"}`, {
      size: 8.5,
      font: "Helvetica-Bold",
      color: COPPER,
    });
    doc.y -= 24;
    for (const line of wrap(category.seoDescription, "Helvetica", 9.5, CONTENT_WIDTH)) {
      doc.y -= 13.5;
      doc.text(M.left, doc.y, line, { size: 9.5, color: MUTED });
    }
    if (category.groups?.length) {
      const groups = category.groups.map((g) => g.name).join(" \u00b7 ");
      for (const line of wrap(groups, "Helvetica", 8.5, CONTENT_WIDTH)) {
        doc.y -= 12;
        doc.text(M.left, doc.y, line, { size: 8.5, font: "Helvetica-Bold", color: INK });
      }
    }
    doc.y -= 12;
  }

  if (doc.y < 260) sectionBreak(doc);
  doc.heading("Working with us", { size: 15, spaceBefore: 6, spaceAfter: 8 });
  const points = [
    "Enquiries are answered by the people who handle supply, not a call centre.",
    "Specifications are confirmed in writing before any programme is agreed.",
    "Quantities are discussed in the unit that suits the customer; units are never converted on their behalf.",
    `Volumes are planned, with typical full-load supply across the range.`,
    `${SITE.productBrand} canned foods use a 400 ml can format, which is a pack format rather than a stated net weight.`,
  ];
  for (const point of points) doc.bullet(point);
  doc.newPage();
}

function pageSupply(doc) {
  doc.stampFooter("Company profile");
  doc.heading("How we supply");

  const steps = [
    [
      "01",
      "Enquiry",
      "Send the product, specification, quantity, destination and delivery schedule through the enquiry form, or by email or telephone. An account is not required.",
    ],
    [
      "02",
      "Requirements",
      "The enquiry is reviewed against the catalogue. Where a requirement sits outside the standard range, that is said plainly before anything is quoted.",
    ],
    [
      "03",
      "Quotation",
      "Price, delivery schedule, pack format and terms are set out in writing. Nothing on this profile constitutes an offer.",
    ],
    [
      "04",
      "Supply programme",
      "Volumes, delivery cadence and any site requirements are agreed. Requirements are reviewed as they change, and confirmed revisions are issued in writing.",
    ],
  ];

  for (const [number, title, body] of steps) {
    if (doc.y < 200) sectionBreak(doc);
    doc.text(M.left, doc.y - 15, number, { size: 13, font: "Times-Bold", color: COPPER });
    doc.text(M.left + 34, doc.y - 15, title, {
      size: 12,
      font: "Times-Bold",
      color: TEAL,
    });
    doc.y -= 32;
    for (const line of wrap(body, "Helvetica", 9.5, CONTENT_WIDTH - 34)) {
      doc.y -= 13.5;
      doc.text(M.left + 34, doc.y, line, { size: 9.5, color: MUTED });
    }
    doc.y -= 16;
  }

  if (doc.y < 200) sectionBreak(doc);
  doc.rule({ spaceBefore: 6, spaceAfter: 14 });
  doc.text(M.left, doc.y - 12, "NEXT STEP", {
    size: 8,
    font: "Helvetica-Bold",
    color: COPPER,
  });
  doc.y -= 32;
  for (const line of wrap(
    `Send an enquiry at https://${SITE.domain}/enquire/ describing the product, ` +
      `specification, quantity, delivery destination and schedule, or contact the team directly.`,
    "Helvetica",
    9.5,
    CONTENT_WIDTH
  )) {
    doc.y -= 14;
    doc.text(M.left, doc.y, line, { size: 9.5, color: INK });
  }
  doc.newPage();
}

/** Commercial notes are a standing disclaimer, so they sit with the contact block. */
const COMMERCIAL_NOTES = [
  "No prices, discounts or offers are published in this profile, and there is no checkout.",
  "No minimum order value, stock level or availability is stated, and no delivery date is promised in advance.",
  "Product origin, certification and specification details are confirmed per enquiry rather than generalised here.",
  "This document is information only. It is not an offer, a contract, or a substitute for a written quotation.",
];

function pageRange(doc) {
  doc.stampFooter("Company profile");
  doc.heading("Product range");
  doc.para(
    `${ACTIVE_PRODUCTS.length} products across four categories. The list below is the ` +
      `current catalogue index; individual specification details are confirmed per enquiry.`
  );

  const gap = 24;
  const columnWidth = (CONTENT_WIDTH - gap) / 2;
  const top = doc.y;
  const floor = 150;

  let column = 0;
  let cursor = top;

  /** Moves to the next column, starting a new page once both are used up. */
  const advance = () => {
    if (column === 0) {
      column = 1;
      cursor = top;
    } else {
      sectionBreak(doc);
      column = 0;
      cursor = top;
    }
  };

  const ensure = (space) => {
    if (cursor - space < floor) advance();
  };

  const left = () => M.left + column * (columnWidth + gap);
  const right = () => left() + columnWidth;

  for (const category of CATEGORIES) {
    const items = ACTIVE_PRODUCTS.filter((p) => p.category === category.slug);
    ensure(24 + items.length * 13 + 10);

    cursor -= 24;
    doc.text(left(), cursor, category.name.toUpperCase(), {
      size: 8,
      font: "Helvetica-Bold",
      color: COPPER,
    });
    doc.line(left(), cursor - 5, right(), cursor - 5, 0.6, RULE);
    cursor -= 14;

    for (const item of items) {
      cursor -= 13;
      const bullet = `\u2022 ${item.name}`;
      const nameFits = measure(bullet, "Helvetica", 9) + 10;
      const tagFits = measure(item.subgroupName, "Helvetica", 8);
      doc.text(left(), cursor, bullet, { size: 9, color: INK });
      if (nameFits + tagFits < columnWidth) {
        doc.text(right(), cursor, item.subgroupName, { size: 8, color: MUTED });
      }
    }
    cursor -= 10;
  }

  // Resume single-column flow below the list, or start a fresh page when the
  // list used up the full height.
  if (cursor < floor + 200) sectionBreak(doc);
  else doc.y = cursor - 6;
  doc.rule({ spaceBefore: 10, spaceAfter: 16 });
  doc.heading("Commercial notes", { size: 15, spaceAfter: 8 });
  for (const note of COMMERCIAL_NOTES) doc.bullet(note);

  doc.rule({ spaceBefore: 8, spaceAfter: 16 });
  doc.heading("Contact", { size: 15, spaceAfter: 10 });
  doc.labelled("Email", SITE.email);
  doc.labelled("Telephone", SITE.phone);
  doc.labelled("Address", SITE.address.formatted);
  doc.labelled("Online", `https://${SITE.domain}/enquire/`);

  doc.gap(18);
  for (const line of wrap(
    `This profile is a summary prepared for prospective business customers. It does not ` +
      `contain an offer, and the legal entity name, company registration number and ` +
      `registered office will be stated in the quotation and on the website once confirmed.`,
    "Helvetica",
    8.5,
    CONTENT_WIDTH
  )) {
    doc.y -= 12;
    doc.text(M.left, doc.y, line, { size: 8.5, color: MUTED });
  }
  doc.newPage();
}

/* ------------------------------------------------------------------- serialise */

function serialise(doc) {
  doc.flush();

  const objects = [];
  const add = (body) => {
    objects.push(body);
    return objects.length; // 1-based object number
  };

  const catalogRef = add(""); // 1, patched later
  const pagesRef = add(""); // 2, patched later

  const fontRefs = {
    Helvetica: add(
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>"
    ),
    "Helvetica-Bold": add(
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>"
    ),
    "Times-Roman": add(
      "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman /Encoding /WinAnsiEncoding >>"
    ),
    "Times-Bold": add(
      "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold /Encoding /WinAnsiEncoding >>"
    ),
  };

  const fontResource = `/Font << ${Object.entries(fontRefs)
    .map(([name, ref]) => `/${name === "Helvetica" ? "F1" : name === "Helvetica-Bold" ? "F2" : name === "Times-Roman" ? "F3" : "F4"} ${ref} 0 R`)
    .join(" ")} >>`;

  const kids = [];
  for (const content of doc.pages) {
    const stream = Buffer.from(content, "latin1");
    const contentRef = add(
      `<< /Length ${stream.length} >>\nstream\n${content}\nendstream`
    );
    const pageRef = add(
      `<< /Type /Page /Parent ${pagesRef} 0 R /MediaBox [0 0 ${PAGE.width} ${PAGE.height}] ` +
        `/Resources << ${fontResource} >> /Contents ${contentRef} 0 R >>`
    );
    kids.push(`${pageRef} 0 R`);
  }

  const infoRef = add(
    `<< /Title (${pdfString(`${SITE.name} \u2014 Company profile`)}) ` +
      `/Author (${pdfString(SITE.name)}) ` +
      `/Subject (${pdfString("Wholesale food supply: rice, spices, seasonal fruit and NORN canned foods")}) ` +
      `/Keywords (${pdfString("wholesale food supply, rice, spices, seasonal fruit, canned foods, NORN")}) ` +
      `/Creator (${pdfString(`${SITE.name} website`)}) ` +
      `/Producer (${pdfString("scripts/generate-company-profile-pdf.mjs")}) >>`
  );

  objects[catalogRef - 1] = `<< /Type /Catalog /Pages ${pagesRef} 0 R /Lang (en-GB) /PageLayout /SinglePage >>`;
  objects[pagesRef - 1] = `<< /Type /Pages /Kids [${kids.join(" ")}] /Count ${kids.length} >>`;

  const header = "%PDF-1.7\n%\xE2\xE3\xCF\xD3\n";
  // Offsets must be counted in the same encoding the file is written in
  // (latin1), otherwise startxref points into the middle of the table.
  const sizeOf = (value) => Buffer.byteLength(value, "latin1");
  let body = "";
  const offsets = [];
  let position = sizeOf(header);

  for (let index = 0; index < objects.length; index += 1) {
    const chunk = `${index + 1} 0 obj\n${objects[index]}\nendobj\n`;
    offsets.push(position);
    body += chunk;
    position += sizeOf(chunk);
  }

  const xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets
    .map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`)
    .join("")}`;
  const trailer =
    `trailer\n<< /Size ${objects.length + 1} /Root ${catalogRef} 0 R /Info ${infoRef} 0 R >>\n` +
    `startxref\n${position}\n%%EOF\n`;

  return Buffer.from(header + body + xref + trailer, "latin1");
}

function pdfString(value) {
  return toWinAnsi(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

/* ----------------------------------------------------------------------- main */

const doc = new Document();
doc.newPage();
pageCover(doc);
pageOverview(doc);
pageSupply(doc);
pageRange(doc);

const pdf = serialise(doc);
const target = path.join(root, "public", "downloads", "company-profile.pdf");
await mkdir(path.dirname(target), { recursive: true });
await writeFile(target, pdf);
console.log(
  `wrote ${path.relative(root, target)} \u2014 ${doc.pages.length} pages, ${(
    pdf.length / 1024
  ).toFixed(1)} kB, ${ACTIVE_PRODUCTS.length} products indexed`
);

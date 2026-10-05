import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Canonical URLs, the sitemap and every authored link end in a slash, so
  // pages are served that way too — otherwise every one of them 308s first.
  trailingSlash: true,
  images: {
    // Photography is served from Pexels' CDN and optimised by next/image.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    // Only 75 is allowed by default, which silently downgrades every `quality`
    // prop on the page. Packaging needs the extra detail.
    qualities: [75, 85, 90],
    deviceSizes: [320, 360, 375, 390, 414, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [96, 160, 240, 320, 400, 480, 640],
  },
  async redirects() {
    return [
      // The old brand page was removed: both spellings now land on the
      // canned-food range it used to describe.
      {
        source: "/norn",
        destination: "/products/canned-food/",
        permanent: true,
      },
      {
        source: "/norm",
        destination: "/products/canned-food/",
        permanent: true,
      },
      // The rice 1lb range was removed from the catalogue.
      {
        source: "/products/norn-rice-1lb",
        destination: "/products/rice/",
        permanent: true,
      },
      {
        source: "/products/norn-rice-1lb/:slug",
        destination: "/products/rice/",
        permanent: true,
      },
      {
        source: "/products/norm-rice-1lb",
        destination: "/products/rice/",
        permanent: true,
      },
      {
        source: "/products/norm-rice-1lb/:slug",
        destination: "/products/rice/",
        permanent: true,
      },
      {
        source: "/products/:category/norm-:slug",
        destination: "/products/:category/norn-:slug",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

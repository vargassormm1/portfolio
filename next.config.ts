import type { NextConfig } from "next";

// Proportionate security for a static site: no forms, APIs, auth or third-party scripts. The CSP allows Next's inline
// bootstrap scripts ('unsafe-inline' for scripts is needed on statically generated pages without per-request nonces)
// but nothing from other origins.
const csp = [
  "default-src 'self'", "script-src 'self' 'unsafe-inline'", "style-src 'self' 'unsafe-inline'", "img-src 'self' data: blob:",
  "font-src 'self'", "connect-src 'self'", "frame-ancestors 'none'", "base-uri 'self'", "form-action 'self'", "object-src 'none'",
].join("; ");
const headers = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];
// Previews and local builds: also tell crawlers not to index any file (robots.txt alone hides the noindex meta).
const indexable = process.env.VERCEL_ENV === "production" || process.env.FORCE_INDEXABLE === "1";
if (!indexable) headers.push({ key: "X-Robots-Tag", value: "noindex, nofollow" });
const config: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() { return [{ source: "/:path*", headers }]; },
};
export default config;

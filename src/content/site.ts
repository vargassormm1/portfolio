// Public-safe content boundary: everything published anywhere on this site (pages, resume files, llms.txt, structured
// data) comes from src/content. Nothing is read from private docs at build time.

/** The canonical origin. Set NEXT_PUBLIC_SITE_URL when a custom domain is added; everything else follows. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-ashy-six-61.vercel.app").replace(/\/$/, "");
/** Only the production deployment is indexable; previews and local builds are noindex. */
export const INDEXABLE = process.env.VERCEL_ENV === "production" || process.env.FORCE_INDEXABLE === "1";
/** When the content last changed (used for sitemap and structured-data dates). Update with real content edits. */
export const CONTENT_UPDATED = "2026-11-24";
/** Open Graph fields shared by every page (a page's own openGraph replaces the root one, so spread this in). */
export const OG = { siteName: "Ralph Vargas Sormillon", locale: "en_US", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Ralph Vargas Sormillon, Software Engineer" }] };
/** Absolute URL; the home page is the bare origin, matching the canonical Next.js renders. */
export const abs = (path = "/") => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);

/** Crawler policy. Search crawlers are allowed; dedicated model-training crawlers are opted out unless this is true. */
export const ALLOW_AI_TRAINING = false;
export const SEARCH_CRAWLERS = ["Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "DuckDuckBot", "Applebot"];
export const TRAINING_CRAWLERS = ["GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended", "CCBot", "Meta-ExternalAgent", "Bytespider", "Amazonbot", "cohere-training-data-crawler"];

/** Optional webmaster verification tokens (from Google Search Console / Bing Webmaster Tools). */
export const VERIFICATION = {
  google: process.env.GOOGLE_SITE_VERIFICATION,
  bing: process.env.BING_SITE_VERIFICATION,
};

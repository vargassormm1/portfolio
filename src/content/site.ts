// Public-safe content boundary: everything published anywhere on this site (pages, resume files, llms.txt, structured
// data) comes from src/content. Nothing is read from private docs at build time.

/** The canonical origin. Set NEXT_PUBLIC_SITE_URL when a custom domain is added; everything else follows. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-ashy-six-61.vercel.app").replace(/\/$/, "");
/** Only the production deployment is indexable; previews and local builds are noindex. */
export const INDEXABLE = process.env.VERCEL_ENV === "production" || process.env.FORCE_INDEXABLE === "1";
export const abs = (path = "/") => `${SITE_URL}${path === "/" ? "/" : path}`;

/** Crawler policy. Search crawlers are allowed; dedicated model-training crawlers are opted out unless this is true. */
export const ALLOW_AI_TRAINING = false;
export const SEARCH_CRAWLERS = ["Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "DuckDuckBot", "Applebot"];
export const TRAINING_CRAWLERS = ["GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended", "CCBot"];

/** Optional webmaster verification tokens (from Google Search Console / Bing Webmaster Tools). */
export const VERIFICATION = {
  google: process.env.GOOGLE_SITE_VERIFICATION,
  bing: process.env.BING_SITE_VERIFICATION,
};

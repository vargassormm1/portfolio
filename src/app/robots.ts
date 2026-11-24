import type { MetadataRoute } from "next";
import { abs, ALLOW_AI_TRAINING, INDEXABLE, SEARCH_CRAWLERS, TRAINING_CRAWLERS } from "@/content/site";
export const dynamic = "force-static";
// robots.txt is a voluntary convention, not access control. Search crawlers are welcome; dedicated AI-training crawlers
// are opted out unless ALLOW_AI_TRAINING is true. Preview and local builds ask every crawler to stay away.
export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [
      { userAgent: SEARCH_CRAWLERS, allow: "/" },
      ...(ALLOW_AI_TRAINING ? [] : [{ userAgent: TRAINING_CRAWLERS, disallow: "/" }]),
      { userAgent: "*", allow: "/" },
    ],
    sitemap: abs("/sitemap.xml"),
  };
}

import type { MetadataRoute } from "next";
import { abs } from "@/content/site";
import { caseStudies } from "@/content/projects";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: abs("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: abs("/resume"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...caseStudies.map((p) => ({ url: abs(`/projects/${p.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}

import { ldJson } from "@/lib/identity";
/** Structured data. Static content from src/content, serialized so it can't break out of the script tag. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(data) }} />;
}

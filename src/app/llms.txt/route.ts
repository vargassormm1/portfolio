import { llmsTxt } from "@/lib/identity";
export const dynamic = "force-static";
export function GET() {
  return new Response(llmsTxt(), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}

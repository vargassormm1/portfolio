import { resumeText } from "@/lib/identity";
export const dynamic = "force-static";
export function GET() {
  return new Response(resumeText(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

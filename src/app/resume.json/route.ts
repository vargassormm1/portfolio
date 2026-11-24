import { jsonResume } from "@/lib/identity";
export const dynamic = "force-static";
export function GET() {
  return new Response(JSON.stringify(jsonResume(), null, 2), { headers: { "Content-Type": "application/json; charset=utf-8" } });
}

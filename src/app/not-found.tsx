import Link from "next/link";
export const metadata = { title: "Page not found" };
export default function NotFound() {
  return (
    <main id="main" className="wrap py-24 sm:py-32">
      <p className="eyebrow">404</p>
      <h1 className="h-hero mt-3">Page not found</h1>
      <p className="mt-4 max-w-[48ch] text-lg text-ink-2">That link doesn&apos;t go anywhere, or the page has moved.</p>
      <div className="mt-8 flex flex-wrap gap-3"><Link href="/" className="btn btn-primary">Go home</Link><Link href="/#work" className="btn btn-secondary">See my projects</Link></div>
    </main>
  );
}

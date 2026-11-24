import Link from "next/link";
export const metadata = { title: "Page not found" };
export default function NotFound() {
  return (
    <main id="main" className="wrap py-24 sm:py-32">
      <p className="kicker">404</p>
      <h1 className="h-display mt-3 max-w-[18ch]">Well, this wasn&apos;t supposed to happen.</h1>
      <p className="mt-5 max-w-[48ch] text-lg text-ink-2">Even software engineers get lost sometimes. The page you were looking for doesn&apos;t exist, or it moved.</p>
      <div className="mt-8 flex flex-wrap gap-3"><Link href="/" className="btn btn-primary">Go home</Link><Link href="/#work" className="btn btn-secondary">See my work</Link></div>
    </main>
  );
}

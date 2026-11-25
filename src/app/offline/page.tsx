import Link from "next/link";
import { OG } from "@/content/site";
export const metadata = { title: "Offline", robots: { index: false, follow: false }, openGraph: { ...OG, url: "/offline" } };
export default function Offline() {
  return (
    <main id="main" className="wrap py-24 sm:py-32">
      <p className="eyebrow">Offline</p>
      <h1 className="h-hero mt-3">You&apos;re offline</h1>
      <p className="mt-4 max-w-[48ch] text-lg text-ink-2">This page isn&apos;t saved on your device yet. Pages you&apos;ve already visited still work, and everything else will load once you&apos;re back online.</p>
      <div className="mt-8"><Link href="/" className="btn btn-primary">Go home</Link></div>
    </main>
  );
}

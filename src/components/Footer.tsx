import Link from "next/link";
import { PROFILE, SOCIALS, mailto } from "@/content/profile";

export function Footer() {
  return (
    <footer className="no-print border-t border-line pb-[env(safe-area-inset-bottom)]">
      <div className="wrap flex flex-col gap-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-ink-3">© {new Date().getFullYear()} {PROFILE.name}, {PROFILE.title}</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-ink-2">
          {SOCIALS.map((s) => <li key={s.id}><a href={s.href} rel="me noopener noreferrer" target="_blank" className="link text-ink-2">{s.label}<span className="sr-only"> (opens in a new tab)</span></a></li>)}
          <li><a href={mailto()} className="link text-ink-2">Email</a></li>
          <li><Link href="/resume" className="link text-ink-2">Resume</Link></li>
          <li><a href="#top" className="link text-ink-2">Back to top</a></li>
        </ul>
      </div>
    </footer>
  );
}

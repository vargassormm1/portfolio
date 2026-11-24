import Link from "next/link";
import { PROFILE, SOCIALS, mailto } from "@/content/profile";

export function Footer() {
  return (
    <footer className="no-print border-t border-line">
      <div className="wrap flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-semibold">{PROFILE.name}</p>
          <p className="text-sm text-ink-2">{PROFILE.title}, {PROFILE.region}</p>
          <p className="mt-3 text-xs text-ink-3">© {new Date().getFullYear()} {PROFILE.name}. Built with curiosity and too many browser tabs.</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {SOCIALS.map((s) => <li key={s.id}><a href={s.href} rel="me noopener noreferrer" target="_blank" className="link">{s.label}</a></li>)}
          <li><a href={mailto()} className="link">Email</a></li>
          <li><Link href="/resume" className="link">Resume</Link></li>
          <li><a href="#top" className="link">Back to top</a></li>
        </ul>
      </div>
    </footer>
  );
}

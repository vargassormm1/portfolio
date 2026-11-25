"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
  { href: "/resume", label: "Resume" },
];

/** Slim sticky header. On phones a menu slides down; Escape, outside taps and links close it. */
export function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); button.current?.focus(); } };
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    const onDown = (e: PointerEvent) => { const t = e.target as Node; if (!panel.current?.contains(t) && !button.current?.contains(t)) setOpen(false); };
    window.addEventListener("keydown", onKey); window.addEventListener("resize", onResize); document.addEventListener("pointerdown", onDown);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); document.removeEventListener("pointerdown", onDown); };
  }, [open]);
  return (
    <header className="no-print sticky top-0 z-30 border-b border-line/70 bg-bg pt-[env(safe-area-inset-top)]">
      <div className="wrap flex h-[var(--header-h)] items-center gap-6">
        <Link href="/" className="font-semibold tracking-[-0.015em]" onClick={() => setOpen(false)}>Ralph Vargas</Link>
        <nav aria-label="Main" className="ml-auto hidden items-center gap-6 text-sm md:flex">
          {NAV.map((n) => <Link key={n.href} href={n.href} className="navlink">{n.label}</Link>)}
        </nav>
        <button ref={button} type="button" className="-mr-2 ml-auto grid size-11 place-items-center rounded-md md:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}>
          <span aria-hidden="true" className="relative block h-3 w-[18px]">
            <span className={`absolute left-0 h-[1.5px] w-full bg-ink transition-transform duration-[240ms] ${open ? "top-[5px] rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-[1.5px] w-full bg-ink transition-transform duration-[240ms] ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
          </span>
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      <div id="mobile-nav" ref={panel} inert={!open} className={`grid transition-[grid-template-rows,opacity] duration-[240ms] ease-[var(--ease)] md:hidden ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <nav aria-label="Main" className="overflow-hidden">
          <ul className="wrap pb-3">
            {NAV.map((n) => <li key={n.href} className="border-t border-line first:border-t-0"><Link href={n.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center text-base">{n.label}</Link></li>)}
          </ul>
        </nav>
      </div>
    </header>
  );
}

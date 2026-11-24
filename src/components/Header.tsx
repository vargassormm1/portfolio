"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/#contact", label: "Contact" },
];

/** Sticky, slim header. On phones a menu button opens the links; Escape, a link, or the button closes it. */
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
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey); window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); document.removeEventListener("pointerdown", onDown); };
  }, [open]);
  return (
    <header className="no-print sticky top-0 z-30 border-b border-line bg-bg/95 supports-[backdrop-filter]:bg-bg/85 supports-[backdrop-filter]:backdrop-blur-md">
      <div className="wrap flex h-[var(--header-h)] items-center gap-6">
        <Link href="/" className="font-semibold tracking-[-0.02em]" onClick={() => setOpen(false)}>Ralph Vargas Sormillon</Link>
        <nav aria-label="Main" className="ml-auto hidden items-center gap-7 text-sm md:flex">
          {NAV.map((n) => <Link key={n.href} href={n.href} className="navlink">{n.label}</Link>)}
        </nav>
        <button ref={button} type="button" className="-mr-2 ml-auto grid size-11 place-items-center rounded-md md:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}>
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      <div id="mobile-nav" ref={panel} hidden={!open} className="border-t border-line bg-bg md:hidden">
        <nav aria-label="Main" className="wrap flex flex-col py-2">
          {NAV.map((n) => <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center text-lg font-medium">{n.label}</Link>)}
        </nav>
      </div>
    </header>
  );
}

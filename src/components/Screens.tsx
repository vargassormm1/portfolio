import Image from "next/image";
import type { Project } from "@/content/projects";

/** Desktop screenshot with a phone screenshot at its corner; phones see the phone screenshots, which read better small. */
export function Screens({ p, sizes = "(min-width: 1024px) 560px, 100vw" }: { p: Project; sizes?: string }) {
  if (!p.desktop) return null;
  const phones = p.phones ?? [];
  const phone = phones[0];
  return (
    <>
      {phones.length ? (
        <div className="mx-auto grid max-w-[340px] grid-cols-2 items-start gap-3 sm:hidden">
          {phones.slice(0, 2).map((s, i) => <div key={s.src} className={`overflow-hidden rounded-[16px] ring-1 ring-line-strong ${i ? "mt-6" : ""}`}><Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="45vw" className="block h-auto w-full" /></div>)}
        </div>
      ) : null}
      <div className={`relative pb-5 sm:pr-8 sm:pb-8 ${phones.length ? "hidden sm:block" : ""}`}>
        <div className="shot"><Image src={p.desktop.src} alt={p.desktop.alt} width={p.desktop.w} height={p.desktop.h} sizes={sizes} className="block h-auto w-full" /></div>
        {phone ? (
          <div className="absolute right-0 bottom-0 hidden w-[23%] max-w-[140px] overflow-hidden rounded-[14px] shadow-[var(--shadow)] ring-1 ring-line-strong sm:block">
            <Image src={phone.src} alt={phone.alt} width={phone.w} height={phone.h} sizes="140px" className="block h-auto w-full" />
          </div>
        ) : null}
      </div>
    </>
  );
}

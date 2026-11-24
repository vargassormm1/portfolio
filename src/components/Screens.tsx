import Image from "next/image";
import type { Project } from "@/content/projects";

/** A desktop screenshot with a phone screenshot overlapping its corner (phone hidden on the smallest screens). */
export function Screens({ p, priority = false, sizes = "(min-width: 1024px) 620px, 100vw" }: { p: Project; priority?: boolean; sizes?: string }) {
  if (!p.desktop) return null;
  const phone = p.phones?.[0];
  const phones = p.phones ?? [];
  return (
    <>
    {phones.length ? (
      /* phones: the phone screenshots are what's readable at this size */
      <div className="mx-auto grid max-w-[360px] grid-cols-2 gap-3 sm:hidden">
        {phones.slice(0, 2).map((s, i) => <div key={s.src} className={`overflow-hidden rounded-[18px] border-[4px] border-ink bg-ink ${i ? "mt-8" : ""}`}><Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="45vw" priority={priority && i === 0} className="block h-auto w-full" /></div>)}
      </div>
    ) : null}
    <div className={`relative pb-6 sm:pr-10 sm:pb-10 ${phones.length ? "hidden sm:block" : ""}`}>
      <div className="shot">
        <Image src={p.desktop.src} alt={p.desktop.alt} width={p.desktop.w} height={p.desktop.h} sizes={sizes} priority={priority} className="block h-auto w-full" />
      </div>
      {phone ? (
        <div className="absolute right-0 bottom-0 hidden w-[24%] max-w-[150px] overflow-hidden rounded-[18px] border-[4px] border-ink bg-ink shadow-[var(--shadow-md)] sm:block">
          <Image src={phone.src} alt={phone.alt} width={phone.w} height={phone.h} sizes="150px" className="block h-auto w-full" />
        </div>
      ) : null}
    </div>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/content/projects";
import { PROFILE } from "@/content/profile";
import { OG } from "@/content/site";
import { JsonLd } from "@/components/JsonLd";
import { projectLd } from "@/lib/identity";

export const dynamicParams = false;
export const generateStaticParams = () => caseStudies.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = caseStudies.find((x) => x.slug === slug);
  if (!p) return {};
  const title = `${p.name}: ${p.headline.replace(/\.$/, "")}`;
  return { title, description: `${p.summary} A case study by ${PROFILE.name}, built with ${p.stack.slice(0, 5).join(", ")}.`, alternates: { canonical: `/projects/${p.slug}` }, openGraph: { ...OG, url: `/projects/${p.slug}`, title, type: "article" } };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = caseStudies.find((x) => x.slug === slug);
  if (!p || !p.caseStudy) notFound();
  const cs = p.caseStudy;
  return (
    <main id="main">
      <JsonLd data={projectLd(p)} />
      <article>
        <header className="wrap pt-10 pb-12 sm:pt-16">
          <nav aria-label="Back" className="text-sm"><Link href="/#work" className="link inline-flex items-center gap-1.5 text-ink-2"><ArrowLeft size={15} aria-hidden="true" />Things I&apos;ve built</Link></nav>
          <p className="kicker mt-8">Case study: {p.category.toLowerCase()}</p>
          <h1 className="h-display mt-3 max-w-[18ch]">{p.name}</h1>
          <p className="mt-3 max-w-[40ch] text-xl font-medium text-ink-2">{p.headline}</p>
          <dl className="mt-8 grid max-w-[760px] grid-cols-2 gap-x-8 gap-y-4 border-y border-line py-5 text-sm sm:grid-cols-4">
            <div><dt className="text-ink-3">Status</dt><dd className="font-medium">{p.status}</dd></div>
            <div><dt className="text-ink-3">Role</dt><dd className="font-medium">Design and development</dd></div>
            <div><dt className="text-ink-3">Source</dt><dd className="font-medium">{p.repo === "public" ? "Public" : "Private"}</dd></div>
            <div><dt className="text-ink-3">Started</dt><dd className="num font-medium">{p.started}</dd></div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            {p.links.map((l, i) => <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={`btn ${i === 0 ? "btn-primary" : "btn-secondary"}`}>{l.label}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>)}
          </div>
          {p.demoNote ? <p className="mt-3 text-sm text-ink-3">{p.demoNote}</p> : null}
        </header>

        {p.desktop ? <div className="wrap"><div className="shot"><Image src={p.desktop.src} alt={p.desktop.alt} width={p.desktop.w} height={p.desktop.h} priority sizes="(min-width: 1120px) 1056px, 100vw" className="block h-auto w-full" /></div></div> : null}

        <div className="wrap grid gap-12 py-16 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 lg:py-24">
          <aside className="hidden lg:block"><nav aria-label="On this page" className="sticky top-24 space-y-2 text-sm text-ink-2">
            {[["story", "The story"], ["problem", "The problem"], ["goals", "Goals"], ["architecture", "Architecture"], ["challenges", "Engineering challenges"], ["features", "What it does"], ["screens", "Screens"]].map(([id, label]) => <a key={id} href={`#${id}`} className="block hover:text-ink">{label}</a>)}
          </nav></aside>
          <div className="max-w-[68ch] space-y-14">
            <section id="story" aria-labelledby="story-h"><h2 id="story-h" className="h-sub">The story</h2><div className="mt-3 space-y-3 text-lg leading-relaxed text-ink-2">{p.story.map((s) => <p key={s}>{s}</p>)}</div></section>
            <section id="problem" aria-labelledby="problem-h"><h2 id="problem-h" className="h-sub">The problem</h2><p className="mt-3 leading-relaxed text-ink-2">{cs.problem}</p></section>
            <section id="goals" aria-labelledby="goals-h"><h2 id="goals-h" className="h-sub">Goals</h2><ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-2">{cs.goals.map((g) => <li key={g}>{g}</li>)}</ul></section>
            <section id="architecture" aria-labelledby="arch-h"><h2 id="arch-h" className="h-sub">Architecture and technology</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-ink-2">{cs.architecture.map((a) => <li key={a}>{a}</li>)}</ul>
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">{p.stack.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
            </section>
            <section id="challenges" aria-labelledby="ch-h"><h2 id="ch-h" className="h-sub">Engineering challenges</h2>
              <div className="mt-4 divide-y divide-line border-y border-line">{p.challenges.map((c) => <div key={c.title} className="py-5"><h3 className="font-semibold">{c.title}</h3><p className="mt-1.5 leading-relaxed text-ink-2">{c.body}</p></div>)}</div>
            </section>
            <section id="features" aria-labelledby="f-h"><h2 id="f-h" className="h-sub">What it does</h2><ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-2">{p.features.map((f) => <li key={f}>{f}</li>)}</ul></section>
            {p.phones?.length ? (
              <section id="screens" aria-labelledby="s-h"><h2 id="s-h" className="h-sub">Screens</h2>
                <p className="mt-2 text-sm text-ink-3">{p.slug === "guap" ? "From the public demo. Every name and number is made up." : "From the test environment, with fictional players."}</p>
                <div className="mt-5 grid grid-cols-2 gap-4 sm:gap-6">{p.phones.map((s) => <div key={s.src} className="overflow-hidden rounded-[22px] border-[5px] border-ink bg-ink"><Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="(min-width: 768px) 320px, 45vw" className="block h-auto w-full" /></div>)}</div>
              </section>
            ) : null}
          </div>
        </div>
      </article>
      <div className="wrap pb-16"><Link href="/#work" className="link inline-flex items-center gap-1.5 font-medium"><ArrowLeft size={16} aria-hidden="true" />Back to all projects</Link></div>
    </main>
  );
}

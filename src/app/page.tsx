import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROFILE, SOCIALS, RESUME_PDF, mailto } from "@/content/profile";
import { FEATURED, OTHER, ARCHIVE, type Project } from "@/content/projects";
import { ENGINEERING } from "@/content/engineering";
import { EDUCATION, EXPERIENCE, range } from "@/content/experience";
import { SKILLS } from "@/content/skills";
import { JsonLd } from "@/components/JsonLd";
import { Screens } from "@/components/Screens";
import { homeLd } from "@/lib/identity";

export const metadata = { alternates: { canonical: "/" } };

const Ext = () => <ArrowUpRight size={15} aria-hidden="true" className="shrink-0" />;
const NewTab = () => <span className="sr-only"> (opens in a new tab)</span>;
const SectionHead = ({ id, title, children }: { id: string; title: string; children?: React.ReactNode }) => (
  <div className="max-w-[60ch]"><h2 id={id} className="h-section">{title}</h2>{children ? <p className="mt-2 text-ink-2">{children}</p> : null}</div>
);

function Featured({ p, index }: { p: Project; index: number }) {
  const flip = index % 2 === 1;
  const main = p.links.filter((l) => l.kind !== "code");
  const code = p.links.filter((l) => l.kind === "code");
  return (
    <article aria-labelledby={`p-${p.slug}`} className="reveal group grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center md:gap-12">
      <div className={flip ? "md:order-2" : ""}><Screens p={p} /></div>
      <div className={flip ? "md:order-1" : ""}>
        <p className="eyebrow">{p.category}</p>
        <h3 id={`p-${p.slug}`} className="mt-1 text-2xl font-semibold tracking-[-0.025em]">{p.name}</h3>
        <div className="mt-3 space-y-3 leading-relaxed text-ink-2">{p.story.map((s) => <p key={s}>{s}</p>)}</div>
        <p className="mt-4 text-sm text-ink-3"><span className="sr-only">Highlights: </span>{p.highlights.join(" · ")}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {main.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{l.label}<Ext /><NewTab /></a>)}
          {p.caseStudy ? <Link href={`/projects/${p.slug}`} className="btn btn-secondary">How I built it</Link> : null}
          {code.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link ml-1 text-sm text-ink-2">{l.label}<Ext /><NewTab /></a>)}
        </div>
        {p.demoNote ? <p className="mt-3 text-sm text-ink-3">{p.demoNote}</p> : null}
      </div>
    </article>
  );
}

export default function Home() {
  const docchat = FEATURED.find((p) => p.slug === "docchat")!;
  const lead = FEATURED.filter((p) => p.caseStudy);
  const current = EXPERIENCE[0]!;
  const also = [{ name: docchat.name, body: docchat.story[0]!, stack: docchat.stack.join(", "), href: docchat.links[0]!.href, linkLabel: docchat.links[0]!.label }, ...OTHER];
  return (
    <main id="main">
      <JsonLd data={homeLd()} />

      {/* ---- intro ---- */}
      <section className="wrap pt-14 pb-16 sm:pt-24 sm:pb-24" aria-labelledby="intro">
        <div className="flex items-center gap-3">
          <Image src={PROFILE.image} alt="" width={96} height={96} priority sizes="44px" className="size-11 rounded-full object-cover object-[50%_28%] ring-1 ring-line-strong" />
          <p className="text-sm leading-tight"><span className="block font-medium">{PROFILE.name}</span><span className="text-ink-3">{PROFILE.title}, {PROFILE.regionShort}</span></p>
        </div>
        <h1 id="intro" className="h-hero mt-8">{PROFILE.greeting}</h1>
        <div className="mt-5 max-w-[58ch] space-y-3 text-lg leading-relaxed text-ink-2">
          <p>{PROFILE.intro}</p>
          <p>{PROFILE.aside}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#work" className="btn btn-primary">View my work</a>
          <a href="#contact" className="btn btn-secondary">Get in touch</a>
          <Link href="/resume" className="btn btn-secondary">Resume</Link>
        </div>
      </section>

      {/* ---- projects ---- */}
      <section id="work" className="divider" aria-labelledby="work-title">
        <div className="wrap py-16 sm:py-24">
          <SectionHead id="work-title" title="Selected projects">Things I built for myself and my friends, outside of work.</SectionHead>
          <div className="mt-12 space-y-20 sm:space-y-28">{lead.map((p, i) => <Featured key={p.slug} p={p} index={i} />)}</div>

          <h3 className="mt-24 text-sm font-medium text-ink-3">Also</h3>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {also.map((o) => (
              <li key={o.name} className="grid gap-2 py-5 sm:grid-cols-[160px_minmax(0,1fr)_auto] sm:gap-8">
                <h4 className="font-medium">{o.name}</h4>
                <div><p className="max-w-[60ch] leading-relaxed text-ink-2">{o.body}</p><p className="mt-1 text-sm text-ink-3">{o.stack}</p></div>
                <a href={o.href} target="_blank" rel="noopener noreferrer" className="link self-start text-sm text-ink-2">{o.linkLabel}<Ext /><span className="sr-only">: {o.name} (opens in a new tab)</span></a>
              </li>
            ))}
          </ul>
          <details className="group/d mt-6">
            <summary className="link cursor-pointer list-none text-sm text-ink-2 [&::-webkit-details-marker]:hidden">Earlier projects <span aria-hidden="true" className="inline-block transition-transform group-open/d:rotate-90">›</span></summary>
            <ul className="mt-4 space-y-3">
              {ARCHIVE.map((a) => (
                <li key={a.name} className="text-sm leading-relaxed">
                  <a href={a.href} target="_blank" rel="noopener noreferrer" className="link font-medium">{a.name}<NewTab /></a>
                  <span className="text-ink-2"> {a.body}</span> <span className="text-ink-3">{a.stack}</span>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </section>

      {/* ---- experience (professional highlights sit under the current role) ---- */}
      <section id="experience" className="divider" aria-labelledby="exp-title">
        <div className="wrap py-16 sm:py-24">
          <SectionHead id="exp-title" title="Experience" />
          <ol className="mt-10 border-t border-line">
            {EXPERIENCE.map((j) => (
              <li key={j.company + j.start} className="grid gap-x-10 gap-y-2 border-b border-line py-8 md:grid-cols-[180px_minmax(0,1fr)]">
                <p className="num text-sm text-ink-3"><time dateTime={j.start}>{range(j).split(" – ")[0]}</time> – {j.end ? <time dateTime={j.end}>{range(j).split(" – ")[1]}</time> : "Present"}</p>
                <div>
                  <h3 className="h-sub">{j.title}, <span className="text-ink-2">{j.company}</span></h3>
                  {j.summary ? <p className="mt-2 max-w-[64ch] leading-relaxed text-ink-2">{j.summary}</p> : null}
                  {j === current ? (
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {ENGINEERING.map((e) => <li key={e.title} className="rounded-[var(--radius-md)] bg-surface px-4 py-3.5"><p className="text-sm font-medium">{e.title}</p><p className="mt-1 text-sm leading-relaxed text-ink-2">{e.body}</p></li>)}
                    </ul>
                  ) : (
                    <ul className="mt-2 max-w-[64ch] list-disc space-y-1 pl-5 leading-relaxed text-ink-2 marker:text-line-strong">{j.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
                  )}
                  <p className="mt-4 text-sm text-ink-3"><span className="sr-only">Technologies: </span>{j.tech.join(", ")}</p>
                </div>
              </li>
            ))}
            <li className="grid gap-x-10 gap-y-2 py-8 md:grid-cols-[180px_minmax(0,1fr)]">
              <p className="num text-sm text-ink-3">{EDUCATION.start} – {EDUCATION.end}</p>
              <h3 className="h-sub">{EDUCATION.degree} in {EDUCATION.field}, <span className="text-ink-2">{EDUCATION.school}</span></h3>
            </li>
          </ol>
          <p className="mt-6 text-sm text-ink-3">Client and system details from my professional work stay private. <Link href="/resume" className="link text-ink-2">Full resume</Link></p>
        </div>
      </section>

      {/* ---- skills ---- */}
      <section id="skills" className="divider" aria-labelledby="skills-title">
        <div className="wrap py-16 sm:py-24">
          <SectionHead id="skills-title" title="Skills" />
          <dl className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS.filter((s) => s.group !== "Practices").map((s) => <div key={s.group}><dt className="text-sm font-medium">{s.group}</dt><dd className="mt-1 text-ink-2">{s.items.join(", ")}</dd></div>)}
          </dl>
        </div>
      </section>

      {/* ---- about ---- */}
      <section id="about" className="divider" aria-labelledby="about-title">
        <div className="wrap grid gap-10 py-16 sm:py-24 md:grid-cols-[minmax(0,1fr)_240px] md:items-start md:gap-16">
          <div>
            <SectionHead id="about-title" title="About" />
            <div className="mt-5 max-w-[60ch] space-y-4 text-lg leading-relaxed text-ink-2">{PROFILE.about.map((t) => <p key={t}>{t}</p>)}</div>
          </div>
          <Image src={PROFILE.image} alt="Portrait of Ralph Vargas Sormillon" width={480} height={600} sizes="(min-width: 768px) 240px, 200px" className="aspect-[4/5] w-[200px] rounded-[var(--radius-lg)] object-cover object-[50%_25%] brightness-[0.92] md:w-full" />
        </div>
      </section>

      {/* ---- contact ---- */}
      <section id="contact" className="divider" aria-labelledby="contact-title">
        <div className="wrap py-16 sm:py-24">
          <SectionHead id="contact-title" title="Get in touch">I&apos;m always happy to connect with other engineers, talk about interesting projects, or explore new opportunities.</SectionHead>
          <a href={mailto()} className="link mt-6 text-xl font-medium break-all sm:text-2xl">{PROFILE.email}</a>
          <ul className="mt-6 flex flex-wrap gap-3">
            {SOCIALS.map((s) => <li key={s.id}><a href={s.href} target="_blank" rel="me noopener noreferrer" className="btn btn-secondary">{s.label}<Ext /><NewTab /></a></li>)}
            <li><a href={RESUME_PDF} download className="btn btn-secondary">Resume (PDF)</a></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

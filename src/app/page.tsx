import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROFILE, SOCIALS, RESUME_PDF, mailto } from "@/content/profile";
import { EXPERTISE } from "@/content/expertise";
import { FEATURED, ARCHIVE, type Project } from "@/content/projects";
import { ENGINEERING } from "@/content/engineering";
import { EDUCATION, EXPERIENCE, range } from "@/content/experience";
import { SKILLS } from "@/content/skills";
import { JsonLd } from "@/components/JsonLd";
import { Screens } from "@/components/Screens";
import { homeLd } from "@/lib/identity";

const Ext = () => <ArrowUpRight size={16} aria-hidden="true" className="shrink-0" />;
const newTab = <span className="sr-only"> (opens in a new tab)</span>;

function ProjectRow({ p, index }: { p: Project; index: number }) {
  const big = index < 2;
  const flip = index % 2 === 1;
  return (
    <article aria-labelledby={`p-${p.slug}`} className={`reveal group grid gap-8 lg:items-center ${big ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14" : "lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14"}`}>
      <div className={flip ? "lg:order-2" : ""}><Screens p={p} sizes={big ? "(min-width: 1024px) 600px, 100vw" : "(min-width: 1024px) 420px, 100vw"} /></div>
      <div className={flip ? "lg:order-1" : ""}>
        <p className="flex flex-wrap items-center gap-2 text-sm text-ink-3">
          <span>{p.category}</span><span aria-hidden="true">/</span><span className={p.status === "Live" ? "text-accent" : ""}>{p.status}</span>
        </p>
        <h3 id={`p-${p.slug}`} className="mt-2 text-[1.75rem] leading-tight font-semibold tracking-[-0.03em]">{p.name}</h3>
        <p className="mt-1 text-lg font-medium text-ink-2">{p.headline}</p>
        <div className="mt-4 space-y-3 leading-relaxed text-ink-2">{p.story.map((s) => <p key={s}>{s}</p>)}</div>
        {big ? (
          <ul className="mt-5 space-y-1.5 text-[0.9375rem]">
            {p.challenges.slice(0, 3).map((c) => <li key={c.title} className="flex gap-2.5"><span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" /><span><span className="font-medium">{c.title}.</span> <span className="text-ink-2">{c.body.split(". ")[0]}.</span></span></li>)}
          </ul>
        ) : null}
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${p.name} technologies`}>{p.stack.slice(0, big ? 6 : 4).map((t) => <li key={t} className="tag">{t}</li>)}</ul>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          {p.links.filter((l) => l.kind !== "code").map((l) => <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{l.label}<Ext />{newTab}</a>)}
          {p.caseStudy ? <Link href={`/projects/${p.slug}`} className="btn btn-secondary">Read the case study</Link> : null}
          {p.links.filter((l) => l.kind === "code").map((l) => <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1 text-[0.9375rem] font-medium">{l.label}<Ext />{newTab}</a>)}
          {p.repo === "private" ? <span className="text-sm text-ink-3">Source is private</span> : null}
        </div>
        {p.demoNote ? <p className="mt-3 text-sm text-ink-3">{p.demoNote}</p> : null}
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main id="main">
      <JsonLd data={homeLd()} />

      {/* ---- hero ---- */}
      <section className="wrap grid gap-10 pt-12 pb-16 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end lg:gap-16 lg:pt-28 lg:pb-24" aria-labelledby="hero-title">
        <div>
          <p className="kicker">{PROFILE.name}, {PROFILE.title}</p>
          <h1 id="hero-title" className="h-display mt-4">
            <span className="block">{PROFILE.greeting}</span>
            <span className="mt-2 block text-[0.72em] leading-[1.12] text-ink-2">{PROFILE.tagline}</span>
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-ink-2">{PROFILE.intro}</p>
          <p className="mt-3 max-w-[60ch] text-ink-3">{PROFILE.aside}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="btn btn-primary">View my work</a>
            <a href={mailto()} className="btn btn-secondary">Get in touch</a>
            <Link href="/resume" className="btn btn-secondary">Resume</Link>
          </div>
        </div>
        <aside aria-label="At a glance" className="rounded-[var(--radius-lg)] border border-line bg-surface p-5 shadow-[var(--shadow-sm)]">
          <div className="flex items-center gap-3">
            <Image src={PROFILE.image} alt="Ralph Vargas Sormillon" width={96} height={96} priority sizes="48px" className="size-12 rounded-full object-cover object-[50%_28%]" />
            <div><p className="font-semibold leading-tight">{PROFILE.name}</p><p className="text-sm text-ink-2">{PROFILE.title}</p></div>
          </div>
          <dl className="mt-5 space-y-3 text-sm">
            {[
              ["Currently", `${EXPERIENCE[0]!.title}, ${EXPERIENCE[0]!.company}`],
              ["Based in", "New Jersey, NYC metro area"],
              ["Works across", "Full-stack, cloud, AI, data"],
              ["Education", `B.S. ${EDUCATION.field}, ${EDUCATION.school}`],
            ].map(([k, v]) => <div key={k} className="grid grid-cols-[96px_1fr] gap-3"><dt className="text-ink-3">{k}</dt><dd className="font-medium">{v}</dd></div>)}
          </dl>
          <ul className="mt-5 flex gap-4 border-t border-line pt-4 text-sm">
            {SOCIALS.map((s) => <li key={s.id}><a href={s.href} target="_blank" rel="me noopener noreferrer" className="link">{s.label}{newTab}</a></li>)}
          </ul>
        </aside>
      </section>

      {/* ---- what I do ---- */}
      <section className="border-t border-line" aria-labelledby="do-title">
        <div className="wrap grid gap-10 py-16 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16 lg:py-24">
          <div><p className="kicker">Areas of expertise</p><h2 id="do-title" className="h-section mt-2">What I do</h2></div>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {EXPERTISE.map((e) => <li key={e.title} className="border-t border-line-strong pt-4"><h3 className="font-semibold">{e.title}</h3><p className="mt-1.5 leading-relaxed text-ink-2">{e.body}</p></li>)}
          </ul>
        </div>
      </section>

      {/* ---- things I've built ---- */}
      <section id="work" className="border-t border-line bg-surface" aria-labelledby="work-title">
        <div className="wrap py-16 lg:py-24">
          <p className="kicker">Personal projects</p>
          <h2 id="work-title" className="h-section mt-2 max-w-[22ch]">Everyday problems. Occasionally overengineered solutions.</h2>
          <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-ink-2">Most of my personal projects start with a small inconvenience, a little curiosity, and the realization that I can probably build something to fix it. None of them are businesses; they solve problems in my life or my friends&apos;.</p>
          <div className="mt-14 space-y-24 lg:space-y-32">{FEATURED.map((p, i) => <ProjectRow key={p.slug} p={p} index={i} />)}</div>
        </div>
      </section>

      {/* ---- selected engineering work (professional, anonymized) ---- */}
      <section id="engineering" className="bg-dark text-[#f3f4f1]" aria-labelledby="eng-title">
        <div className="wrap py-16 lg:py-24">
          <p className="text-sm font-medium text-[#8fd1b4]">From my professional work</p>
          <h2 id="eng-title" className="h-section mt-2">Selected engineering work</h2>
          <p className="mt-3 max-w-[60ch] text-lg text-dark-2">Solving problems at a slightly larger scale. Client and system details stay private, so these are described at a high level.</p>
          <ul className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {ENGINEERING.map((e) => (
              <li key={e.title} className="reveal border-t border-dark-line pt-5">
                <h3 className="h-sub">{e.title}</h3>
                <p className="mt-2 leading-relaxed text-dark-2">{e.body}</p>
                <p className="mt-3 text-sm text-[#cfd6d2]"><span className="sr-only">Technologies: </span>{e.tags.join(", ")}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- experience ---- */}
      <section id="experience" className="wrap py-16 lg:py-24" aria-labelledby="exp-title">
        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
          <div><p className="kicker">Where I&apos;ve worked</p><h2 id="exp-title" className="h-section mt-2">Experience</h2>
            <Link href="/resume" className="link mt-5 inline-block text-sm font-medium">Full resume</Link></div>
          <ol className="relative">
            {EXPERIENCE.map((j, i) => (
              <li key={j.company + j.start} className="reveal relative border-l border-line-strong pb-12 pl-7 last:pb-0">
                <span aria-hidden="true" className={`absolute top-1.5 -left-[5px] size-[9px] rounded-full ${i === 0 ? "bg-accent" : "border border-line-strong bg-bg"}`} />
                <p className="num text-sm text-ink-3"><time dateTime={j.start}>{range(j).split(" – ")[0]}</time> – {j.end ? <time dateTime={j.end}>{range(j).split(" – ")[1]}</time> : "Present"} <span className="text-ink-3">· {j.type}</span></p>
                <h3 className="mt-1 text-xl font-semibold tracking-[-0.02em]">{j.title}, <span className="text-ink-2">{j.company}</span></h3>
                <p className="text-sm text-ink-3">{j.location}</p>
                {j.summary ? <p className="mt-3 max-w-[66ch] leading-relaxed text-ink-2">{j.summary}</p> : null}
                <ul className="mt-3 max-w-[66ch] list-disc space-y-1.5 pl-5 leading-relaxed text-ink-2 marker:text-line-strong">{j.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`Technologies at ${j.company}`}>{j.tech.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-14 grid gap-10 border-t border-line pt-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
          <h3 className="h-sub">Education</h3>
          <div><p className="font-medium">{EDUCATION.degree} in {EDUCATION.field}</p><p className="text-ink-2">{EDUCATION.school}, <span className="num">{EDUCATION.start}–{EDUCATION.end}</span></p></div>
        </div>
      </section>

      {/* ---- skills ---- */}
      <section id="skills" className="border-t border-line bg-surface" aria-labelledby="skills-title">
        <div className="wrap grid gap-10 py-16 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16 lg:py-24">
          <div><p className="kicker">Technical skills</p><h2 id="skills-title" className="h-section mt-2">What I work with</h2></div>
          <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {SKILLS.map((s) => <div key={s.group}><dt className="text-sm font-semibold">{s.group}</dt><dd className="mt-1.5 leading-relaxed text-ink-2">{s.items.join(", ")}</dd></div>)}
          </dl>
        </div>
      </section>

      {/* ---- archive ---- */}
      <section className="wrap py-16 lg:py-24" aria-labelledby="archive-title">
        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
          <div><p className="kicker">Additional projects</p><h2 id="archive-title" className="h-section mt-2">Where it all started</h2>
            <p className="mt-3 text-ink-2">Every developer starts somewhere. Here&apos;s my somewhere, plus what&apos;s in progress.</p></div>
          <ul className="divide-y divide-line border-y border-line">
            {ARCHIVE.map((a) => (
              <li key={a.name} className="grid gap-2 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8">
                <div>
                  <h3 className="font-semibold">{a.name} <span className={`ml-1.5 text-sm font-normal ${a.status === "In development" ? "text-accent" : "text-ink-3"}`}>{a.status}</span></h3>
                  <p className="mt-1 max-w-[64ch] leading-relaxed text-ink-2">{a.body}</p>
                  <p className="mt-1 text-sm text-ink-3">{a.stack}</p>
                </div>
                {a.href ? <a href={a.href} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1 self-start text-sm font-medium">{a.linkLabel}<Ext /><span className="sr-only">: {a.name} (opens in a new tab)</span></a> : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- about ---- */}
      <section id="about" className="border-t border-line bg-surface" aria-labelledby="about-title">
        <div className="wrap grid gap-10 py-16 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16 lg:py-24">
          <div>
            <p className="kicker">About</p><h2 id="about-title" className="h-section mt-2">A little about me</h2>
            <Image src={PROFILE.image} alt="Portrait of Ralph Vargas Sormillon" width={520} height={650} sizes="(min-width: 1024px) 260px, 220px" className="mt-8 aspect-[4/5] w-[220px] rounded-[var(--radius-lg)] object-cover object-[50%_25%] lg:w-full" />
          </div>
          <div>
            <div className="max-w-[62ch] space-y-4 text-lg leading-relaxed text-ink-2">{PROFILE.about.map((t) => <p key={t}>{t}</p>)}</div>
            <h3 className="mt-12 h-sub">Life outside the IDE</h3>
            <ul className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {PROFILE.interests.map((i) => <li key={i.title} className="border-t border-line pt-3"><p className="font-semibold">{i.title}</p><p className="mt-0.5 text-ink-2">{i.body}</p></li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ---- contact ---- */}
      <section id="contact" className="border-t border-line" aria-labelledby="contact-title">
        <div className="wrap py-16 lg:py-28">
          <p className="kicker">Contact</p>
          <h2 id="contact-title" className="h-display mt-3 max-w-[16ch]">Let&apos;s build something.</h2>
          <p className="mt-5 max-w-[54ch] text-lg leading-relaxed text-ink-2">Have an interesting problem to solve, or want to talk engineering? I&apos;m always happy to connect with other engineers and hear about interesting work.</p>
          <a href={mailto()} className="mt-8 inline-block text-[clamp(1.25rem,1rem+1.6vw,2rem)] font-semibold tracking-[-0.02em] break-all underline decoration-line-strong decoration-2 underline-offset-[6px] transition-colors hover:decoration-ink">{PROFILE.email}</a>
          <div className="mt-8 flex flex-wrap gap-3">
            {SOCIALS.map((s) => <a key={s.id} href={s.href} target="_blank" rel="me noopener noreferrer" className="btn btn-secondary">{s.label === "LinkedIn" ? "Connect on LinkedIn" : "GitHub"}<Ext />{newTab}</a>)}
            <a href={RESUME_PDF} className="btn btn-secondary" download>Download resume (PDF)</a>
          </div>
        </div>
      </section>
    </main>
  );
}

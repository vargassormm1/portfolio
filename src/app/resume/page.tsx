import type { Metadata } from "next";
import { PROFILE, SOCIALS, RESUME_PDF, mailto } from "@/content/profile";
import { EDUCATION, EXPERIENCE, range } from "@/content/experience";
import { SKILLS } from "@/content/skills";
import { FEATURED } from "@/content/projects";
import { ENGINEERING } from "@/content/engineering";
import { abs } from "@/content/site";
import { JsonLd } from "@/components/JsonLd";
import { resumeLd } from "@/lib/identity";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${PROFILE.name}, Software Engineer at ${PROFILE.employer} in the ${PROFILE.region}: experience, skills, projects and education.`,
  alternates: { canonical: "/resume" },
  openGraph: { url: "/resume", title: `Resume | ${PROFILE.name}` },
};

/** The recruiter view: plain headings, one column, everything in the HTML, prints cleanly. */
export default function Resume() {
  return (
    <main id="main" className="wrap max-w-[820px] py-12 sm:py-16 print:max-w-none print:p-0">
      <JsonLd data={resumeLd()} />
      <header className="border-b border-line-strong pb-6 print:pb-3">
        <h1 className="text-[2rem] leading-tight font-semibold tracking-[-0.03em]">{PROFILE.name}</h1>
        <p className="mt-1 text-lg">{PROFILE.title}</p>
        <p className="text-ink-2">{PROFILE.region}</p>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
          <li><a href={mailto()} className="link">{PROFILE.email}</a></li>
          {SOCIALS.map((s) => <li key={s.id}><a href={s.href} rel="me" className="link">{s.href.replace("https://www.", "").replace("https://", "").replace(/\/$/, "")}</a></li>)}
          <li><a href={abs("/")} className="link">{abs("/").replace("https://", "").replace(/\/$/, "")}</a></li>
        </ul>
        <p className="no-print mt-5 flex flex-wrap gap-3">
          <a href={RESUME_PDF} download className="btn btn-primary">Download PDF</a>
          <a href="/resume.txt" className="btn btn-secondary">Plain text</a>
          <a href="/resume.json" className="btn btn-secondary">JSON Resume</a>
        </p>
      </header>

      <section aria-labelledby="r-summary" className="mt-8 print:mt-3.5">
        <h2 id="r-summary" className="border-b border-line pb-1 text-base font-semibold text-accent-ink print:text-[11pt]">Professional summary</h2>
        <p className="mt-2 leading-relaxed">{PROFILE.summary}</p>
      </section>

      <section aria-labelledby="r-exp" className="mt-8 print:mt-3.5">
        <h2 id="r-exp" className="border-b border-line pb-1 text-base font-semibold text-accent-ink print:text-[11pt]">Professional experience</h2>
        {EXPERIENCE.map((j) => (
          <article key={j.company + j.start} className="print-break-avoid mt-5 print:mt-2.5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-semibold">{j.title}, {j.company}<span className="hidden print:inline"> | </span></h3>
              <p className="num text-sm text-ink-2"><time dateTime={j.start}>{range(j).split(" – ")[0]}</time> – {j.end ? <time dateTime={j.end}>{range(j).split(" – ")[1]}</time> : "Present"}</p>
            </div>
            <p className="text-sm text-ink-2">{j.type}, {j.location}</p>
            {j.summary ? <p className="mt-2 leading-relaxed print:mt-1 print:leading-snug">{j.summary}</p> : null}
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed print:mt-1 print:space-y-0 print:leading-snug">{j.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            <p className="mt-1.5 text-sm text-ink-2">Technologies: {j.tech.join(", ")}</p>
          </article>
        ))}
      </section>

      <section aria-labelledby="r-eng" className="mt-8 print:mt-3.5">
        <h2 id="r-eng" className="border-b border-line pb-1 text-base font-semibold text-accent-ink print:text-[11pt]">Selected engineering work</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed print:mt-1.5 print:space-y-0.5 print:leading-snug">{ENGINEERING.map((e) => <li key={e.title}><span className="font-medium">{e.title}.</span> {e.body}</li>)}</ul>
      </section>

      <section aria-labelledby="r-skills" className="mt-8 print:mt-3.5">
        <h2 id="r-skills" className="border-b border-line pb-1 text-base font-semibold text-accent-ink print:text-[11pt]">Technical skills</h2>
        <dl className="mt-3 space-y-1.5">{SKILLS.map((s) => <div key={s.group} className="sm:grid sm:grid-cols-[200px_1fr] sm:gap-3"><dt className="font-medium">{s.group}</dt><dd>{s.items.join(", ")}</dd></div>)}</dl>
      </section>

      <section aria-labelledby="r-projects" className="mt-8 print:mt-3.5">
        <h2 id="r-projects" className="border-b border-line pb-1 text-base font-semibold text-accent-ink print:text-[11pt]">Projects</h2>
        <ul className="mt-3 space-y-2.5">
          {FEATURED.map((p) => (
            <li key={p.slug} className="print-break-avoid leading-relaxed">
              <span className="font-semibold">{p.name}</span> <span className="text-ink-2">({p.status})</span>: {p.summary} <span className="text-ink-2">{p.stack.slice(0, 5).join(", ")}.</span>
              {p.links[0] ? <> <a href={p.links[0].href} className="link">{p.links[0].href.replace("https://", "")}</a></> : null}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="r-edu" className="mt-8 print:mt-3.5">
        <h2 id="r-edu" className="border-b border-line pb-1 text-base font-semibold text-accent-ink print:text-[11pt]">Education</h2>
        <p className="mt-2"><span className="font-semibold">{EDUCATION.degree}, {EDUCATION.field}</span>, {EDUCATION.school}, <span className="num">{EDUCATION.start}–{EDUCATION.end}</span></p>
      </section>
    </main>
  );
}

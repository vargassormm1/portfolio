// Machine-readable views of src/content: JSON-LD, JSON Resume, plain text and llms.txt. One source, many formats.
import { abs, CONTENT_UPDATED, SITE_URL } from "@/content/site";
import { PROFILE, RESUME_PDF, SOCIALS } from "@/content/profile";
import { EDUCATION, EXPERIENCE, range, type Job } from "@/content/experience";
import { ALL_SKILLS, SKILLS } from "@/content/skills";
import { EXPERTISE } from "@/content/expertise";
import { ENGINEERING } from "@/content/engineering";
import { ARCHIVE, FEATURED, OTHER, type Project } from "@/content/projects";

export const PERSON_ID = `${SITE_URL}/#person`;
export const SITE_ID = `${SITE_URL}/#website`;
const sameAs = SOCIALS.map((s) => s.href);

export function personLd() {
  return {
    "@type": "Person", "@id": PERSON_ID,
    name: PROFILE.name, alternateName: PROFILE.alternateName, jobTitle: PROFILE.title,
    description: PROFILE.summary, url: abs("/"), image: abs(PROFILE.image), email: `mailto:${PROFILE.email}`,
    sameAs,
    worksFor: { "@type": "Organization", name: PROFILE.employer },
    alumniOf: { "@type": "CollegeOrUniversity", name: EDUCATION.school },
    homeLocation: { "@type": "Place", name: PROFILE.region },
    hasOccupation: { "@type": "Occupation", name: PROFILE.title, occupationLocation: { "@type": "Place", name: PROFILE.region }, skills: ALL_SKILLS.join(", ") },
    knowsAbout: [...EXPERTISE.map((e) => e.title), "TypeScript", "React", "Next.js", "Node.js", "PHP", "Laravel", "Python", "FastAPI", "AWS", "Docker", "MySQL", "PostgreSQL", "SQL Server"],
  };
}

export function homeLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": SITE_ID, url: abs("/"), name: PROFILE.name, publisher: { "@id": PERSON_ID }, inLanguage: "en-US" },
      { "@type": "ProfilePage", "@id": `${abs("/")}#profilepage`, url: abs("/"), name: `${PROFILE.name} | ${PROFILE.title}`, isPartOf: { "@id": SITE_ID }, mainEntity: { "@id": PERSON_ID }, dateModified: CONTENT_UPDATED },
      personLd(),
    ],
  };
}

export function resumeLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${abs("/resume")}#webpage`, url: abs("/resume"), name: `Resume | ${PROFILE.name}`, isPartOf: { "@id": SITE_ID }, about: { "@id": PERSON_ID } },
      personLd(),
      breadcrumbs([["Home", "/"], ["Resume", "/resume"]]),
    ],
  };
}

export function projectLd(p: Project) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork", "@id": `${abs(`/projects/${p.slug}`)}#project`, name: p.name, description: p.summary, genre: "Personal software project",
        creator: { "@id": PERSON_ID }, author: { "@id": PERSON_ID },
        url: p.links.find((l) => l.kind !== "code")?.href ?? abs(`/projects/${p.slug}`),
        ...(p.desktop ? { screenshot: abs(p.desktop.src) } : {}),
        ...(p.repo === "public" ? { isBasedOn: p.links.find((l) => l.kind === "code")?.href } : {}),
        keywords: p.stack.join(", "),
      },
      { "@type": "WebPage", "@id": abs(`/projects/${p.slug}`), url: abs(`/projects/${p.slug}`), name: `${p.name} case study | ${PROFILE.name}`, isPartOf: { "@id": SITE_ID }, about: { "@id": `${abs(`/projects/${p.slug}`)}#project` }, author: { "@id": PERSON_ID } },
      { ...personLd() },
      breadcrumbs([["Home", "/"], [p.name, `/projects/${p.slug}`]]),
    ],
  };
}

const breadcrumbs = (items: [string, string][]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
});

/** Safe to inline in a <script type="application/ld+json">: no "<" can close the tag. */
export const ldJson = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

// ---- JSON Resume (https://jsonresume.org/schema, v1.0.0) ----
export function jsonResume() {
  return {
    $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: {
      name: PROFILE.name, label: PROFILE.title, image: abs(PROFILE.image), email: PROFILE.email, url: abs("/"),
      summary: PROFILE.summary,
      location: { region: PROFILE.region, countryCode: PROFILE.country },
      profiles: SOCIALS.map((s) => ({ network: s.label, username: s.href.replace(/\/$/, "").split("/").pop(), url: s.href })),
    },
    work: EXPERIENCE.map((j) => ({ name: j.company, position: j.title, location: j.location, startDate: j.start, ...(j.end ? { endDate: j.end } : {}), summary: j.summary ?? "", highlights: j.highlights })),
    education: [{ institution: EDUCATION.school, area: EDUCATION.field, studyType: EDUCATION.degree, startDate: EDUCATION.start, endDate: EDUCATION.end }],
    skills: SKILLS.map((s) => ({ name: s.group, keywords: s.items })),
    projects: [
      ...FEATURED.map((p) => ({ name: p.name, description: p.summary, highlights: p.challenges.map((c) => c.title), keywords: p.stack, url: p.links[0]?.href ?? abs(`/projects/${p.slug}`), ...(p.caseStudy ? { entity: abs(`/projects/${p.slug}`) } : {}) })),
      ...[...OTHER, ...ARCHIVE].map((a) => ({ name: a.name, description: a.body, url: a.href })),
    ],
    meta: { canonical: abs("/resume.json"), lastModified: CONTENT_UPDATED },
  };
}

const jobText = (j: Job) => [
  `${j.title}, ${j.company} (${j.type})`,
  `${range(j)} | ${j.location}`,
  ...(j.summary ? [j.summary] : []),
  ...j.highlights.map((h) => `- ${h}`),
  `Technologies: ${j.tech.join(", ")}`,
].join("\n");

// ---- plain text resume ----
export function resumeText() {
  return [
    PROFILE.name.toUpperCase(),
    `${PROFILE.title} | ${PROFILE.region}`,
    `${PROFILE.email} | ${SOCIALS.map((s) => s.href).join(" | ")} | ${abs("/")}`,
    "", "SUMMARY", PROFILE.summary,
    "", "EXPERIENCE", ...EXPERIENCE.flatMap((j) => [jobText(j), ""]),
    "SELECTED ENGINEERING WORK", ...ENGINEERING.map((e) => `- ${e.title}: ${e.body}`),
    "", "SKILLS", ...SKILLS.map((s) => `${s.group}: ${s.items.join(", ")}`),
    "", "PROJECTS", ...FEATURED.map((p) => `- ${p.name} (${p.status}): ${p.summary} ${p.links[0]?.href ?? ""}`.trim()),
    "", "EDUCATION", `${EDUCATION.degree}, ${EDUCATION.field}, ${EDUCATION.school}, ${EDUCATION.start}–${EDUCATION.end}`,
    "",
  ].join("\n");
}

// ---- llms.txt (proposal: https://llmstxt.org) ----
export function llmsTxt() {
  return [
    `# ${PROFILE.name}`,
    "",
    `> ${PROFILE.title} at ${PROFILE.employer}, ${PROFILE.region}. ${PROFILE.summary}`,
    "",
    "Ralph's personal site: experience, projects and contact details. Professional work is described at a high level to respect employer confidentiality.",
    "",
    "## Profile",
    `- [Resume (HTML)](${abs("/resume")}): experience, skills, projects and education`,
    `- [Resume (JSON Resume)](${abs("/resume.json")}): machine-readable`,
    `- [Resume (plain text)](${abs("/resume.txt")})`,
    `- [Resume (PDF)](${abs(RESUME_PDF)})`,
    ...SOCIALS.map((s) => `- [${s.label}](${s.href})`),
    `- Email: ${PROFILE.email}`,
    "",
    "## Projects",
    ...FEATURED.map((p) => `- [${p.name}](${p.caseStudy ? abs(`/projects/${p.slug}`) : p.links[0]?.href}): ${p.summary} Built with ${p.stack.join(", ")}. Status: ${p.status}.`),
    "",
    "## Optional",
    ...ENGINEERING.map((e) => `- ${e.title}: ${e.body}`),
    "",
  ].join("\n");
}

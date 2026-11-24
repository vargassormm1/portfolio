# Ralph Vargas Sormillon: portfolio

Personal site: who I am, what I've built, where I've worked. Next.js 16 (App Router) + TypeScript + Tailwind CSS 4,
fully static, hosted on Vercel. No database, auth, CMS, forms or third-party scripts.

## Run it

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
npm run typecheck
npm run test:e2e       # builds, starts on :3220, runs Playwright (Chromium phone + desktop, WebKit iPhone)
```

## Where things live

```
src/content/        the single source of truth (public-safe facts only)
  site.ts           canonical URL, indexing switch, crawler policy, webmaster verification
  profile.ts        name, title, intro, about, interests, socials, email
  experience.ts     jobs and education (ISO yyyy-mm dates)
  skills.ts         skills grouped by discipline
  projects.ts       featured projects (with case studies) and the archive
  engineering.ts    professional work, described at a high level (no clients, systems or counts)
  expertise.ts      "What I do"
src/lib/identity.ts JSON-LD, JSON Resume, plain-text resume and llms.txt, all built from src/content
src/app/            pages: / , /resume, /projects/[slug], 404; files: /resume.json, /resume.txt, /llms.txt,
                    /sitemap.xml, /robots.txt, /opengraph-image
src/components/     Header (mobile menu), Footer, Screens, JsonLd
public/             photo, screenshots (public/projects), resume PDF
e2e/                Playwright checks
```

Every format (home page, resume page, PDF, JSON, text, llms.txt, structured data) reads the same content files, so
they can't drift apart. Never import private docs into src/content.

## Common edits

- **New job or change:** edit `src/content/experience.ts` (dates as `yyyy-mm`, `end: null` for current). Then
  regenerate the PDF (below).
- **New project:** add an entry to `FEATURED` in `src/content/projects.ts`. Give it a `caseStudy` to get a page at
  `/projects/<slug>` (and a sitemap entry) automatically. Smaller things go in `ARCHIVE`.
- **Skills:** edit the groups in `src/content/skills.ts`.
- **Screenshots:** put PNGs in `public/projects/` and set `w`/`h` to the real pixel size. Phone shots are 780×1688
  (390×844 at 2x); desktop shots 2160×1350 (1440×900 at 1.5x). Only fictional data: Guap's public demo, Baseline's
  test players.
- **Resume PDF:** start the site, open `/resume`, and print to PDF (or the Playwright snippet in the docs log), saved
  as `public/ralph-vargas-sormillon-resume.pdf`. Check it's 2 pages with selectable text.

## Design system

Tokens are CSS variables in `src/app/globals.css`: colors (warm off-white, near-black ink, one forest-green accent),
radii (6/10/14), shadows, durations (160/240/420 ms) and easing, header height, focus ring. Type is Geist (self-hosted
by next/font). Light theme only, by design. Motion: CSS transitions plus a scroll-driven section reveal that only runs
where supported and when reduced motion is off; content is never hidden without it.

## SEO and discoverability

- Canonical origin: `NEXT_PUBLIC_SITE_URL` (defaults to the current vercel.app URL). Changing domains = set this
  env var and redeploy; canonical links, sitemap, robots, Open Graph, JSON-LD, JSON Resume and llms.txt all follow.
- Only production builds are indexable (`VERCEL_ENV=production`); previews and local builds send `noindex` and a
  blocking robots.txt.
- Crawlers: search bots (Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot, PerplexityBot…) are allowed;
  training bots (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot) are opted out. Flip
  `ALLOW_AI_TRAINING` in `src/content/site.ts` to allow them. robots.txt is a request, not access control.
- Structured data: ProfilePage + Person (stable `@id`), WebSite, SoftwareApplication per case study, BreadcrumbList.
- Webmaster verification: set `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION` in Vercel.
- `llms.txt` follows the llmstxt.org proposal; it is experimental and not a ranking factor.

## Security

Static output only. Headers in `next.config.ts`: CSP (self only; inline scripts allowed because static pages can't
carry per-request nonces), frame-ancestors none, nosniff, referrer policy, permissions policy, COOP, HSTS. No
browser source maps. The only `dangerouslySetInnerHTML` is JSON-LD built from static content with `<` escaped.

## Deploying

Vercel project `ralph-vargas-projects/portfolio`. Deploy only after review. After a deploy: check the live robots.txt
and sitemap, validate structured data with Google's Rich Results Test, and submit the sitemap in Search Console and
Bing Webmaster Tools.

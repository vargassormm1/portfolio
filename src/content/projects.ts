// Personal projects. Claims are checked against each project's code or docs (2026-11-24). Screenshots use fictional
// data only: Guap's public demo ("Demo User") and Baseline's local test players.

export type Shot = { src: string; alt: string; w: number; h: number };
export type Project = {
  slug: string; name: string; category: string; status: "Live" | "In development" | "Archived";
  summary: string;
  /** the human story, in Ralph's voice (Baseline and Guap from Ralph; DocChat's motivation flagged for review) */
  headline: string; story: string[]; caption?: string;
  features: string[]; challenges: { title: string; body: string }[];
  stack: string[];
  links: { label: string; href: string; kind: "demo" | "site" | "code" }[];
  demoNote?: string;
  repo: "public" | "private" | null;
  desktop?: Shot; phones?: Shot[];
  caseStudy?: { problem: string; goals: string[]; architecture: string[] };
  started?: string;
};

const phone = (src: string, alt: string): Shot => ({ src, alt, w: 780, h: 1688 });
const desk = (src: string, alt: string): Shot => ({ src, alt, w: 2160, h: 1350 });

export const FEATURED: Project[] = [
  {
    slug: "guap", name: "Guap", category: "Personal project, finance", status: "Live", started: "Nov 2026",
    summary: "A personal cash-flow app that brings account balances, transactions, upcoming bills and a spending forecast into one mobile-first view.",
    headline: "I got tired of budgeting in spreadsheets. So I built my own finance app.",
    caption: "Built for an audience of one: me.",
    story: [
      "I've always been particular about keeping track of my finances. Between spreadsheets, several credit cards, bank accounts and upcoming bills, staying on top of it all started to feel like a part-time job.",
      "So, naturally, I did what any software engineer would do and built an entire application to solve my own problem.",
      "Guap syncs my accounts, tracks spending, keeps track of the bills that are still coming, and tells me how much I can comfortably spend before payday. It's built for an audience of one, but there's an interactive demo with fictional data so you can explore it too.",
    ],
    features: [
      "Bank, card and investment sync through SimpleFIN, with a manual fallback for unsupported accounts",
      "Safe-to-spend until payday, with a breakdown of pay, bills and spending",
      "Recurring-bill detection with review before anything changes the plan",
      "Quick Add for purchases the bank hasn't shown yet, matched automatically when certain",
      "Bills, spending by category and loan payoff views",
      "Installable as an app (PWA) and a public demo on fictional data",
    ],
    challenges: [
      { title: "Spending is not cash flow", body: "Credit card payments are transfers, not spending, so purchases are counted when they happen and the payment isn't counted again. Reimbursements and wallet cash-outs get their own treatment." },
      { title: "Pending, posted and duplicates", body: "Transactions are unique per provider, account and transaction ID, and a pending charge that later posts is reconciled instead of counted twice. Raw transactions are never edited; every decision is a separate allocation." },
      { title: "Matching manual entries safely", body: "A purchase entered by hand is linked to the synced transaction only when exactly one candidate fits the account, a short date window and the amount (allowing for tips). Otherwise it waits for review." },
      { title: "A number you can trust", body: "Safe-to-spend is the lower of what the budget allows and what checking can cover: the lowest projected balance before payday, minus a buffer. Shortfalls are shown, never hidden." },
      { title: "Money as integers", body: "Amounts are integer cents in a branded type with checked arithmetic, and every calculation reports whether it's complete, so missing data shows up as a warning rather than a wrong number." },
      { title: "Protecting financial data", body: "Single-owner sign-in with TOTP two-factor, row-level security on every table, and the bank connection secret encrypted at rest. The service worker caches only static files, never financial data." },
      { title: "A demo that can't leak", body: "The demo reuses the real screens and calculations over a fictional person, with state kept in the visitor's own cookie and no database access at all." },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "SimpleFIN", "Tailwind CSS", "PWA", "Vitest", "Vercel"],
    links: [{ label: "Explore the interactive demo", href: "https://guap-tau.vercel.app/demo", kind: "demo" }],
    demoNote: "No account needed. Every name and number in the demo is made up.",
    repo: "private",
    desktop: desk("/projects/guap-desktop-home.png", "Guap demo on desktop: $675.64 left to spend in November, with pay, bills and spending broken down."),
    phones: [
      phone("/projects/guap-home.png", "Guap demo home on a phone: left to spend this month."),
      phone("/projects/guap-bills.png", "Guap demo bills: twelve of twelve November bills paid."),
    ],
    caseStudy: {
      problem: "Budget apps show categories and charts, but the question that matters day to day is simpler: how much can I spend right now without coming up short before payday? Answering it honestly means knowing which bills are still coming, which charges are pending, and which money movements aren't spending at all.",
      goals: ["One trustworthy safe-to-spend number with an explainable breakdown", "Automatic sync with nothing changed without review", "Correct handling of transfers, card payments, reimbursements and pending charges", "Strong protection for personal financial data", "A public demo that shows the real product without real data"],
      architecture: [
        "Next.js App Router with Server Components for reads and Server Actions for writes; no public API returns financial data.",
        "Supabase Postgres with row-level security on every table: the app reads through the Supabase client with the owner's session, and the scheduled sync connects with postgres.js as a minimal, dedicated role.",
        "A daily SimpleFIN sync stores raw transactions unchanged; a separate allocation layer classifies them as spending, transfers, reimbursements, loans or savings.",
        "A pure TypeScript finance engine (unit-tested with Vitest) computes the plan from those inputs.",
        "Deployed on Vercel as an installable PWA.",
      ],
    },
  },
  {
    slug: "baseline", name: "Baseline", category: "Personal project, sports", status: "Live", started: "Mar 2024",
    summary: "A tennis and pickleball platform where friends record matches, confirm results, follow rankings and keep head-to-head records.",
    headline: "Turning friendly matches into serious competition.",
    caption: "Because bragging rights deserve a database.",
    story: [
      "I'm slightly obsessed with tennis. My friends and I used to track our one-on-one matches in the Notes app. Naturally, things got competitive, and a list of scores wasn't cutting it anymore.",
      "So we made Baseline: our own little tennis tour, with rankings, match history, challenges and a leaderboard for bragging rights.",
      "What started as a better way to settle arguments about who's best has grown into a full competition platform, now with doubles and pickleball too.",
    ],
    features: [
      "Tennis singles and doubles, and pickleball singles and doubles, each with its own rankings",
      "Every common tennis format: one set, standard doubles with a match tiebreak, best of three or five, short sets and pro sets",
      "Results count only once someone on the other side confirms them",
      "Challenges, head-to-head records, partnerships and season standings",
      "Invite-only sign-up with Google or a username, installable as an app",
    ],
    challenges: [
      { title: "Scores that can't be wrong", body: "Every format follows the official rules (ITF Rules of Tennis and USA Pickleball). Scores are validated in TypeScript as you type and again inside Postgres, and both validators run against the same shared file of test cases so they can't drift apart." },
      { title: "Results both sides agree on", body: "A match records as pending; only a player on the other side can confirm it. The database computes the winner and fixes the points at confirmation, so the browser never decides either." },
      { title: "Teams without team accounts", body: "Doubles partnerships are derived from matches, keyed by the sorted pair of players, so the same partners in any order are one team. Points follow each player whoever they partner." },
      { title: "Sports that never mix", body: "Tennis and pickleball, singles and doubles each have separate tables and boards. Adding pickleball and doubles was purely additive, with existing tennis data verified unchanged before and after." },
      { title: "A safe migration", body: "The app was rebuilt from Neon, Prisma and Clerk onto Supabase, and every player, match and set was moved over and reconciled against the old database before switching." },
      { title: "Locked-down writes", body: "All writes go through database functions with row-level security, column-level grants and rate limits, with unit, database and end-to-end tests on phone and desktop." },
    ],
    stack: ["Next.js", "TypeScript", "React", "Supabase", "PostgreSQL", "Tailwind CSS", "Playwright", "Vitest", "Vercel"],
    links: [{ label: "Visit Baseline", href: "https://base-line.vercel.app", kind: "site" }, { label: "Source code", href: "https://github.com/vargassormm1/BaseLine", kind: "code" }],
    repo: "public",
    desktop: desk("/projects/baseline-desktop-home.png", "Baseline on desktop: a player's rank, record and points, with a result waiting for confirmation."),
    phones: [
      phone("/projects/baseline-home.png", "Baseline home on a phone: rank two, a 15–12 record and a result to confirm."),
      phone("/projects/baseline-h2h.png", "Baseline head to head: Ana leads Ben 3 to 1."),
    ],
    caseStudy: {
      problem: "Recreational players have no shared record of who beat whom. Scores live in group chats, nobody agrees on formats, and a casual ranking falls apart the first time a result is disputed.",
      goals: ["Results both sides agree on", "Correct scoring for every common tennis and pickleball format", "Fair, separate rankings per sport and discipline", "A fast, phone-first experience", "No lost history when the app evolves"],
      architecture: [
        "Next.js App Router on Vercel, with Server Components for reads and Server Actions for writes.",
        "Supabase Postgres and Auth (Google and username accounts). Every write goes through a SECURITY DEFINER function with row-level security, column grants and rate limits.",
        "Standings, partnerships and head-to-head are derived from confirmed matches in shared TypeScript modules.",
        "One fixture file of score cases runs against both the TypeScript and SQL validators.",
        "Vitest unit and database tests, plus Playwright end-to-end tests on phone and desktop with accessibility checks.",
      ],
    },
  },
  {
    slug: "docchat", name: "DocChat", category: "Personal project, AI", status: "Archived", started: "2024",
    summary: "Upload a PDF and ask questions about it. Answers come from the most relevant passages of the document.",
    headline: "Less scrolling, more answers.",
    story: [
      "Some documents are longer than they need to be, and sometimes you just want one answer without reading forty pages.",
      "I built DocChat to explore how AI could make a document feel like something you can talk to: upload a PDF, ask a question, get an answer drawn from the document itself.",
    ],
    features: ["PDF upload to Amazon S3", "Question answering grounded in the document's own text", "A chat interface per document"],
    challenges: [
      { title: "Retrieval before generation", body: "The PDF is split into overlapping chunks, embedded with OpenAI embeddings, and the closest chunks to each question are retrieved from a vector store." },
      { title: "Grounded answers", body: "Only the retrieved passages go to the model, with instructions to say when the document doesn't contain enough to answer." },
    ],
    stack: ["Next.js", "LangChain", "OpenAI", "AWS S3"],
    links: [{ label: "Source code", href: "https://github.com/vargassormm1/DocChat", kind: "code" }],
    repo: "public",
    desktop: { src: "/docchat.jpeg", alt: "DocChat: the PDF upload screen.", w: 3420, h: 1898 },
  },
];

export const ARCHIVE = [
  { name: "TeeTime Scout", status: "In development", body: "Finding a good weekend tee time at a public course in New Jersey is a competitive sport of its own. Instead of refreshing booking sites, I'm prototyping a tool that would tell me when an opening fits my group. Early days, and not public. I'd rather spend Saturday playing golf than looking for somewhere to play.", stack: "Next.js, Supabase", href: null as string | null, linkLabel: null as string | null },
  { name: "TubeTalks", status: "Archived", body: "A follow-up experiment to DocChat: paste a YouTube link and ask questions about the video.", stack: "Next.js, LangChain, OpenAI", href: "https://github.com/vargassormm1/TubeTalks", linkLabel: "Source code" },
  { name: "Matej Sefcik Photography", status: "Live", body: "A portfolio site for a film and photography client, with a custom gallery, lightbox and contact form.", stack: "HTML, CSS, JavaScript", href: "https://www.matejsefcik.com/", linkLabel: "Visit site" },
  { name: "Maze Game", status: "Archived", body: "One of my first projects: a browser maze with a physics engine and a new layout every game.", stack: "JavaScript, Matter.js", href: "https://vigorous-wilson-7e4725.netlify.app/", linkLabel: "Play" },
  { name: "Simon Game", status: "Archived", body: "Where a lot of developers start, me included: the classic memory game with colors and sounds.", stack: "HTML, CSS, jQuery", href: "https://friendly-bassi-500e78.netlify.app/", linkLabel: "Play" },
];

export const caseStudies = FEATURED.filter((p) => p.caseStudy);

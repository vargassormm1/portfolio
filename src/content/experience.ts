export type Job = {
  company: string; title: string; type: string; location: string;
  start: string; end: string | null; // ISO yyyy-mm
  summary?: string; highlights: string[]; tech: string[];
};

// Sources: LinkedIn (titles, dates, locations, freelance and Incyree bullets) and Ralph's own description of his
// current role (2026-11-24). Alliance Advisors work is described at a high level only.
export const EXPERIENCE: Job[] = [
  {
    company: "Alliance Advisors", title: "Software Engineer", type: "Full-time", location: "New York City Metropolitan Area, on-site",
    start: "2025-04", end: null,
    summary: "I develop and maintain enterprise applications, data-processing workflows and production infrastructure, across full-stack development, database engineering, AI-powered internal tools, cloud deployments and application modernization.",
    highlights: [
      "Build features and resolve production issues in enterprise web applications and client-facing systems.",
      "Develop data import, transformation, synchronization and reporting workflows over multi-million-record datasets.",
      "Build AI-powered document analysis and information retrieval tools.",
      "Maintain and modernize production infrastructure on AWS across Linux and Windows Server, with Docker and Nginx.",
      "Upgrade legacy applications and frameworks, and reduce infrastructure exposure.",
    ],
    tech: ["PHP", "Laravel", "TypeScript", "React", "Vue.js", "Python", "FastAPI", "MySQL", "SQL Server", "AWS", "Docker", "Nginx"],
  },
  {
    company: "Self-employed", title: "Freelance Software Engineer", type: "Freelance", location: "New York City Metropolitan Area, remote",
    start: "2024-11", end: "2025-04",
    highlights: [
      "Delivered full-stack work for clients: new features, bug fixes and improvements to existing web applications.",
      "Built back-end APIs and front ends with PHP/Laravel, Vue.js, React and Node.js on MySQL.",
      "Built data import and reporting features that replaced manual spreadsheet work.",
      "Set up, deployed and maintained client applications on AWS EC2 (Linux and Windows Server).",
    ],
    tech: ["PHP", "Laravel", "Vue.js", "React", "Node.js", "MySQL", "AWS EC2"],
  },
  {
    company: "Incyree Inc.", title: "Software Engineer", type: "Full-time", location: "Belle Mead, New Jersey, hybrid",
    start: "2022-01", end: "2024-02",
    highlights: [
      "Led full-stack development of web applications with React front ends and Node.js/Express APIs.",
      "Built payment processing on Stripe, with webhooks keeping the database in sync with each transaction.",
      "Built real-time notifications over WebSockets and email delivery with NodeMailer.",
      "Set up and managed AWS infrastructure (VPC, EC2, microservices) and streamlined deployments to it.",
    ],
    tech: ["React", "Node.js", "Express.js", "Stripe", "WebSockets", "AWS"],
  },
];

export const EDUCATION = { school: "Montclair State University", degree: "Bachelor of Science", field: "Computer Science", start: "2017", end: "2021" };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const monthLabel = (ym: string) => `${MONTHS[Number(ym.slice(5, 7)) - 1]} ${ym.slice(0, 4)}`;
export const range = (j: Job) => `${monthLabel(j.start)} – ${j.end ? monthLabel(j.end) : "Present"}`;

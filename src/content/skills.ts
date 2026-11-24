export const SKILLS: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "PHP", "Python", "SQL"] },
  { group: "Front end", items: ["React", "Next.js", "Vue.js", "HTML", "CSS", "Tailwind CSS"] },
  { group: "Back end", items: ["Node.js", "Express.js", "Laravel", "FastAPI", "REST APIs", "WebSockets", "Webhooks"] },
  { group: "Databases", items: ["PostgreSQL", "MySQL", "Microsoft SQL Server", "MongoDB", "Supabase", "Prisma"] },
  { group: "Cloud and infrastructure", items: ["AWS (EC2, S3, VPC)", "Docker", "Nginx", "Linux", "Windows Server", "Cloudflare", "Vercel"] },
  { group: "AI and integrations", items: ["LLM integrations", "Document processing", "Agentic tool calling", "Retrieval", "Stripe", "Third-party APIs"] },
  { group: "Practices", items: ["Git", "Application security", "Database migrations", "Production troubleshooting", "Dependency upgrades", "Testing"] },
];
export const ALL_SKILLS = SKILLS.flatMap((s) => s.items);

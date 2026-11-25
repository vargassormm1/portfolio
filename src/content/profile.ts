export const PROFILE = {
  name: "Ralph Vargas Sormillon",
  alternateName: "Ralph Vargas",
  firstName: "Ralph",
  title: "Software Engineer",
  employer: "Alliance Advisors",
  region: "New Jersey, New York City Metropolitan Area",
  regionShort: "New Jersey, USA",
  country: "US",
  email: "ralphvargassorm@gmail.com",
  emailSubject: "Software Engineering Opportunity",
  image: "/profile.jpeg",
  greeting: "Hey, I'm Ralph.",
  intro: "I'm a software engineer at Alliance Advisors, where I work on full-stack applications, cloud infrastructure, data processing and AI-powered tools.",
  aside: "Outside of work, I enjoy playing tennis, golfing and building things that make my life a little easier.",
  summary:
    "Software engineer in the New York City metropolitan area with experience across enterprise applications, full-stack development, cloud infrastructure on AWS, large-scale data migration and AI-powered applications. Currently a Software Engineer at Alliance Advisors.",
  about: [
    "I'm a software engineer based in New Jersey and a Computer Science graduate from Montclair State University.",
    "I like working across the whole stack, from user interfaces and APIs to databases, deployments, and figuring out why something isn't working in production.",
    "Most of what I build outside of work started as something I wanted for myself or my friends, like Guap and Baseline."
  ],
};

export const SOCIALS = [
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/ralph-vargas-sormillon/" },
  { id: "github", label: "GitHub", href: "https://github.com/vargassormm1" },
] as const;

export const mailto = (subject: string = PROFILE.emailSubject) => `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}`;

export const RESUME_PDF = "/ralph-vargas-sormillon-resume.pdf";

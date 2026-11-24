export const PROFILE = {
  name: "Ralph Vargas Sormillon",
  alternateName: "Ralph Vargas",
  firstName: "Ralph",
  title: "Software Engineer",
  employer: "Alliance Advisors",
  region: "New York City Metropolitan Area",
  regionShort: "NYC metro / New Jersey",
  country: "US",
  email: "ralphvargassorm@gmail.com",
  emailSubject: "Software Engineering Opportunity",
  image: "/profile.jpeg",
  greeting: "Hey, I'm Ralph.",
  tagline: "I turn everyday problems into software. Sometimes I even do it for work.",
  intro: "I'm a software engineer based in New Jersey, currently at Alliance Advisors. I work across enterprise applications, AI-powered tools, cloud infrastructure and large-scale data, and outside work I build apps that make everyday life a little easier.",
  aside: "When I'm not coding, I'm probably on a tennis court, at a golf course, or thinking about what to build next.",
  summary:
    "Software engineer in the New York City metropolitan area with experience across enterprise applications, full-stack development, cloud infrastructure on AWS, large-scale data migration and AI-powered applications. Currently a Software Engineer at Alliance Advisors.",
  about: [
    "I'm a software engineer, a Computer Science graduate from Montclair State, and someone with a habit of turning everyday inconveniences into side projects.",
    "At work I move between full-stack development, AI applications, cloud infrastructure and large-scale data processing. I like understanding how things work, untangling complicated problems, and leaving systems simpler and more reliable than I found them.",
    "Outside work I'm usually playing tennis, trying to improve my golf game, or building something that started with the thought, \"There has to be a better way to do this.\" Whether it's an application handling millions of records or a leaderboard that gives my friends another reason to talk trash, I just like building things.",
  ],
  interests: [
    { title: "Tennis", body: "Slightly obsessed. It's the reason Baseline exists." },
    { title: "Golf", body: "Working on my game, and the reason TeeTime Scout exists." },
    { title: "Side projects", body: "Tools for my own life that sometimes turn into real products." },
    { title: "New tech", body: "Especially practical uses of AI, the kind that save real time." },
  ],
};

export const SOCIALS = [
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/ralph-vargas-sormillon/" },
  { id: "github", label: "GitHub", href: "https://github.com/vargassormm1" },
] as const;
export const INSTAGRAM = "https://www.instagram.com/ralphvargas_/";

export const mailto = (subject: string = PROFILE.emailSubject) => `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}`;

export const RESUME_PDF = "/ralph-vargas-sormillon-resume.pdf";

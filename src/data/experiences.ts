export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  techStack: string[];
}

export const experiences: Experience[] = [
  {
    title: "Senior Frontend Engineer",
    company: "TechCorp Industries",
    period: "2022-Present",
    description: [
      "Led development of next-gen user interface platform",
      "Reduced load times by 60% through optimization",
      "Mentored team of 5 junior developers",
      "Implemented CI/CD pipeline reducing deployment time by 75%"
    ],
    techStack: ["React", "TypeScript", "Next.js", "Framer Motion", "TailwindCSS"]
  },
  {
    title: "Full Stack Developer",
    company: "Digital Dynamics",
    period: "2020-2022",
    description: [
      "Architected and deployed microservices infrastructure",
      "Built real-time analytics dashboard for 100K+ users",
      "Reduced server costs by 40% through AWS optimization",
      "Implemented WebSocket solution for live data updates"
    ],
    techStack: ["Node.js", "React", "PostgreSQL", "AWS", "Docker"]
  },
  {
    title: "Software Engineer",
    company: "InnovateLabs",
    period: "2018-2020",
    description: [
      "Developed mobile-first responsive web applications",
      "Created custom CMS solution for content management",
      "Integrated third-party APIs and payment systems",
      "Improved site accessibility to WCAG 2.1 standards"
    ],
    techStack: ["Vue.js", "Python", "Django", "MongoDB", "Redis"]
  },
  {
    title: "Junior Developer",
    company: "StartupForge",
    period: "2017-2018",
    description: [
      "Built and maintained e-commerce platform features",
      "Implemented responsive email templates",
      "Developed automated testing suite",
      "Optimized database queries improving performance"
    ],
    techStack: ["JavaScript", "PHP", "MySQL", "jQuery", "Bootstrap"]
  },
  {
    title: "Software Engineering Intern",
    company: "CodeCraft Solutions",
    period: "2016-2017",
    description: [
      "Developed and maintained internal tools and utilities",
      "Assisted in migration of legacy systems",
      "Created automated testing frameworks",
      "Collaborated with senior developers on feature implementation"
    ],
    techStack: ["Java", "Spring Boot", "Angular", "Jenkins", "Git"]
  }
]; 
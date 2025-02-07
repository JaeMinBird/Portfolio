export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  techStack: string[];
}

export const experiences: Experience[] = [
  {
    title: "Web Developer, Intern",
    company: "Albany Upstate Accounting & Tax",
    period: "May 2024 - August 2024",
    description: [
      "Designed and presented interactive UI/UX prototype using Figma",
      "Developed mobile compatible site with HTML, CSS, JavaScript, Bootstrap, and jQuery",
      "Created content modules for October CMS managed with Laravel",
      "Managed project timelines with Jira in an Agile Scrum environment"
    ],
    techStack: ["Bootstrap", "jQuery", "Figma", "PHP", "Laravel", "October CMS", "Jira"]
  },
  {
    title: "Support Technician",
    company: "Mindburn Solutions LLC",
    period: "July 2021 - August 2023",
    description: [
      "Tracked and logged company inventory and finances in a SQL database",
      "Aided onsite disaster recovery for 3 national companies",
      "Designed and implemented networks for local and national businesses"
    ],
    techStack: ["SQL", "Database Management", "Network Design", "Disaster Recovery"]
  }
]; 
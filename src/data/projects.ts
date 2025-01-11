export interface Project {
  name: string;
  pixelIcon: string; // SVG path
  dateRange: string;
  description: string[];
  techStack: string[];
}

export const projects = [
  {
    name: "Portfolio v2",
    pixelIcon: "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2zm0 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8z",
    dateRange: "June 2024 - Present",
    description: [
      "Modern, responsive portfolio website using Next.js and Tailwind CSS",
      "Implemented interactive terminal-style project showcase",
      "Utilized Framer Motion for smooth animations"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
  },
  {
    name: "AI Code Assistant",
    pixelIcon: "M7.5 1A2.5 2.5 0 0 0 5 3.5v1H3.5A2.5 2.5 0 0 0 1 7v5.5A2.5 2.5 0 0 0 3.5 15h9a2.5 2.5 0 0 0 2.5-2.5V7a2.5 2.5 0 0 0-2.5-2.5H11v-1A2.5 2.5 0 0 0 8.5 1h-1zM10 5V3.5a1.5 1.5 0 0 0-3 0V5h3zm-6 4.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-3z",
    dateRange: "Apr. 2024 - May 2024",
    description: [
      "Developed an intelligent code generation and assistance tool",
      "Implemented context-aware code suggestions",
      "Created robust error handling and language support"
    ],
    techStack: ["Python", "OpenAI", "Flask", "React"]
  },
  {
    name: "Urban Transit Tracker",
    pixelIcon: "M8 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8z",
    dateRange: "Feb. 2024 - Mar. 2024",
    description: [
      "Real-time public transit tracking application",
      "Integrated GPS and route optimization algorithms",
      "Developed cross-platform mobile interface"
    ],
    techStack: ["React Native", "GraphQL", "Node.js", "MongoDB"]
  },
  {
    name: "Cybersecurity Dashboard",
    pixelIcon: "M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM3.5 5.5a2 2 0 1 1 4 0a2 2 0 0 1-4 0zm7 6a2 2 0 1 1 0-4a2 2 0 0 1 0 4z",
    dateRange: "Dec. 2023 - Jan. 2024",
    description: [
      "Comprehensive network security monitoring platform",
      "Implemented real-time threat detection",
      "Created interactive visualization of network traffic"
    ],
    techStack: ["Vue.js", "Django", "Elasticsearch", "Docker"]
  }
];
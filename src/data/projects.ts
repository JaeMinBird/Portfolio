export interface Project {
  name: string;
  pixelIcon: string; // SVG path
  dateRange: string;
  description: string[];
  techStack: string[];
  githubUrl: string; // Added GitHub URL field
}

export const projects = [
  {
    name: "5-Stage MIPS CPU in Verilog",
    pixelIcon: "M72 56h14v14H72zM72 40h14v14H72zM72 72h14v14H72zM72 104h14v14H72zM72 88h14v14H72zM72 120h14v14H72zM72 152h14v14H72zM72 136h14v14H72zM72 168h14v14H72zM168 56h14v14h-14zM168 40h14v14h-14zM168 72h14v14h-14zM168 104h14v14h-14zM168 88h14v14h-14zM168 120h14v14h-14zM168 152h14v14h-14zM168 136h14v14h-14zM168 168h14v14h-14zM168 184h14v14h-14zM168 200h14v14h-14zM72 184h14v14H72zM72 200h14v14H72zM152 72h14v14h-14zM200 72h14v14h-14zM56 72h14v14H56zM88 72h14v14H88zM184 72h14v14h-14zM200 168h14v14h-14zM184 168h14v14h-14zM40 168h14v14H40zM104 72h14v14h-14zM120 72h14v14h-14zM40 72h14v14H40zM136 72h14v14h-14zM152 168h14v14h-14zM56 168h14v14H56zM88 168h14v14H88zM104 168h14v14h-14zM120 168h14v14h-14zM136 168h14v14h-14z",
    dateRange: "June 2024 - August 2024",
    description: [
      "Implemented 5-stage pipelined MIPS CPU in Verilog with arithmetic, logical, and control operations",
      "Wrote modules for all pipeline stages with integrated control and ALU logic",
      "Simulated CPU behavior in Vivado 2024.1, verifying pipeline data flow and execution",
      "Synthesized design for xc7z010clg400-1 FPGA, optimizing resource use"
    ],
    techStack: ["Verilog", "Vivado", "FPGA", "MIPS Architecture"], // Skills Demonstrated
    githubUrl: "https://github.com/JaeMinBird/MIPS-CPU" // GitHub URL here
  },
  {
    name: "Virtual Disk System",
    pixelIcon: "M64 96h14v14H64zM128 64h14v14h-14zM80 48h14v14H80zM64 112h14v14H64zM64 80h14v14H64zM64 128h14v14H64zM64 144h14v14H64zM80 160h14v14H80zM176 80h14v14h-14zM208 112h14v14h-14zM208 96h14v14h-14zM208 128h14v14h-14zM208 144h14v14h-14zM176 160h14v14h-14zM160 80h14v14h-14zM208 80h14v14h-14zM64 64h14v14H64zM96 48h14v14H96zM192 80h14v14h-14zM208 160h14v14h-14zM192 160h14v14h-14zM112 48h14v14h-14zM144 80h14v14h-14zM160 160h14v14h-14zM64 160h14v14H64zM96 160h14v14H96zM112 160h14v14h-14zM128 160h14v14h-14zM144 160h14v14h-14zM32 128h14v14H32zM32 144h14v14H32zM32 96h14v14H32zM32 112h14v14H32zM32 160h14v14H32zM32 176h14v14H32zM48 192h14v14H48zM128 192h14v14h-14zM32 192h14v14H32zM64 192h14v14H64zM80 192h14v14H80zM96 192h14v14H96zM112 192h14v14h-14zM160 192h14v14h-14zM144 192h14v14h-14z",
    dateRange: "May 2024 - August 2024",
    description: [
      "Developed block-level storage system in C using a JBOD architecture",
      "Implemented an LFU caching algorithm to optimize data retrieval and reduce disk access",
      "Integrated TCP networking for remote storage operations over IP networks"
    ],
    techStack: ["C", "TCP/IP", "Linux", "JBOD"], // Skills Demonstrated
    githubUrl: "https://github.com/JaeMinBird/VirtualDiskSystem" // GitHub URL here
  },
  {
    name: "Club Website",
    pixelIcon: "M200 80h14v14h-14zM200 96h14v14h-14zM184 96h14v14h-14zM184 80h14v14h-14zM200 64h14v14h-14zM168 96h14v14h-14zM168 64h14v14h-14zM152 48h14v14h-14zM136 48h14v14h-14zM120 48h14v14h-14zM56 64h14v14H56zM72 64h14v14H72zM88 48h14v14H88zM104 48h14v14h-14zM56 80h14v14H56zM40 80h14v14H40zM40 96h14v14H40zM40 112h14v14H40zM72 144h14v14H72zM40 160h14v14H40zM104 192h14v14h-14zM88 192h14v14H88zM40 176h14v14H40zM56 160h14v14H56zM56 144h14v14H56zM40 144h14v14H40zM120 192h14v14h-14zM136 192h14v14h-14zM152 192h14v14h-14zM168 192h14v14h-14zM72 48h14v14H72zM72 176h14v14H72zM168 176h14v14h-14zM184 176h14v14h-14zM184 160h14v14h-14zM200 160h14v14h-14zM200 144h14v14h-14zM200 128h14v14h-14z",
    dateRange: "August 2023 - May 2024",
    description: [
      "Built parallax website with React, Bootstrap, HTML, CSS, Javascript, and jQuery",
      "Created sign-up form with Node.js and Express.js",
      "Stored form data in MongoDB database synced with Google Cloud API",
      "Deployed with Nginx on a virtual Ubuntu Server"
    ],
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Nginx", "Google Cloud API"], // Skills Demonstrated
    githubUrl: "https://github.com/JaeMinBird/PSUASASite" // GitHub URL here
  }
];
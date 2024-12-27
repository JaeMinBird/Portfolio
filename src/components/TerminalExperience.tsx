'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experiences, Experience } from "@/data/experiences";

export function TerminalExperience() {
  return (
    <div className="flex flex-col items-center gap-8">
      {experiences.map((exp, index) => (
        <ExperienceWindow key={index} experience={exp} index={index} />
      ))}
    </div>
  );
}

function ExperienceWindow({ experience, index }: { experience: Experience; index: number }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "-100px" });

  const LoadingBar = () => (
    <div className="flex gap-[2px] my-2">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: isInView ? 1 : 0.2 }}
          transition={{ 
            duration: 0.1,
            delay: i * 0.05,
            ease: "linear"
          }}
          className={`h-1 w-[10px] ${
            i <= 20 ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-white/20'
          }`}
        />
      ))}
    </div>
  );

  return (
    <motion.div
      ref={containerRef}
      className="font-mono bg-black border border-white/20 p-6 max-w-lg w-full shadow-[0_0_15px_rgba(255,255,255,0.3)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-white mb-2 tracking-wide font-bold text-shadow-glow">
        {`> experience_${index + 1}.dat`}
      </div>

      <LoadingBar />

      <motion.div
        className="text-white/90 space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="text-shadow-glow">
          <span className="text-white font-bold">ROLE: </span>{experience.title}
          <br />
          <span className="text-white font-bold">COMPANY: </span>{experience.company}
          <br />
          <span className="text-white font-bold">TIMELINE: </span>{experience.period}
        </div>

        <div className="mt-4">
          <span className="text-white font-bold text-shadow-glow">ACHIEVEMENTS:</span>
          {experience.description.map((desc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -10 }}
              transition={{ delay: 1 + i * 0.1, duration: 0.2 }}
              className="ml-4 text-shadow-glow"
            >
              $ {desc}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: 1.5 }}
          className="mt-4 flex flex-wrap gap-2"
        >
          {experience.techStack.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 border border-white/40 text-sm text-shadow-glow hover:border-white/80 transition-colors"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 
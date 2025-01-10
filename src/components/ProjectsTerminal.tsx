'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { projects } from "@/data/projects";

export function ProjectsTerminal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleTabClick = useCallback((index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  }, [currentIndex]);

  const getFormattedProjectName = (name: string) => {
    const maxLength = 15;
    return name.length > maxLength 
      ? `${name.slice(0, maxLength - 3)}...` 
      : name;
  };

  return (
    <div className="flex justify-center items-center mt-8 mb-16">
      <div className="relative w-full max-w-4xl border-2 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.3)] h-[375px] flex flex-col">
        {/* Window Title Bar */}
        <div className="flex justify-between items-center px-4 py-2 bg-white/10 border-b-2 border-white/20">
          <span className="font-mono text-white/90">projects.exe</span>
          <div className="flex gap-2">
            {['-', '×'].map((button) => (
              <div key={button} className="relative group">
                <span className="font-mono text-white/90 text-xl leading-none neon-hover">
                  {button}
                </span>
                <span className="absolute hidden group-hover:block whitespace-nowrap bg-black/90 text-white text-xs px-2 py-1 rounded bottom-full left-1/2 -translate-x-1/2 mb-2">
                  can&apos;t do that（｀▽´ )
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex relative flex-1 overflow-hidden">
          {/* Project Tabs Column */}
          <div className="w-1/3 bg-black/40 border-r-2 border-white/20 relative">
            {projects.map((project, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`w-full px-3 py-2 text-left flex items-center justify-between 
                  transition-colors relative group
                  ${index !== projects.length - 1 ? 'border-b-2 border-white/20' : ''}`}
              >
                <span className={`font-mono text-xs transition-colors 
                  ${currentIndex === index ? 'text-white' : 'text-white/70'}`}>
                  {getFormattedProjectName(project.name)}
                </span>
                <svg 
                  viewBox="0 0 16 16" 
                  className="w-6 h-6 ml-2"
                >
                  <path 
                    d={project.pixelIcon} 
                    fill="currentColor" 
                    className={`transition-colors 
                      ${currentIndex === index ? 'text-white' : 'text-white/70'}`} 
                  />
                </svg>
                {currentIndex === index && (
                  <motion.div 
                    layoutId="project-tab-highlight"
                    className="absolute inset-0 bg-white/10 z-[-1]" 
                  />
                )}
              </button>
            ))}

            {/* Progress Circle */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <div className="relative w-16 h-16">
                <svg viewBox="0 0 36 36" className="absolute top-0 left-0 w-full h-full rotate-[0]">
                  {/* Thin Inner Circle with dots aligned to line endpoints */}
                  {projects.map((_, sectionIndex) => {
                    const linesPerSection = 8;
                    const sectionAngle = 360 / projects.length;
                    const startAngle = sectionIndex * sectionAngle - 90;

                    return Array.from({ length: linesPerSection }).map((_, lineIndex) => {
                      const lineAngle = startAngle + (lineIndex * sectionAngle / linesPerSection);
                      
                      const x = 18 + 14 * 0.8 * Math.cos((lineAngle) * Math.PI / 180);
                      const y = 18 + 14 * 0.8 * Math.sin((lineAngle) * Math.PI / 180);

                      return (
                        <circle
                          key={`dot-${sectionIndex}-${lineIndex}`}
                          cx={x}
                          cy={y}
                          r="0.5"
                          fill="rgba(255,255,255,0.1)"
                        />
                      );
                    });
                  })}
                  
                  {/* Sectioned Progress Arc with Radial Lines */}
                  {projects.map((_, sectionIndex) => {
                    const linesPerSection = 8;
                    const sectionAngle = 360 / projects.length;
                    const startAngle = sectionIndex * sectionAngle - 90;
                    const absoluteLineIndex = sectionIndex * linesPerSection;

                    return Array.from({ length: linesPerSection }).map((_, lineIndex) => {
                      const lineAngle = startAngle + (lineIndex * sectionAngle / linesPerSection);
                      const absoluteCurrentLine = currentIndex * linesPerSection + lineIndex;
                      
                      const isActive = 
                        sectionIndex < currentIndex + 1 && 
                        absoluteCurrentLine < (currentIndex + 1) * linesPerSection;

                      const x1 = 18 + 14 * Math.cos((lineAngle) * Math.PI / 180);
                      const y1 = 18 + 14 * Math.sin((lineAngle) * Math.PI / 180);
                      const x2 = 18 + 14 * 0.8 * Math.cos((lineAngle) * Math.PI / 180);
                      const y2 = 18 + 14 * 0.8 * Math.sin((lineAngle) * Math.PI / 180);

                      return (
                        <motion.line
                          key={`${sectionIndex}-${lineIndex}`}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          strokeWidth="0.7"
                          className={`transition-all duration-100 ease-out 
                            ${isActive 
                              ? 'stroke-white/80 neon-progress-line' 
                              : 'stroke-transparent'
                            }`}
                          initial={{ strokeOpacity: 0 }}
                          animate={{ 
                            strokeOpacity: isActive ? 1 : 0,
                            transition: { 
                              duration: 0.1, 
                              delay: isActive ? (absoluteLineIndex + lineIndex) * 0.02 : 0
                            }
                          }}
                        />
                      );
                    });
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="w-2/3 p-6 font-mono bg-black/80 backdrop-blur-sm relative">
            <AnimatePresence mode="wait">
              <motion.div
                ref={ref}
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-white/90 space-y-3"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-between items-start"
                >
                  <h2 className="text-xl font-bold text-shadow-glow">
                    {projects[currentIndex].name}
                  </h2>
                  <svg 
                    viewBox="0 0 16 16" 
                    className="w-12 h-12"
                  >
                    <path 
                      d={projects[currentIndex].pixelIcon} 
                      fill="currentColor" 
                      className="text-white/90" 
                    />
                  </svg>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-2"
                >
                  <span className="text-white font-bold text-shadow-glow mr-2">TIMELINE:</span>
                  {projects[currentIndex].dateRange}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="text-white font-bold text-shadow-glow">DESCRIPTION:</span>
                  {projects[currentIndex].description.map((desc, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="ml-4 text-shadow-glow"
                    >
                      $ {desc}
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-2 justify-center mt-4"
                >
                  {projects[currentIndex].techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 border border-white/40 text-sm neon-hover hover:border-white/80 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { projects } from "@/data/projects";
import { ProgressCircle } from "./ProgressCircle";

export function ProjectsTerminal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxHeight, setMaxHeight] = useState(375);
  const [mobileMaxHeight, setMobileMaxHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isMobile = windowWidth < 768; // Moved before the useEffect that uses it

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const heights = projectRefs.current
      .filter(ref => ref !== null)
      .map(ref => ref.scrollHeight);
    
    const newMaxHeight = Math.max(...heights, 375) + 80;
    setMaxHeight(newMaxHeight);
    
    // Calculate mobile max height
    if (isMobile) {
      const mobileHeights = projectRefs.current
        .filter(ref => ref !== null)
        .map(ref => ref.scrollHeight + 200); // Add extra space for tabs
      const newMobileMaxHeight = Math.max(...mobileHeights);
      setMobileMaxHeight(newMobileMaxHeight);
    }
  }, [isMobile]); // Now isMobile is defined before this useEffect

  const handleTabClick = useCallback((index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  }, [currentIndex]);

  const getFormattedProjectName = (name: string) => {
    const absoluteMaxLength = 25; // Maximum absolute length
    const relativeMaxLength = Math.floor(windowWidth * 0.05); // 5% of screen width
    
    const maxLength = Math.min(absoluteMaxLength, relativeMaxLength);
    
    return name.length > maxLength 
      ? `${name.slice(0, maxLength - 3)}...` 
      : name;
  };

  return (
    <div className="flex justify-center items-center mt-[25vh] mb-16 relative z-30">
      <div 
        className="relative w-full max-w-2xl border-2 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.3)] flex flex-col"
        style={{ 
          height: isMobile ? `${mobileMaxHeight}px` : `${maxHeight}px`,
          minHeight: isMobile ? `${mobileMaxHeight}px` : 'auto'
        }}
      >
        {/* Window Title Bar */}
        <div className="relative z-20 flex justify-between items-center px-4 py-2 bg-white/10 border-b-2 border-white/20">
          <span className="relative z-20 font-mono text-white/90">projects.exe</span>
          <div className="relative z-20 flex gap-2">
            {['-', '×'].map((button) => (
              <div key={button} className="relative group z-20">
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
        <div className={`flex relative flex-1 overflow-hidden ${isMobile ? 'flex-col' : ''}`}>
          {/* Project Tabs Column */}
          <div className={`${isMobile ? 'w-full' : 'w-1/3'} bg-black/40 ${isMobile ? '' : 'border-r-2'} border-white/20 relative`}>
            <div className={`relative ${isMobile ? 'flex flex-wrap' : ''}`}>
              <AnimatePresence>
                {!isMobile && ( // Only show motion div on desktop
                  <motion.div 
                    layoutId="tab-highlight"
                    className="absolute bg-white/15 w-full"
                    initial={false}
                    animate={{
                      top: `${currentIndex * 50}%`,
                      transition: { 
                        duration: 0.3, 
                        ease: "easeInOut" 
                      }
                    }}
                    style={{
                      height: `${100 / projects.length}%`
                    }}
                  />
                )}
              </AnimatePresence>
              {projects.map((project, index) => (
                <button
                  key={index}
                  onClick={() => handleTabClick(index)}
                  className={`${isMobile ? 'w-1/2' : 'w-full'} px-3 py-2 text-left flex items-center justify-between 
                    transition-colors relative
                    ${isMobile ? 'border-2' : 'border-b-2'} border-white/20 overflow-hidden`}
                >
                  <span 
                    className={`font-mono text-xs transition-colors truncate pr-2 relative z-10
                      ${currentIndex === index ? 'text-white' : 'text-white/70'}`}
                  >
                    {getFormattedProjectName(project.name)}
                  </span>
                  <svg 
                    viewBox="0 0 256 256"
                    className="w-6 h-6 ml-2 flex-shrink-0 relative z-10"
                  >
                    <path 
                      d={project.pixelIcon} 
                      fill="currentColor" 
                      className={`transition-colors
                        ${currentIndex === index ? 'text-white' : 'text-white/70'}`} 
                    />
                  </svg>
                </button>
              ))}
            </div>

            {/* Progress Circle - Only show on desktop */}
            {!isMobile && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <ProgressCircle 
                  projects={projects} 
                  currentIndex={currentIndex} 
                />
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className={`${isMobile ? 'w-full' : 'w-2/3'} p-6 font-mono bg-black/80 backdrop-blur-sm relative`}>
            <AnimatePresence mode="wait">
              <motion.div
                ref={(el) => {
                  if (el) {
                    projectRefs.current[currentIndex] = el;
                  }
                }}
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-white space-y-3"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-between items-start relative z-20"
                >
                  <h2 className="text-xl font-bold relative z-20">
                    {projects[currentIndex].name}
                  </h2>
                  <svg 
                    viewBox="0 0 256 256"
                    className="w-12 h-12 relative z-20"
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
                  className="mb-2 relative z-20"
                >
                  <span className="text-white font-bold mr-2 relative z-20">TIMELINE:</span>
                  <span className="relative z-20">
                    {projects[currentIndex].dateRange}
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="relative z-20"
                >
                  <span className="text-white font-bold relative z-20">DESCRIPTION:</span>
                  {projects[currentIndex].description.map((desc, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="ml-4 relative z-20"
                    >
                      $ {desc}
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-2 justify-center mt-4 relative z-20"
                >
                  {projects[currentIndex].techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 border border-white/40 text-sm neon-hover hover:border-white/80 transition-colors relative z-20"
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
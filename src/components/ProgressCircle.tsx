import { motion } from "framer-motion";
import React, { memo } from "react";
import { Project } from "@/data/projects";

interface ProgressCircleProps {
  projects: Project[];
  currentIndex: number;
}

export const ProgressCircle = memo(({ 
  projects, 
  currentIndex 
}: ProgressCircleProps) => {
  return (
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
                className={`transition-all duration-300 ease-out 
                  ${isActive 
                    ? 'stroke-white/80 neon-progress-line' 
                    : 'stroke-transparent'
                  }`}
                initial={{ strokeOpacity: 0 }}
                animate={{ 
                  strokeOpacity: isActive ? 1 : 0,
                }}
                transition={{ 
                  duration: 0.3, 
                  delay: isActive 
                    ? (absoluteLineIndex + lineIndex) * 0.02 
                    : (projects.length * 8 - absoluteLineIndex - lineIndex) * 0.02
                }}
              />
            );
          });
        })}
      </svg>
    </div>
  );
});

// Add display name for better debugging
ProgressCircle.displayName = 'ProgressCircle'; 
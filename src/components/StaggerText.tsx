'use client';
import React from "react";
import { motion } from "framer-motion";

interface StaggerTextProps {
  line1: string;
  line2: string;
  className?: string;
}

const DURATION = 0.25;
const STAGGER = 0.025;

export const StaggerText: React.FC<StaggerTextProps> = ({ 
  line1, 
  line2, 
  className = "" 
}) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className={`relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase font-['Black_Han_Sans'] ${className}`}
      style={{
        lineHeight: 1,
        height: '1em',
        perspective: '1000px',
      }}
      whileTap="hovered"
      onHoverStart={() => {}}
      onHoverEnd={() => {}}
    >
      <div className="relative overflow-hidden h-full">
        <div className="absolute top-0 left-0 w-full">
          {line1.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                  opacity: 1,
                },
                hovered: {
                  y: "-100%",
                  opacity: 0,
                },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              className="inline-block"
              key={`first-${i}`}
            >
              {l}
            </motion.span>
          ))}
        </div>
        
        <div className="absolute top-0 left-0 w-full">
          {line2.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: {
                  y: "100%",
                  opacity: 0,
                },
                hovered: {
                  y: 0,
                  opacity: 1,
                },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              className="inline-block"
              key={`second-${i}`}
            >
              {l}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}; 
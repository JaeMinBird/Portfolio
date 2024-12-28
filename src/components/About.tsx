import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-100px",
    amount: "some",
    once: true
  });

  const boxVariants = {
    hidden: {
      width: 0,
      height: 0,
      opacity: 0
    },
    visible: {
      width: ["0px", "min(80vw, 600px)"],
      height: ["0px", "min(60vh, 400px)"],
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.645, 0.045, 0.355, 1.000]
      }
    }
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8
      }
    }
  };

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute border-[2px] border-white shadow-glow"
        variants={boxVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />
      
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 w-full max-w-xl mx-auto px-12 sm:px-16 text-center"
      >
        <div className="relative">
          <h2 className="text-4xl font-['Black_Han_Sans'] mb-6 relative">
            ABOUT ME
            <div className="absolute inset-0 pointer-events-none backdrop-blur-[0.5px] bg-gradient-to-b from-white/[0.02] to-black/[0.02] bg-[length:100%_4px]" />
          </h2>
        </div>
        <p className="text-lg leading-relaxed text-white/80">
          A creative developer passionate about building immersive digital experiences. 
          Blending technical expertise with artistic vision to push the boundaries of web development.
        </p>
      </motion.div>
    </div>
  );
} 
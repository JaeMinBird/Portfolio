import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export function About() {
  const cardVariants: Variants = {
    offscreen: {
      y: 100,
      opacity: 0,
      scale: 0.8
    },
    onscreen: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
        delay: 0.8
      }
    }
  };

  const boxVariants: Variants = {
    offscreen: {
      width: 0,
      height: 0,
      opacity: 0
    },
    onscreen: {
      width: "min(80vw, 600px)",
      height: "min(60vh, 400px)",
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.645, 0.045, 0.355, 1.000]
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute border-[2px] border-white shadow-glow backdrop-blur-sm bg-black/80"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.2, once: true }}
        variants={boxVariants}
      />
      
      <motion.div
        className="relative z-10 w-full max-w-xl mx-auto px-12 sm:px-16 text-center"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.2, once: true }}
        variants={cardVariants}
      >
        <div className="relative">
          <h2 className="text-4xl font-['Black_Han_Sans'] mb-6 relative">
            ABOUT ME
            <div className="absolute inset-0 pointer-events-none backdrop-blur-[0.5px] bg-gradient-to-b from-white/[0.02] to-black/[0.02] bg-[length:100%_4px]" />
          </h2>
        </div>
        <p className="text-lg leading-relaxed text-white/80">
          I&apos;m a Junior studying computer science at Penn State University Park interested in full stack development and UI/UX design.
          Outside of Computer Science, my hobbies include fashion design, Japanese cars, and architecture.
        </p>
      </motion.div>
    </div>
  );
} 
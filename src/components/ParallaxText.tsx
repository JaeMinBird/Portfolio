import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";
import { useRef, memo } from "react";

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

function ParallaxTextComponent({ children, baseVelocity = 20 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  // Adjusted wrap values for smoother transition
  const x = useTransform(baseX, (v) => `${wrap(0, -50, v)}%`);

  const directionFactor = useRef<number>(1);
  
  // Use RAF more efficiently with a reuse check
  useAnimationFrame((t, delta) => {
    // Skip animations if delta is too large (e.g. browser tab was inactive)
    if (delta > 100) return;
    
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  // Optimize by reducing number of duplicated elements
  const content = `${children} `;
  
  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap relative w-[100vw] -ml-2 sm:-ml-8">
      <div className="absolute inset-0 backdrop-blur-[0.7px] opacity-90 pointer-events-none" />
      <motion.div 
        className="flex whitespace-nowrap font-['Black_Han_Sans'] text-4xl sm:text-6xl text-white/95"
        style={{ x }}
      >
        {/* Reduced number of repeats but still enough to cover the screen */}
        <span className="mr-8">{content}</span>
        <span className="mr-8">{content}</span>
        <span className="mr-8">{content}</span>
        <span className="mr-8">{content}</span>
        <span className="mr-8">{content}</span>
      </motion.div>
    </div>
  );
}

// Export memoized component to prevent unnecessary re-renders
export const ParallaxText = memo(ParallaxTextComponent); 
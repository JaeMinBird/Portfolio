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
import { useRef } from "react";

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

export function ParallaxText({ children, baseVelocity = 20 }: ParallaxProps) {
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
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap relative w-screen md:w-[calc(100vw-5px)] -ml-8">
      <div className="absolute inset-0 backdrop-blur-[0.7px] opacity-90 pointer-events-none" />
      <motion.div 
        className="flex whitespace-nowrap font-['Black_Han_Sans'] text-4xl sm:text-6xl text-white/95"
        style={{ x }}
      >
        <span className="mr-8">{children} </span>
        <span className="mr-8">{children} </span>
        <span className="mr-8">{children} </span>
        <span className="mr-8">{children} </span>
        <span className="mr-8">{children} </span>
        <span className="mr-8">{children} </span>
        <span className="mr-8">{children} </span>
        <span className="mr-8">{children} </span>
      </motion.div>
    </div>
  );
} 
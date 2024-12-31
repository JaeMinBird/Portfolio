import { motion } from "framer-motion";

interface LoadingBarProps {
  numBars: number;
}

export function LoadingBar({ numBars}: LoadingBarProps) {
  return (
    <div className="flex gap-[2px] my-2">
      {Array.from({ length: numBars }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.1,
            delay: i * 0.05,
            ease: "linear"
          }}
          className="h-1 w-[10px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        />
      ))}
    </div>
  );
}
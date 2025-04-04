import { memo } from 'react';
import { motion } from 'framer-motion';

interface ParallaxGridProps {
  scrollY: number;
}

function ParallaxGridComponent({ scrollY }: ParallaxGridProps) {
  // Use Math.max to prevent negative values which can cause unnecessary renders
  const starsOpacity = Math.max(0, 1 - scrollY / 300);
  const gridOpacity = Math.max(0, 1 - scrollY / 700);
  
  // Only recalculate these transformations when needed
  const gridStyle = {
    opacity: gridOpacity,
    transform: `translate(-50%, calc(-50% - ${Math.floor(scrollY * 0.5)}px)) 
                perspective(1000px) 
                rotateX(70deg)`,
  };

  return (
    <div className="fixed inset-0 bg-black">
      <div 
        className="fixed top-0 left-0 w-screen h-screen overflow-hidden pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {gridOpacity > 0.01 && (
          <div 
            className="absolute top-3/4 left-1/2 w-[300vw] h-[300vh]"
            style={gridStyle}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(rgba(255, 255, 255, 0.7) 2px, transparent 2px),
                  linear-gradient(90deg, rgba(255, 255, 255, 0.7) 2px, transparent 2px)
                `,
                backgroundSize: '50px 50px',
                transform: 'translateZ(0)',
                maskImage: 'linear-gradient(to top, white 40%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to top, white 40%, transparent 100%)',
              }}
            />

            {starsOpacity > 0.05 && (
              <div style={{ opacity: starsOpacity }}>
                {/* Reduced number of stars for better performance */}
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-[2px] h-[2px] bg-white rounded-full"
                    initial={{ opacity: 0.2, scale: 1 }}
                    animate={{
                      opacity: [0.2, 0.8, 0.2],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i % 3,
                    }}
                    style={{
                      left: `${(i * 397) % 100}%`,
                      top: `${(i * 673) % 100}%`,
                      boxShadow: '0 0 4px rgba(255, 255, 255, 0.6)',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Export a memoized version of the component to prevent unnecessary re-renders
export const ParallaxGrid = memo(ParallaxGridComponent); 
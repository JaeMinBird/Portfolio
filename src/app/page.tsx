'use client';
import { useEffect, useState } from 'react';
import { ParallaxText } from '@/components/ParallaxText';
import { About } from '@/components/About';
import { ParallaxGrid } from '@/components/ParallaxGrid';
import { ExperienceTerminal } from '@/components/ExperienceTerminal';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [circlePosition, setCirclePosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    let rafId: number;
    let lastUpdate = 0;
    const minInterval = 1000 / 60; // Cap at 60fps

    const followMouse = (timestamp: number) => {
      if (timestamp - lastUpdate >= minInterval) {
        setCirclePosition(prev => ({
          x: prev.x + (mousePosition.x - prev.x) * 0.1,
          y: prev.y + (mousePosition.y - prev.y) * 0.1
        }));
        lastUpdate = timestamp;
      }
      rafId = requestAnimationFrame(followMouse);
    };
    
    rafId = requestAnimationFrame(followMouse);
    return () => cancelAnimationFrame(rafId);
  }, [mousePosition]);

  const headerStyle = {
    opacity: Math.max(0, 1 - scrollY / 500),
    transform: `translate(-50%, calc(-50% - ${scrollY * 0.2}px))`,
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:p-8 relative">
      <div 
        className="pointer-events-none fixed mix-blend-difference will-change-transform"
        style={{
          width: '15px',
          height: '15px',
          background: 'white',
          borderRadius: '50%',
          transform: `translate3d(${circlePosition.x - 45}px, ${circlePosition.y - 45}px, 0)`,
          zIndex: 9999,
          opacity: circlePosition.x < 0 ? 0 : 1,
        }}
      />
      <ParallaxGrid scrollY={scrollY} />
      <div className="parallax-header text-backdrop" style={headerStyle}>
        <h1 className="floating-title font-['Black_Han_Sans'] flex flex-col sm:flex-row sm:gap-4">
          <span>Jae</span>
          <span>Birdsall</span>
        </h1>
      </div>

      <div className="mt-[80vh] flex flex-col gap-2">
        <ParallaxText baseVelocity={-1}>
          WELCOME TO THE FUTURE | 미래에 오신 것을 환영합니다 |
        </ParallaxText>
        <ParallaxText baseVelocity={1}>
          혁신은 여기서 시작됩니다 | INNOVATION STARTS HERE |
        </ParallaxText>
        <ParallaxText baseVelocity={-1}>
          BUILDING TOMORROW TODAY | 오늘 내일을 만듭니다 |
        </ParallaxText>
        <ParallaxText baseVelocity={1}>
          한계를 넘어서다 | PUSH THE BOUNDARIES |
        </ParallaxText>
        <ParallaxText baseVelocity={-1}>
          BREAK THE LIMITS | 한계를 깨다 |
        </ParallaxText>
      </div>

      <About />

      <div className="relative z-10">
        <ExperienceTerminal />
      </div>

      <div className="vhs-overlay"></div>
    </div>
  );
}

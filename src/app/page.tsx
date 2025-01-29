'use client';
import { useEffect, useState} from 'react';
import { Header } from '@/components/Header';
import { ParallaxText } from '@/components/ParallaxText';
import { About } from '@/components/About';
import { ParallaxGrid } from '@/components/ParallaxGrid';
import { ExperienceTerminal } from '@/components/ExperienceTerminal';
import { ProjectsTerminal } from '@/components/ProjectsTerminal';
import { ContactTerminal } from '@/components/ContactTerminal';
import { Cursor } from '@/components/Cursor';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const headerStyle = {
    opacity: Math.max(0, 1 - scrollY / 500),
    transform: `translate(-50%, calc(-50% - ${scrollY * 0.2}px))`,
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:p-8 relative">
      {!isMobile && <Cursor />}
      <Header />
      <ParallaxGrid scrollY={scrollY} />
      <section id="hero" className="parallax-header text-backdrop" style={headerStyle}>
        <h1 className="floating-title font-['Black_Han_Sans'] flex flex-col sm:flex-row sm:gap-4">
          <span>Jae</span>
          <span>Birdsall</span>
        </h1>
      </section>

      <section id="parallax-text" className="mt-[80vh] flex flex-col gap-2">
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
      </section>

      <section id="about" className="scroll-mt-20">
        <About />
      </section>

      <section id="experience" className="relative z-10 scroll-mt-20">
        <ExperienceTerminal />
      </section>

      <section id="projects" className="mt-[25vh] relative z-10 scroll-mt-20">
        <ProjectsTerminal />
      </section>
      
      <section id="contact" className="mt-[25vh] relative z-10 scroll-mt-20">
        <ContactTerminal />
      </section>
      
      <div className="vhs-overlay"></div>
    </div>
  );
}

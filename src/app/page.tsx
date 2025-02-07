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
import { StaggerText } from '@/components/StaggerText';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set initial scroll position
    setScrollY(window.scrollY);
    
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

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:p-8 relative">
      {!isMobile && <Cursor />}
      <Header />
      <ParallaxGrid scrollY={scrollY} />
      
      <section 
        id="hero" 
        className="fixed top-1/2 left-1/2 w-full max-w-[90vw]"
        style={{
          transform: `translate(-50%, calc(-50% - ${scrollY * 0.3}px))`,
          opacity: `${1 - scrollY * 0.002}`,
          transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
        }}
      >
        <div className="text-center">
          <StaggerText 
            line1="Hello"
            line2=" 안녕 "
            className="text-center floating-title w-full text-7xl sm:text-9xl font-bold"
          />
        </div>
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

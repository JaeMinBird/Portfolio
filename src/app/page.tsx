'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
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
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    // Only run on client side
    setWindowHeight(window.innerHeight);
    setScrollY(window.scrollY);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
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
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-0 
          ${scrollY > windowHeight * 0.3 ? 'opacity-50' : 'opacity-100'} 
          transition-opacity duration-300`}
      >
        <div className="text-center w-full px-8">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={isMobile ? 250 : 500} 
            height={isMobile ? 150 : 300} 
            className="mx-auto transition-all duration-300 invert hover:invert-0 contrast-125"
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
          한계를 넘어섭니다 | PUSH THE BOUNDARIES |
        </ParallaxText>
        <ParallaxText baseVelocity={-1}>
          BREAK THE LIMITS | 한계를 깨뜨립니다 |
        </ParallaxText>
      </section>

      <section id="about" className="scroll-mt-20 relative">
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
      <footer className="text-center py-4 text-sm text-gray-500 relative z-[999] font-mono">
        © {new Date().getFullYear()} JaeMin Birdsall. All rights reserved.
      </footer>
    </div>
  );
}

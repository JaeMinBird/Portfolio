'use client';
import { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { Header } from '@/components/NavBar';
import { ParallaxText } from '@/components/ParallaxText';
import { About } from '@/components/About';
import dynamic from 'next/dynamic';

// Dynamically import heavy components
const ParallaxGrid = dynamic(() => import('@/components/ParallaxGrid').then(mod => ({ default: mod.ParallaxGrid })), { ssr: false });
const ExperienceTerminal = dynamic(() => import('@/components/ExperienceTerminal').then(mod => ({ default: mod.ExperienceTerminal })), { ssr: false });
const ProjectsTerminal = dynamic(() => import('@/components/ProjectsTerminal').then(mod => ({ default: mod.ProjectsTerminal })), { ssr: false });
const ContactTerminal = dynamic(() => import('@/components/ContactTerminal').then(mod => ({ default: mod.ContactTerminal })), { ssr: false });
const Cursor = dynamic(() => import('@/components/Cursor').then(mod => ({ default: mod.Cursor })), { ssr: false });

// Loading placeholder component
const TerminalLoading = () => (
  <div className="w-full h-[60vh] bg-black/50 backdrop-blur-sm border border-white/30 rounded-md flex items-center justify-center">
    <div className="animate-pulse text-white font-mono">Loading...</div>
  </div>
);

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only run on client side
    setWindowHeight(window.innerHeight);
    setScrollY(window.scrollY);
    setIsLoaded(true);
    
    // Throttle scroll handler for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
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
      {!isMobile && isLoaded && <Cursor />}
      <Header />
      {isLoaded && <ParallaxGrid scrollY={scrollY} />}
      
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
            priority
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
        <Suspense fallback={<TerminalLoading />}>
          <ExperienceTerminal />
        </Suspense>
      </section>

      <section id="projects" className="mt-[25vh] relative z-10 scroll-mt-20">
        <Suspense fallback={<TerminalLoading />}>
          <ProjectsTerminal />
        </Suspense>
      </section>
      
      <section id="contact" className="mt-[25vh] relative z-10 scroll-mt-20">
        <Suspense fallback={<TerminalLoading />}>
          <ContactTerminal />
        </Suspense>
      </section>
      
      <div className="vhs-overlay"></div>
      <footer className="text-center py-4 text-sm text-gray-500 relative z-[999] font-mono">
        © {new Date().getFullYear()} JaeMin Birdsall. All rights reserved.
      </footer>
    </div>
  );
}

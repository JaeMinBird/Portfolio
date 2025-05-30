'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { id: '01', label: 'About', href: '#about' },
  { id: '02', label: 'Experience', href: '#experience' },
  { id: '03', label: 'Projects', href: '#projects' },
  { id: '04', label: 'Contact', href: '#contact' }
];

export function Header() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isNameHovered, setIsNameHovered] = useState(false);
  const [isMinimal, setIsMinimal] = useState(false);

  // Add resize listener to check window width
  useEffect(() => {
    const handleResize = () => {
      setIsMinimal(window.innerWidth < 1000);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      // Calculate the target position with some offset
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - 100;
      
      // Smooth scroll to the target position
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Force the section to be in view immediately
      setTimeout(() => {
        const section = document.querySelector(href);
        if (section) {
          // Trigger the animation
          section.dispatchEvent(new Event('inview'));
        }
      }, 100);
    }
  };

  if (isMinimal) {
    return (
      <header className="fixed left-0 top-0 w-full flex justify-center p-4 z-50 font-mono bg-black">
        <div className="flex space-x-2">
          <a 
            href="https://www.linkedin.com/in/jaeminbirdsall" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-glow p-1"
          >
            <Image
              src="/linkedin-pixel.svg"
              alt="LinkedIn"
              width={24}
              height={24}
              className="w-6 h-6 pixelated"
              unoptimized
            />
          </a>
          <a 
            href="https://github.com/JaeMinBird" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-glow p-1"
          >
            <Image
              src="/github-pixel.svg"
              alt="GitHub"
              width={24}
              height={24}
              className="w-6 h-6 pixelated"
              unoptimized
            />
          </a>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/20 shadow-glow" />
      </header>
    );
  }

  return (
    <header className="fixed left-0 top-0 w-full hidden md:flex items-center justify-between p-4 z-50 font-mono">
      {/* Name and Developer Title Section */}
      <div className="flex flex-col">
        <Link 
          href="/" 
          className="relative"
          onMouseEnter={() => setIsNameHovered(true)}
          onMouseLeave={() => setIsNameHovered(false)}
        >
          <motion.div
            className="absolute left-0 top-0 h-full w-full bg-white z-0"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{
              scaleX: isNameHovered ? 1 : 0
            }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1]
            }}
          />
          <div className="text-4xl font-bold relative z-10">
            <span className={`inline-block ${isNameHovered ? 'text-black' : 'text-white'}`}>
              Jae
            </span>
          </div>
          <div className="text-4xl font-bold relative z-10">
            <span className={`inline-block ${isNameHovered ? 'text-black' : 'text-white'}`}>
              Birdsall
            </span>
          </div>
        </Link>

        {/* Separate div for web developer title */}
        <div className="mt-1">
          <p className="text-sm text-white/60">
            Web Developer
          </p>
        </div>

        {/* Social icons positioned under the title */}
        <div className="mt-2">
          <div className="flex space-x-2">
            <a 
              href="https://www.linkedin.com/in/jaeminbirdsall" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-glow p-1"
            >
              <Image
                src="/linkedin-pixel.svg"
                alt="LinkedIn"
                width={24}
                height={24}
                className="w-6 h-6 pixelated"
                unoptimized
              />
            </a>
            <a 
              href="https://github.com/JaeMinBird" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-glow p-1"
            >
              <Image
                src="/github-pixel.svg"
                alt="GitHub"
                width={24}
                height={24}
                className="w-6 h-6 pixelated"
                unoptimized
              />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex flex-col space-y-4 absolute top-4 right-5">
        {NAV_ITEMS.map((item) => (
          <Link 
            key={item.id}
            href={item.href}
            className="block relative group"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={(e) => handleClick(e, item.href)}
          >
            <motion.div 
              className="flex items-center space-x-2"
              animate={{
                x: hoveredItem === item.id ? 10 : 0,
                transition: { duration: 0.3 }
              }}
            >
              <span className="text-white/50 text-xs">{item.id}</span>
              <motion.span
                className="text-base font-medium text-white/80 group-hover:text-white transition-colors"
                animate={{
                  scale: hoveredItem === item.id ? 1.05 : 1,
                  transition: { duration: 0.3 }
                }}
              >
                {item.label}
              </motion.span>
            </motion.div>
          </Link>
        ))}
      </nav>
    </header>
  );
} 
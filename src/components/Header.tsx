'use client';

import { useState } from 'react';
import Link from 'next/link';
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
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const scrollToTarget = () => {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      };

      scrollToTarget();
      
      // If it's the initial load, set a timeout to scroll again
      if (isInitialLoad) {
        setTimeout(() => {
          scrollToTarget();
          setIsInitialLoad(false);
        }, 1000); // Adjust timeout based on your parallax animation duration
      }
    }
  };

  return (
    <header className="fixed left-0 top-0 w-full hidden md:flex items-center justify-between p-4 z-50 font-mono">
      {/* Name and Developer Title Section */}
      <Link 
        href="/" 
        className="group flex flex-col relative"
        onMouseEnter={() => setIsNameHovered(true)}
        onMouseLeave={() => setIsNameHovered(false)}
      >
        <div className="relative overflow-hidden">
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
        </div>
        <p className="text-sm text-white/60 mt-1">
          Web Developer
        </p>
      </Link>

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
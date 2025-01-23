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

  return (
    <header className="fixed left-0 top-0 w-full hidden md:flex items-center justify-between p-4 z-50 font-mono">
      {/* Name and Developer Title Section */}
      <Link 
        href="/" 
        className="group flex flex-col"
        onMouseEnter={() => setIsNameHovered(true)}
        onMouseLeave={() => setIsNameHovered(false)}
      >
        <div className="text-4xl font-bold relative overflow-hidden">
          <span className="block text-white/20 absolute inset-0">Jae</span>
          <motion.span 
            className="block text-transparent bg-clip-text bg-white relative z-10"
            style={{
              WebkitTextStroke: '1px white',
              WebkitTextFillColor: 'transparent',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              background: 'white',
              zIndex: 20,
              height: isNameHovered ? '100%' : 0,
            }}
            initial={{ height: 0 }}
            animate={{ 
              height: isNameHovered ? '100%' : 0,
              transition: { 
                duration: 0.3,
                ease: "easeInOut"
              }
            }}
          />
          <span className="relative z-10">Jae</span>
        </div>
        <div className="text-4xl font-bold relative overflow-hidden">
          <span className="block text-white/20 absolute inset-0">Birdsall</span>
          <motion.span 
            className="block text-transparent bg-clip-text bg-white relative z-10"
            style={{
              WebkitTextStroke: '1px white',
              WebkitTextFillColor: 'transparent',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              background: 'white',
              zIndex: 20,
              height: isNameHovered ? '100%' : 0,
            }}
            initial={{ height: 0 }}
            animate={{ 
              height: isNameHovered ? '100%' : 0,
              transition: { 
                duration: 0.3,
                ease: "easeInOut"
              }
            }}
          />
          <span className="relative z-10">Birdsall</span>
        </div>
        <p className="text-sm text-white/60 mt-1">Web Developer</p>
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
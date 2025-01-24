'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

interface CursorProps {
  smoothing?: number;
}

export const Cursor = ({ smoothing = 0.3 }: CursorProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringInteractable, setIsHoveringInteractable] = useState(false);
  const circlePositionRef = useRef({ x: -100, y: -100 });
  const rafIdRef = useRef<number | null>(null);

  const updateCirclePosition = useCallback(() => {
    const current = circlePositionRef.current;
    const target = mousePosition;
    
    const newX = current.x + (target.x - current.x) * smoothing;
    const newY = current.y + (target.y - current.y) * smoothing;
    
    circlePositionRef.current = { x: newX, y: newY };
    
    setMousePosition(prev => ({ ...prev }));
  }, [mousePosition, smoothing]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleInteractableEnter = () => setIsHoveringInteractable(true);
    const handleInteractableLeave = () => setIsHoveringInteractable(false);

    // Remove pointer cursor for interactables
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      a, button, [role="button"], .interactable {
        cursor: inherit !important;
      }
    `;
    document.head.appendChild(styleElement);

    // Select all interactable elements
    const interactables = document.querySelectorAll('a, button, [role="button"], .interactable');
    
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleInteractableEnter);
      el.addEventListener('mouseleave', handleInteractableLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.head.removeChild(styleElement);
      
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleInteractableEnter);
        el.removeEventListener('mouseleave', handleInteractableLeave);
      });
    };
  }, []);

  useEffect(() => {
    // Use requestAnimationFrame for smooth animation
    const animate = () => {
      updateCirclePosition();
      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [updateCirclePosition]);

  return (
    <div 
      className="pointer-events-none fixed mix-blend-difference will-change-transform"
      style={{
        width: isHoveringInteractable ? '20px' : '15px',
        height: isHoveringInteractable ? '20px' : '15px',
        background: 'white',
        borderRadius: isHoveringInteractable ? '0%' : '50%',
        transform: `translate3d(${circlePositionRef.current.x - 39}px, ${circlePositionRef.current.y - 39}px, 0) 
                   ${isHoveringInteractable ? 'rotate(45deg)' : ''}`,
        zIndex: 9999,
        opacity: circlePositionRef.current.x < 0 ? 0 : 1,
        transition: 'all 0.1s ease-out',
        filter: 'blur(0.5px)',
        pointerEvents: 'none',
      }}
    />
  );
};
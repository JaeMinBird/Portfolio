'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerStyle = {
    opacity: Math.max(0, 1 - scrollY / 500),
    transform: `translate(-50%, calc(-50% - ${scrollY * 0.2}px))`,
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 relative">
      <div className="parallax-header text-backdrop" style={headerStyle}>
        <h1 className="floating-title font-['Black_Han_Sans']">
          Jae
        </h1>
      </div>

      <div className="overflow-hidden w-full text-backdrop mt-[80vh]">
        <div className="flex flex-col gap-8">
          {[
            "WELCOME TO THE FUTURE | 미래에 오신 것을 환영합니다",
            "혁신은 여기서 시작됩니다 | INNOVATION STARTS HERE",
            "BUILDING TOMORROW TODAY | 오늘 내일을 만듭니다",
            "한계를 넘어서다 | PUSH THE BOUNDARIES",
            "BREAK THE LIMITS | 한계를 깨다"
          ].map((text, index) => (
            <div key={index} className="relative">
              <div
                className="text-4xl sm:text-6xl font-['Black_Han_Sans'] whitespace-nowrap animate-marquee"
                style={{
                  animationDelay: `${index * 0.5}s`,
                }}
              >
                <span className="mr-8">{text}</span>
                <span className="mr-8">|</span>
                <span className="mr-8">{text}</span>
                <span className="mr-8">|</span>
                <span className="mr-8">{text}</span>
                <span className="mr-8">|</span>
                <span className="mr-8">{text}</span>
                <span className="mr-8">|</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="vhs-overlay"></div>

      {/* Add empty space for scrolling */}
      <div className="h-[200vh]"></div>
    </div>
  );
}

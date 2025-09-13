
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const phrases = ["Grow More", "Earn More", "Borrow Smarter"];

const AnimatedHeadline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000); // Change phrase every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-5xl md:text-7xl font-bold font-headline drop-shadow-lg h-24 [perspective:800px]">
      <div className="relative h-full w-full transform-style-3d transition-transform duration-1000">
        {phrases.map((phrase, index) => (
          <span
            key={phrase}
            className={cn(
              'absolute w-full h-full left-0 top-0 flex items-center justify-center transition-all duration-700 backface-hidden',
              {
                'opacity-100 transform-none': index === currentIndex,
                'opacity-0 -rotate-x-90': index !== currentIndex,
              }
            )}
          >
            {phrase}
          </span>
        ))}
      </div>
    </h1>
  );
};

export default AnimatedHeadline;

// We need to add some custom styles for this to work correctly
const globalStyles = `
  .transform-style-3d {
    transform-style: preserve-3d;
  }
  .backface-hidden {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
`;

// Inject styles into the head
if (typeof window !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = globalStyles;
    document.head.appendChild(styleSheet);
}

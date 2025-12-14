import React, { forwardRef, useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const ComicShield = forwardRef(({ className, style }, ref) => {
  const [impacts, setImpacts] = useState([]);
  const shakeRef = useRef(null);

  useEffect(() => {
    const addImpact = () => {
      // Random position generally on the metal parts (radius 0-45)
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 40; 
      const x = 50 + r * Math.cos(angle);
      const y = 50 + r * Math.sin(angle);
      const id = Date.now();

      setImpacts(prev => [...prev, { id, x, y }]);

      // Remove impact after animation (0.5s)
      setTimeout(() => {
        setImpacts(prev => prev.filter(i => i.id !== id));
      }, 500);

      // Trigger crisp metallic shake
      if (shakeRef.current) {
        gsap.fromTo(shakeRef.current, 
          { x: 0, y: 0 },
          { 
            x: () => (Math.random() - 0.5) * 6, 
            y: () => (Math.random() - 0.5) * 6, 
            duration: 0.05, 
            repeat: 5, 
            yoyo: true, 
            clearProps: "x,y" 
          }
        );
      }
    };

    const interval = setInterval(addImpact, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={ref} 
      className={`relative inline-block ${className}`}
      style={style}
    >
      <div ref={shakeRef} className="w-full h-full"> 
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full drop-shadow-xl"
          preserveAspectRatio="xMidYMid meet"
          style={{ overflow: 'visible' }}
        >
          {/* Outermost Ring (Red) */}
          <circle cx="50" cy="50" r="49" fill="#AA0505" stroke="black" strokeWidth="2" />
          
          {/* Shadow/Highlight for comic effect */}
          <path d="M 50 1 A 49 49 0 0 1 99 50" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
          <path d="M 1 50 A 49 49 0 0 0 50 99" fill="none" stroke="black" strokeWidth="3" opacity="0.3" />

          {/* Second Ring (White) */}
          <circle cx="50" cy="50" r="38" fill="white" stroke="black" strokeWidth="2" />
          
          {/* Third Ring (Red) */}
          <circle cx="50" cy="50" r="27" fill="#AA0505" stroke="black" strokeWidth="2" />

          {/* Inner Circle (Blue) */}
          <circle cx="50" cy="50" r="16" fill="#0055AA" stroke="black" strokeWidth="2" />

          {/* The Star */}
          <path 
            d="M 50 36 L 53.5 45 L 63 45 L 55 51 L 58 60 L 50 54.5 L 42 60 L 45 51 L 37 45 L 46.5 45 Z" 
            fill="white" 
            stroke="black" 
            strokeWidth="1.5"
            strokeLinejoin="round" 
          />
          
          {/* Comic "Shine" lines */}
          <path d="M 20 20 L 30 30" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <path d="M 15 25 L 22 32" stroke="white" strokeWidth="2" strokeLinecap="round" />

          {/* Bullet Impacts (Fancier Sparks) */}
          {impacts.map(impact => (
             <g key={impact.id} transform={`translate(${impact.x}, ${impact.y})`}>
                <g className="animate-fade-out-fast origin-center">
                  {/* Core Flash */}
                  <path 
                    d="M0 -8 L3 -3 L10 0 L3 3 L0 10 L-3 3 L-10 0 L-3 -3 Z" 
                    fill="#FFFF00" 
                    stroke="white" 
                    strokeWidth="1"
                  />
                  {/* Debris / Sparks */}
                  <circle cx="6" cy="6" r="1.5" fill="#FFA500" />
                  <circle cx="-6" cy="6" r="1" fill="#FFFF00" />
                  <circle cx="6" cy="-6" r="1" fill="white" />
                  <circle cx="-6" cy="-6" r="1.5" fill="#FFA500" />
                  <circle cx="0" cy="-10" r="1" fill="#FFFF00" />
                </g>
             </g>
          ))}
        </svg>
      </div>
    </div>
  );
});

ComicShield.displayName = 'ComicShield';

export default ComicShield;

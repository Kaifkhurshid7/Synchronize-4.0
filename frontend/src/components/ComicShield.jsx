import React, { forwardRef } from 'react';

const ComicShield = forwardRef(({ className, style }, ref) => {
  return (
    <div 
      ref={ref} 
      className={`relative inline-block ${className}`}
      style={{ ...style, width: '300px', height: '300px' }} // Default size, can be overridden
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-xl"
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
      </svg>
    </div>
  );
});

ComicShield.displayName = 'ComicShield';

export default ComicShield;

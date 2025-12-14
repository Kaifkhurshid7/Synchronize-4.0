import React from 'react';

const ArcReactor = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Housing Ring */}
      <circle cx="50" cy="50" r="48" fill="#1a1a1a" stroke="black" strokeWidth="2" />
      <circle cx="50" cy="50" r="42" fill="#334155" stroke="black" strokeWidth="2" />
      
      {/* Outer Glow Ring (The Blue Ring) */}
      <circle cx="50" cy="50" r="35" fill="#06b6d4" stroke="black" strokeWidth="2" className="animate-pulse drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
      
      {/* Mechanical Details (The Segments) - 10 segments */}
      {/* Rotating Mechanical Assembly */}
      <g className="animate-spin-slow" style={{ transformOrigin: '50px 50px' }}>
        {[...Array(10)].map((_, i) => (
          <path
            key={`p-${i}`}
            d="M 50 15 L 50 25"
            stroke="black"
            strokeWidth="3"
            transform={`rotate(${i * 36} 50 50)`}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <rect
            key={`r-${i}`}
            x="46"
            y="18"
            width="8"
            height="10"
            fill="#1e293b"
            stroke="black"
            strokeWidth="1"
            transform={`rotate(${i * 36} 50 50)`}
          />
        ))}
      </g>

      {/* Counter-Rotating Energy Ring */}
      <circle 
        cx="50" 
        cy="50" 
        r="38" 
        fill="none" 
        stroke="#06b6d4" 
        strokeWidth="1" 
        strokeDasharray="5, 5"
        opacity="0.6"
        className="animate-spin-reverse-slow"
        style={{ transformOrigin: '50px 50px' }}
      />

      {/* Inner Core Ring */}
      <circle cx="50" cy="50" r="18" fill="white" stroke="black" strokeWidth="2" />
      
      {/* The Triangle/Center Element (Common in some designs, or just a circle) */}
      {/* Let's stick to the classic circular core with a inner light */}
      <circle cx="50" cy="50" r="12" fill="#ecfeff" className="drop-shadow-[0_0_15px_rgba(6,182,212,1)]" />
      
      {/* Reflection helper for "glass" look */}
      <path d="M 35 35 Q 50 20 65 35" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
};

export default ArcReactor;

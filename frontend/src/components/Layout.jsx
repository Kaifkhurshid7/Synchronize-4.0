import { useState, useRef, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './Navbar';
import Footer from './Footer';
import gsap from 'gsap';

const GlobalComicEffects = () => {
  const [effects, setEffects] = useState([]);
  const comicWords = ['POW!', 'BOOM!', 'KABOOM!', 'WHAM!', 'ZAP!', 'BANG!', 'CRASH!', 'SMASH!'];
  // Use location to check if we are on gallery page
  const location = window.location.pathname;

  useEffect(() => {
    const handleClick = (e) => {
      // If on gallery page, ONLY trigger if clicking inside the navbar
      if (location === '/gallery' || location === '/gallery/') {
          if (!e.target.closest('nav')) return;
      }
      
      const word = comicWords[Math.floor(Math.random() * comicWords.length)];
      
      // Calculate offset using polar coordinates
      const angle = Math.random() * Math.PI * 2;
      const distance = 30 + Math.random() * 30; // Closer range
      const offsetX = Math.cos(angle) * distance;
      const offsetY = Math.sin(angle) * distance;
      
      const newEffect = {
        id: Date.now() + Math.random(),
        word,
        x: e.clientX + offsetX,
        y: e.clientY + offsetY,
        rotation: Math.random() * 40 - 20
      };

      setEffects(prev => [...prev, newEffect]);

      // Remove effect faster
      setTimeout(() => {
        setEffects(prev => prev.filter(effect => effect.id !== newEffect.id));
      }, 500);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [location]); // Add location dependency

  return (
    <>
      {effects.map(effect => (
        <ComicEffect key={effect.id} {...effect} />
      ))}
    </>
  );
};

const ComicEffect = ({ word, x, y, rotation }) => {
  const effectRef = useRef(null);
  const linesRef = useRef([]);

  useEffect(() => {
    if (effectRef.current) {
      // Main box animation
      gsap.fromTo(effectRef.current,
        { scale: 0, opacity: 0, rotation: rotation - 45 },
        { 
          scale: 1, 
          opacity: 1, 
          rotation: rotation,
          duration: 0.15,
          ease: "back.out(3)"
        }
      );

      // Lines burst animation
      linesRef.current.forEach((line, i) => {
        if (!line) return;
        
        // Reset state
        gsap.set(line, { 
          scaleY: 0, 
          opacity: 1,
          transformOrigin: "bottom center" // Anchor at the center
        });

        // Burst out
        gsap.fromTo(line, 
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.2,
            ease: "power4.out"
          }
        );

        // Move away/expand
        gsap.to(line, {
          y: -80, // Move outward from center
          opacity: 0,
          duration: 0.2,
          scaleY: 0,
          delay: 0.1,
          ease: "power2.out"
        });
      });

      // Exit whole effect
      gsap.to(effectRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 0.2,
        delay: 0.4,
        ease: "power2.in"
      });
    }
  }, []);

  return (
    <div
      ref={effectRef}
      className="fixed pointer-events-none z-9999"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)', // Center the entire wrapper on coordinate
        width: '0px', // Ensure wrapper has no size to mess up centering
        height: '0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* Text Box */}
        <div className="bg-white border-2 border-black px-3 py-1 shadow-[2px_2px_0px_#000] relative z-20 whitespace-nowrap">
          <span className="text-black font-black text-xl italic" style={{ WebkitTextStroke: '1px black' }}>
            {word}
          </span>
        </div>
        
        {/* Radiating Lines - Positioned absolutely at center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-0 h-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 left-0 w-1 h-14 origin-bottom"
              style={{
                top: 'auto',
                bottom: '0', // Anchor to center point
                left: '-2px', // Center horizontally (half of width)
                transform: `rotate(${i * 30}deg) translateY(-20px)`, // Initial offset from center
              }}
            >
              <div 
                ref={el => linesRef.current[i] = el}
                className="w-full h-full bg-white"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Layout = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8, // Reduced from 1.2 for snappier scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Make Lenis accessible globally for other components (like modals)
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white selection:bg-cyan-500 selection:text-black">
      <GlobalComicEffects />
      <div className="relative z-10">
        <Navbar />
        <main className="relative flex flex-col">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

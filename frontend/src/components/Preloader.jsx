import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textStripRef = useRef(null);
  const logoRef = useRef(null);
  const redBoxRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Fade out content
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
            onComplete: onComplete
          });
        }
      });

      // Initial State
      gsap.set(redBoxRef.current, { 
        scale: 0, 
        opacity: 0,
        rotation: -10
      });
      gsap.set(logoRef.current, { opacity: 0, y: 50 });
      
      // Part 1: Box Pop-in
      tl.to(redBoxRef.current, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      })
      
      // Part 2: Fast Text Flipping (Comic Style)
      // Animate the strip movement with a flicker effect
      .fromTo(".flip-text", 
        { yPercent: 100, opacity: 0, filter: "blur(10px)" },
        { 
          yPercent: 0, 
          opacity: 1, 
          filter: "blur(0px)",
          duration: 0.4, 
          stagger: {
            each: 0.6, 
            yoyo: true,
            repeat: 1,
            repeatDelay: 0.3
          }
        }
      )
      
      // Add a subtle shake to the box during the flip
      .to(redBoxRef.current, {
        x: "+=2",
        yoyo: true,
        repeat: 15,
        duration: 0.1,
        ease: "rough({ template: none.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp: false })"
      }, "<")

      // Part 3: Scale up and hold
      .to(redBoxRef.current, {
        scale: 1.5,
        duration: 0.4,
        ease: "power2.in"
      })
      
      // Part 4: Flash White and Show Final Logo
      .to(containerRef.current, {
        backgroundColor: "#fff",
        duration: 0.1,
        yoyo: true,
        repeat: 3
      }, "-=0.2")
      
      .to(redBoxRef.current, {
        width: "100%",
        height: "100%",
        borderRadius: 0,
        duration: 0.4,
        ease: "power4.out"
      })
      
      .to(logoRef.current, {
        opacity: 1,
        y: 0,
        scale: 1.2,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.2")

      // Hold for a moment
      .to({}, { duration: 1.5 });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Red Marvel-like Box */}
      <div 
        ref={redBoxRef}
        className="relative flex items-center justify-center text-white overflow-hidden w-[90%] max-w-[400px] md:max-w-[500px] h-[120px] shadow-[10px_10px_0px_0px_rgba(255,255,255,0.2)]"
        style={{ backgroundColor: '#ED1D24' }}
      >
        {/* Flipping Text Strip */}
        <div ref={textStripRef} className="absolute inset-0 flex flex-col items-center justify-center font-black italic tracking-tighter text-2xl sm:text-4xl md:text-5xl uppercase leading-none px-2 sm:px-4 text-center">
          <span className="flip-text absolute opacity-0 whitespace-nowrap">XIM UNIVERSITY</span>
          <span className="flip-text absolute opacity-0">PRESENTS</span>
          <span className="flip-text absolute opacity-0">MARVELS</span>
          <span className="flip-text absolute opacity-0">SYNCHRONIZE 4.0</span>
        </div>

        {/* Final Logo Overlay */}
        <div ref={logoRef} className="absolute z-10 text-center flex flex-col items-center justify-center opacity-0">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black italic tracking-tighter drop-shadow-lg text-white" style={{ fontFamily: "Impact, sans-serif" }}>
            SYNCHRONIZE
          </h1>
          <div className="flex items-center gap-2 sm:gap-4 mt-2">
            <span className="h-1 w-8 sm:w-12 bg-white"></span>
            <span className="text-xl sm:text-2xl font-bold tracking-widest text-white">4.0</span>
            <span className="h-1 w-8 sm:w-12 bg-white"></span>
          </div>
          <p className="mt-4 text-sm font-bold tracking-[0.2em] text-black bg-white px-2 py-1">
            XIM UNIVERSITY
          </p>
        </div>
        
        {/* Subtle halftone pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20" 
             style={{ 
               backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", 
               backgroundSize: "4px 4px" 
             }} 
        />
      </div>
    </div>
  );
};

export default Preloader;

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';
import { Images, Star } from 'lucide-react';
import HeroBg from '../assets/backgrounds/hero-bg.png';
import ComicShield from './ComicShield';

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subTextRef = useRef(null);
  const shieldRef = useRef(null);
  const tagRef = useRef(null);
  const buttonsRef = useRef(null);
  const placeholderRef = useRef(null);

  useEffect(() => {
    // Wait for the shield to be available in the DOM
    const startAnimation = () => {
      const shield = shieldRef.current;
      const placeholder = placeholderRef.current;
      
      if (!shield || !placeholder || !tagRef.current) {
        // Retry after a short delay if elements aren't ready
        setTimeout(startAnimation, 100);
        return;
      }

      // Helper to calculate distance from Center Screen to Target Center
      const getCenterDelta = (target) => {
          const targetRect = target.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();
          
          const centerX = containerRect.width / 2;
          const centerY = containerRect.height / 2;

          const targetX = targetRect.left + targetRect.width / 2;
          const targetY = targetRect.top + targetRect.height / 2;

          return {
              x: targetX - centerX,
              y: targetY - centerY
          };
      };
      
      // Calculate positions dynamically
      const tagPos = getCenterDelta(tagRef.current);
      // Title target: vaguely aimed at the "SYNCHRONIZE" text
      const titlePos = getCenterDelta(textRef.current.children[0]); 
      titlePos.x -= 40; // Slight offset for visual balance

      const subTextPos = getCenterDelta(subTextRef.current);
      const buttonPos = getCenterDelta(buttonsRef.current);
      const finalPos = getCenterDelta(placeholder);

      // Get target size for final scaling
      const placeholderRect = placeholder.getBoundingClientRect();
      const shieldRect = shield.getBoundingClientRect();
      // We start at scale 1.5 (set below). The shield is 300px naturally.
      // We want final size to match placeholder width.
      const finalScale = placeholderRect.width / 300; 

      const tl = gsap.timeline({ delay: 0.2 });

      // 0. Initial State
      gsap.set(shield, { x: 0, y: 0, scale: 1.5, opacity: 1, rotation: 0 });
      
      // Hide content initially
      gsap.set(tagRef.current, { opacity: 0, scale: 0 });
      gsap.set(textRef.current.children[0], { opacity: 0, x: -50 });
      gsap.set(textRef.current.children[1].children[0], { opacity: 0 }); // "4." text
      gsap.set(subTextRef.current, { opacity: 0, y: 30 });
      gsap.set(buttonsRef.current, { opacity: 0, y: 30 });


      // 1. Establish Shot: Spin
      tl.to(shield, { 
          rotation: 360, 
          duration: 0.6, 
          ease: 'power2.inOut' 
      })
      
      // 2. Tag
      .to(shield, { 
          x: tagPos.x, 
          y: tagPos.y, 
          duration: 0.5, 
          ease: 'power2.inOut' 
      })
      .to(shield, { rotation: 540, duration: 0.5 }, '<')
      .to(tagRef.current, { 
          opacity: 1, 
          scale: 1, 
          duration: 0.3, 
          ease: 'back.out(1.7)' 
      }, '>-0.2')
      
      // 3. Title ("SYNCHRONIZE")
      .to(shield, { 
          x: titlePos.x, 
          y: titlePos.y, 
          duration: 0.5, 
          ease: 'power2.inOut' 
      })
      .to(shield, { rotation: 720, duration: 0.5 }, '<')
      .to(textRef.current.children[0], { 
          opacity: 1, 
          x: 0, 
          duration: 0.4, 
          ease: 'power2.out' 
      }, '>-0.2')
      
      // 4. Subtext
      .to(shield, { 
          x: subTextPos.x, 
          y: subTextPos.y, 
          duration: 0.5, 
          ease: 'power2.inOut' 
      })
      .to(shield, { rotation: 900, duration: 0.5 }, '<')
      .to(subTextRef.current, { 
          opacity: 1, 
          y: 0, 
          duration: 0.4, 
          ease: 'power2.out' 
      }, '>-0.2')
      
      // 5. Buttons
      .to(shield, { 
          x: buttonPos.x, 
          y: buttonPos.y, 
          duration: 0.5, 
          ease: 'power2.inOut' 
      })
      .to(shield, { rotation: 1080, duration: 0.5 }, '<')
      .to(buttonsRef.current, { 
          opacity: 1, 
          y: 0, 
          duration: 0.4, 
          ease: 'power2.out' 
      }, '>-0.2')
      
      // 6. FINAL: Land in the "4.0" slot
      .to(shield, { 
          x: finalPos.x,
          y: finalPos.y,
          scale: finalScale,
          duration: 0.8, 
          ease: 'elastic.out(1, 0.5)' 
      })
      .to(shield, { 
          rotation: 1440,
          duration: 0.8 
      }, '<')
      
      // Reveal "4."
      .to(textRef.current.children[1].children[0], { 
          opacity: 1, 
          duration: 0.3 
      }, '<+0.2');

    };

    // Delay start to allow layout to settle
    setTimeout(startAnimation, 200);

    // Optional: Re-run on resize for perfect alignment
    const handleResize = () => {
        // Debounce or just reload? For simplicity, we relies on initial load.
        // A full re-calc would require resetting GSAP state which is complex.
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#F0F4F8]">
      
      {/* 1. Background Visuals: Patriot Style */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#001D4A] mix-blend-multiply opacity-80 z-10" />
        <img
          src={HeroBg}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. The Flying Shield (Absolute Root) */}
      <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
         {/* Initial size 300px, will be scaled down */}
         <ComicShield ref={shieldRef} className="w-[300px] h-[300px]" />
      </div>

      {/* 3. Comic Book Content - Clean Layout */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-start px-6 sm:px-12 md:px-20 lg:px-32 pointer-events-none pt-20 sm:pt-0 lg:pt-26">
        
        {/* Floating Tag */}
        {/* Floating Tags Container */}
        <div ref={tagRef} className="mb-4 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center opacity-0 transform-gpu">
            {/* Edition Tag */}
            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_#000] px-3 py-1 sm:px-4 sm:py-1 -rotate-2">
                <span className="font-display font-black text-[#AA0505] tracking-widest text-[10px] sm:text-xs md:text-sm">FIRST MARVEL EDITION</span>
            </div>
            
            {/* Date Tag */}
            <div className="bg-[#AA0505] border-2 border-black shadow-[4px_4px_0px_#000] px-3 py-1 sm:px-4 sm:py-1 rotate-1">
                 <span className="font-display font-black text-white tracking-widest text-[10px] sm:text-xs md:text-sm">FEB 26 - 28</span>
            </div>
        </div>

        <div ref={textRef} className="flex flex-col relative w-full">
            <h1 className="hero-title-responsive font-display font-black italic tracking-tighter text-white inline-block drop-shadow-[3px_3px_0px_#000] sm:drop-shadow-[5px_5px_0px_#000] opacity-0 leading-[0.85]" style={{ WebkitTextStroke: '2px black' }}>
                SYNCHRONIZE
            </h1>
            
            {/* Title with integrated shield placeholder */}
            <div className="flex items-center gap-1 sm:gap-2 mt-2">
                <h1 className="hero-title-responsive font-display font-black italic tracking-tighter text-[#AA0505] inline-block pop-art-text leading-none opacity-0" style={{ WebkitTextStroke: '2px black' }}>
                    4.
                </h1>
                
                {/* Placeholder for Shield Landing - Layout Only */}
                <div 
                    ref={placeholderRef}
                    className="hero-shield-container relative z-10 opacity-0" 
                    style={{ width: 'clamp(3rem, 12vw, 8rem)', height: 'clamp(3rem, 12vw, 8rem)' }}
                >
                    {/* Empty - The real shield lands here visually */}
                </div>
            </div>
        </div>
        
        <div ref={subTextRef} className="mt-6 sm:mt-8 relative opacity-0 max-w-[90%] sm:max-w-xl">
            <div className="absolute -left-3 sm:-left-4 top-0 bottom-0 w-1.5 sm:w-2 bg-[#AA0505] -skew-x-12"></div>
            <p className="pl-3 sm:pl-4 text-white font-bold tracking-wider font-display shadow-black drop-shadow-md leading-tight" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
                "I CAN DO THIS ALL DAY." <br/>
                <span className="text-blue-200 font-normal font-sans hero-subtitle-responsive mt-2 block leading-snug">Join the initiative. Defend the future.</span>
            </p>
        </div>

        <div ref={buttonsRef} className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 pointer-events-auto opacity-0 w-full sm:w-auto items-start">
          {/* Primary Action Button - Captain America Blue */}
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfITsuNAITuG-AZ1kyIbFqR0VNw1zJPbjMvxCkJU84PwPl9uA/viewform?pli=1" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <MagneticButton className="w-full sm:w-auto cursor-pointer px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-[#0055AA] text-white font-black text-sm sm:text-lg md:text-xl rounded-none border-3 sm:border-4 border-white shadow-[4px_4px_0px_#AA0505] sm:shadow-[6px_6px_0px_#AA0505] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#AA0505] sm:hover:shadow-[8px_8px_0px_#AA0505] transition-all clip-path-slant group">
              <span className="relative z-10 flex items-center justify-center gap-2">
                  REGISTER NOW
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </span>
            </MagneticButton>
          </a>
          
          {/* Secondary Action - White/Red */}
          <Link to="/gallery" className="w-full sm:w-auto">
            <MagneticButton className="w-full sm:w-auto cursor-pointer px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-white text-[#AA0505] font-black text-sm sm:text-lg md:text-xl rounded-none border-3 sm:border-4 border-[#AA0505] shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] sm:hover:shadow-[8px_8px_0px_#000] transition-all clip-path-slant">
              <span className="flex items-center justify-center gap-2">
                <span>VIEW GALLERY</span>
                <Images className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </span>
            </MagneticButton>
          </Link>
        </div>
      </div>

      {/* Decorative Stripes (Red/White) */}
      <div className="absolute bottom-0 right-0 w-1/2 sm:w-1/3 h-[120%] sm:h-full pointer-events-none z-0 opacity-20 -skew-x-12 origin-bottom-right translate-x-1/4 translate-y-20 sm:translate-y-0">
        <div className="w-full h-full flex gap-4 sm:gap-8 justify-end">
            <div className="h-full w-8 sm:w-12 bg-[#AA0505]"></div>
            <div className="h-full w-8 sm:w-12 bg-white"></div>
            <div className="h-full w-8 sm:w-12 bg-[#AA0505]"></div>
            <div className="h-full w-8 sm:w-12 bg-white"></div>
            <div className="h-full w-16 sm:w-24 bg-[#0055AA]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

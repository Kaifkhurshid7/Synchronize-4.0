import { useEffect, useRef } from 'react'; // Removed Suspense
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

  useEffect(() => {
    // Wait for the shield to be available in the DOM
    const startAnimation = () => {
      const shield = shieldRef.current;
      
      if (!shield) {
        // Retry after a short delay if shield isn't ready
        setTimeout(startAnimation, 100);
        return;
      }

      const tl = gsap.timeline();

      // 0. Initial State - Shield is centered
      gsap.set(shield, { x: 0, y: 0, scale: 1.5, opacity: 1 }); // Start larger
      
      // Hide all content initially
      gsap.set(tagRef.current, { opacity: 0, scale: 0 });
      gsap.set(textRef.current.children[0], { opacity: 0, x: -100 }); // "SYNCHRONIZE"
      gsap.set(textRef.current.children[1], { opacity: 0, scale: 0 }); // "4." container
      gsap.set(subTextRef.current, { opacity: 0, y: 50 });
      gsap.set(buttonsRef.current, { opacity: 0, y: 30 });

      // 1. Shield spins in place briefly (establishing shot)
      tl.to(shield, { 
          rotation: 360, 
          duration: 0.6, 
          ease: 'power2.inOut' 
      })
      
      // 2. Shield moves to TAG position (Top Leftish)
      .to(shield, { 
          x: "-30vw", 
          y: "-35vh", 
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
      
      // 3. Shield moves to TITLE position (Left Mid)
      .to(shield, { 
          x: "-25vw", 
          y: "-10vh", 
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
      
      // 4. Shield moves to SUBTEXT position (Lower Left)
      .to(shield, { 
          x: "-20vw", 
          y: "15vh", 
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
      
      // 5. Shield moves to BUTTONS position (Bottom)
      .to(shield, { 
          x: "-10vw", 
          y: "30vh", 
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
      
      // 6. FINAL: Shield lands as "0" in "4.0" and shrinks
      .to(shield, { 
          x: "-100px",  // Manual tuning needed for alignment with "4."
          y: "-20px",   // Fine tuning
          scale: 0.4,   // Shrink to fit
          duration: 0.8, 
          ease: 'elastic.out(1, 0.5)' 
      })
      .to(shield, { 
          rotation: 1440, // 4 spins total?
          duration: 0.8 
      }, '<')
      
      // Reveal the "4." text alongside the shield landing
      .to(textRef.current.children[1], { 
          opacity: 1, 
          scale: 1, 
          duration: 0.5, 
          ease: 'back.out(2)' 
      }, '<+0.2');
    };

    // Start the animation check
    startAnimation();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#F0F4F8]">
      
      {/* 1. Background Visuals: Patriot Style */}
      <div className="absolute inset-0 z-0">
        {/* Blue Multiply to tint the video Captain America Blue */}
        <div className="absolute inset-0 bg-[#001D4A] mix-blend-multiply opacity-80 z-10" />
        <img
          src={HeroBg}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        
        {/* Speed Lines from center (Impact effect) */}
        {/* <div className="absolute inset-0 bg-[repeating-conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_10deg,rgba(255,255,255,0.05)_10deg,rgba(255,255,255,0.05)_20deg)] animate-[spin_60s_linear_infinite] pointer-events-none z-10"></div> */}
      </div>

      {/* 2. The Shield - Now 2D Comic Version */}
      <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
         <ComicShield ref={shieldRef} className="w-[300px] h-[300px]" />
      </div>

      
      {/* 3. Comic Book Content - Adjusted Layout for Shield Integration */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-start px-8 md:px-20 lg:px-32 pointer-events-none pt-16">
        
        {/* Floating Tag */}
        <div ref={tagRef} className="mb-4 bg-white border-2 border-black shadow-[4px_4px_0px_#000] px-4 py-1 -rotate-2 inline-block animate-pulse">
            <span className="font-display font-black text-[#AA0505] tracking-widest text-sm">FIRST AVENGER EDITION</span>
        </div>

        <div ref={textRef} className="flex flex-col z-100 relative">
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-display font-black italic tracking-tighter text-white inline-block drop-shadow-[5px_5px_0px_#000]" style={{ WebkitTextStroke: '2px black' }}>
                SYNCHRONIZE
            </h1>
            <div className="flex items-center gap-4 mt-[-10px] md:mt-[-25px]">
                <h1 className="text-7xl sm:text-8xl md:text-9xl font-display font-black italic tracking-tighter text-[#AA0505] inline-block pop-art-text" style={{ WebkitTextStroke: '2px black' }}>
                    4.
                </h1>
                <div className="w-16 h-16 md:w-24 md:h-24"></div> 
            </div>
        </div>
        
        <div ref={subTextRef} className="mt-8 relative opacity-0">
            <div className="absolute -left-4 top-0 bottom-0 w-2 bg-[#AA0505] -skew-x-12"></div>
            <p className="pl-4 text-xl sm:text-2xl text-white font-bold tracking-wider font-display max-w-xl shadow-black drop-shadow-md">
                "I CAN DO THIS ALL DAY." <br/>
                <span className="text-blue-200 font-normal font-sans text-lg mt-2 block">Join the initiative. Defend the future.</span>
            </p>
        </div>

        <div ref={buttonsRef} className="mt-12 flex flex-row gap-4 sm:gap-6 pointer-events-auto">
          {/* Primary Action Button - Captain America Blue */}
          <MagneticButton className="cursor-pointer px-4 py-3 sm:px-10 sm:py-5 bg-[#0055AA] text-white font-black text-sm sm:text-xl rounded-none border-4 border-white shadow-[6px_6px_0px_#AA0505] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#AA0505] transition-all clip-path-slant group">
             <span className="relative z-10 flex items-center gap-2">
                REGISTER NOW
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
             </span>
          </MagneticButton>
          
          {/* Secondary Action - White/Red */}
          <Link to="/gallery">
            <MagneticButton className="cursor-pointer px-4 py-3 sm:px-10 sm:py-5 bg-white text-[#AA0505] font-black text-sm sm:text-xl rounded-none border-4 border-[#AA0505] shadow-[6px_6px_0px_#000] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] transition-all clip-path-slant">
              <span className="flex items-center gap-2">
                <span>VIEW GALLERY</span>
                <Images className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
            </MagneticButton>
          </Link>
        </div>
      </div>

      {/* Decorative Stripes (Red/White) */}
      <div className="absolute bottom-0 right-0 w-1/3 h-full pointer-events-none z-0 opacity-20 -skew-x-12 origin-bottom-right translate-x-1/4">
        <div className="w-full h-full flex gap-8">
            <div className="h-full w-12 bg-[#AA0505]"></div>
            <div className="h-full w-12 bg-white"></div>
            <div className="h-full w-12 bg-[#AA0505]"></div>
            <div className="h-full w-12 bg-white"></div>
            <div className="h-full w-24 bg-[#0055AA]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

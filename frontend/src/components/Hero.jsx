import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';
import { Images } from 'lucide-react';

const Hero = ({ startAnimation }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subTextRef = useRef(null);

  useEffect(() => {
    if (!startAnimation) return;

    const tl = gsap.timeline();

    // Elegant Text Reveal
    tl.fromTo(textRef.current.children, 
      { y: 100, opacity: 0, filter: 'blur(20px)' }, 
      { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.1, duration: 1.8, ease: 'power4.out' }
    )
    .fromTo(subTextRef.current, 
      { opacity: 0, y: 30, filter: 'blur(10px)' }, 
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }, 
      '-=1.2'
    );
  }, [startAnimation]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-transparent">
      
      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none px-4">
        <div ref={textRef} className="text-center mb-8 flex flex-col md:block py-4 z-100">
          <h1 className="text-7xl md:text-9xl font-display font-black italic tracking-tighter text-white inline-block drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
            SYNCHRONIZE
          </h1>
          <h1 className="text-7xl md:text-9xl font-display font-black italic tracking-tighter text-cyan-400 inline-block md:ml-6 drop-shadow-[0_0_30px_rgba(0,242,255,0.6)] pb-2 pr-2">
            4.0
          </h1>
        </div>
        
        <p ref={subTextRef} className="text-xl md:text-3xl text-gray-300 max-w-3xl mx-auto font-light tracking-[0.2em] text-center uppercase drop-shadow-lg font-sans">
          Beyond the Horizon
        </p>

        <div className="mt-16 flex flex-col md:flex-row gap-6 pointer-events-auto">
          <MagneticButton className="cursor-pointer px-10 py-4 bg-cyan-400 text-black font-bold rounded-full hover:bg-cyan-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            REGISTER NOW
          </MagneticButton>
          <MagneticButton className="cursor-pointer px-10 py-4 border-2 border-cyan-400 text-cyan-400 font-bold rounded-full hover:bg-cyan-400/10 transition-all backdrop-blur-sm shadow-[0_0_15px_rgba(0,242,255,0.3)]">
            EXPLORE EVENTS
          </MagneticButton>
          <Link to="/gallery">
            <MagneticButton className="cursor-pointer px-10 py-4 border-2 border-purple-400 text-purple-400 font-bold rounded-full hover:bg-purple-400/10 transition-all backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <span className="flex items-center gap-2">
                VIEW GALLERY
                <Images className="w-5 h-5" />
              </span>
            </MagneticButton>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 z-20 pointer-events-none">
        <span className="text-xs tracking-[0.3em] uppercase font-sans">Scroll</span>
        <div className="w-px h-12 bg-linear-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;

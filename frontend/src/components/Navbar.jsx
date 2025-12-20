import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import ironManImg from '../assets/iron_man.png';
import hulkImg from '../assets/hulk.png';
import thorImg from '../assets/thor.png';
import captainAmericaImg from '../assets/captain_america.png';
import blackPantherImg from '../assets/black_panther.png';
import blackWidowImg from '../assets/black_widow.png';
import ximLogo from '../assets/xim-logo.png';
import ArcReactor from './ArcReactor';
import { useCursor } from '../context/CursorContext';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [theme, setTheme] = useState('captain'); // 'captain' or 'panther'
  const [hoveredLink, setHoveredLink] = useState(null);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const bgRef = useRef(null);
  const reactorRef = useRef(null);
  const reactorTween = useRef(null);
  const [hoveredReact, setHoveredReact] = useState(false);

  // Initialize Reactor Rotation
  useEffect(() => {
    if (!reactorRef.current) return;
    
    // Create infinite rotation tween (base state)
    reactorTween.current = gsap.to(reactorRef.current, {
      rotation: 360,
      duration: 10,
      ease: "none",
      repeat: -1,
      paused: true // Start paused (idle state)
    });

    return () => {
      if (reactorTween.current) reactorTween.current.kill();
    };
  }, []);

  // Handle Rotation Speed Changes based on State
  useEffect(() => {
    if (!reactorTween.current) return;

    let targetTimeScale = 0;
    
    if (isOpen) {
      targetTimeScale = 8; // Super fast when open
    } else if (hoveredReact) {
      targetTimeScale = 2; // Fast when hovered
    } else {
      targetTimeScale = 0; // Idle (stopped wrapper, internal parts still spin)
    }

    // If target is 0, we can pause, but to ramp down nicely we tween timeScale to 0
    // However, gsap.to(tween, { timeScale: 0 }) works well.
    
    // Ensure it's playing if we are ramping up
    if (targetTimeScale > 0 && reactorTween.current.paused()) {
        reactorTween.current.play();
    }

    gsap.to(reactorTween.current, {
        timeScale: targetTimeScale,
        duration: 0.8, // Smooth ramp duration
        ease: "power2.inOut",
        onComplete: () => {
            if (targetTimeScale === 0) {
                reactorTween.current.pause();
            }
        }
    });

  }, [isOpen, hoveredReact]);

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll Trigger for Theme Change
  useEffect(() => {
    const aboutSection = document.getElementById('about');
    
    if (aboutSection) {
      ScrollTrigger.create({
        trigger: aboutSection,
        start: "top 20%",
        end: "bottom 20%",
        onEnter: () => setTheme('panther'),
        onLeaveBack: () => setTheme('captain'),
        onEnterBack: () => setTheme('panther'),
        onLeave: () => setTheme('captain'),
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  
  // Re-check theme on location change
  useEffect(() => {
    const checkAbout = () => {
        const aboutSection = document.getElementById('about');
        if (!aboutSection) {
            setTheme('captain');
        } else {
             ScrollTrigger.refresh();
        }
    };
    setTimeout(checkAbout, 100);
  }, [window.location.pathname]);


  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to(bgRef.current, {
      yPercent: 100,
      duration: 0.8,
      ease: "power4.inOut"
    })
    .fromTo(linksRef.current, 
      { y: 100, opacity: 0, rotate: 5 },
      { 
        y: 0, 
        opacity: 1, 
        rotate: 0,
        stagger: 0.1, 
        duration: 0.6, 
        ease: "back.out(1.7)" 
      },
      "-=0.4"
    );

    menuRef.current = tl;
  }, [isLargeScreen]);

  useEffect(() => {
    if (isOpen) {
      menuRef.current.play();
      document.body.style.overflow = 'hidden';
    } else {
      menuRef.current.reverse();
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigation = (path) => {
    setIsOpen(false);
    
    // Always navigate to the full path first to ensure URL is updated with hash
    navigate(path);
    
    if (path.includes('#')) {
      const hash = path.split('#')[1];
      // Helper timeout to attempt scroll if on same page or quick mount
      [100, 300, 800].forEach(delay => {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, delay);
      });
    }
  };

  const navLinks = [
    { name: "Home", path: "/", color: "var(--marvel-red)", image: ironManImg, character: "IRON MAN" },
    { name: "Events", path: "/events", color: "var(--hulk-green)", image: hulkImg, character: "THE HULK" },
    { name: "Schedule", path: "/#schedule", color: "var(--iron-gold)", image: thorImg, character: "THOR" },
    { name: "Sponsors", path: "/#sponsors", color: "var(--cap-blue)", image: captainAmericaImg, character: "CAPTAIN AMERICA" },
    { name: "Team", path: "/team", color: "var(--panther-purple)", image: blackPantherImg, character: "BLACK PANTHER" },
    { name: "Gallery", path: "/gallery", color: "white", image: blackWidowImg, character: "BLACK WIDOW" },
  ];

  // Theme Styles
  const isPanther = theme === 'panther';
  
  // Dynamic Styles based on theme
  const containerClass = 'navbar-blur border-b-4 border-black';
    
  // Comic "Sticker" effect class
  const stickerClass = "comic-panel bg-white text-black";

  const { setShowModal, currentCursor } = useCursor();

  return (
    <>
    <nav className={`navbar-main fixed top-2 sm:top-6 left-0 w-full z-100 px-3 sm:px-8 py-4 transition-all duration-300 ${isOpen ? '' : 'pointer-events-none'}`}>
        <div className={`max-w-7xl mx-auto flex justify-between items-center pointer-events-auto`}>
          
          {/* Logo Badge */}
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)} 
            className={`relative group cursor-pointer bg-white px-6 py-3 transform -skew-x-6 transition-all duration-300 ${stickerClass} hover:scale-105 hover:rotate-2 hover:shadow-[8px_8px_0px_var(--marvel-red)]! hover:-translate-y-1`}
            id="home-nav"
          >
            <div className="flex items-center gap-2 transform skew-x-6">
                <img 
                    src={ximLogo} 
                    alt="XIM Logo" 
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:scale-125 hover:drop-shadow-[0_4px_8px_rgba(237,29,36,0.5)] transition-all duration-300" 
                />
                <div className="flex flex-col items-center">
                    <span className="text-lg sm:text-3xl font-display font-black italic leading-none text-black tracking-tighter transition-all duration-300 group-hover:tracking-widest" style={{ textShadow: '2px 2px 0px #ED1D24' }}>SYNCHRONIZE</span>
                    <span className="text-xs font-black tracking-[0.5em] bg-black text-white px-2 py-0.5 mt-[-4px] -rotate-2 group-hover:rotate-0 transition-transform duration-300">4.0 EDITION</span>
                </div>
                <img 
                    src="/logo.png" 
                    alt="Logo" 
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:scale-125 hover:drop-shadow-[0_4px_8px_rgba(237,29,36,0.5)] transition-all duration-300" 
                />
            </div>
          </Link>


          <div className="flex items-center gap-4">
              {/* CHOOSE CURSOR BUTTON */}
              <button
                onClick={() => setShowModal(true)}
                className="hidden md:flex items-center gap-2 bg-yellow-400 border-3 border-black px-4 py-2 transform -skew-x-12 hover:scale-105 hover:rotate-1 hover:shadow-[4px_4px_0px_black] transition-all duration-200 cursor-pointer"
              >
                  <span className="font-display font-black italic text-black text-sm transform skew-x-12 tracking-wider">
                      {currentCursor !== 'default' ? 'CHANGE CURSOR' : 'CHOOSE CURSOR'}
                  </span>
                  <div className="w-2 h-2 bg-black rounded-full animate-pulse transform skew-x-12"></div>
              </button>

              {/* Menu Toggle - "SECRET FILES" Badge */}
              <div 
                onClick={toggleMenu}
                className="group/nav relative z-50 flex items-center gap-4 cursor-pointer"
              >
                <div className="relative">
                    <MagneticButton 
                        className={`w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center transition-all duration-500 rounded-full group-hover/nav:scale-110`}
                    >
                    <div 
                        onMouseEnter={() => setHoveredReact(true)}
                        onMouseLeave={() => setHoveredReact(false)}
                        className="relative w-full h-full flex items-center justify-center scale-90"
                    >
                        {/* Rotator Container - Pure Animation, No CSS Transforms */}
                        <div ref={el => { if (el) reactorRef.current = el; }} className="w-full h-full">
                            <ArcReactor className="cursor-pointer w-full h-full drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]" />
                        </div>
                        
                        {/* Core Glow Overlay */}
                        <div className={`absolute inset-0 rounded-full bg-cyan-400 opacity-0 ${isOpen ? 'animate-pulse opacity-30' : 'group-hover/nav:opacity-10'} transition-opacity duration-300 mix-blend-screen pointer-events-none`}></div>
                    </div>
                    </MagneticButton>
                    
                    {/* Electric Discharges - Fancier Comic Style */}
                    <div className={`absolute inset-[-40%] pointer-events-none transition-all duration-300 group-hover/nav:scale-110 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="w-full h-full relative">
                            
                            {/* Rotating Plasma Rings */}
                            <div className="absolute inset-0 border-4 border-cyan-400 border-dashed rounded-full animate-spin-slow opacity-60"></div>
                            <div className="absolute inset-2 border-4 border-yellow-400 border-dotted rounded-full animate-spin-reverse-slow opacity-60"></div>
                            
                            {/* Chaotic Lightning Bolts */}
                            {/* Bolt 1: Top Right */}
                            <svg className="absolute top-0 right-0 w-12 h-16 text-cyan-400 animate-pulse-fast fill-current rotate-12 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" viewBox="0 0 24 24">
                              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
                            </svg>

                            {/* Bolt 2: Bottom Left */}
                            <svg className="absolute bottom-0 left-0 w-10 h-14 text-yellow-300 animate-pulse-fast fill-current -rotate-12 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]" viewBox="0 0 24 24" style={{ animationDelay: '0.1s' }}>
                              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
                            </svg>
                            
                            {/* Bolt 3: Top Left (Small) */}
                            <svg className="absolute top-2 left-2 w-6 h-8 text-white animate-ping-slow fill-current -rotate-45" viewBox="0 0 24 24">
                              <path d="M11 2L2 14H10L9 22L19 10H10L11 2Z" />
                            </svg>

                            {/* Bolt 4: Bottom Right (Small) */}
                            <svg className="absolute bottom-2 right-2 w-6 h-8 text-white animate-ping-slow fill-current rotate-45" viewBox="0 0 24 24" style={{ animationDelay: '0.2s' }}>
                              <path d="M11 2L2 14H10L9 22L19 10H10L11 2Z" />
                            </svg>

                            {/* Kirby Krackle / Energy Dots */}
                            <div className="absolute top-0 left-1/2 w-3 h-3 bg-black border border-cyan-400 rounded-full animate-ping"></div>
                            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-black border border-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                            <div className="absolute top-1/2 left-0 w-2 h-2 bg-black border border-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                            <div className="absolute top-1/2 right-0 w-3 h-3 bg-black border border-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.1s' }}></div>
                        </div>
                    </div>
                </div>

                <span 
                    className="hidden sm:block text-2xl font-display font-black italic tracking-widest text-white group-hover/nav:text-cyan-400 transition-colors drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]"
                >
                    MENU
                </span>
              </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div 
        ref={bgRef} 
        className="fixed inset-0 bg-[#0a0a0a] z-90 transform -translate-y-full flex flex-col justify-center items-center overflow-hidden overflow-y-auto"
      >
        {/* Halftone & Action Lines */}
        <div className="absolute inset-0 halftone-pattern opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 speed-lines opacity-5 pointer-events-none"></div>

        {/* Background Images Layer */}
        {navLinks.map((link, index) => (
             <div 
                key={`bg-${index}`}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out ${hoveredLink === index ? 'opacity-40' : 'opacity-0'}`}
                style={{ backgroundImage: `url(${link.image})` }}
             />
        ))}

        {/* Floating Comic Particles */}
        <div className="hidden lg:block absolute top-40 left-20 text-6xl font-black text-white/10 rotate-[-15deg] pointer-events-none">POW!</div>
        <div className="hidden lg:block absolute bottom-20 right-20 text-8xl font-black text-white/10 rotate-15 pointer-events-none">BAM!</div>

        <div className="flex flex-col items-center gap-6 relative z-10 w-full max-w-2xl px-4">
          <h2 
            className="text-xl font-mono tracking-widest mb-8 border-b-2 pb-2 uppercase transition-colors duration-300"
            style={{ 
              color: hoveredLink !== null ? navLinks[hoveredLink].color : 'var(--marvel-red)',
              borderColor: hoveredLink !== null ? navLinks[hoveredLink].color : 'var(--marvel-red)'
            }}
          >
              {hoveredLink !== null ? `// ${navLinks[hoveredLink].character}` : 'CLASSIFIED FILES'}
          </h2>
          
          {navLinks.map((link, index) => (
            <button
              key={index}
              ref={el => linksRef.current[index] = el}
              onClick={() => handleNavigation(link.path)}
              onMouseEnter={() => setHoveredLink(index)}
              onMouseLeave={() => setHoveredLink(null)}
              className="group relative w-full text-center py-2 cursor-pointer"
            >
              <div className="relative inline-block transform transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-2">
                <div className="absolute -inset-2 bg-white skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border-2 border-black shadow-[4px_4px_0px_#000]"></div>
                <span 
                    className="relative z-10 text-4xl sm:text-7xl font-display font-black text-transparent bg-clip-text bg-white italic uppercase group-hover:text-black transition-colors duration-200"
                    style={{ WebkitTextStroke: '2px black' }}
                >
                    {link.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [theme, setTheme] = useState('captain'); // 'captain' or 'panther'
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const bgRef = useRef(null);

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
        start: "top 20%", // Changes when About section is near top
        end: "bottom 20%",
        onEnter: () => setTheme('panther'),
        onLeaveBack: () => setTheme('captain'),
        onEnterBack: () => setTheme('panther'),
        onLeave: () => setTheme('captain'),
      });
    }

    // Fallback/Cleanup if element missing or unmounting
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []); // Empty dependency array, but might need to re-run if route changes? 
  // Ideally we re-run this when the page component mounts/unmounts, but Navbar is persistent.
  // For now, let's assume About section is static on Home. If we navigate away, it might break if we don't check.
  
  // Re-check theme on location change (if about section doesn't exist, default to captain)
  useEffect(() => {
    const checkAbout = () => {
        const aboutSection = document.getElementById('about');
        if (!aboutSection) {
            setTheme('captain');
        } else {
             ScrollTrigger.refresh(); // Refresh triggers
        }
    };
    // Small delay to ensure DOM is ready
    setTimeout(checkAbout, 100);
  }, [window.location.pathname]);


  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to(bgRef.current, {
      yPercent: 100,
      duration: 1,
      ease: "power4.inOut"
    })
    .fromTo(linksRef.current, 
      { y: 100, opacity: 0, scale: 0.8 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        stagger: 0.1, 
        duration: 0.8, 
        ease: "back.out(1.7)" 
      },
      "-=0.5"
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
    
    if (path.includes('#')) {
      const [route, hash] = path.split('#');
      navigate(route || '/');
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      navigate(path);
    }
  };

  const navLinks = [
    { name: "Home", path: "/", color: "var(--color-marvel-red)" },
    { name: "Events", path: "/events", color: "var(--color-hulk-green)" },
    { name: "Schedule", path: "/#schedule", color: "var(--color-iron-gold)" },
    { name: "Sponsors", path: "/#sponsors", color: "var(--color-thor-lightning)" },
    { name: "Team", path: "/team", color: "var(--color-vibranium)" },
    { name: "Gallery", path: "/gallery", color: "var(--color-arc-reactor)" },
  ];

  // Theme Styles
  const isPanther = theme === 'panther';
  const navBgClass = isPanther ? 'bg-purple-900/90 border-black' : 'bg-red-900/90 border-black';
  const buttonBgClass = isPanther ? 'bg-purple-700 border-purple-400' : 'bg-[--color-marvel-red] border-black';
  const logoBgClass = isPanther ? 'bg-purple-700 border-purple-400' : 'bg-[--color-marvel-red] border-white';

  return (
    <>
      <nav className={`navbar-main fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center text-white backdrop-blur-md border-b-4 box-border transition-all duration-500 ${navBgClass}`}>
        <Link 
          to="/" 
          onClick={() => setIsOpen(false)} 
          className="relative z-50 group cursor-pointer"
        >
          <div className="flex items-center gap-2 transform -skew-x-12">
             <div className={`w-12 h-12 border-4 flex items-center justify-center comic-shadow group-hover:translate-y-[-2px] transition-all duration-500 ${logoBgClass}`}>
                <span className="font-display font-black text-3xl text-white italic skew-x-12">S</span>
             </div>
             <div className="flex flex-col skew-x-12">
                <span className="text-2xl font-display font-black tracking-tighter italic leading-none text-white pop-art-text">SYNCHRONIZE</span>
                <span className="text-xs font-black tracking-widest bg-black px-1">4.0 EDITION</span>
             </div>
          </div>
        </Link>
        
        <div className="relative z-50">
          <MagneticButton onClick={toggleMenu} className={`w-12 h-12 cursor-pointer flex items-center justify-center group border-4 comic-shadow hover:-translate-y-1 transition-all duration-500 ${buttonBgClass}`}>
             <div className="relative w-8 h-8 flex flex-col justify-center items-center gap-1.5">
                 <span className={`block w-full h-[4px] bg-white border border-black transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                 <span className={`block w-full h-[4px] bg-white border border-black transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                 <span className={`block w-full h-[4px] bg-white border border-black transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
             </div>
          </MagneticButton>
        </div>
      </nav>

      {/* Full Screen Menu Overlay - Avengers Tower UI */}
      <div 
        ref={bgRef} 
        className="fixed inset-0 bg-[#0a0a0a] z-35 transform -translate-y-full flex flex-col justify-center items-center overflow-hidden"
      >
        {/* HUD Grid Background */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{
             backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px),
                               linear-gradient(to bottom, #333 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
          }}
        />
        
        {/* Character Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[--color-marvel-red] rounded-full blur-[150px] opacity-20 pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[--color-iron-gold] rounded-full blur-[150px] opacity-20 pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

        <div className="flex flex-col gap-2 sm:gap-6 text-center px-4 relative z-10 w-full max-w-4xl">
          {navLinks.map((link, index) => (
            <div key={index} className="overflow-hidden group">
              <button
                ref={el => linksRef.current[index] = el}
                onClick={() => handleNavigation(link.path)}
                className="relative w-full text-center py-4 cursor-pointer hover:bg-white/5 transition-colors rounded-lg group-hover:tracking-widest duration-500"
              >
                <div className="flex items-baseline justify-center gap-4">
                    <span className="text-xs font-mono text-gray-500 group-hover:text-white transition-colors">0{index + 1} //</span>
                    <span 
                        className="text-5xl sm:text-6xl md:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 italic uppercase"
                        style={{ transition: 'all 0.3s ease' }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundImage = `linear-gradient(to right, ${link.color}, white)`;
                            e.target.style.webkitTextStroke = `1px ${link.color}`;
                        }}
                        onMouseLeave={(e) => {
                             e.target.style.backgroundImage = 'linear-gradient(to right, white, gray)';
                             e.target.style.webkitTextStroke = '0px transparent';
                        }}
                    >
                        {link.name}
                    </span>
                </div>
              </button>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-10 left-0 w-full flex justify-between px-10 text-white/30 font-mono text-xs uppercase tracking-[0.3em]">
            <span>Stark Industries System</span>
            <span>Auth: Levels 1-10</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import gsap from 'gsap';
import { FaBars, FaXmark } from 'react-icons/fa6';
import MagneticButton from './MagneticButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const bgRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to(bgRef.current, {
      yPercent: 100,
      duration: 1,
      ease: "power4.inOut"
    })
    .fromTo(linksRef.current, 
      { y: 100, opacity: 0, rotate: 5 },
      { y: 0, opacity: 1, rotate: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );

    menuRef.current = tl;
  }, []);

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

  const handleLinkHover = (index) => {
    gsap.to(linksRef.current, {
      opacity: 0.3,
      scale: 0.95,
      duration: 0.3,
      overwrite: true
    });
    gsap.to(linksRef.current[index], {
      opacity: 1,
      scale: 1.1,
      x: 20,
      duration: 0.3,
      overwrite: true
    });
  };

  const handleLinkLeave = () => {
    gsap.to(linksRef.current, {
      opacity: 1,
      scale: 1,
      x: 0,
      duration: 0.3,
      overwrite: true
    });
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Schedule", path: "/#schedule" },
    { name: "Sponsors", path: "/#sponsors" },
    { name: "Team", path: "/team" },
    { name: "Gallery", path: "/gallery" },
  ];

  return (
    <>
      {/* Floating Header */}
      <nav className="navbar-main fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
        <Link 
          to="/" 
          onClick={() => setIsOpen(false)} 
          className="relative z-50 text-2xl font-display font-bold tracking-tighter hover:opacity-80 transition-opacity cursor-pointer italic"
        >
          SYNCHRONIZE <span className="text-cyan-400">4.0</span>
        </Link>
        
        <div className="relative z-50">
          <MagneticButton onClick={toggleMenu} className="w-16 h-16 rounded-full cursor-pointer flex items-center justify-center group hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
             <div className="cursor-pointerrelative w-7 h-7 flex flex-col justify-center items-center gap-1.5">
                <span className={`absolute h-[2px] bg-white transition-all duration-300 ease-out ${isOpen ? 'w-full rotate-45 top-3.5' : 'w-full top-2 group-hover:w-3/4'}`}></span>
                <span className={`absolute h-[2px] bg-white transition-all duration-300 ease-out ${isOpen ? 'w-full -rotate-45 top-3.5' : 'w-2/3 top-4 group-hover:w-full'}`}></span>
             </div>
          </MagneticButton>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div 
        ref={bgRef} 
        className="fixed inset-0 bg-black z-35 transform -translate-y-full flex flex-col justify-center items-center overflow-hidden"
      >
        {/* Background Noise/Gradient */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-black via-black to-cyan-950/20 pointer-events-none"></div>
        
        {/* Decorative Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="flex flex-col gap-2 sm:gap-4 text-center px-4 relative z-10">
          {navLinks.map((link, index) => (
            <div key={index} className="overflow-hidden py-2 px-20">
              <button
                ref={el => linksRef.current[index] = el}
                onClick={() => handleNavigation(link.path)}
                onMouseEnter={() => handleLinkHover(index)}
                onMouseLeave={handleLinkLeave}
                className="group text-5xl sm:text-6xl md:text-8xl font-display font-black text-transparent bg-clip-text bg-linear-to-r from-white to-white/60 hover:to-cyan-400 transition-all duration-300 cursor-pointer uppercase tracking-tighter italic px-2.5"
              >
                {link.name}
              </button>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-10 left-0 w-full flex justify-between px-10 text-white/40 font-mono text-sm uppercase tracking-widest">
            <span>Est. 2025</span>
            <span>Synchronize TechFest</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;

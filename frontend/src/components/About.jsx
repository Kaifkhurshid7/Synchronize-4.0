import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Cpu, Globe, Zap, Trophy, Users, Shield, Crown, Star, Sparkles } from 'lucide-react';
import AboutBg from '../assets/backgrounds/about-bg.png';

gsap.registerPlugin(ScrollTrigger);

const ComicPanel = ({ children, className = "", panelType = "default" }) => {
  const panelRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    gsap.to(panelRef.current, {
      scale: 1.02,
      rotation: Math.random() * 1 - 0.5,
      duration: 0.3,
      ease: "back.out(1.7)"
    });

    // Animate icons with stagger
    const icons = panelRef.current?.querySelectorAll('.panel-icon');
    gsap.to(icons, {
      scale: 1.1,
      rotation: 360,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.1
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.to(panelRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: "power2.out"
    });

    const icons = panelRef.current?.querySelectorAll('.panel-icon');
    gsap.to(icons, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const panelStyles = {
    default: "bg-gradient-to-br from-purple-900 via-purple-800 to-black border-4 border-purple-400 shadow-[8px_8px_0px_#9C27B0]",
    hero: "bg-gradient-to-br from-black via-purple-900 to-purple-700 border-4 border-yellow-400 shadow-[10px_10px_0px_#FFD700]",
    stat: "bg-gradient-to-br from-purple-700 to-purple-900 border-4 border-white shadow-[6px_6px_0px_#FFFFFF]",
    feature: "bg-gradient-to-br from-gray-900 to-black border-4 border-purple-500 shadow-[6px_6px_0px_#9C27B0]"
  };

  return (
    <div 
      ref={panelRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transform-gpu will-change-transform ${panelStyles[panelType]} transition-all duration-200 ${className}`}
      style={{
        clipPath: panelType === 'hero' ? 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' : 'none'
      }}
    >
      {/* Wakanda Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #9C27B0 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #FFD700 1px, transparent 1px)`,
          backgroundSize: '30px 30px, 20px 20px'
        }} />
      </div>
      
      {/* Energy Lines */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-purple-400 to-transparent animate-pulse" />
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-yellow-400 to-transparent animate-pulse" />
          <div className="absolute left-0 top-0 w-0.5 h-full bg-linear-to-b from-transparent via-purple-400 to-transparent animate-pulse" />
          <div className="absolute right-0 top-0 w-0.5 h-full bg-linear-to-b from-transparent via-yellow-400 to-transparent animate-pulse" />
        </div>
      )}
      
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};



const About = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const heroRef = useRef(null);
  const panelsRef = useRef([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Only run animations on desktop/tablet (min-width: 768px)
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%", // Moved up as requested
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Hero entrance with dramatic effect
      tl.fromTo(heroRef.current,
        { 
          scale: 0.8, 
          opacity: 0,
          rotationY: -15
        },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: 0.4, // Faster (was 0.6)
          ease: "power3.out"
        }
      )
      // Title with stagger effect
      .fromTo(titleRef.current.children,
        { y: 100, opacity: 0, rotationX: -90 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          stagger: 0.05, // Faster stagger (was 0.1)
          duration: 0.3, // Faster (was 0.5)
          ease: "back.out(1.7)"
        },
        "-=0.2"
      )
      // Panels with dynamic stagger
      .fromTo(".about-panel", 
        { 
          y: 80, 
          opacity: 0,
          scale: 0.8,
          rotation: (i) => (i % 2 === 0 ? -5 : 5)
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          stagger: {
            amount: 0.1, // Much faster stagger (was 0.3)
            from: "random"
          },
          duration: 0.4, // Faster (was 0.5)
          ease: "back.out(1.7)"
        },
        "-=0.1"
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={containerRef} 
      className="relative min-h-screen py-20 flex items-center justify-center bg-linear-to-br from-black via-purple-950 to-black"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
            src={AboutBg} 
            alt="About Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        {/* Wakanda Tech Grid */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(156, 39, 176, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(156, 39, 176, 0.3) 1px, transparent 1px),
                linear-gradient(rgba(255, 215, 0, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 215, 0, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px, 100px 100px, 50px 50px, 50px 50px'
            }}
          />
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-purple-600 to-purple-800 border-2 sm:border-4 border-yellow-400 shadow-[4px_4px_0px_#FFD700] sm:shadow-[6px_6px_0px_#FFD700] transform -rotate-1">
            <Crown className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400" />
            <span className="text-white font-black text-xs sm:text-sm tracking-widest uppercase">WAKANDA FOREVER</span>
            <Crown className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400" />
          </div>
          
          <div ref={titleRef} className="space-y-2 sm:space-y-4">
            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black font-display italic leading-none flex flex-col items-center justify-center">
              <span 
                className="block text-white drop-shadow-[2px_2px_0px_#9C27B0] sm:drop-shadow-[4px_4px_0px_#9C27B0]" 
                style={{ WebkitTextStroke: '1px #9C27B0' }}
              >
                VIBRANIUM
              </span>
              <span 
                className="block text-yellow-400 drop-shadow-[2px_2px_0px_#000] sm:drop-shadow-[4px_4px_0px_#000]" 
                style={{ WebkitTextStroke: '1px black' }}
              >
                INNOVATION
              </span>
            </h2>
            
            <div className="relative inline-block mt-4 sm:mt-6 max-w-[90%] sm:max-w-2xl mx-auto">
              <div className="absolute -left-2 sm:-left-4 top-0 bottom-0 w-2 sm:w-3 bg-linear-to-b from-purple-500 to-yellow-400 transform -skew-x-12" />
              <p className="text-white text-base sm:text-lg lg:text-xl font-bold pl-4 sm:pl-6 leading-relaxed text-left sm:text-center">
                <span className="text-purple-300 block sm:inline">"WHERE TECHNOLOGY MEETS TRADITION"</span>
                <span className="block text-gray-300 font-normal text-sm sm:text-base mt-2">
                  Join the elite circle of innovators shaping tomorrow's digital landscape
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Panels Grid */}
          {/* Zig-Zag Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* ROW 1: About Synchronize (Left-8) + Stats Stack (Right-4) */}
            <ComicPanel panelType="hero" className="lg:col-span-8 about-panel p-4 sm:p-6 md:p-8 h-full">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-br from-yellow-400 to-yellow-600 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_#000] transform -rotate-6 panel-icon shrink-0">
                    <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-display italic comic-text-stroke leading-none mb-1">
                      ABOUT SYNCHRONIZE
                    </h3>
                    <div className="h-1 bg-yellow-400 w-full" />
                  </div>
                </div>
                <div className="space-y-4 grow">
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed text-left">
                    An annual technical celebration that highlights the latest advancements, innovations, and discoveries in science and technology. Organized by the students of the School of Computer Science and Engineering (SCSE) with strong guidance from faculty members, the fest creates a powerful platform for learning, innovation, and collaboration. It brings together industry professionals, technology enthusiasts, and students to share ideas, build connections, and experience technology beyond classrooms.
                  </p>
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed text-left">
                     Supported by reputed organizations and sponsors, the fest aims to develop skilled talent, encourage innovation, and shape the future of the technology ecosystem. The fest features hackathons, robotics events, technical competitions, panel discussions, seminars, and exhibitions of emerging technologies.
                  </p>
                </div>
              </div>
            </ComicPanel>

            <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8 h-full">
              <ComicPanel panelType="stat" className="about-panel p-4 sm:p-6 text-center flex-1 flex flex-col justify-center items-center">
                <div className="w-14 h-14 bg-linear-to-br from-purple-500 to-purple-700 border-4 border-white flex items-center justify-center mb-4 shadow-[4px_4px_0px_#000] panel-icon">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-4xl font-black text-white mb-2 font-display italic comic-text-stroke">1000+</h4>
                <p className="text-purple-300 text-sm font-black uppercase tracking-widest">WARRIORS</p>
              </ComicPanel>
              
              <ComicPanel panelType="stat" className="about-panel p-4 sm:p-6 text-center flex-1 flex flex-col justify-center items-center">
                <div className="w-14 h-14 bg-linear-to-br from-yellow-400 to-yellow-600 border-4 border-black flex items-center justify-center mb-4 shadow-[4px_4px_0px_#000] panel-icon">
                  <Trophy className="w-7 h-7 text-black" />
                </div>
                <h4 className="text-4xl font-black text-white mb-2 font-display italic comic-text-stroke">₹1L+</h4>
                <p className="text-yellow-400 text-sm font-black uppercase tracking-widest">TREASURE</p>
              </ComicPanel>
            </div>

            {/* ROW 2: Features Stack (Left-4) + About SCSE (Right-8) */}
            <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8 h-full order-2 lg:order-1">
               <ComicPanel panelType="feature" className="about-panel p-4 sm:p-6 flex-1 flex flex-col justify-center">
                <div className="w-14 h-14 bg-linear-to-br from-purple-600 to-purple-800 border-4 border-purple-400 flex items-center justify-center mb-4 shadow-[3px_3px_0px_#9C27B0] transform -rotate-12 panel-icon">
                  <Cpu className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-black text-white mb-2 font-display italic">CUTTING EDGE</h4>
                <p className="text-gray-300 text-sm">Where technology meets its superpower.</p>
              </ComicPanel>

              <ComicPanel panelType="feature" className="about-panel p-4 sm:p-6 flex-1 flex flex-col justify-center">
                <div className="w-14 h-14 bg-linear-to-br from-purple-500 to-purple-700 border-4 border-yellow-400 flex items-center justify-center mb-4 shadow-[3px_3px_0px_#FFD700] panel-icon">
                  <Star className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-black text-white mb-2 font-display italic">ELITE MISSION</h4>
                <p className="text-gray-300 text-sm">Built by minds, powered by code.</p>
              </ComicPanel>
            </div>

            <ComicPanel panelType="feature" className="lg:col-span-8 about-panel p-4 sm:p-6 md:p-8 h-full order-1 lg:order-2">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-br from-purple-600 to-purple-800 border-4 border-purple-400 flex items-center justify-center shadow-[4px_4px_0px_#9C27B0] transform rotate-6 panel-icon shrink-0">
                    <Code className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                   <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-display italic mb-1">
                      ABOUT SCSE
                    </h3>
                    <div className="h-1 bg-purple-400 w-full" />
                  </div>
                </div>
                <div className="space-y-4 grow">
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-left">
                    The School of Computer Science & Engineering is a unique school that leverages the high-quality programs of XIM University and emphasizes sound innovation, and entrepreneurship. It currently offers B.Tech. (Hons.) in Computer Science & Engineering, M.Tech. in Data Science & Analytics , and Ph.D. in Computer Science & Engineering.
                  </p>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-left">
                    Its current faculty mostly has Ph.D. and/or postdoctoral experience from IITs/IISC or abroad. The founding Dean Prof. Priyadarsan Patra has a Ph.D. from The University of Texas at Austin and 20+ years of leadership experience at INTEL (USA). It is mentioned by Prof. Chitta Baral from Arizona State University, Prof. Prasant Mohapatra from The University of California Davis and Dr. Ashutosh Dutta of Johns Hopkins University.
                  </p>
                </div>
              </div>
            </ComicPanel>

            {/* ROW 3: Full Width CTA (Order 3) */}
            <ComicPanel panelType="hero" className="lg:col-span-12 about-panel p-4 sm:p-6 md:p-8 bg-linear-to-br from-purple-600 via-purple-700 to-black order-3">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-3xl sm:text-5xl font-black text-white mb-2 font-display italic comic-text-stroke">
                    JOIN THE <span className="text-yellow-400">REVOLUTION</span>
                  </h4>
                  <p className="text-purple-200 text-sm sm:text-base font-black uppercase tracking-wider">
                    ASSEMBLE • INNOVATE • DOMINATE
                  </p>
                </div>
                <div className="w-20 h-20 bg-linear-to-br from-yellow-400 to-yellow-600 border-4 border-black flex items-center justify-center shadow-[6px_6px_0px_#000] panel-icon transform rotate-12 hover:rotate-180 transition-transform duration-500">
                  <Sparkles className="w-10 h-10 text-black" />
                </div>
              </div>
            </ComicPanel>

          </div>
      </div>
    </section>
  );
};

export default About;

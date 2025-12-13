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
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
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
          duration: 1,
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
          stagger: 0.2,
          duration: 0.8,
          ease: "back.out(1.7)"
        },
        "-=0.5"
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
            amount: 0.6,
            from: "random"
          },
          duration: 0.7,
          ease: "back.out(1.7)"
        },
        "-=0.3"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={containerRef} 
      className="relative min-h-[150vh] py-40 overflow-hidden bg-linear-to-br from-black via-purple-950 to-black flex items-center justify-center"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
        
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-linear-to-r from-purple-600 to-purple-800 border-4 border-yellow-400 shadow-[6px_6px_0px_#FFD700] transform -rotate-1">
            <Crown className="w-6 h-6 text-yellow-400" />
            <span className="text-white font-black text-sm tracking-widest uppercase">WAKANDA FOREVER</span>
            <Crown className="w-6 h-6 text-yellow-400" />
          </div>
          
          <div ref={titleRef} className="space-y-4">
            <h2 className="text-6xl lg:text-8xl font-black font-display italic leading-none">
              <span 
                className="block text-white drop-shadow-[4px_4px_0px_#9C27B0]" 
                style={{ WebkitTextStroke: '3px #9C27B0' }}
              >
                VIBRANIUM
              </span>
              <span 
                className="block text-yellow-400 drop-shadow-[4px_4px_0px_#000]" 
                style={{ WebkitTextStroke: '3px black' }}
              >
                INNOVATION
              </span>
            </h2>
            
            <div className="relative inline-block mt-6">
              <div className="absolute -left-4 top-0 bottom-0 w-3 bg-linear-to-b from-purple-500 to-yellow-400 transform -skew-x-12" />
              <p className="text-white text-lg lg:text-xl font-bold pl-6 max-w-2xl mx-auto leading-relaxed">
                <span className="text-purple-300">"WHERE TECHNOLOGY MEETS TRADITION"</span>
                <span className="block text-gray-300 font-normal text-base mt-2">
                  Join the elite circle of innovators shaping tomorrow's digital landscape
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          {/* Hero Panel - Spans 2 columns */}
          <ComicPanel panelType="hero" className="md:col-span-2 about-panel p-8">
            <div className="flex items-start gap-6">
              <div className="shrink-0">
                <div className="w-16 h-16 bg-linear-to-br from-yellow-400 to-yellow-600 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_#000] transform rotate-12 panel-icon">
                  <Globe className="w-8 h-8 text-black" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-black text-white mb-3 font-display italic comic-text-stroke">
                  GLOBAL TECH ALLIANCE
                </h3>
                <p className="text-gray-200 text-base leading-relaxed mb-4">
                  Unite with developers, designers, and visionaries from across the digital realm. 
                  Together, we forge the future of technology.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-purple-600 border-3 border-black text-white text-xs font-black shadow-[3px_3px_0px_#000] uppercase transform -skew-x-12">INNOVATION</span>
                  <span className="px-4 py-2 bg-yellow-500 border-3 border-black text-black text-xs font-black shadow-[3px_3px_0px_#000] uppercase transform -skew-x-12">LEGACY</span>
                  <span className="px-4 py-2 bg-black border-3 border-purple-500 text-purple-400 text-xs font-black shadow-[3px_3px_0px_#9C27B0] uppercase transform -skew-x-12">FUTURE</span>
                </div>
              </div>
            </div>
          </ComicPanel>

          {/* Stat Panel 1 */}
          <ComicPanel panelType="stat" className="about-panel p-6 text-center">
            <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-purple-700 border-4 border-white flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_#000] panel-icon">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-4xl font-black text-white mb-2 font-display italic comic-text-stroke">1000+</h4>
            <p className="text-purple-300 text-sm font-black uppercase tracking-widest">WARRIORS</p>
            <div className="mt-2 h-1 bg-linear-to-r from-purple-500 to-yellow-400 mx-auto w-12" />
          </ComicPanel>

          {/* Stat Panel 2 */}
          <ComicPanel panelType="stat" className="about-panel p-6 text-center">
            <div className="w-16 h-16 bg-linear-to-br from-yellow-400 to-yellow-600 border-4 border-black flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_#000] panel-icon">
              <Trophy className="w-8 h-8 text-black" />
            </div>
            <h4 className="text-4xl font-black text-white mb-2 font-display italic comic-text-stroke">₹50K+</h4>
            <p className="text-yellow-400 text-sm font-black uppercase tracking-widest">TREASURE</p>
            <div className="mt-2 h-1 bg-linear-to-r from-yellow-400 to-purple-500 mx-auto w-12" />
          </ComicPanel>

          {/* Feature Panel 1 */}
          <ComicPanel panelType="feature" className="about-panel p-6">
            <div className="w-14 h-14 bg-linear-to-br from-purple-600 to-purple-800 border-4 border-purple-400 flex items-center justify-center mb-4 shadow-[3px_3px_0px_#9C27B0] transform -rotate-12 panel-icon">
              <Cpu className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-xl font-black text-white mb-2 font-display italic">CUTTING EDGE</h4>
            <p className="text-gray-300 text-sm">Advanced tech challenges worthy of Wakanda's finest minds.</p>
          </ComicPanel>

          {/* Feature Panel 2 */}
          <ComicPanel panelType="feature" className="about-panel p-6">
            <div className="w-14 h-14 bg-linear-to-br from-yellow-500 to-yellow-700 border-4 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_#000] transform rotate-12 panel-icon">
              <Code className="w-7 h-7 text-black" />
            </div>
            <h4 className="text-xl font-black text-white mb-2 font-display italic">24H BATTLE</h4>
            <p className="text-gray-300 text-sm">Non-stop coding marathon to test your true potential.</p>
          </ComicPanel>

          {/* CTA Panel */}
          <ComicPanel panelType="hero" className="about-panel p-6 bg-linear-to-br from-purple-600 via-purple-700 to-black">
            <div className="flex items-center justify-between h-full">
              <div>
                <h4 className="text-2xl font-black text-white mb-1 font-display italic comic-text-stroke">JOIN THE</h4>
                <h4 className="text-2xl font-black text-yellow-400 font-display italic comic-text-stroke">REVOLUTION</h4>
                <p className="text-purple-200 text-xs font-black uppercase tracking-wider mt-2">WAKANDA AWAITS</p>
              </div>
              <div className="w-14 h-14 bg-linear-to-br from-yellow-400 to-yellow-600 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_#000] panel-icon">
                <Sparkles className="w-7 h-7 text-black" />
              </div>
            </div>
          </ComicPanel>

          {/* Mission Panel */}
          <ComicPanel panelType="feature" className="about-panel p-6">
            <div className="w-14 h-14 bg-linear-to-br from-purple-500 to-purple-700 border-4 border-yellow-400 flex items-center justify-center mb-4 shadow-[3px_3px_0px_#FFD700] panel-icon">
              <Star className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-xl font-black text-white mb-2 font-display italic">ELITE MISSION</h4>
            <p className="text-gray-300 text-sm">Protect and advance the digital frontier with honor.</p>
          </ComicPanel>

        </div>
      </div>
    </section>
  );
};

export default About;

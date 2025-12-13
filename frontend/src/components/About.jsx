import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Cpu, Globe, Zap, Trophy, Users, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Card = ({ children, className = "" }) => {
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    // Card lift and shake
    gsap.to(cardRef.current, {
      y: -5,
      rotation: Math.random() * 2 - 1,
      duration: 0.3,
      ease: "back.out(1.7)"
    });

    // Bounce icons
    const icons = cardRef.current?.querySelectorAll('.card-icon');
    icons?.forEach(icon => {
      gsap.to(icon, {
        y: -10,
        duration: 0.4,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      rotation: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-visible bg-gradient-to-br from-gray-900 to-gray-950 border-4 border-black transition-all duration-200 ${className}`}
    >
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};



const About = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      


      // Title entrance animation
      gsap.fromTo(titleRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1
          }
        }
      );

      // Cards stagger animation
      ScrollTrigger.batch(".about-card", {
        start: "top 85%",
        once: true, // Animate only once creates a stable experience
        onEnter: batch => gsap.fromTo(batch, 
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true
          }
        )
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center py-20 lg:py-0">
      


      {/* Content - Compact */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-6">
        
        {/* Header - Compact */}
        <div ref={titleRef} className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1 bg-purple-700 border-3 border-black rounded-none shadow-[4px_4px_0px_#000] rotate-[-1deg]">
            <Shield className="w-4 h-4 text-white" />
            <span className="text-white font-black text-xs tracking-widest uppercase">Wakanda Forever</span>
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-black mb-2 font-display italic">
            <span className="text-white drop-shadow-[3px_3px_0px_#000]" style={{ WebkitTextStroke: '2px black' }}>
              THE{' '}
            </span>
            <span className="text-purple-500 drop-shadow-[4px_4px_0px_#B8860B]" style={{ WebkitTextStroke: '2px black' }}>
              VISION
            </span>
          </h2>
          
          <div className="relative inline-block">
            <div className="absolute -left-3 top-0 bottom-0 w-2 bg-purple-600 -skew-x-12" />
            <p className="text-white text-sm lg:text-base font-bold pl-2 max-w-xl mx-auto">
              "INNOVATION MEETS LEGACY."
              <span className="block text-gray-400 font-normal text-xs mt-0.5">
                Join the next generation of tech warriors.
              </span>
            </p>
          </div>
        </div>

        {/* Cards Grid - Compact */}
        <div className="cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          
          {/* Main Card */}
          <Card className="md:col-span-2 lg:col-span-2 about-card p-4 lg:p-5 shadow-[6px_6px_0px_#7C3AED]">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-none bg-purple-600 border-3 border-black flex items-center justify-center shadow-[3px_3px_0px_#000] rotate-3 card-icon">
                  <Globe className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg lg:text-xl font-black text-white mb-2 font-display italic" style={{ WebkitTextStroke: '0.5px black' }}>
                  Global Tech Ecosystem
                </h3>
                <p className="text-gray-300 text-xs lg:text-sm leading-snug mb-3">
                  Join a vibrant community of developers, designers, and innovators building the future.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-3 py-1 bg-purple-600 border-2 border-black text-white text-[10px] font-black shadow-[2px_2px_0px_#000] uppercase">Innovation</span>
                  <span className="px-3 py-1 bg-black border-2 border-purple-600 text-purple-400 text-[10px] font-black shadow-[2px_2px_0px_#7C3AED] uppercase">Creativity</span>
                  <span className="px-3 py-1 bg-yellow-700 border-2 border-black text-white text-[10px] font-black shadow-[2px_2px_0px_#000] uppercase">Future</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Stat Card 1 */}
          <Card className="about-card p-4 text-center shadow-[5px_5px_0px_#B8860B]">
            <div className="w-12 h-12 rounded-none bg-purple-600 border-3 border-black flex items-center justify-center mx-auto mb-2 shadow-[3px_3px_0px_#000] card-icon">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-3xl font-black text-white mb-1 font-display italic" style={{ WebkitTextStroke: '1px black' }}>1000+</h4>
            <p className="text-purple-400 text-[10px] font-black uppercase tracking-widest">Participants</p>
          </Card>

          {/* Feature Card 1 */}
          <Card className="about-card p-4 shadow-[5px_5px_0px_#7C3AED]">
            <div className="w-10 h-10 rounded-none bg-purple-600 border-3 border-black flex items-center justify-center mb-2 shadow-[3px_3px_0px_#000] -rotate-6 card-icon">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-base lg:text-lg font-black text-white mb-1 font-display italic">Cutting Edge</h4>
            <p className="text-gray-400 text-xs">Latest tech stack challenges.</p>
          </Card>

          {/* Stat Card 2 */}
          <Card className="about-card p-4 text-center shadow-[5px_5px_0px_#7C3AED]">
            <div className="w-12 h-12 rounded-none bg-yellow-700 border-3 border-black flex items-center justify-center mx-auto mb-2 shadow-[3px_3px_0px_#000] card-icon">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-3xl font-black text-white mb-1 font-display italic" style={{ WebkitTextStroke: '1px black' }}>₹50k+</h4>
            <p className="text-yellow-600 text-[10px] font-black uppercase tracking-widest">Prize Pool</p>
          </Card>

          {/* Feature Card 2 */}
          <Card className="about-card p-4 shadow-[5px_5px_0px_#B8860B]">
            <div className="w-10 h-10 rounded-none bg-yellow-700 border-3 border-black flex items-center justify-center mb-2 shadow-[3px_3px_0px_#000] rotate-6 card-icon">
              <Code className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-base lg:text-lg font-black text-white mb-1 font-display italic">24h Hackathon</h4>
            <p className="text-gray-400 text-xs">Non-stop coding marathon.</p>
          </Card>

          {/* CTA Card */}
          <Card className="about-card p-4 bg-gradient-to-r from-purple-700 to-purple-800 shadow-[5px_5px_0px_#000]">
            <div className="flex items-center justify-between h-full">
              <div>
                <h4 className="text-xl font-black text-white mb-0.5 font-display italic" style={{ WebkitTextStroke: '0.5px black' }}>Join Us</h4>
                <p className="text-purple-200 text-[10px] font-black uppercase tracking-wider">Revolution Awaits</p>
              </div>
              <div className="w-10 h-10 rounded-none bg-black border-3 border-white flex items-center justify-center shadow-[3px_3px_0px_#7C3AED] card-icon">
                <Zap className="w-5 h-5 text-purple-400 fill-current" />
              </div>
            </div>
          </Card>

        </div>
      </div>




    </section>
  );
};

export default About;
